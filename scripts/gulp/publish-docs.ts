import * as gulp from 'gulp';
import {
  GulpCompletionCallback,
  DOCS_DIR,
} from './common';

const exec = require('child_process').execSync;

gulp.task('publish-docs', gulp.series(
  cleanDist,
  buildDocs,
  addLanding,
  copyOldVersion,
  publish,
));

function cleanDist(done: GulpCompletionCallback): void {
  exec('npm run clean', { cwd: DOCS_DIR });
  done();
}

function buildDocs(done: GulpCompletionCallback): void {
  exec('npm run build:prod', { cwd: DOCS_DIR });
  done();
}

function addLanding(done: GulpCompletionCallback): void {
  exec('npm run landing', { cwd: DOCS_DIR });
  done();
}

function copyOldVersion(done: GulpCompletionCallback): void {
  gulp.src(['docs/3.1.4/**/*'])
    .pipe(gulp.dest('docs/dist/docs/3.1.4'));

  done();
}

function publish(done: GulpCompletionCallback): void {
  exec('npm run gh-pages', { cwd: DOCS_DIR });
  done();
}
