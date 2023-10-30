import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {deleteAsync as del} from 'del';
const sass = gulpSass(dartSass);

const htmlInclude = () => {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
}

const styles = () => {
    return gulp.src('src/scss/**/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
}

const watch = (cb) => {
    gulp.watch(['src/*.html', 'src/layout/*.html'], htmlInclude)
    gulp.watch('src/scss/**/*.{sass,scss}', styles)
    cb()
}

const images = () => {
    return gulp.src('src/img/**/*.{svg,jpg,png,webp,avif,gif}')
        .pipe(gulp.dest('dist/img'))
}

const clean = () => {
    return del('dist')
}

const dev = gulp.series(
    clean,
    gulp.parallel(styles, htmlInclude, images),
    watch
)

gulp.task('default', dev)