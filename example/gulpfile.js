var gulp = require('gulp');
var watch = require('gulp-watch');

var source = '../src';
var destination = './node_modules/react-native-ui-kitten/src';

gulp.task('watch-lib', function () {
  gulp.src(source + '/**/*', {base: source})
    .pipe(watch(source, {base: source}))
    .pipe(gulp.dest(destination));
});

