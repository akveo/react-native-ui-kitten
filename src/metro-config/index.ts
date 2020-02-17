import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import MetroConfig from 'metro-config/src/defaults';
import { EvaConfig } from './services/eva-config.service';
import BootstrapService from './services/bootstrap.service';
import ProjectService from './services/project.service';

// TODO: TS definitions for metro config?
type MetroConfigType = any;

const defaultMetroConfig = MetroConfig.getDefaultValues();
const customMappingWatchOptions = {
  interval: 400,
};

export const create = (evaConfig: EvaConfig, projectConfig?: MetroConfigType): MetroConfigType => {

  const metroConfig: MetroConfigType = {
    reporter: {
      update: (event) => {
        const reporter = projectConfig.reporter || defaultMetroConfig.reporter;

        if (reporter && reporter.update) {
          reporter.update(event);
        }

        if (event.type === 'initialize_started') {
          BootstrapService.run(evaConfig);

          const customMappingPath = ProjectService.resolvePath(evaConfig.customMappingPath);
          const customMappingExists: boolean = Fs.existsSync(customMappingPath);

          if (customMappingExists) {
            Fs.watchFile(customMappingPath, customMappingWatchOptions, () => {
              BootstrapService.run(evaConfig);
            });
          }
        }
      },
    },
  };

  return LodashMerge({}, projectConfig, metroConfig);
};
