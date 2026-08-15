import Fs from 'fs';
import Path from 'path';
import { fileURLToPath } from 'url';
import LogService from './log.service';

/**
 * Since metro.config.js should be stored at the project root. E.g:
 * - /
 * - /metro.config.js
 * - /package.json
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const PROJECT_PATH: string = Path.resolve(__dirname, '../../../../');

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
