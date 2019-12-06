var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: '../gulp-config',
    },
    notify: false,
  });

  browserSync.watch('../gulp-config').on('change', browserSync.reload);

  done();
});

gulp.task('css', function(done) {
  gulp
    .src('*.css')
    .pipe(gulp.dest('styles'))
    .pipe(browserSync.reload({stream: true}));

  done();
});

gulp.task(
  'watch',
  gulp.series('css', 'browser-sync', function(done) {
    gulp.watch('*.*', gulp.series('css'));
    done();
  })
);
