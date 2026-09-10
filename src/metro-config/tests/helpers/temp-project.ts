import Fs from 'fs';
import Os from 'os';
import Path from 'path';
import { rimrafSync } from 'rimraf';

/**
 * A throwaway project directory with fake `node_modules/@ui-kitten/*` mapping packages,
 * used to exercise the bootstrap flow without touching the real `node_modules`.
 *
 * The real `mapping.json` of each package is copied in, so the schema processor runs
 * against the same input it sees in a consumer project.
 */
export interface TempProject {
  root: string;
  evaIndexPath: (evaPackage: string) => string;
  cachePath: (evaPackage: string) => string;
  writeFile: (relativePath: string, content: string) => string;
  cleanup: () => void;
}

interface TempProjectOptions {
  /**
   * Mapping packages to install. Defaults to `@ui-kitten/eva`.
   */
  packages?: string[];
  /**
   * Initial content of each package's `index.js`.
   */
  indexContent?: string;
}

const DEFAULT_INDEX_CONTENT = [
  '"use strict";',
  'Object.defineProperty(exports, "__esModule", { value: true });',
  '',
  'exports.mapping = require(\'./mapping.json\');',
  '//# sourceMappingURL=index.js.map',
  '',
].join('\n');

const MONOREPO_SRC_DIR: string = Path.resolve(__dirname, '../../..');

export const createTempProject = (options: TempProjectOptions = {}): TempProject => {
  const packages: string[] = options.packages ?? ['@ui-kitten/eva'];
  const indexContent: string = options.indexContent ?? DEFAULT_INDEX_CONTENT;

  const root: string = Fs.realpathSync(Fs.mkdtempSync(Path.join(Os.tmpdir(), 'ui-kitten-metro-config-')));
  const previousCwd: string = process.cwd();

  packages.forEach((packageName: string): void => {
    const packageDir: string = Path.join(root, 'node_modules', packageName);
    const sourceDir: string = Path.join(MONOREPO_SRC_DIR, packageName.replace('@ui-kitten/', ''));

    Fs.mkdirSync(packageDir, { recursive: true });
    Fs.writeFileSync(Path.join(packageDir, 'package.json'), JSON.stringify({ name: packageName, main: 'index.js' }));
    Fs.writeFileSync(Path.join(packageDir, 'index.js'), indexContent);
    Fs.copyFileSync(Path.join(sourceDir, 'mapping.json'), Path.join(packageDir, 'mapping.json'));
  });

  process.chdir(root);

  return {
    root,
    evaIndexPath: (evaPackage: string): string => Path.join(root, 'node_modules', evaPackage, 'index.js'),
    cachePath: (evaPackage: string): string => {
      const packageName: string = evaPackage.replace('@ui-kitten/', '');
      return Path.join(root, 'node_modules/.cache/ui-kitten', `${packageName}-generated.json`);
    },
    writeFile: (relativePath: string, content: string): string => {
      const absolutePath: string = Path.join(root, relativePath);
      Fs.mkdirSync(Path.dirname(absolutePath), { recursive: true });
      Fs.writeFileSync(absolutePath, content);
      return absolutePath;
    },
    cleanup: (): void => {
      process.chdir(previousCwd);
      rimrafSync(root);
    },
  };
};

export const readCustomMappingFixture = (): string => {
  return Fs.readFileSync(Path.resolve(__dirname, '../custom-mapping.json'), { encoding: 'utf8' });
};

/**
 * Silences and captures `LogService` output for the duration of a test.
 */
export interface ConsoleSpies {
  warn: jest.SpyInstance;
  log: jest.SpyInstance;
  error: jest.SpyInstance;
  warnings: () => string;
}

export const spyOnConsole = (): ConsoleSpies => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  return {
    warn,
    log,
    error,
    warnings: (): string => warn.mock.calls.map((call) => call.join(' ')).join('\n'),
  };
};
