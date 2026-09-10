import {
  CustomSchemaType,
  SchemaType,
  ThemeStyleType,
} from '@ui-kitten/processor';
import { SchemaProcessor } from '@ui-kitten/processor';
import Fs from 'fs';
import { deepMerge } from '@ui-kitten/mapping-base';
import EvaConfigService, { EvaConfig } from './eva-config.service';
import LogService from './log.service';
import ProjectService from './project.service';

const CACHE_FILE_NAME = 'generated.json';
const CACHE_DIR = 'node_modules/.cache/ui-kitten';

/**
 * Generates the require path for the cache file from the eva package index.
 * Uses relative path from eva package to cache directory.
 */
const getCacheRequirePath = (evaPackage: string): string => {
  // From node_modules/@ui-kitten/eva to node_modules/.cache/ui-kitten
  // = ../../.cache/ui-kitten/eva-generated.json or material-generated.json
  const packageName = evaPackage.replace('@ui-kitten/', '');
  return `../../.cache/ui-kitten/${packageName}-generated.json`;
};

/**
 * The single line appended to the eva package index so that `import * as eva` exposes
 * the compiled styles. It is matched literally to keep the append idempotent.
 */
const CACHE_EXPORT_SIGNATURE = (evaPackage: string): string =>
  `exports.styles = require('${getCacheRequirePath(evaPackage)}').styles`;

const RELATIVE_PATHS = {
  evaPackage: (evaPackage: string): string => {
    return `node_modules/${evaPackage}`;
  },
  evaMapping: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/mapping.json`;
  },
  evaIndex: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/index.js`;
  },
  cache: (evaPackage: string): string => {
    const packageName = evaPackage.replace('@ui-kitten/', '');
    return `${CACHE_DIR}/${packageName}-${CACHE_FILE_NAME}`;
  },
  cacheDir: (): string => {
    return CACHE_DIR;
  },
};

const schemaProcessor = new SchemaProcessor();

interface EvaCache {
  checksum: string;
  styles: ThemeStyleType;
}

interface CustomMappingSource {
  mapping: CustomSchemaType;
  source: string;
}

/**
 * Outcome of a bootstrap attempt.
 *
 * - `compiled`: the cache was written and/or the `exports.styles` line was appended.
 * - `up-to-date`: nothing had to change.
 * - `failed`: the project or the config is invalid; the reason was already reported as a warning.
 */
export type BootstrapStatus = 'compiled' | 'up-to-date' | 'failed';

/**
 * Generates styles for `@ui-kitten/*` package specified in EvaConfig
 *
 * @see EvaConfig
 *
 * 1. Finds installed `@ui-kitten/*` packages.
 * Will warn if there is no valid eva mapping packages installed and do nothing.
 *
 * @see EvaConfigService.MAPPING_PACKAGE_NAMES
 *
 * 2. Validates specified eva config  by checking if `evaPackage` is specified and is one of the valid mapping packages.
 * Will warn if it is not valid and do nothing.
 *
 * 3. Generates styles for specified `evaPackage` and stores it into cache file in the cache directory.
 * @see {CACHE_FILE_NAME}
 * @see {EvaCache}
 *
 * E.g, if `evaPackage` is `@ui-kitten/eva`:
 * The result will be stored at `./node_modules/.cache/ui-kitten/eva-generated.json`
 *
 * This location is preferred over storing in the package directory because:
 * - It doesn't modify installed packages (cleaner package management)
 * - It survives npm/yarn reinstalls better when using CI caching
 * - It's a standard location for build caches in the Node.js ecosystem
 */
// eslint-disable-next-line no-restricted-syntax
export default class BootstrapService {

  /**
   * Compiles the configured Eva package.
   *
   * @returns `true` when the styles were compiled (or were already up to date),
   * `false` when the project or the config is invalid. Every failure is reported through
   * `LogService.warn`; this never throws for a configuration mistake and never exits the process,
   * because the same code runs inside Metro.
   */
  static run = (config: EvaConfig): boolean => {
    return BootstrapService.bootstrap(config) !== 'failed';
  };

  /**
   * Same as `run`, but tells whether any work was done.
   * `success` is logged only when something changed; a no-op logs nothing,
   * so a bundler that bootstraps twice or a `postinstall` script does not repeat the line.
   */
  static bootstrap = (config: EvaConfig): BootstrapStatus => {
    const hasAtLeastOneEvaPackage: boolean = BootstrapService.ensureEvaPackagesInstalledOrWarn();
    const isValidConfig: boolean = EvaConfigService.validateConfigOrWarn(config);

    if (!hasAtLeastOneEvaPackage || !isValidConfig) {
      return 'failed';
    }

    return BootstrapService.processMappingIfNeeded(config);
  };

  private static ensureEvaPackagesInstalledOrWarn = (): boolean => {
    const numberOfInstalledEvaPackages = EvaConfigService.MAPPING_PACKAGE_NAMES.reduce((acc, packageName): number => {
      const evaPackageRelativePath: string = RELATIVE_PATHS.evaPackage(packageName);
      const isEvaPackageInstalled: boolean = ProjectService.hasModule(evaPackageRelativePath);

      return isEvaPackageInstalled ? acc + 1 : acc;
    }, 0);

    if (numberOfInstalledEvaPackages === 0) {
      LogService.warn(
        'This project has no Eva packages installed.',
        '',
        'Consider installing one of the following packages:',
        '',
        ...EvaConfigService.MAPPING_PACKAGE_NAMES,
      );
      return false;
    }

    return true;
  };

