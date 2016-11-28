'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  RSBundler = require('@redsift/redsift-bundler');

var bundleConfig = require('./bundle.config.js');

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, bundleConfig);
}

gulp.task('bundle-js', RSBundler.loadTask(gulp, 'bundle-js', bundleConfig));
gulp.task('bundle-css', RSBundler.loadTask(gulp, 'bundle-css', bundleConfig));

gulp.task('css-watch', ['bundle-css'], function() {
  browserSync.reload('*.css');
});

gulp.task('js-watch', ['bundle-js'], function() {
  browserSync.reload('*.js');
});

gulp.task('serve', ['browser-sync'], function() {
  gulp.watch(['./src/**/*.{import.styl,styl,css}', './bundle.config.js'], ['css-watch']);
  gulp.watch(['./src/**/*.{js,tmpl}', './bundles/**/*.{js,tmpl}', './bundle.config.js'], ['js-watch']);
  gulp.watch('./samples/**/*.html').on('change', function() {
    browserSync.reload('*.html');
  });
});

gulp.task('build', ['bundle-js', 'bundle-css']);

gulp.task('clean', function() {
  return del(['dist/**']);
});

gulp.task('default', ['build', 'serve']);

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: ['./samples', './dist'],
      directory: true
    }
  });
});
