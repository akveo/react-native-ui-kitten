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
const DOCS_DIR: string = path.resolve(CURRENT_DIR, '../../../docs');
const PLAYGROUND_DIR: string = path.resolve(CURRENT_DIR, '../../../src/playground');

const SHOWCASE_DIR: string = path.resolve(PLAYGROUND_DIR, 'src/components/showcases');
const SHOWCASE_KEY_WORD: string = 'Showcase';

const tsconfig = require(path.resolve(CURRENT_DIR, '../../../tsconfig.json'));

gulp.task('create-docs-json', createDocsJson);
gulp.task('create-docs-input-json', createDocsInputJson);
gulp.task('parse-framework', gulp.series(
  'create-docs-json',
  'create-docs-input-json',
));

gulp.task('create-playground-navigation', createPlaygroundNavigation);
gulp.task('create-playground-json', createPlaygroundJson);
gulp.task('parse-playground', gulp.series(
  'create-playground-navigation',
  'create-playground-json',
));

gulp.task('build-playground', buildPlayground);
gulp.task('copy-playground-to-docs', copyPlaygroundBuildToDocs);
gulp.task('link-playground', gulp.series(
  'build-playground',
  'copy-playground-to-docs',
));

gulp.task('build-docs', gulp.parallel(
  'parse-framework',
  'parse-playground',
  'link-playground',
));

gulp.task('clean-up', cleanUp);

gulp.task('docs', gulp.series(
  'build-docs',
  'clean-up',
));

function createDocsJson(done): void {
  gulp.src(['src/framework/**/*.tsx', '!src/framework/**/*.spec.tsx'])
      .pipe(typedoc({
        ...tsconfig.compilerOptions,
        module: 'commonjs',
        excludeExternals: true,
        exclude: './node_modules/**/*',
        json: './docs/docs.json',
      }));

  done();
}

function createDocsInputJson(done): void {
  const docsJsonPath: string = path.resolve(process.cwd(), 'docs/docs.json');
  const inputJsonPath: string = path.resolve(process.cwd(), 'docs/src/input.json');
  exec(`prsr -g typedoc -f react -i ${docsJsonPath} -o ${inputJsonPath}`);

  const typedocOutput = require(inputJsonPath);
  const themes: DocThemes = createDocThemes('light', 'dark');

  const output: string = JSON.stringify({ ...typedocOutput, themes }, null, 2);

  fs.writeFileSync(inputJsonPath, output);

  done();
}

function createPlaygroundJson(done) {
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

  done();
}

function buildPlayground(done): void {
  exec('yarn playground build:web');

  done();
}

function copyPlaygroundBuildToDocs(done) {
  gulp.src(['src/playground/web-build/**/*'])
      .pipe(gulp.dest('docs/src/assets/playground-build'));

  done();
}

function createPlaygroundNavigation(done): void {
  const navigationOutput: string = createDocAppNavigation(SHOWCASE_DIR);
  fs.writeFileSync(path.resolve(PLAYGROUND_DIR, 'src/navigation/app.navigator.web.tsx'), navigationOutput);

  done();
}

function cleanUp(done): void {
  rimraf.sync(path.resolve(PLAYGROUND_DIR, 'src/navigation/app.navigator.web.tsx'));

  done();
}
