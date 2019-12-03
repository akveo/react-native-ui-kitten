import * as gulp from 'gulp';
import { execSync } from 'child_process';
import {
  DOCS_DIR,
  GulpCompletionCallback,
} from './common';

gulp.task('publish-docs', gulp.series(
  rebuild,
  addLanding,
  copyOldVersion,
  publish,
));

function rebuild(done: GulpCompletionCallback): void {
  execSync('npm run clean', { cwd: DOCS_DIR });
  execSync('npm run build:prod', { cwd: DOCS_DIR });
  done();
}

function addLanding(done: GulpCompletionCallback): void {
  execSync('npm run landing', { cwd: DOCS_DIR });
  done();
}

function copyOldVersion(done: GulpCompletionCallback): void {
  gulp.src(['docs/3.1.4/**/*'])
      .pipe(gulp.dest('docs/dist/docs/3.1.4'));

  done();
}

function publish(done: GulpCompletionCallback): void {
  execSync('npm run gh-pages', { cwd: DOCS_DIR });
  done();
}
