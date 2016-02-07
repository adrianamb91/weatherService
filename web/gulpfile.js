
var gulp = require('gulp');

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src('js/app/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('docs'));
});

gulp.task('default', ['ngdocs']);