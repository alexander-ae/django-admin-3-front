'use strict';

const gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	historyApiFallback = require('connect-history-api-fallback')


// Rutas de las carpetas
const path = {
	jade: "src/templates/jade/**/*.jade",
	html: 'src/templates/html'

}

// Compilando Jade

gulp.task('jade', () => {

  return gulp.src(path.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
      }))
    .pipe(gulp.dest(path.html))
    .pipe(connect.reload());


});

// funcion donde observara gulp
gulp.task('watch', () => {
	gulp.watch(path.jade, ['jade'])
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
gulp.task('default', ['jade', 'watch', 'connect']);
