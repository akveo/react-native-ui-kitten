import Fs from 'fs';
import BootstrapService from '../services/bootstrap.service';
import { EvaConfig } from '../services/eva-config.service';
import {
  ConsoleSpies,
  createTempProject,
  readCustomMappingFixture,
  spyOnConsole,
  TempProject,
} from './helpers/temp-project';

const EXPORT_LINE = 'exports.styles = require(\'../../.cache/ui-kitten/eva-generated.json\').styles';

const countOccurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

describe('@bootstrap-service: instance checks', () => {

  const evaConfig: EvaConfig = {
    evaPackage: '@ui-kitten/eva',
  };

  let project: TempProject;
  let consoleSpies: ConsoleSpies;

  beforeEach(() => {
    project = createTempProject();
    consoleSpies = spyOnConsole();
  });

  afterEach(() => {
    project.cleanup();
    jest.restoreAllMocks();
  });

  it('should bootstrap @ui-kitten/eva package', () => {
    const result = BootstrapService.run(evaConfig);

    const outputString = Fs.readFileSync(project.cachePath(evaConfig.evaPackage)).toString();
    const outputAsObject = JSON.parse(outputString);

    expect(result).toBe(true);
    expect(outputAsObject.checksum).toBeTruthy();
    expect(outputAsObject.styles).toBeTruthy();
    expect(consoleSpies.warn).not.toHaveBeenCalled();
  });

  it('should rebuild the cache when the eva mapping changes', () => {
    BootstrapService.run(evaConfig);
    const before = JSON.parse(Fs.readFileSync(project.cachePath(evaConfig.evaPackage)).toString());

    const mappingPath = `node_modules/${evaConfig.evaPackage}/mapping.json`;
    const mapping = JSON.parse(Fs.readFileSync(`${project.root}/${mappingPath}`).toString());
    mapping.strict['text-font-family'] = 'Serif';
    project.writeFile(mappingPath, JSON.stringify(mapping));

    expect(BootstrapService.bootstrap(evaConfig)).toBe('compiled');
    const after = JSON.parse(Fs.readFileSync(project.cachePath(evaConfig.evaPackage)).toString());
    expect(after.checksum).not.toEqual(before.checksum);
  });

  it('should bootstrap @ui-kitten/eva package with custom styles', () => {
    project.writeFile('custom-mapping.json', readCustomMappingFixture());

    const result = BootstrapService.run({ ...evaConfig, customMappingPath: './custom-mapping.json' });

    const outputString = Fs.readFileSync(project.cachePath(evaConfig.evaPackage)).toString();
    const outputAsObject = JSON.parse(outputString);

    const plainChecksum = ((): string => {
      BootstrapService.run(evaConfig);
      return JSON.parse(Fs.readFileSync(project.cachePath(evaConfig.evaPackage)).toString()).checksum;
    })();

    expect(result).toBe(true);
    expect(outputAsObject.checksum).not.toEqual(plainChecksum);
    expect(outputAsObject.styles.StatusBar).toBeTruthy();
  });

  it('should store cache in node_modules/.cache/ui-kitten directory', () => {
    BootstrapService.run(evaConfig);

    expect(Fs.existsSync(project.cachePath(evaConfig.evaPackage))).toBe(true);
    expect(Fs.existsSync(`${project.root}/node_modules/@ui-kitten/eva/generated.json`)).toBe(false);
  });

  it('should create cache directory if it does not exist', () => {
    expect(Fs.existsSync(`${project.root}/node_modules/.cache/ui-kitten`)).toBe(false);

    BootstrapService.run(evaConfig);

    expect(Fs.existsSync(`${project.root}/node_modules/.cache/ui-kitten`)).toBe(true);
  });

  it('should print success message only when work was done', () => {
    expect(BootstrapService.bootstrap(evaConfig)).toBe('compiled');
    expect(BootstrapService.bootstrap(evaConfig)).toBe('up-to-date');
    expect(BootstrapService.bootstrap(evaConfig)).toBe('up-to-date');

    const output = consoleSpies.log.mock.calls.map((call) => call.join(' ')).join('\n');
    expect(countOccurrences(output, 'Successfully bootstrapped @ui-kitten/eva')).toBe(1);
    expect(consoleSpies.log).toHaveBeenCalledTimes(1);
  });

  it('should report compiled again when the custom mapping changes', () => {
    project.writeFile('custom-mapping.json', readCustomMappingFixture());
    const config = { ...evaConfig, customMappingPath: './custom-mapping.json' };

    expect(BootstrapService.bootstrap(config)).toBe('compiled');
    expect(BootstrapService.bootstrap(config)).toBe('up-to-date');

    project.writeFile('custom-mapping.json', readCustomMappingFixture().replace('dark-content', 'light-content'));
    expect(BootstrapService.bootstrap(config)).toBe('compiled');
  });

  it('should report compiled when only the export line was missing', () => {
    BootstrapService.run(evaConfig);
    project.writeFile('node_modules/@ui-kitten/eva/index.js', 'exports.mapping = require(\'./mapping.json\');\n');

    expect(BootstrapService.bootstrap(evaConfig)).toBe('compiled');
  });

  it('should report failed for invalid configuration', () => {
    expect(BootstrapService.bootstrap({ ...evaConfig, customMappingPath: './does-not-exist.json' })).toBe('failed');
  });

  describe('exports.styles append', () => {

    it('should append exports.styles line ending with a single newline', () => {
      BootstrapService.run(evaConfig);

      const evaIndex = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });

      expect(countOccurrences(evaIndex, 'exports.styles')).toBe(1);
      expect(evaIndex.endsWith(`${EXPORT_LINE}\n`)).toBe(true);
      expect(evaIndex.endsWith('\n\n')).toBe(false);
    });

    it('should be idempotent when run repeatedly', () => {
      BootstrapService.run(evaConfig);
      const afterFirstRun = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });

      BootstrapService.run(evaConfig);
      BootstrapService.run(evaConfig);
      const afterThirdRun = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });

      expect(afterThirdRun).toEqual(afterFirstRun);
      expect(countOccurrences(afterThirdRun, 'exports.styles')).toBe(1);
    });

    it('should not accumulate blank lines from a previously padded index', () => {
      project.cleanup();
      project = createTempProject({
        indexContent: 'exports.mapping = require(\'./mapping.json\');\n\n\n\n\n\n',
      });

      BootstrapService.run(evaConfig);

      const evaIndex = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });

      expect(evaIndex).toEqual(`exports.mapping = require('./mapping.json');\n\n${EXPORT_LINE}\n`);
    });

    it('should recognise the signature appended by earlier versions', () => {
      project.cleanup();
      project = createTempProject({
        indexContent: `exports.mapping = require('./mapping.json');\n\n${EXPORT_LINE}`,
      });

      BootstrapService.run(evaConfig);

      const evaIndex = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });

      expect(countOccurrences(evaIndex, 'exports.styles')).toBe(1);
    });
  });

  describe('invalid configuration', () => {

    it('should return false and warn when custom mapping file is missing', () => {
      const run = (): boolean => BootstrapService.run({ ...evaConfig, customMappingPath: './does-not-exist.json' });

      expect(run).not.toThrow();
      expect(run()).toBe(false);
      expect(consoleSpies.warnings()).toContain('does-not-exist.json');
      expect(consoleSpies.warnings()).toContain('not found');
      expect(Fs.existsSync(project.cachePath(evaConfig.evaPackage))).toBe(false);
    });

    it('should return false and warn when custom mapping is not valid JSON', () => {
      project.writeFile('broken-mapping.json', '{ "components": ');

      const run = (): boolean => BootstrapService.run({ ...evaConfig, customMappingPath: './broken-mapping.json' });

      expect(run).not.toThrow();
      expect(run()).toBe(false);
      expect(consoleSpies.warnings()).toContain('broken-mapping.json');
      expect(consoleSpies.warnings()).toContain('not valid JSON');
      expect(Fs.existsSync(project.cachePath(evaConfig.evaPackage))).toBe(false);
    });

    it('should return false and warn when custom mapping is not a JSON object', () => {
      project.writeFile('array-mapping.json', '[]');

      expect(BootstrapService.run({ ...evaConfig, customMappingPath: './array-mapping.json' })).toBe(false);
      expect(consoleSpies.warnings()).toContain('must contain a JSON object');
    });

    it('should return false and warn when custom mapping path points to a directory', () => {
      project.writeFile('mapping-dir/.keep', '');

      expect(BootstrapService.run({ ...evaConfig, customMappingPath: './mapping-dir' })).toBe(false);
      expect(consoleSpies.warnings()).toContain('not found');
    });

    it('should return false and warn when the eva package is not a known mapping package', () => {
      expect(BootstrapService.run({ evaPackage: '@ui-kitten/nope' as EvaConfig['evaPackage'] })).toBe(false);
      expect(consoleSpies.warnings()).toContain('no Eva package specified');
    });

    it('should return false and warn when the configured eva package is not installed', () => {
      expect(BootstrapService.run({ evaPackage: '@ui-kitten/material' })).toBe(false);
      expect(consoleSpies.warnings()).toContain('@ui-kitten/material');
      expect(consoleSpies.warnings()).toContain('not installed');
    });

    it('should return false and warn when the project has no Eva packages', () => {
      project.cleanup();
      project = createTempProject({ packages: [] });

      expect(BootstrapService.run(evaConfig)).toBe(false);
      expect(consoleSpies.warnings()).toContain('no Eva packages installed');
    });
  });
});
