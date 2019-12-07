var gulp = require ('gulp');
var browserSync = require ('browser-sync').create ();
var autoprefixer = require ('gulp-autoprefixer');

gulp.task ('browser-sync', function (done) {
  browserSync.init ({
    server: {
      baseDir: '../gulp-config',
    },
    notify: false,
  });

  browserSync.watch ('../gulp-config').on ('change', browserSync.reload);

  done ();
});

gulp.task ('css', function (done) {
  gulp
    .src ('*.css')
    .pipe (gulp.dest ('styles'))
    .pipe (
      autoprefixer (['last 4 version', '> 5%', 'ie 11'], {
        cascade: true,
      })
    )
    .pipe (browserSync.reload ({stream: true}));
  done ();
});

gulp.task (
  'watch',
  gulp.series ('css', 'browser-sync', function (done) {
    gulp.watch ('*.*', gulp.series ('css'));
    done ();
  })
);
