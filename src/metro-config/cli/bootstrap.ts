import { CommanderStatic } from 'commander';
import BootstrapService from '../services/bootstrap.service';

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
export default (program: CommanderStatic): void => {
  program.command('bootstrap <evaPackage> [mappingPath]')
    .description(BOOTSTRAP_COMMAND_DESCRIPTION)
    .usage(BOOTSTRAP_COMMAND_USAGE)
    .action((evaPackage, customMappingPath) => BootstrapService.run({ evaPackage, customMappingPath }));
};
