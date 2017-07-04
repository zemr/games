var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('src/scss/styles.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
});

gulp.task('minify-css', function() {
  gulp.src('css/styles.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('main-script', function() {
  gulp.src('src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
  gulp.src('src/js/game-*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('games.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: { baseDir: './' },
    browser: "google-chrome"
  })
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('css/styles.css', ['minify-css']);
  gulp.watch('src/js/main.js', ['main-script']);
  gulp.watch('src/js/game-*.js', ['scripts']);
});

gulp.task('default', ['styles', 'minify-css', 'main-script', 'scripts', 'watch']);
