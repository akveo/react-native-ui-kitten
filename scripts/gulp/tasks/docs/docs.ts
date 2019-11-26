import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as gulp from 'gulp';
import {
  createDocThemes,
  DocThemes,
} from './create-doc-themes';
import { createDocAppNavigation } from './create-doc-app-navigation';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;
const glob = require('glob');

interface ExampleCode {
  name: string;
  code: string;
  path: string;
}

const CURRENT_DIR: string = path.resolve(__dirname);
const DOCS_DIR: string = path.resolve(CURRENT_DIR, '../../../../docs');
const PLAYGROUND_DIR: string = path.resolve(CURRENT_DIR, '../../../../src/playground');

const SHOWCASE_DIR: string = path.resolve(PLAYGROUND_DIR, 'src/components/showcases');
const SHOWCASE_KEY_WORD: string = 'Showcase';

gulp.task('create-docs-json', createDocsJson);
gulp.task('create-docs-input-json', ['create-docs-json'], createDocsInputJson);
gulp.task('create-doc-app-navigation', createDocAppNavigationFile);
gulp.task('create-playground-json', ['create-doc-app-navigation'], createPlaygroundJson);
gulp.task('build-playground', buildPlayground);
gulp.task('copy-playground-to-docs', ['build-playground'], copyPlaygroundBuildToDocs);
gulp.task('clean-up', ['copy-playground-to-docs'], cleanUp);

gulp.task('docs', [
  'create-docs-input-json',
  'create-playground-json',
  'copy-playground-to-docs',
  'clean-up',
]);

function createDocsJson(): void {
  return gulp.src(['src/framework/**/*.tsx', '!src/framework/**/*.spec.tsx'])
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

function createDocsInputJson(): void {
  const outputFilePath: string = path.resolve(process.cwd(), 'docs/src/input.json');
  exec(`prsr -g typedoc -f react -i ./docs/docs.json -o ${outputFilePath}`);

  const typedocOutput = require(outputFilePath);
  const themes: DocThemes = createDocThemes('light', 'dark');

  const output: string = JSON.stringify({ ...typedocOutput, themes }, null, 2);

  return fs.writeFileSync(outputFilePath, output);
}

function createPlaygroundJson() {
  glob('src/playground/src/components/showcases/**/*.tsx', (error, filePaths) => {
    if (!error) {
      const examples: ExampleCode[] = filePaths.map((pathItem: string) => {
        const code: string = fs.readFileSync(pathItem, 'utf8');
        const name: string = code.split(' ')
          .filter((item: string) => item.includes(SHOWCASE_KEY_WORD))[0]
          .replace(SHOWCASE_KEY_WORD, '');

        return { code, path: pathItem, name };
      });

      fs.writeFileSync(`${DOCS_DIR}/src/playground.json`, JSON.stringify(examples, null, 2));
    }
  });
}

function buildPlayground(): void {
  return exec('npm run docs:build:playground');
}

function copyPlaygroundBuildToDocs() {
  return gulp.src(['src/playground/web-build/**/*'])
    .pipe(gulp.dest('docs/src/assets/playground-build'));
}

function createDocAppNavigationFile(): void {
  const navigationOutput: string = createDocAppNavigation(SHOWCASE_DIR);
  return fs.writeFileSync(path.resolve(PLAYGROUND_DIR, 'src/navigation/app.navigator.web.tsx'), navigationOutput);
}

function cleanUp(): void {
  rimraf.sync(path.resolve(PLAYGROUND_DIR, 'src/navigation/app.navigator.web.tsx'));
  rimraf.sync(path.resolve(PLAYGROUND_DIR, 'web-build'));
}
