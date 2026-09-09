import Fs from 'fs';
import Path from 'path';
import LogService from './log.service';

/**
 * Since metro.config.js should be stored at the project root. E.g:
 * - /
 * - /metro.config.js
 * - /package.json
 *
 * Metro (and every CLI that loads metro.config.js) runs from the project root, so the working
 * directory is the project root. Deriving it from the module's own location instead would depend
 * on how deep inside node_modules this file was published, and `__dirname` does not exist at all
 * once the package is emitted as ESM.
 */
const PROJECT_PATH: string = Path.resolve(process.cwd());

// eslint-disable-next-line no-restricted-syntax
export default class ProjectService {

  static resolvePath = (path: string): string => {
    if (!path) {
      return './';
    }

    return Path.resolve(PROJECT_PATH, path);
  };

  static requireModule = <T = Record<string, unknown>>(path: string): T | null => {
    const modulePath: string = ProjectService.resolvePath(path);

    try {
      return require(modulePath);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND' && ~error.message.indexOf(modulePath)) {
        return null;
      } else {
        LogService.warn(error);
      }
    }
  };

  static requireActualModule = (relativePath: string): string | null => {
    const modulePath: string = ProjectService.resolvePath(relativePath);

    // Check if file exists directly (for non-JS files like JSON cache files)
    if (Fs.existsSync(modulePath)) {
      return Fs.readFileSync(modulePath, { encoding: 'utf8' });
    }

    // Fall back to module resolution for JS files
    if (!ProjectService.hasModule(relativePath)) {
      return null;
    }

    return Fs.readFileSync(modulePath, { encoding: 'utf8' });
  };

  static hasModule = (path: string): boolean => {
    return ProjectService.requireModule(path) !== null;
  };
}
