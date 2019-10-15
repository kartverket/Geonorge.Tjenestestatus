'use strict'

var babel = require('gulp-babel')
var concat = require('gulp-concat')
var download = require('gulp-download')
var gulp = require('gulp')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var pug = require('gulp-pug')

var argv = require('yargs')
  .alias('w', 'watch')
  .argv;

gulp.task('download', function () {
  var url = 'https://kartkatalog.geonorge.no/Content/bower_components/kartverket-felleskomponenter/assets/css/styles?v=K9hnWfo6dJ5lmgHWNL-t6KfMyQcr1nm0kQEh8HdDPHI1';
  return download(url).pipe(
    replace('/Content/bower_components/kartverket-felleskomponenter/assets', '..')
  ).pipe(
    rename('main.css')
  ).pipe(
    gulp.dest('./build/assets/css/')
  )
})

gulp.task('copy-stuff', function () {
  return gulp.src('./node_modules/geonorge-base/assets/**/*').pipe(
    gulp.dest('./Content/bower_components/kartverket-felleskomponenter/assets/')
  )
})

gulp.task('copy-fonts', function () {
  return gulp.src('./Content/bower_components/kartverket-felleskomponenter/assets/fonts/**/*').pipe(
    gulp.dest('./build/assets/fonts/')
  )
})

gulp.task('copy-images', function () {
  return gulp.src('./Content/bower_components/kartverket-felleskomponenter/assets/images/**/*').pipe(
    gulp.dest('./build/assets/images/')
  )
})

gulp.task('markup', function () {
  return gulp.src('./src/pug/*.pug').pipe(
    pug({
      locals: {},
      pretty: true
    })
  ).pipe(
    gulp.dest('./build/')
  )
})

gulp.task('react', function () {
  return gulp.src('./src/react/*.jsx').pipe(
    babel({
      presets: ['react']
    })
  ).pipe(
    concat('app.js')
  ).pipe(
    gulp.dest('./build/assets/js/')
  )
})

gulp.task('scripts', function () {
  return gulp.src('./src/scripts/*.js').pipe(
    concat('main.js')
  ).pipe(
    gulp.dest('./build/assets/js/')
  )
})

gulp.task('styles', function () {
  return gulp.src('./src/styles/*.css').pipe(
    gulp.dest('./build/assets/css/')
  )
})

gulp.task('default', ['markup', 'styles', 'scripts', 'react'], function () {
  if (argv.watch) {
    gulp.watch('./src/pug/**/*.pug', ['markup'])
    gulp.watch('./src/react/**/*.jsx', ['react'])
    gulp.watch('./src/scripts/**/*.js', ['scripts'])
    gulp.watch('./src/styles/**/*.css', ['styles'])
  }
})
