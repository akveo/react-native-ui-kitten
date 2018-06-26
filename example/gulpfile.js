const gulp = require('gulp');
const watch = require('gulp-watch');

const source = {
  lib: '../src',
  index: '../index.js',
};
const destination = {
  lib: './node_modules/react-native-ui-kitten/src',
  index: './node_modules/react-native-ui-kitten/index.js',
};

gulp.task('watch-lib', () => {
  gulp.src(`${source.lib}/**/*`, { base: source.lib })
    .pipe(watch(source.lib, { base: source.lib }))
    .pipe(gulp.dest(destination.lib));

  gulp.src(source.index, { base: source.index })
    .pipe(watch(source.index, { base: source.index }))
    .pipe(gulp.dest(destination.index));
});

