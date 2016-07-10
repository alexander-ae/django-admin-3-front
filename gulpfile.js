'use strict';

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  connect = require('gulp-connect'),
  plumber = require('gulp-plumber'),
  historyApiFallback = require('connect-history-api-fallback')


// Rutas de las carpetas
const path = {
  pug: "src/templates/pug/**/*.pug",
  html: 'src/templates/html',
  stylus_blocks: 'src/static/stylus/**/*.styl',
  stylus: 'src/static/stylus/*.styl',
  css: 'src/static/css',
}

// Compilando pug a html

gulp.task('pug', () => {

  return gulp.src(path.pug)
    .pipe(plumber())
    .pipe(pug({
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


gulp.task('stylus_blocks', () => {
  return gulp.src(path.stylus_blocks)
    .pipe(plumber())
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest(path.css))
    .pipe(connect.reload())
});



// funcion donde observara gulp
gulp.task('watch', () => {
  gulp.watch(path.pug, ['pug'])
  gulp.watch(path.stylus, ['stylus'])
  gulp.watch(path.stylus, ['stylus_blocks'])

});

// Creando servidor con livereload
gulp.task('connect', () => {
  connect.server({
    root: 'src/',
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
gulp.task('default', ['pug', 'watch', 'connect', 'stylus', 'stylus_blocks']);
