import { CommanderStatic } from 'commander';
import BootstrapService from '../services/bootstrap.service';

const BOOTSTRAP_COMMAND_DESCRIPTION: string = `
Compile mapping.json into style object, optionally merging it with another mapping
https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
`;

const BOOTSTRAP_COMMAND_USAGE: string = `

- To compile the only Eva package:
ui-kitten bootstrap @eva-design/eva

- To compile Eva package by merging it with another mapping:
ui-kitten bootstrap @eva-design/eva ./path-to/mapping.json
`;

export default (program: CommanderStatic): void => {
  program.command('bootstrap <evaPackage> [mappingPath]')
    .description(BOOTSTRAP_COMMAND_DESCRIPTION)
    .usage(BOOTSTRAP_COMMAND_USAGE)
    .action((evaPackage, customMappingPath) => BootstrapService.run({ evaPackage, customMappingPath }));
};
