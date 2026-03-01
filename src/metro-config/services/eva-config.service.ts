import LogService from './log.service';
import ProjectService from './project.service';

/**
 * Defines the Eva config passed to UI Kitten metro config
 *
 * @param {EvaMappingPackageName} evaPackage - the name of the eva package.
 * @param {string} customMappingPath - relative path to custom mapping.
 * @param {boolean} watch - watch custom mapping file for changes (defaults to true)
 *
 * @example Config for @ui-kitten/eva package with custom mapping
 * ```
 * const evaConfig = {
 *   evaPackage: '@ui-kitten/eva',
 *   customMappingPath: './custom-mapping.json',
 * };
 * ```
 */
export interface EvaConfig {
  evaPackage: EvaMappingPackageName;
  customMappingPath?: string;
  watch?: boolean;
}

export type EvaMappingPackageName = '@ui-kitten/eva' | '@ui-kitten/material';

// eslint-disable-next-line no-restricted-syntax
export default class EvaConfigService {

  static MAPPING_PACKAGE_NAMES: EvaMappingPackageName[] = [
    '@ui-kitten/eva',
    '@ui-kitten/material',
  ];

  static validateConfigOrWarn = (config: EvaConfig): boolean => {
    if (!config.evaPackage || !EvaConfigService.isValidEvaPackageName(config.evaPackage)) {
      LogService.warn(
        'There is no Eva package specified in UI Kitten metro config',
        'Consider setting "evaPackage" property of UI Kitten metro config',
        'to one of the following values:',
        '',
        ...EvaConfigService.MAPPING_PACKAGE_NAMES,
      );
      return false;
    }

    const isEvaPackageInstalled: boolean = ProjectService.hasModule(`node_modules/${config.evaPackage}`);

    if (!isEvaPackageInstalled) {
      LogService.warn(
        `UI Kitten metro config has ${config.evaPackage} specified`,
        'but it seems to be not installed',
        '',
        `Consider installing ${config.evaPackage} and running this command again.`,
      );
      return false;
    }

    return true;
  };

  private static isValidEvaPackageName = (name: string): boolean => {
    return EvaConfigService.MAPPING_PACKAGE_NAMES.includes(name as EvaMappingPackageName);
  };
}