  private static processMappingIfNeeded = (config: EvaConfig): BootstrapStatus => {
    const evaMappingPath: string = RELATIVE_PATHS.evaMapping(config.evaPackage);
    const outputCachePath: string = RELATIVE_PATHS.cache(config.evaPackage);
    const cacheDirPath: string = RELATIVE_PATHS.cacheDir();

    /*
     * Validate the custom mapping before touching anything on disk,
     * so a typo in `customMappingPath` produces a warning instead of a half-written cache.
     */
    let customMappingSource: CustomMappingSource | null = null;
    if (config.customMappingPath) {
      customMappingSource = BootstrapService.readCustomMappingOrWarn(config.customMappingPath);
      if (!customMappingSource) {
        return 'failed';
      }
    }

    /*
     * Ensure cache directory exists
     */
    BootstrapService.ensureCacheDirectoryExists(cacheDirPath);

    /*
     * Read the eva mapping and the current cache from disk rather than through `require`,
     * so that a changed file (an upgraded eva package, an edited custom mapping) is seen
     * without a stale module cache getting in the way.
     */
    const evaMappingString: string = ProjectService.requireActualModule(evaMappingPath) || '';
    const evaMapping: SchemaType = JSON.parse(evaMappingString);
    const actualCacheString: string | null = ProjectService.requireActualModule(outputCachePath);
    const actualCache: EvaCache | null = actualCacheString ? JSON.parse(actualCacheString) : null;

    /*
     * The checksum covers the eva mapping and the custom mapping (if any),
     * so the cache is rebuilt exactly when one of them changed.
     */
    const nextChecksum: string = BootstrapService.createChecksum(
      evaMappingString + (customMappingSource?.source ?? ''),
    );
    const actualChecksum: string | null = actualCache?.checksum ?? null;

    /*
     * Write if it is the first call
     * Or re-write if custom mapping was changed
     */
    let didWork = false;
    if (!actualCache || actualChecksum !== nextChecksum) {
      const mapping: SchemaType = deepMerge(evaMapping, customMappingSource?.mapping);
      const styles: ThemeStyleType = schemaProcessor.process(mapping);
      const writableCache: string = BootstrapService.createWritableCache(nextChecksum, styles);

      const absoluteCachePath: string = ProjectService.resolvePath(outputCachePath);
      Fs.writeFileSync(absoluteCachePath, writableCache);
      didWork = true;
    }

    if (BootstrapService.ensureCacheExports(config)) {
      didWork = true;
    }

    if (!didWork) {
      return 'up-to-date';
    }

    LogService.success(`Successfully bootstrapped ${config.evaPackage}`);

    return 'compiled';
  };

  /**
   * Reads and parses the custom mapping. Reports a missing file or invalid JSON as a warning
   * that names the path that was tried, and returns `null` so the caller can skip processing.
   */
  private static readCustomMappingOrWarn = (customMappingPath: string): CustomMappingSource | null => {
    const absolutePath: string = ProjectService.resolvePath(customMappingPath);

    if (!Fs.existsSync(absolutePath) || !Fs.statSync(absolutePath).isFile()) {
      LogService.warn(
        `Custom mapping file was not found at ${absolutePath}`,
        `(resolved from "customMappingPath": "${customMappingPath}").`,
        '',
        'Check the path is relative to the project root and that the file exists.',
      );
      return null;
    }

    let customMappingString: string;
    try {
      customMappingString = Fs.readFileSync(absolutePath, { encoding: 'utf8' });
    } catch (error) {
      LogService.warn(
        `Custom mapping file at ${absolutePath} could not be read:`,
        error.message,
      );
      return null;
    }

    let mapping: CustomSchemaType;
    try {
      mapping = JSON.parse(customMappingString);
    } catch (error) {
      LogService.warn(
        `Custom mapping file at ${absolutePath} is not valid JSON:`,
        error.message,
      );
      return null;
    }

    if (!mapping || typeof mapping !== 'object' || Array.isArray(mapping)) {
      LogService.warn(
        `Custom mapping file at ${absolutePath} must contain a JSON object.`,
      );
      return null;
    }

    return {
      mapping,
      source: customMappingString,
    };
  };

  private static ensureCacheDirectoryExists = (cacheDirPath: string): void => {
    const absoluteCacheDirPath: string = ProjectService.resolvePath(cacheDirPath);
    if (!Fs.existsSync(absoluteCacheDirPath)) {
      Fs.mkdirSync(absoluteCacheDirPath, { recursive: true });
    }
  };

  /**
   * Appends the `exports.styles` line to the eva package index once.
   * The file is rewritten so that it always ends with the signature followed by exactly one newline,
   * regardless of how many trailing blank lines the index had before.
   *
   * @returns `true` when the line was appended, `false` when it was already there.
   */
  private static ensureCacheExports = (config: EvaConfig): boolean => {
    const evaIndexPath: string = RELATIVE_PATHS.evaIndex(config.evaPackage);
    const evaIndexString: string = ProjectService.requireActualModule(evaIndexPath) || '';
    const expectedSignature: string = CACHE_EXPORT_SIGNATURE(config.evaPackage);

    if (evaIndexString.includes(expectedSignature)) {
      return false;
    }

    const absoluteEvaIndexPath: string = ProjectService.resolvePath(evaIndexPath);
    const trimmedIndexString: string = evaIndexString.replace(/\s+$/, '');

    Fs.writeFileSync(absoluteEvaIndexPath, `${trimmedIndexString}\n\n${expectedSignature}\n`);

    return true;
  };

  private static createWritableCache = (checksum: string, styles: ThemeStyleType): string => {
    const cache: EvaCache = {
      checksum,
      styles,
    };

    return JSON.stringify(cache, null, 2);
  };

  // JavaScript implementation of Java's String.hashCode() method
  private static createChecksum = (target: string): string => {
    let hash = 0;
    for (let i = 0, len = target.length; i < len; i++) {
      const chr = target.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash.toString();
  };
}

