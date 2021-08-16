const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS
function style(){
    // 1. Where is my Sass file
    return gulp.src('./src/scss/**/*.scss')
    // 2. Including SourceMaps
    .pipe(sourcemaps.init())
    // 3. Pass that file through Sass compiler
    .pipe(sass().on('error', sass.logError))
    // 4. Write sourceMaps pipe
    .pipe(sourcemaps.write())
    // 5. Where do I save the compiled Css?
    .pipe(gulp.dest('./dist/assets/css'))
    // 6. Stream changes to all browsers
    .pipe(browserSync.stream())
}

// Purpose is to Watch for changes to compile for us automatically
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./dist/assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
