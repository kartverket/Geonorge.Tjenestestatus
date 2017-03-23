'use strict'

var download = require('gulp-download')
var gulp = require('gulp')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var pug = require('gulp-pug')

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

gulp.task('copy-fonts', function () {
  return gulp.src('./Content/bower_components/felleskomponenter/assets/fonts/**/*').pipe(
    gulp.dest('./build/assets/fonts/')
  )
})

gulp.task('copy-images', function () {
  return gulp.src('./Content/bower_components/felleskomponenter/assets/images/**/*').pipe(
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

gulp.task('styles', function () {
  return gulp.src('./src/styles/*.css').pipe(
    gulp.dest('./build/assets/css/')
  )
})

gulp.task('default', ['markup', 'styles'], function () {
  gulp.watch('./src/pug/**/*.pug', ['markup'])
  gulp.watch('./src/styles/**/*.css', ['styles'])
})
