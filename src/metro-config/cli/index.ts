import Program from 'commander';

function registerCommands(): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./bootstrap').default(Program);
}

registerCommands();

Program.parse(process.argv);
