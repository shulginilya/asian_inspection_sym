var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js_vendor', function () {
    return gulp.src(['bower_components/jquery/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/hideshowpassword/hideShowPassword.js',
        'bower_components/jquery.inputmask/dist/inputmask/inputmask.js',
        'bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
        'bower_components/jquery.selectBoxIt/src/javascripts/jquery.selectBoxIt.js',
        'bower_components/toastr/toastr.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('js', function () {
    return gulp.src([
        'app/Resources/public/js/**/*.js'])
        .pipe(concat('register.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('css_vendor', function () {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/jquery.selectBoxIt/src/stylesheets/jquery.selectBoxIt.css',
        'bower_components/toastr/toastr.css'])
        .pipe(gulpif(/[.]less/, less()))
        .pipe(concat('vendor.css'))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('css', function () {
    return gulp.src([
        'app/Resources/public/less/**/*.less'])
        .pipe(gulpif(/[.]less/, less()))
        .pipe(concat('register.css'))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('img', function() {
    return gulp.src('app/Resources/public/img/**/*.*')
        .pipe(gulp.dest('web/img'));
});

gulp.task("watch_less", function() {
  return gulp.watch("app/Resources/public/less/**/*.less", function() {
    gulp.src([
        'app/Resources/public/less/**/*.less'])
        .pipe(gulpif(/[.]less/, less()))
        .pipe(concat('register.css'))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
  })
});

gulp.task("watch_js", function() {
  return gulp.watch("app/Resources/public/js/**/*.js", function() {
    gulp.src([
        'app/Resources/public/js/**/*.js'])
        .pipe(concat('register.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
  })
});

gulp.task("watch_img", function() {
  return gulp.watch("app/Resources/public/img/**/*.*", function() {
    gulp.src('app/Resources/public/img/**/*.*')
        .pipe(gulp.dest('web/img'));
  })
});

gulp.task('default', ['js_vendor', 'css_vendor', 'js', 'css', 'img', 'watch_less', 'watch_js', 'watch_img']);
