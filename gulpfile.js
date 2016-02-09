
"use strict";
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('run-tests', function() {
  return gulp.src(['./test/testAuthTokenBased.js'], { read: false })
    .pipe(mocha());
});

gulp.task('watch-test', function() {
  gulp.watch(['./lib/*.js','./lib/**/*.js', './test/testAuthTokenBased.js'], ['run-tests', 'lint']);
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js','./lib/**/*.js','./test/testAuthTokenBased.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['run-tests']);
gulp.task('test', ['run-tests', 'watch-test', 'lint']);
