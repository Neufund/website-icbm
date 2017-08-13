const gulp = require("gulp");
const ejs = require("gulp-ejs");
const del = require("del");
const gutil = require("gulp-util");
const sass = require("gulp-sass");

gulp.task("clean", () => del(["dist"]));

gulp.task("page", () => {
  return gulp
    .src("./page/index.ejs")
    .pipe(ejs({ name: "world" }, {}, { ext: ".html" }).on("error", gutil.log))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("sass", () => {
  return gulp
    .src("./page/sass/app.scss")
    .pipe(sass().on("error", gutil.log))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("copy", () => {
  return gulp.src("./page/assets/*").pipe(gulp.dest("./dist/assets/"));
});

gulp.task("copy-fa", () =>
  gulp.src("./node_modules/font-awesome/fonts/*").pipe(gulp.dest("./dist/fonts/"))
);

gulp.task("watch", () => {
  gulp.watch("./page/**/*.ejs", ["page"]);
  gulp.watch("./page/sass/*.scss", ["sass"]);
  gulp.watch("./page/assets/**/*", ["copy"]);
});

gulp.task("build", ["clean"], () => gulp.start(["page", "sass", "copy", "copy-fa"]));
