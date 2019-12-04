import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as gulp from 'gulp';
import {
  createDocThemes,
  DocThemes,
} from './create-doc-themes';
import { createDocAppNavigation } from './create-doc-app-navigation';
import {
  createDocAppShowcases,
  DocShowcase,
} from './create-doc-app-showcases';
import {
  GulpCompletionCallback,
  DOCS_DIR,
  PACKAGES_DIR,
  ROOT_DIR,
} from './common';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;
const glob = require('glob');

const PLAYGROUND_DIR: string = path.resolve(PACKAGES_DIR, 'playground');
const SHOWCASE_DIR: string = path.resolve(PLAYGROUND_DIR, 'src/components/showcases');
const APP_NAVIGATOR_PATH: string = path.resolve(PLAYGROUND_DIR, 'src/navigation/app.navigator.web.tsx');
const tsconfig = require(path.resolve(ROOT_DIR, 'tsconfig.json'));

gulp.task('parse-docs', gulp.series(
  createDocsJson,
  createDocsInputJson,
  createPlaygroundNavigation,
  createPlaygroundJson,
  buildPlayground,
  copyPlaygroundBuildToDocs,
  cleanUp,
));

function createDocsJson(): NodeJS.Process {
  return gulp.src(['src/components/**/*.tsx', '!src/components/**/*.spec.tsx'])
             .pipe(typedoc({
               ...tsconfig.compilerOptions,
               module: 'commonjs',
               excludeExternals: true,
               exclude: './node_modules/**/*',
               json: './docs/docs.json',
             }));
}

function createDocsInputJson(done: GulpCompletionCallback): void {
  const docsJsonPath: string = path.resolve(process.cwd(), 'docs/docs.json');
  const inputJsonPath: string = path.resolve(process.cwd(), 'docs/src/input.json');
  exec(`prsr -g typedoc -f react -i ${docsJsonPath} -o ${inputJsonPath}`);

  const typedocOutput = require(inputJsonPath);
  const themes: DocThemes = createDocThemes('light', 'dark');

  fs.writeFileSync(inputJsonPath, JSON.stringify({ ...typedocOutput, themes }, null, 2));

  done();
}

function createPlaygroundJson(done: GulpCompletionCallback): void {
  glob('src/playground/src/components/showcases/**/*.tsx', (error, showcaseFiles: string[]) => {
    const showcases: DocShowcase[] = createDocAppShowcases(showcaseFiles);
    fs.writeFileSync(`${DOCS_DIR}/src/playground.json`, JSON.stringify(showcases, null, 2));
  });

  done();
}

function buildPlayground(done: GulpCompletionCallback): void {
  exec('npm run build:web', { cwd: PLAYGROUND_DIR });

  done();
}

function copyPlaygroundBuildToDocs(done: GulpCompletionCallback) {
  gulp.src(['src/playground/web-build/**/*'])
      .pipe(gulp.dest('docs/src/assets/playground-build'));

  done();
}

function createPlaygroundNavigation(done: GulpCompletionCallback): void {
  const navigationOutput: string = createDocAppNavigation(SHOWCASE_DIR);
  fs.writeFileSync(APP_NAVIGATOR_PATH, navigationOutput);

  done();
}

function cleanUp(done: GulpCompletionCallback): void {
  rimraf.sync(APP_NAVIGATOR_PATH);

  done();
}
