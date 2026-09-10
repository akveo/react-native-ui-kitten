import Fs from 'fs';
import { deepMerge } from '@ui-kitten/mapping-base';
import BootstrapService from './services/bootstrap.service';
import { EvaConfig } from './services/eva-config.service';
import ProjectService from './services/project.service';

type MetroEvent = {
  type: string;
  [key: string]: unknown;
};

// TS definitions for metro config?
type MetroConfigType = {
  reporter?: {
    update: (event: MetroEvent) => void;
  };
  watchFolders?: Array<string>;
};

const customMappingWatchOptions = {
  /*
   * How often the custom mapping should be polled in milliseconds
   */
  interval: 100,
  /*
   * A long-lived dev server keeps polling, but the watcher must not keep a one-shot process
   * (`expo export`, a script that merely requires metro.config.js, the CLI) alive on its own.
   */
  persistent: false,
};

/*
 * Absolute paths that already have a watcher, so that running `create()` and the reporter hook
 * in the same process (bare Metro does both) registers a single watcher per file.
 */
const watchedCustomMappingPaths: Set<string> = new Set();

/**
 * Re-compiles styles whenever the custom mapping file changes.
 *
 * Only installed when a custom mapping path is configured and the file exists:
 * polling anything else (in particular the project root) would rebuild on unrelated file changes.
 * It is installed from `create()` itself, so it works under any bundler regardless of whether
 * Metro's reporter events are delivered.
 */
const watchCustomMappingIfNeeded = (evaConfig: EvaConfig): void => {
  if (evaConfig.watch === false) {
    return;
  }

  const customMappingPath: string | null = ProjectService.resolvePath(evaConfig.customMappingPath);

  if (!customMappingPath || !Fs.existsSync(customMappingPath) || !Fs.statSync(customMappingPath).isFile()) {
    return;
  }

  if (watchedCustomMappingPaths.has(customMappingPath)) {
    return;
  }

  watchedCustomMappingPaths.add(customMappingPath);
  Fs.watchFile(customMappingPath, customMappingWatchOptions, () => {
    BootstrapService.run(evaConfig);
  });
};

/**
 * Creates custom Metro config for bootstrapping Eva packages.
 *
 * @param {EvaConfig} evaConfig - configuration of Eva Design System used in project.
 * @see {EvaConfig}
 *
 * @param metroConfig - configuration of Metro Bundler used in project.
 * @link https://facebook.github.io/metro/docs/configuration
 *
 * @returns a combination of two metro configurations.
 *
 * @example Usage
 *
 * ```metro.config.js
 * const MetroConfig = require('@ui-kitten/metro-config');
 *
 * const evaConfig = {
 *   evaPackage: '@ui-kitten/eva',              // Required.
 *   customMappingPath: './custom-mapping.json', // Optional.
 * };
 *
 * module.exports = MetroConfig.create(evaConfig, {
 *   // Whatever was previously specified
 * });
 * ```
 */
export const create = (evaConfig: EvaConfig, metroConfig?: MetroConfigType): MetroConfigType => {

  /*
   * Compile eagerly, at the moment metro.config.js is loaded.
   *
   * Metro's `initialize_started` event is only delivered when Metro keeps the reporter we merge in
   * below. Tools that replace the reporter with their own (Expo CLI does) would otherwise never
   * bootstrap, so `create()` does not depend on the event at all. `BootstrapService.run` is
   * idempotent, so running it again from the reporter hook for bare Metro is harmless.
   */
  BootstrapService.run(evaConfig);
  watchCustomMappingIfNeeded(evaConfig);

  const handleMetroEvent = (event: MetroEvent): void => {
    const reporter = metroConfig?.reporter;

    if (reporter?.update) {
      reporter.update(event);
    }

    if (event.type === 'initialize_started') {
      BootstrapService.run(evaConfig);
      watchCustomMappingIfNeeded(evaConfig);
    }
  };

  const libConfig: MetroConfigType = {
    reporter: {
      update: handleMetroEvent,
    },
  };

  return deepMerge(metroConfig || {}, libConfig);
};
