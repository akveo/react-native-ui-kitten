import { Command } from 'commander';
import registerBootstrapCommand from '../cli/bootstrap';
import { ConsoleSpies, createTempProject, spyOnConsole, TempProject } from './helpers/temp-project';

const runCli = (...args: string[]): void => {
  const program = new Command();
  registerBootstrapCommand(program);
  program.parse(['node', 'ui-kitten', 'bootstrap', ...args]);
};

describe('@cli: bootstrap command', () => {

  let project: TempProject;
  let consoleSpies: ConsoleSpies;

  beforeEach(() => {
    project = createTempProject();
    consoleSpies = spyOnConsole();
    process.exitCode = undefined;
  });

  afterEach(() => {
    process.exitCode = undefined;
    project.cleanup();
    jest.restoreAllMocks();
  });

  it('should leave the exit code untouched on success and print the success message', () => {
    runCli('@ui-kitten/eva');

    expect(process.exitCode).toBeUndefined();
    expect(consoleSpies.log.mock.calls.join('\n')).toContain('Successfully bootstrapped @ui-kitten/eva');
  });

  it('should set exit code 1 for an unknown eva package', () => {
    runCli('@ui-kitten/nope');

    expect(process.exitCode).toBe(1);
    expect(consoleSpies.warn).toHaveBeenCalled();
  });

  it('should set exit code 1 for a missing custom mapping without throwing', () => {
    expect(() => runCli('@ui-kitten/eva', './does-not-exist.json')).not.toThrow();

    expect(process.exitCode).toBe(1);
    expect(consoleSpies.warnings()).toContain('does-not-exist.json');
    expect(consoleSpies.error).not.toHaveBeenCalled();
  });

  it('should set exit code 1 when the project has no Eva packages', () => {
    project.cleanup();
    project = createTempProject({ packages: [] });

    runCli('@ui-kitten/eva');

    expect(process.exitCode).toBe(1);
  });

  it('should compile a custom mapping passed as the second argument', () => {
    project.writeFile('custom-mapping.json', '{"components":{}}');

    runCli('@ui-kitten/eva', './custom-mapping.json');

    expect(process.exitCode).toBeUndefined();
  });
});
