"use strict";

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

/* Generate optimized images.
   Source: https://github.com/sindresorhus/gulp-imagemin */
gulp.task('images', () => {
  return gulp.src('./app/images/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true, optimizationLevel: 2}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5})
  ]))
  .pipe(gulp.dest('dist/images/'));
});

// Default
gulp.task('default', [
  'images'
]);
