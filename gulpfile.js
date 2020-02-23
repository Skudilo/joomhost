const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();

function clear() {
  return del("build/*");
}

function styles() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["> 0.1%"],
        cascade: false
      })
    )
		.pipe(gulp.dest("./build/css"))
		.pipe(browserSync.stream())
}

function img() {
  return gulp.src("./src/img/**/*").pipe(gulp.dest("./build/img"));
}

function html() {
  return gulp.src("./*.html").pipe(gulp.dest("./build"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  });

  gulp.watch("./src/css/**/*.css", styles);
}

let build = gulp.series(clear, gulp.parallel(styles, img, html));

gulp.task("build", build);
gulp.task("watch", gulp.series(build, watch));
