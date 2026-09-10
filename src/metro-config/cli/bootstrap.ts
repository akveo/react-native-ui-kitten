import { Command } from 'commander';
import BootstrapService from '../services/bootstrap.service';
import { EvaMappingPackageName } from '../services/eva-config.service';

const BOOTSTRAP_COMMAND_DESCRIPTION = `
Compile mapping.json into style object, optionally merging it with another mapping
https://github.com/akveo/react-native-ui-kitten#readme
`;

const BOOTSTRAP_COMMAND_USAGE = `

- To compile the only Eva package:
ui-kitten bootstrap @ui-kitten/eva

- To compile Eva package by merging it with another mapping:
ui-kitten bootstrap @ui-kitten/eva ./path-to/mapping.json
`;

// eslint-disable-next-line no-restricted-syntax
export default (program: Command): void => {
  program.command('bootstrap <evaPackage> [mappingPath]')
    .description(BOOTSTRAP_COMMAND_DESCRIPTION)
    .usage(BOOTSTRAP_COMMAND_USAGE)
    .action((evaPackage: EvaMappingPackageName, customMappingPath?: string) => {
      const isBootstrapped: boolean = BootstrapService.run({ evaPackage, customMappingPath });

      /*
       * Signal the failure through the exit code so CI scripts can detect it,
       * without calling `process.exit` (the service also runs inside Metro).
       */
      if (!isBootstrapped) {
        process.exitCode = 1;
      }
    });
};
