// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');

// Browser Sync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: '_site'
        },
        port: 3000
    });
    done();
}

// Sass
function css() {
    return gulp 
        .src('./assets/css/main.scss')
        .pipe(sass({outputstyle: 'expanded'}))
        .pipe(gulp.dest('./assets/css'))  
        .pipe(browsersync.stream())      
        .pipe(gulp.dest('./_site/css'))       
}

// Pug task
function pugTask() {
    return gulp
        .src('_pugfiles/templates/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./_site'))
        .pipe(browsersync.stream())
}

// Image Optimization
function imageMin() {
    return gulp
        .src('./assets/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('./_site/img'))
}

// Watch files
function watchFiles() {
    gulp.watch('./assets/css/**/*.scss', css);
    gulp.watch('./_pugfiles/**/*.pug', pugTask);
    gulp.watch('./assets/img/*', imageMin);
}   

// Complex tasks
const build = gulp.series(gulp.parallel(watchFiles, browserSync), css);

// export tasks
exports.css = css;
exports.build = build;