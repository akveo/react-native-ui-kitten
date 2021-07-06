import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import MetroConfig from 'metro-config/src/defaults';
import BootstrapService from './services/bootstrap.service';
import { EvaConfig } from './services/eva-config.service';
import ProjectService from './services/project.service';

// TS definitions for metro config?
type MetroConfigType = any;

const defaultMetroConfig = MetroConfig.getDefaultValues();
const customMappingWatchOptions = {
  /*
   * How often the custom mapping should be polled in milliseconds
   */
  interval: 100,
};

/**
 * Creates custom Metro config for bootstrapping Eva packages.
 *
 * @param {EvaConfig} evaConfig - configuration of Eva Design System used in project.
 * @see {EvaConfig}
 *
 * @param metroConfig - configuration of Metro Bundler used in project.
 * @link https://facebook.github.io/metro/docs/configuration
 *
 * @returns a combination of two metro configurations.
 *
 * @example Usage
 *
 * ```metro.config.js
 * const MetroConfig = require('@ui-kitten/metro-config');
 *
 * const evaConfig = {
 *   evaPackage: '@eva-design/eva',              // Required.
 *   customMappingPath: './custom-mapping.json', // Optional.
 * };
 *
 * module.exports = MetroConfig.create(evaConfig, {
 *   // Whatever was previously specified
 * });
 * ```
 */
export const create = (evaConfig: EvaConfig, metroConfig?: MetroConfigType): MetroConfigType => {

  const handleMetroEvent = (event): void => {
    const reporter = metroConfig && metroConfig.reporter || defaultMetroConfig.reporter;

    if (reporter && reporter.update) {
      reporter.update(event);
    }

    if (event.type === 'initialize_started') {
      BootstrapService.run(evaConfig);

      const customMappingPath: string = ProjectService.resolvePath(evaConfig.customMappingPath);
      const customMappingExists: boolean = Fs.existsSync(customMappingPath);

      if (customMappingExists && (evaConfig.watch || evaConfig.watch === undefined)) {
        Fs.watchFile(customMappingPath, customMappingWatchOptions, () => {
          BootstrapService.run(evaConfig);
        });
      }
    }
  };

  const libConfig: MetroConfigType = {
    reporter: {
      update: handleMetroEvent,
    },
  };

  return LodashMerge({}, libConfig, metroConfig);
};
