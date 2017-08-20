const gulp = require("gulp");
const ejs = require("gulp-ejs");
const del = require("del");
const gutil = require("gulp-util");
const sass = require("gulp-sass");
const yaml = require("yaml-js");
const fs   = require('fs');


gulp.task("clean", () => del(["dist"]));

gulp.task("page", () => {
  let content = yaml.load(fs.readFileSync('./content.yml', 'utf8'));
  // notice no return here: https://github.com/rogeriopvl/gulp-ejs/issues/86
  gulp.src("./page/index.ejs")
    .pipe(ejs({ content }, {}, { ext: ".html" }).on("error", gutil.log))
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
  gulp.watch(["./page/sass/*.scss", "./common/sass/*.scss"], ["sass"]);
  gulp.watch("./page/assets/**/*", ["copy"]);
  gulp.watch("./content.yml", ["page"]);
});

gulp.task("build", ["clean"], () => gulp.start(["page", "sass", "copy", "copy-fa"]));
