import { SchemaProcessor } from '@eva-design/processor';
import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import Hash from 'object-hash';
import EvaConfigService, {
  EvaConfig,
  EvaMappingPackageName,
} from './eva-config.service';
import LogService from './log.service';
import ProjectService from './project.service';
import {
  CustomSchemaType,
  ThemeStyleType,
} from '@eva-design/dss';

const DEFAULT_CHECKSUM: string = 'default';
const CACHE_FILE_NAME: string = 'generated.json';

const RELATIVE_PATHS = {
  evaPackage: (evaPackage: string): string => {
    return `node_modules/${evaPackage}`;
  },
  evaMapping: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/mapping.json`;
  },
  cache: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/${CACHE_FILE_NAME}`;
  },
};

const schemaProcessor = new SchemaProcessor();

interface EvaCache {
  checksum: string;
  styles: ThemeStyleType;
}

/**
 * Generates styles for `@eva-design/*` package specified in EvaConfig
 *
 * @see EvaConfig
 *
 * 1. Finds installed `@eva-design/*` packages.
 * Will warn if there is no valid eva mapping packages installed and do nothing.
 *
 * @see EvaConfigService.MAPPING_PACKAGE_NAMES
 *
 * 2. Validates specified eva config  by checking if `evaPackage` is specified and is one of the valid mapping packages.
 * Will warn if it is not valid and do nothing.
 *
 * 3. Generates styles for specified `evaPackage` and stores it into cache file in the package directory.
 * @see {CACHE_FILE_NAME}
 * @see {EvaCache}
 *
 * E.g, if `evaPackage` is `@eva-design/eva`:
 * The result will be stored at `./node_modules/@eva-design/eva/generated.json`
 */
export default class BootstrapService {

  static run = (config: EvaConfig): void => {
    const hasAtLeastOneEvaPackage: boolean = BootstrapService.ensureEvaPackagesInstalledOrWarn();
    const isValidConfig: boolean = EvaConfigService.validateConfigOrWarn(config);

    if (hasAtLeastOneEvaPackage && isValidConfig) {
      BootstrapService.processMappingIfNeeded(config);
    }
  };

  private static ensureEvaPackagesInstalledOrWarn = (): boolean => {
    const installedEvaPackages: EvaMappingPackageName[] = [];

    EvaConfigService.MAPPING_PACKAGE_NAMES.forEach((packageName: EvaMappingPackageName) => {
      const evaPackageRelativePath = RELATIVE_PATHS.evaPackage(packageName);
      const isEvaPackageInstalled = ProjectService.hasModule(evaPackageRelativePath);

      if (isEvaPackageInstalled) {
        installedEvaPackages.push(packageName);
      }
    });

    if (installedEvaPackages.length === 0) {
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
    const evaMappingPath = RELATIVE_PATHS.evaMapping(config.evaPackage);
    const outputCachePath = RELATIVE_PATHS.cache(config.evaPackage);

    /*
     * Use `require` for eva mapping as it is static module and should not be changed.
     * Require actual cache by reading file at cache dir as it may change by file system.
     */
    const evaMapping = ProjectService.requireModule(evaMappingPath);
    const actualCache: EvaCache = BootstrapService.requireActualModule(outputCachePath);

    let customMapping: CustomSchemaType;
    let actualChecksum = DEFAULT_CHECKSUM;
    let nextChecksum = DEFAULT_CHECKSUM;

    if (actualCache) {
      actualChecksum = actualCache.checksum;
    }

    if (config.customMappingPath) {
      const customMappingAbsolutePath = ProjectService.resolvePath(config.customMappingPath);
      LogService.info(`Looking for custom ${config.evaPackage} at: `, customMappingAbsolutePath);

      /*
       * Require custom mapping by reading file at `customMappingPath` as it may change by user.
       */
      customMapping = BootstrapService.requireActualModule(config.customMappingPath);
      /*
       * Calculate checksum only for custom mapping,
       * but not for styles we generate because eva mapping is a static module.
       */
      nextChecksum = Hash.sha1(customMapping);
    }

    /*
     * Write if it is the first call
     * Or re-write if custom mapping was changed
     */
    if (actualChecksum === DEFAULT_CHECKSUM || actualChecksum !== nextChecksum) {
      const mapping = LodashMerge({}, evaMapping, customMapping);
      const styles = schemaProcessor.process(mapping);
      const writableCache: string = BootstrapService.createWritableCache(nextChecksum, styles);

      Fs.writeFileSync(outputCachePath, writableCache);
      LogService.success(`Successfully bootstrapped ${config.evaPackage}`);
    }
  };

  private static createWritableCache = (checksum: string, styles: ThemeStyleType): string => {
    const cache: EvaCache = {
      checksum,
      styles,
    };
    return JSON.stringify(cache, null, 2);
  };

  private static requireActualModule = <T = {}>(relativePath: string): T | null => {
    if (!ProjectService.hasModule(relativePath)) {
      return null;
    }

    const projectFilePath = ProjectService.resolvePath(relativePath);
    const projectFileContents = Fs.readFileSync(projectFilePath).toString();

    return JSON.parse(projectFileContents);
  };
}

