const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')

function copy() {
  return gulp.src('src/favicon.ico').pipe(gulp.dest('./build'))
}

function css() {
  return gulp
    .src('src/styles.css')
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(gulp.dest('./build'))
}

function html() {
  browserSync.reload()
  return gulp.src('src/index.html').pipe(gulp.dest('./build'))
}

function sync() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    notify: false,
  })
  gulp.watch('src/index.html', html)
}

const build = gulp.series(copy, css, html, sync)

exports.default = build
