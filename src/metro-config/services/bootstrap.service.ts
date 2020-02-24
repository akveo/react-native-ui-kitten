import {
  CustomSchemaType,
  SchemaType,
  ThemeStyleType,
} from '@eva-design/dss';
import { SchemaProcessor } from '@eva-design/processor';
import Crypto from 'crypto';
import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import EvaConfigService, { EvaConfig } from './eva-config.service';
import LogService from './log.service';
import ProjectService from './project.service';

const DEFAULT_CHECKSUM: string = 'default';
const CACHE_FILE_NAME: string = 'generated.json';
const CACHE_EXPORT_SIGNATURE: string = `\n\nexports.styles = require('./${CACHE_FILE_NAME}').styles`;

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

    /*
     * Use `require` for eva mapping as it is static module and should not be changed.
     * Require actual cache by reading file at cache file as it may change by file system.
     */
    const evaMapping: SchemaType = ProjectService.requireModule(evaMappingPath);
    const actualCacheString: string = ProjectService.requireActualModule(outputCachePath);
    const actualCache: EvaCache = JSON.parse(actualCacheString);

    let customMapping: CustomSchemaType;
    let actualChecksum: string = DEFAULT_CHECKSUM;
    let nextChecksum: string = DEFAULT_CHECKSUM;

    if (actualCache && actualCache.checksum) {
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
      const mapping: SchemaType = LodashMerge({}, evaMapping, customMapping);
      const styles: ThemeStyleType = schemaProcessor.process(mapping);
      const writableCache: string = BootstrapService.createWritableCache(nextChecksum, styles);

      Fs.writeFileSync(outputCachePath, writableCache);
    }

    const hasCacheExports: boolean = BootstrapService.hasCacheExports(config);
    if (!hasCacheExports) {
      const evaIndexPath: string = RELATIVE_PATHS.evaIndex(config.evaPackage);

      Fs.appendFileSync(evaIndexPath, CACHE_EXPORT_SIGNATURE);
      LogService.success(`Successfully bootstrapped ${config.evaPackage}`);
    }
  };

  private static hasCacheExports = (config: EvaConfig): boolean => {
    const evaIndexPath: string = RELATIVE_PATHS.evaIndex(config.evaPackage);
    const evaIndexString = ProjectService.requireActualModule(evaIndexPath);

    return evaIndexString.includes(CACHE_EXPORT_SIGNATURE);
  };

  private static createWritableCache = (checksum: string, styles: ThemeStyleType): string => {
    const cache: EvaCache = {
      checksum,
      styles,
    };

    return JSON.stringify(cache, null, 2);
  };

  private static createChecksum = (target: any): string => {
    return Crypto.createHash('sha1')
                 .update(target)
                 .digest('hex');
  };
}

