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
  return gulp.src("./page/sass/app.sass").pipe(sass().on("error", sass.logError)).pipe(gulp.dest("./dist/"));
});

gulp.task("watch", ["clean"], () => {
  gulp.start(["page", "sass"]);

  gulp.watch("./page/*", ["page"]);
  gulp.watch("./page/sass/*.sass", ["sass"]);
});
