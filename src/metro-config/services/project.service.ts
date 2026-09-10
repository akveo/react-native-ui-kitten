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
 *
 * The working directory is read on every call rather than captured at load time so that the
 * service follows `process.chdir` (which is how the specs sandbox it in a temporary project).
 */
const getProjectPath = (): string => Path.resolve(process.cwd());

// eslint-disable-next-line no-restricted-syntax
export default class ProjectService {

  /**
   * Resolves a project-relative path against the project root.
   * Returns `null` for an empty path instead of falling back to the project root itself,
   * so callers can never accidentally read, require or watch the whole project directory.
   */
  static resolvePath = (path: string | undefined | null): string | null => {
    if (!path) {
      return null;
    }

    return Path.resolve(getProjectPath(), path);
  };

  static requireModule = <T = Record<string, unknown>>(path: string): T | null => {
    const modulePath: string | null = ProjectService.resolvePath(path);

    if (!modulePath) {
      return null;
    }

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
    const modulePath: string | null = ProjectService.resolvePath(relativePath);

    if (!modulePath) {
      return null;
    }

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

  /**
   * Whether a file or directory exists at the project-relative path.
   *
   * This deliberately does not `require` the module: the eva package index requires the
   * generated cache once it has been bootstrapped, so loading it would report the package as
   * missing whenever `node_modules/.cache` was wiped, which is exactly when a bootstrap is needed.
   */
  static hasModule = (path: string): boolean => {
    const modulePath: string | null = ProjectService.resolvePath(path);

    return !!modulePath && Fs.existsSync(modulePath);
  };
}
