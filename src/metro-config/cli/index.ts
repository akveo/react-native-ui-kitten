import Program from 'commander';

function registerCommands(): void {
  require('./bootstrap').default(Program);
}

registerCommands();

Program.parse(process.argv);
