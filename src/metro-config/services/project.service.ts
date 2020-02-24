import Fs from 'fs';
import Path from 'path';
import LogService from './log.service';

/**
 * Since metro.config.js should be stored at the project root. E.g:
 * - /
 * - /metro.config.js
 * - /package.json
 */
const PROJECT_PATH: string = Path.resolve(__dirname, '../../../../');

export default class ProjectService {

  static resolvePath = (path: string): string => {
    if (!path) {
      return './';
    }

    return Path.resolve(PROJECT_PATH, path);
  };

  static requireModule = <T = {}>(path: string): T | null => {
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
    if (!ProjectService.hasModule(relativePath)) {
      return null;
    }

    const modulePath: string = ProjectService.resolvePath(relativePath);
    return Fs.readFileSync(modulePath, { encoding: 'utf8' });
  };

  static hasModule = (path: string): boolean => {
    return ProjectService.requireModule(path) !== null;
  };
}
