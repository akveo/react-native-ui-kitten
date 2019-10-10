import * as fs from 'fs';
import * as path from 'path';
import {
  src,
  task,
  dest,
} from 'gulp';
import {
  createDocThemes,
  DocThemes,
} from './create-doc-themes';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;
const glob = require('glob');
import { generateDocsNavigation } from './navigation';

interface ExampleCode {
  name: string;
  code: string;
  path: string;
}

const SHOWCASE_KEY_WORD: string = 'Showcase';

task('generate-doc-json', generateDocJson);
task('process-type-doc', ['generate-doc-json'], processTypeDoc);
task('docs', ['generate-doc-json', 'process-type-doc']);

task('get-examples-code', getExamplesCode);

task('build-live-examples-app', buildLiveExamplesApplication);

task('copy-live-examples-app', ['build-live-examples-app'], copyLiveExamplesAppToDocsAppAssets);

task('revert-navigation', ['copy-live-examples-app'], revertNavigationChanges);

task('docs', [
  'generate-doc-json',
  'process-type-doc',
  'get-examples-code',
  'build-live-examples-app',
  'copy-live-examples-app',
  'revert-navigation',
]);

task('generate-navigation', generateDocsNavigation);

function generateDocJson() {
  return src(['src/framework/**/*.tsx', '!src/framework/**/*.spec.tsx'])
    .pipe(typedoc({
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      ignoreCompilerErrors: true,
      moduleResolution: 'node',
      jsx: 'react',
      target: 'ES6',
      module: 'commonjs',
      baseUrl: './',
      paths: {
        '@kitten/*': ['./src/framework/*'],
      },
      excludeExternals: true,
      exclude: './node_modules/**/*',
      json: './docs/docs.json',
    }));
}

function processTypeDoc(): void {
  const outputFilePath: string = path.resolve(process.cwd(), 'docs/src/input.json');
  exec(`prsr -g typedoc -f react -i ./docs/docs.json -o ${outputFilePath}`);

  const typedocOutput = require(outputFilePath);
  const themes: DocThemes = createDocThemes('light', 'dark');

  const output: string = JSON.stringify({ ...typedocOutput, themes }, null, 2);

  return fs.writeFileSync(outputFilePath, output);
}

function getExamplesCode() {
  glob('src/playground/src/ui/screen/showcases/**/*.tsx', (error, filePaths) => {
    if (!error) {
      const examples: ExampleCode[] = filePaths.map((pathItem: string) => {
        const code: string = fs.readFileSync(pathItem, 'utf8');
        const name: string = code
          .split(' ')
          .filter((item: string) => item.includes(SHOWCASE_KEY_WORD))[0]
          .replace(SHOWCASE_KEY_WORD, '');

        return { code, path: pathItem, name };
      });

      fs.writeFileSync('./docs/src/examples.json', JSON.stringify(examples, null, 2));
    }
  });
}

function buildLiveExamplesApplication() {
  return exec('npm run docs:examples:build');
}

function copyLiveExamplesAppToDocsAppAssets() {
  return src(['src/playground/web-build/**/*'])
    .pipe(dest('docs/src/assets/examples-build'));
}

function revertNavigationChanges() {
  exec('git checkout @ -- src/playground/src/navigation/navigation.component.tsx');
  exec('git checkout @ -- src/playground/src/ui/screen/index.ts');
  fs.unlink('src/playground/src/ui/screen/showcases/index.ts', () => {});
}
