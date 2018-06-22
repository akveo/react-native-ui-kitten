const gulp = require('gulp');
const watch = require('gulp-watch');

const source = '..';
const destination = './node_modules/react-native-ui-kitten';

gulp.task('watch-lib', () => {
  gulp.src(`${source}/src/**/*`, { base: `${source}/src` })
    .pipe(watch(`${source}/src`, { base: `${source}/src` }))
    .pipe(gulp.dest(`${destination}/src`));

  gulp.src(`${source}/index.js`, { base: `${source}/index.js` })
    .pipe(watch(source, { base: `${source}/index.js` }))
    .pipe(gulp.dest(`${destination}/index.js`));
});

