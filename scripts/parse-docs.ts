import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as gulp from 'gulp';
import {
  createDocThemesForPackage,
  DocThemes,
} from './create-doc-themes';
import { createDocAppNavigation } from './create-doc-app-navigation';
import {
  createDocAppShowcases,
  DocShowcase,
} from './create-doc-app-showcases';
import {
  DOCS_DIR,
  GulpCompletionCallback,
  PACKAGES_DIR,
  ROOT_DIR,
} from './common';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;
const glob = require('glob');

const PLAYGROUND_DIR: string = path.resolve(PACKAGES_DIR, 'showcases');
const SHOWCASE_DIR: string = path.resolve(PLAYGROUND_DIR, 'components');
const APP_NAVIGATOR_PATH: string = path.resolve(PLAYGROUND_DIR, 'navigation/app.navigator.web.tsx');
const tsconfig = require(path.resolve(ROOT_DIR, 'tsconfig.json'));

gulp.task('parse-docs', gulp.series(
  createDocsJson,
  createDocsInputJson,
  createDocAppNavigator,
  createDocAppJson,
  rebuildDocApp,
  rebuildShowCases,
  copyDocAppBuildToDocs,
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
               ignoreCompilerErrors: true,
             }));
}

function createDocsInputJson(done: GulpCompletionCallback): void {
  const docsJsonPath: string = path.resolve(process.cwd(), 'docs/docs.json');
  const inputJsonPath: string = path.resolve(process.cwd(), 'docs/src/input.json');
  exec(`prsr -g typedoc -f react -i ${docsJsonPath} -o ${inputJsonPath}`);

  const typedocOutput = require(inputJsonPath);
  const evaThemes: DocThemes = createDocThemesForPackage('eva', 'light', 'dark');
  const evaMaterialThemes: DocThemes = createDocThemesForPackage('material', 'light', 'dark');

  fs.writeFileSync(
    inputJsonPath,
    JSON.stringify({
      ...typedocOutput,
      themes: { ...evaThemes, ...evaMaterialThemes },
    }, null, 2),
  );

  done();
}

function createDocAppJson(done: GulpCompletionCallback): void {
  glob('src/showcases/components/**/*.tsx', (error, showcaseFiles: string[]) => {
    const showcases: DocShowcase[] = createDocAppShowcases(showcaseFiles);
    fs.writeFileSync(`${DOCS_DIR}/src/playground.json`, JSON.stringify(showcases, null, 2));
  });

  done();
}

function rebuildDocApp(done: GulpCompletionCallback): void {
  exec('npm run clean && npm run build', { cwd: PLAYGROUND_DIR });

  done();
}

function rebuildShowCases(done: GulpCompletionCallback): void {
  exec('npm run clean && npm run build', { cwd: SHOWCASE_DIR });
  done();
}

function copyDocAppBuildToDocs(done: GulpCompletionCallback) {
  gulp.src(['src/showcases/web-build/**/*'])
      .pipe(gulp.dest('docs/src/assets/playground-build'));

  done();
}

function createDocAppNavigator(done: GulpCompletionCallback): void {
  const navigationOutput: string = createDocAppNavigation(SHOWCASE_DIR);
  fs.writeFileSync(APP_NAVIGATOR_PATH, navigationOutput);

  done();
}

function cleanUp(done: GulpCompletionCallback): void {
  rimraf.sync(APP_NAVIGATOR_PATH);

  done();
}
