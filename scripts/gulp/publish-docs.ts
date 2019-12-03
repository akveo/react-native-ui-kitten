import * as gulp from 'gulp';
import { GulpCompletionCallback } from './common';

const exec = require('child_process').execSync;
const git = require('gulp-git');
let currentBranchName: string = '';

gulp.task('publish-docs', gulp.series(
  saveCurrentBranchName,
  stashCurrent,
  checkoutOldVersion,
  checkoutBack,
  applyStash,
));

function saveCurrentBranchName(done: GulpCompletionCallback): void {
  git.revParse({args: '--abbrev-ref HEAD'}, (err, branch) => {
    currentBranchName = branch;
  });

  done();
}

function stashCurrent(done: GulpCompletionCallback): void {
  exec('git stash');
  done();
}

function checkoutOldVersion(done: GulpCompletionCallback): void {
  exec('git checkout v3.1.4');
  done();
}

function checkoutBack(done: GulpCompletionCallback): void {
  exec(`git checkout ${currentBranchName}`);
  currentBranchName = '';
  done();
}

function applyStash(done: GulpCompletionCallback): void {
  exec('git stash apply');
  done();
}
