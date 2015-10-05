import gulp from 'gulp';
import babel from 'gulp-babel';

const JS_SRC = 'src/**/*.js';
const JS_OUT = 'dist';

gulp.task('js', () => gulp.src(JS_SRC)
    .pipe(babel())
    .pipe(gulp.dest(JS_OUT))
);

gulp.task('watch', ['js'], () => gulp.watch(JS_SRC, ['js']));
