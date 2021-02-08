import * as gulp from 'gulp';
import { execSync } from 'child_process';
import {
  DOCS_DIR,
  GulpCompletionCallback,
} from './common';

gulp.task('publish-docs', gulp.series(
  rebuild,
  createDocsDirs,
  createDocsSitemap,
  addLanding,
  copyOldVersion,
  copyLatestStableVersion,
  publish,
));

function rebuild(done: GulpCompletionCallback): void {
  execSync('npm run clean', { cwd: DOCS_DIR });
  execSync('npm run build:prod', { cwd: DOCS_DIR });
  done();
}

function createDocsDirs(done: GulpCompletionCallback): void {
  execSync('npm run docs:dirs', { cwd: DOCS_DIR });
  done();
}

function createDocsSitemap(done: GulpCompletionCallback): void {
  execSync('npm run docs:sitemap', { cwd: DOCS_DIR });
  done();
}

function addLanding(done: GulpCompletionCallback): void {
  execSync('npm run landing', { cwd: DOCS_DIR });
  done();
}

function copyOldVersion(done: GulpCompletionCallback) {
  return gulp.src(['docs/3.x/**/*'])
      .pipe(gulp.dest('docs/dist/docs/3.x'));
}

function copyLatestStableVersion(done: GulpCompletionCallback) {
  return gulp.src(['docs/4.x/**/*'])
             .pipe(gulp.dest('docs/dist/docs/4.x'));
}

function publish(done: GulpCompletionCallback): void {
  execSync('npm run gh-pages', { cwd: DOCS_DIR });
  done();
}
