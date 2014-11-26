var gulp = require('gulp');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');

gulp.task('compass', function() {
  gulp.src('./public/scss/*.scss')
    .pipe(compass({
      config_file: './config/config.rb',
      css: './public/css',
      sass: './public/scss'
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', ['compass'], function(cb) {
  gulp.watch('./public/scss/*.scss', ['compass']);
});

gulp.task('default', function() {
  nodemon({ script: './bin/www', ext: 'html js scss ejs' })
    .on('change', ['compass'])
    .on('restart', function () {
      console.log('restarted!')
    });
});