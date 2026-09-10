import Fs from 'fs';
import * as MetroConfig from '../index';
import BootstrapService from '../services/bootstrap.service';
import { EvaConfig } from '../services/eva-config.service';
import {
  ConsoleSpies,
  createTempProject,
  readCustomMappingFixture,
  spyOnConsole,
  TempProject,
} from './helpers/temp-project';

const evaConfig: EvaConfig = {
  evaPackage: '@ui-kitten/eva',
};

const INITIALIZE_STARTED = { type: 'initialize_started' };

describe('@metro-config: create', () => {

  let project: TempProject;
  let consoleSpies: ConsoleSpies;
  let watchFileSpy: jest.SpyInstance;

  beforeEach(() => {
    project = createTempProject();
    consoleSpies = spyOnConsole();
    watchFileSpy = jest.spyOn(Fs, 'watchFile').mockImplementation(() => undefined as never);
  });

  afterEach(() => {
    project.cleanup();
    jest.restoreAllMocks();
  });

  it('should configure metro bundler with default values', () => {
    const { reporter, ...restConfig } = MetroConfig.create(evaConfig);

    expect(reporter).toBeTruthy();
    expect(restConfig).toBeTruthy();
  });

  it('should configure metro bundler with extended configuration', () => {
    const metroConfig = {
      watchFolders: [
        './path-to/test-dir',
      ],
    };

    const { reporter, watchFolders, ...restConfig } = MetroConfig.create(evaConfig, metroConfig);

    expect(reporter).toBeTruthy();
    expect(watchFolders[0]).toEqual(metroConfig.watchFolders[0]);
    expect(restConfig).toBeTruthy();
  });

  it('should forward metro events to the reporter passed in metro config', () => {
    const update = jest.fn();

    const { reporter } = MetroConfig.create(evaConfig, { reporter: { update } });
    reporter.update({ type: 'bundle_build_started' });

    expect(update).toHaveBeenCalledWith({ type: 'bundle_build_started' });
  });

  describe('eager bootstrap', () => {

    it('should bootstrap when create() is called, without any reporter event', () => {
      MetroConfig.create(evaConfig);

      const evaIndex = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });
      const cache = JSON.parse(Fs.readFileSync(project.cachePath(evaConfig.evaPackage), { encoding: 'utf8' }));

      expect(cache.styles).toBeTruthy();
      expect(evaIndex.split('exports.styles').length - 1).toBe(1);
      expect(consoleSpies.warn).not.toHaveBeenCalled();
    });

    it('should bootstrap again on initialize_started for bare metro', () => {
      const runSpy = jest.spyOn(BootstrapService, 'run');

      const { reporter } = MetroConfig.create(evaConfig);
      expect(runSpy).toHaveBeenCalledTimes(1);

      reporter.update(INITIALIZE_STARTED);
      expect(runSpy).toHaveBeenCalledTimes(2);

      const evaIndex = Fs.readFileSync(project.evaIndexPath(evaConfig.evaPackage), { encoding: 'utf8' });
      expect(evaIndex.split('exports.styles').length - 1).toBe(1);
    });

    it('should still return a config when the eva config is invalid', () => {
      const config = MetroConfig.create({ ...evaConfig, customMappingPath: './does-not-exist.json' });

      expect(config.reporter).toBeTruthy();
      expect(consoleSpies.warnings()).toContain('does-not-exist.json');
    });
  });

  describe('custom mapping watcher', () => {

    it('should not watch anything when no custom mapping is configured', () => {
      const { reporter } = MetroConfig.create(evaConfig);
      expect(watchFileSpy).not.toHaveBeenCalled();

      reporter.update(INITIALIZE_STARTED);
      expect(watchFileSpy).not.toHaveBeenCalled();
    });

    it('should not watch anything when the custom mapping file does not exist', () => {
      const { reporter } = MetroConfig.create({ ...evaConfig, customMappingPath: './does-not-exist.json' });
      expect(watchFileSpy).not.toHaveBeenCalled();

      reporter.update(INITIALIZE_STARTED);
      expect(watchFileSpy).not.toHaveBeenCalled();
    });

    it('should watch the custom mapping from create() alone, without any reporter event', () => {
      const customMappingPath = project.writeFile('custom-mapping.json', readCustomMappingFixture());

      MetroConfig.create({ ...evaConfig, customMappingPath: './custom-mapping.json' });

      expect(watchFileSpy).toHaveBeenCalledTimes(1);
      expect(watchFileSpy.mock.calls[0][0]).toEqual(customMappingPath);
      expect(watchFileSpy.mock.calls[0][1]).toEqual({ interval: 100, persistent: false });
    });

    it('should not register a second watcher when the reporter hook fires afterwards', () => {
      project.writeFile('custom-mapping.json', readCustomMappingFixture());

      const { reporter } = MetroConfig.create({ ...evaConfig, customMappingPath: './custom-mapping.json' });
      reporter.update(INITIALIZE_STARTED);
      reporter.update(INITIALIZE_STARTED);

      expect(watchFileSpy).toHaveBeenCalledTimes(1);
    });

    it('should re-run bootstrap when the watched custom mapping changes', () => {
      project.writeFile('custom-mapping.json', readCustomMappingFixture());
      const runSpy = jest.spyOn(BootstrapService, 'run');

      MetroConfig.create({ ...evaConfig, customMappingPath: './custom-mapping.json' });
      const callsBeforeChange = runSpy.mock.calls.length;

      const listener = watchFileSpy.mock.calls[0][2];
      listener();

      expect(runSpy).toHaveBeenCalledTimes(callsBeforeChange + 1);
    });

    it('should not watch when watch is disabled', () => {
      project.writeFile('custom-mapping.json', readCustomMappingFixture());

      const { reporter } = MetroConfig.create({ ...evaConfig, customMappingPath: './custom-mapping.json', watch: false });
      expect(watchFileSpy).not.toHaveBeenCalled();

      reporter.update(INITIALIZE_STARTED);
      expect(watchFileSpy).not.toHaveBeenCalled();
    });
  });
});
