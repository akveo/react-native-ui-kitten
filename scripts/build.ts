import childProcess from 'child_process';
import * as gulp from 'gulp';
import { GulpCompletionCallback, PACKAGES_DIR, PACKAGES_BUILD_DIR } from './common';

gulp.task('build', gulp.series(
  compileTypescript,
  linkNotCompiledSource,
));

function compileTypescript(done: GulpCompletionCallback): void {
  childProcess.execSync('tsc');
  done();
}

/*
 * Move binaries to folder containing tsc output.
 * Could not be handled by configuring tsconfig.json
 */
function linkNotCompiledSource(done: GulpCompletionCallback): void {
  childProcess.execSync(`cp -r ${PACKAGES_DIR}/metro-config/bin ${PACKAGES_BUILD_DIR}/metro-config`);
  done();
}
