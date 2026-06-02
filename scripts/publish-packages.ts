import * as gulp from 'gulp';
import { execSync } from 'child_process';
import {
  GulpCompletionCallback,
  PACKAGES_BUILD_DIR,
  PACKAGES_DIR,
  ROOT_DIR,
} from './common';

gulp.task('publish-packages', gulp.series(
  validate,
  rebuild,
  publish,
));

function validate(done: GulpCompletionCallback): void {
  execSync('npm run lint', { cwd: ROOT_DIR });
  // execSync('npm run test', { cwd: ROOT_DIR });
  done();
}

function rebuild(done: GulpCompletionCallback): void {
  execSync('npm run clean', { cwd: ROOT_DIR });
  execSync('npm run build', { cwd: ROOT_DIR });
  done();
}

function publish(done: GulpCompletionCallback): void {
  const otpArg = getOtpArg();

  execSync(`npm publish ${PACKAGES_BUILD_DIR}/components${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_BUILD_DIR}/date-fns${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_BUILD_DIR}/eva-icons${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_BUILD_DIR}/metro-config${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_BUILD_DIR}/moment${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_DIR}/template-js${otpArg}`, { cwd: ROOT_DIR });
  execSync(`npm publish ${PACKAGES_DIR}/template-ts${otpArg}`, { cwd: ROOT_DIR });
  done();
}

function getOtpArg(): string {
  const otpIndex = process.argv.findIndex((arg: string) => arg === '--otp');

  if (otpIndex !== -1) {
    const otpValue = process.argv[otpIndex + 1];

    return otpValue ? ` --otp=${otpValue}` : '';
  }

  const otpArg = process.argv.find((arg: string) => arg.startsWith('--otp='));

  return otpArg ? ` ${otpArg}` : '';
}
