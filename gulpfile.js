const gulp = require("gulp")
const browserSync = require("browser-sync").create()
const postcss = require("gulp-postcss")
const purgecss = require("gulp-purgecss")

function copy() {
  return gulp.src("src/favicon.ico").pipe(gulp.dest("./build"))
}

function css() {
  let src = gulp
    .src("src/styles.css")
    .pipe(postcss([require("tailwindcss"), require("autoprefixer")]))
  if (process.env === "production") {
    src = src.pipe(
      purgecss({
        content: ["src/**/*.html"],
      })
    )
  }
  return src.pipe(gulp.dest("./build"))
}

function html() {
  browserSync.reload()
  return gulp.src("src/index.html").pipe(gulp.dest("./build"))
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    notify: false,
  })
  gulp.watch("src/index.html", html)
  gulp.watch(
    ["./tailwind.config.js", "./src/styles.css"],
    gulp.series(css, html)
  )
}

const build = gulp.series(
  ...[copy, css, html, process.env !== "production" && sync].filter(Boolean)
)

exports.default = build
