import LodashMerge from 'lodash.merge';
import MetroConfig from 'metro-config/src/defaults';
import { EvaConfig } from './services/eva-config.service';
import BootstrapService from './services/bootstrap.service';

// TODO: TS definitions for metro config?
type MetroConfigType = any;

const defaultMetroConfig = MetroConfig.getDefaultValues();

export const create = (evaConfig: EvaConfig, projectConfig?: MetroConfigType): MetroConfigType => {

  const uiKittenMetroConfig: MetroConfigType = {
    reporter: {
      update: (event) => {
        const reporter = projectConfig.reporter || defaultMetroConfig.reporter;

        if (reporter && reporter.update) {
          reporter.update(event);
        }

        if (event.type === 'bundle_build_started') {
          BootstrapService.run(evaConfig);
        }
      },
    },
  };

  return LodashMerge({}, projectConfig, uiKittenMetroConfig);
};
