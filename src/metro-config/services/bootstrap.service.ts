import {
  SchemaType,
  ThemeStyleType,
} from '@eva-design/dss';
import { generateThemeTypes, generateMappingTypes } from '@eva-design/processor/js/scripts/generateTypes';
import { SchemaProcessor } from '@eva-design/processor';
import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import EvaConfigService, { EvaConfig } from './eva-config.service';
import LogService from './log.service';
import ProjectService from './project.service';
import { light } from '@eva-design/eva';

const DEFAULT_CHECKSUM = 'default';
const CACHE_FILE_NAME = 'generated.json';
const MAPPING_TYPES_FILE_NAME = 'mapping.types.ts';
const THEME_TYPES_FILE_NAME = 'theme.types.ts';
const CACHE_EXPORT_SIGNATURE = `\n\nexports.styles = require('./${CACHE_FILE_NAME}').styles`;

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
  mappingTypes: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/${MAPPING_TYPES_FILE_NAME}`;
  },
  themeTypes: (evaPackage: string): string => {
    return `node_modules/${evaPackage}/${THEME_TYPES_FILE_NAME}`;
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
// eslint-disable-next-line no-restricted-syntax
export default class BootstrapService {
  static run = (config: EvaConfig): void => {
    const hasAtLeastOneEvaPackage: boolean = BootstrapService.ensureEvaPackagesInstalledOrWarn();
    const isValidConfig: boolean = EvaConfigService.validateConfigOrWarn(config);
    const evaMappingPath: string = RELATIVE_PATHS.evaMapping(config.evaPackage);
    const evaMapping: SchemaType = ProjectService.requireModule(evaMappingPath);

    if (hasAtLeastOneEvaPackage && isValidConfig) {
      if (!BootstrapService.isBootstrappedBefore(config) || BootstrapService.isRebootstrapNeeded(config)) {
        let customMapping = {};
        let customTheme = {};
        let nextChecksum = DEFAULT_CHECKSUM;
        if (config.customMappingPath) {
          const customMappingString: string = ProjectService.requireActualModule(config.customMappingPath);
          customMapping = JSON.parse(customMappingString);
          nextChecksum = BootstrapService.createChecksum(customMappingString);
        }
        if (config.customThemePath) {
          const customThemeString: string = ProjectService.requireActualModule(config.customThemePath);
          customTheme = JSON.parse(customThemeString);
        }
        const combinedMapping: SchemaType = LodashMerge({}, evaMapping, customMapping);
        const combinedTheme: Record<string, string> = LodashMerge({}, light, customTheme);
        const styles: ThemeStyleType = schemaProcessor.process(combinedMapping);
        const writableCache: string = BootstrapService.createWritableCache(nextChecksum, styles);
        const outputCachePath: string = RELATIVE_PATHS.cache(config.evaPackage);
        Fs.writeFileSync(outputCachePath, writableCache);
        Fs.appendFileSync(RELATIVE_PATHS.evaIndex(config.evaPackage), CACHE_EXPORT_SIGNATURE);

        const mappingFileContent = generateMappingTypes(combinedMapping);
        Fs.writeFileSync(RELATIVE_PATHS.mappingTypes(config.evaPackage), mappingFileContent);

        const themeFileContent = generateThemeTypes(combinedTheme);
        Fs.writeFileSync(RELATIVE_PATHS.themeTypes(config.evaPackage), themeFileContent);

        LogService.success(`Successfully bootstrapped ${config.evaPackage}`);
      }
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

  private static isRebootstrapNeeded(config: EvaConfig): boolean {
    const outputCachePath: string = RELATIVE_PATHS.cache(config.evaPackage);
    const actualCacheString: string = ProjectService.requireActualModule(outputCachePath);
    const actualCache: EvaCache = JSON.parse(actualCacheString);
    const actualChecksum: string = actualCache?.checksum || DEFAULT_CHECKSUM;
    let nextChecksum: string = DEFAULT_CHECKSUM;
    if (config.customMappingPath) {
      const customMappingString: string = ProjectService.requireActualModule(config.customMappingPath);
      nextChecksum = BootstrapService.createChecksum(customMappingString);
    }
    return actualChecksum !== nextChecksum;
  }

  private static isBootstrappedBefore(config: EvaConfig): boolean {
    return BootstrapService.hasCacheExports(config);
  }

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

