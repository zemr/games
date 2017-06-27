var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('styles', function() {
  gulp.src('src/scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('css'))
});

gulp.task('minify-css', function() {
  gulp.src('css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
});

gulp.task('main-script', function() {
  gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

gulp.task('scripts', function() {
  gulp.src('src/js/game-*.js')
    .pipe(concat('games.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  gulp.watch('src/scss/styles.scss', ['styles']);
  gulp.watch('css/styles.css', ['minify-css']);
  gulp.watch('src/js/main.js', ['main-script']);
  gulp.watch('src/js/game-*.js', ['scripts']);
});

gulp.task('default', ['styles', 'minify-css', 'main-script', 'scripts', 'watch']);
