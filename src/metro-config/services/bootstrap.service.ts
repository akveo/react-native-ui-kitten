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

const DEFAULT_CHECKSUM = 'default';
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

const CACHE_EXPORT_SIGNATURE = (evaPackage: string): string =>
  `\n\nexports.styles = require('${getCacheRequirePath(evaPackage)}').styles`;

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

  static run = (config: EvaConfig): void => {
    const hasAtLeastOneEvaPackage: boolean = BootstrapService.ensureEvaPackagesInstalledOrWarn();
    const isValidConfig: boolean = EvaConfigService.validateConfigOrWarn(config);

    if (hasAtLeastOneEvaPackage && isValidConfig) {
      BootstrapService.processMappingIfNeeded(config);
    }
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

  private static processMappingIfNeeded = (config: EvaConfig): void => {
    const evaMappingPath: string = RELATIVE_PATHS.evaMapping(config.evaPackage);
    const outputCachePath: string = RELATIVE_PATHS.cache(config.evaPackage);
    const cacheDirPath: string = RELATIVE_PATHS.cacheDir();

    /*
     * Ensure cache directory exists
     */
    BootstrapService.ensureCacheDirectoryExists(cacheDirPath);

    /*
     * Use `require` for eva mapping as it is static module and should not be changed.
     * Require actual cache by reading file at cache file as it may change by file system.
     */
    const evaMapping: SchemaType = ProjectService.requireModule(evaMappingPath);
    const actualCacheString: string = ProjectService.requireActualModule(outputCachePath);
    const actualCache: EvaCache = actualCacheString ? JSON.parse(actualCacheString) : null;

    let customMapping: CustomSchemaType;
    let actualChecksum: string = DEFAULT_CHECKSUM;
    let nextChecksum: string = DEFAULT_CHECKSUM;

    if (actualCache?.checksum) {
      actualChecksum = actualCache.checksum;
    }

    if (config.customMappingPath) {

      /*
       * Require custom mapping by reading file at `customMappingPath` as it may change by user.
       */
      const customMappingString: string = ProjectService.requireActualModule(config.customMappingPath);
      customMapping = JSON.parse(customMappingString);
      /*
       * Calculate checksum only for custom mapping,
       * but not for styles we generate because eva mapping is a static module.
       */
      nextChecksum = BootstrapService.createChecksum(customMappingString);
    }

    /*
     * Write if it is the first call
     * Or re-write if custom mapping was changed
     */
    if (actualChecksum === DEFAULT_CHECKSUM || actualChecksum !== nextChecksum) {
      const mapping: SchemaType = deepMerge(evaMapping, customMapping);
      const styles: ThemeStyleType = schemaProcessor.process(mapping);
      const writableCache: string = BootstrapService.createWritableCache(nextChecksum, styles);

      const absoluteCachePath: string = ProjectService.resolvePath(outputCachePath);
      Fs.writeFileSync(absoluteCachePath, writableCache);
    }

    const hasCacheExports: boolean = BootstrapService.hasCacheExports(config);
    if (!hasCacheExports) {
      const evaIndexPath: string = RELATIVE_PATHS.evaIndex(config.evaPackage);

      Fs.appendFileSync(evaIndexPath, CACHE_EXPORT_SIGNATURE(config.evaPackage));
      LogService.success(`Successfully bootstrapped ${config.evaPackage}`);
    }
  };

  private static ensureCacheDirectoryExists = (cacheDirPath: string): void => {
    const absoluteCacheDirPath: string = ProjectService.resolvePath(cacheDirPath);
    if (!Fs.existsSync(absoluteCacheDirPath)) {
      Fs.mkdirSync(absoluteCacheDirPath, { recursive: true });
    }
  };

  private static hasCacheExports = (config: EvaConfig): boolean => {
    const evaIndexPath: string = RELATIVE_PATHS.evaIndex(config.evaPackage);
    const evaIndexString = ProjectService.requireActualModule(evaIndexPath);
    const expectedSignature = CACHE_EXPORT_SIGNATURE(config.evaPackage);

    return evaIndexString.includes(expectedSignature);
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

