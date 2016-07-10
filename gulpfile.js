'use strict';

const gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  connect = require('gulp-connect'),
  plumber = require('gulp-plumber'),
  historyApiFallback = require('connect-history-api-fallback')


// Rutas de las carpetas
const path = {
  jade: "src/templates/jade/**/*.jade",
  html: 'src/templates/html',
  stylus_block: 'src/static/stylus/block/*.styl',
  stylus_themes: 'src/static/stylus/themes/*.styl',
  stylus_base: 'src/static/stylus/base/*.styl',
  stylus_pages: 'src/static/stylus/pages/*.styl',
  stylus: 'src/static/stylus/*.styl',
  css: 'src/static/css',
  css_block: 'src/static/css/themes',
  css_block: 'src/static/css/pages',
  css_block: 'src/static/css/base',
}

// Compilando Jade a html

gulp.task('jade', () => {

  return gulp.src(path.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
      }))
    .pipe(gulp.dest(path.html))
    .pipe(connect.reload());


});


// Stylus
gulp.task('stylus', () => {
  return gulp.src(path.stylus)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css))
    .pipe(connect.reload())
});


gulp.task('stylus_block', () => {
  return gulp.src(path.stylus_block)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css_block))
    .pipe(connect.reload())
});


gulp.task('stylus_pages', () => {
  return gulp.src(path.stylus_pages)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css_pages))
    .pipe(connect.reload())
});


gulp.task('stylus_themes', () => {
  return gulp.src(path.stylus_themes)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css_themes))
    .pipe(connect.reload())
});

gulp.task('stylus_base', () => {
  return gulp.src(path.stylus_base)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css_base))
    .pipe(connect.reload())
});


// funcion donde observara gulp
gulp.task('watch', () => {
  gulp.watch(path.jade, ['jade'])
  gulp.watch(path.stylus, ['stylus'])
  gulp.watch(path.stylus, ['stylus_block'])
  gulp.watch(path.stylus, ['stylus_themes'])
  gulp.watch(path.base, ['stylus_base'])
  gulp.watch(path.pages, ['stylus_pages'])
});

// Creando servidor con livereload
gulp.task('connect', () => {
  connect.server({
    root: 'app/',
    hostname: '0.0.0.0',
    livereload: true,
    port: '3000',
    open: true,
    middleware: (connect, opt) => {
      return [ historyApiFallback() ];
    }
  });
});


// Ejecutando gulp

// por Default
gulp.task('default', ['jade', 'watch', 'connect', 'stylus', 'stylus_block', 'stylus_themes', 'stylus_base', 'stylus_pages']);