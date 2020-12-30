'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var replace = require('gulp-replace');
var injectPartials = require('gulp-inject-partials');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var merge = require('merge-stream');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;


gulp.task('sass', function () {
    return gulp.src('./scss/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        port: 3000,
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

}));



// Static Server without watching scss files
gulp.task('serve:lite', function() {

    browserSync.init({
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});



gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss');
});


/* inject partials like sidebar and navbar */
gulp.task('injectPartial', function () {
  return gulp.src("./**/*.html", { base: "./" })
    .pipe(injectPartials())
    .pipe(gulp.dest("."));
});


/* inject Js and CCS assets into HTML */
gulp.task('injectCommonAssets', function () {
  return gulp.src('./**/*.html')
    .pipe(inject(gulp.src([ 
        './vendors/iconfonts/mdi/font/css/materialdesignicons.min.css',
        './vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
        './vendors/iconfonts/puse-icons-feather/feather.css',
        './vendors/css/vendor.bundle.base.css', 
        './vendors/css/vendor.bundle.addons.css',
        './vendors/js/vendor.bundle.base.js',
        './vendors/js/vendor.bundle.addons.js'
    ], {read: false}), {name: 'plugins', relative: true}))
    .pipe(inject(gulp.src([
        './css/*.css', 
        './js/off-canvas.js', 
        './js/hoverable-collapse.js', 
        './js/template.js', 
        './js/settings.js', 
        './js/todolist.js'
    ], {read: false}), {relative: true}))
    .pipe(gulp.dest('.'));
});

/* inject Js and CCS assets into HTML */
gulp.task('injectLayoutStyles', function () {
    var verticalLightStream = gulp.src(['./**/vertical-default-light/**/*.html',
            './**/vertical-boxed/**/*.html',
            './**/vertical-compact/**/*.html',
            './**/vertical-dark-sidebar/**/*.html',
            './**/vertical-fixed/**/*.html',
            './**/vertical-hidden-toggle/**/*.html',
            './**/vertical-icon-menu/**/*.html',
            './**/vertical-toggle-overlay/**/*.html',
            './index.html'])
        .pipe(inject(gulp.src([
            './css/vertical-layout-light/style.css', 
        ], {read: false}), {relative: true}))
        .pipe(gulp.dest('.'));
    return merge(verticalLightStream);
});

/*replace image path and linking after injection*/
gulp.task('replacePath', function(){
    var replacePath1 = gulp.src(['./pages/*/*.html'], { base: "./" })
        .pipe(replace('="images/', '="../../images/'))
        .pipe(replace('href="pages/', 'href="../../pages/'))
        .pipe(replace('href="index.html"', 'href="../../index.html"'))
        .pipe(gulp.dest('.'));
    var replacePath2 = gulp.src(['./pages/*.html'], { base: "./" })
        .pipe(replace('="images/', '="../images/'))
        .pipe(replace('"pages/', '"../pages/'))
        .pipe(replace('href="index.html"', 'href="../index.html"'))
        .pipe(gulp.dest('.'));
    var replacePath3 = gulp.src(['./*/index.html'], { base: "./" })
        .pipe(replace('="images/', '="images/'))
        .pipe(gulp.dest('.'));
    return merge(replacePath1, replacePath2, replacePath3);    
});

/*sequence for injecting partials and replacing paths*/
gulp.task('inject', gulp.series('injectPartial' , 'injectCommonAssets' , 'injectLayoutStyles', 'replacePath'));


gulp.task('clean:vendors', function () {
    return del([
      'vendors/**/*'
    ]);
});

/* Copy whole folder of some specific node modules that are calling other files internally */
gulp.task('copyRecursiveVendorFiles', function() {
    var mdi= gulp.src(['./node_modules/@mdi/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/mdi'));
    var fontawesome = gulp.src(['./node_modules/font-awesome/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/font-awesome'));
    var flagicon = gulp.src(['./node_modules/flag-icon-css/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/flag-icon-css'));
    var themifyicon = gulp.src(['./node_modules/ti-icons/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/ti-icons'));
    var simplelineicon = gulp.src(['./node_modules/simple-line-icons/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/simple-line-icon'));
    var feathericon = gulp.src(['./node_modules/puse-icons-feather/**/*'])
        .pipe(gulp.dest('./vendors/iconfonts/puse-icons-feather'));
    return merge(
        mdi,
        fontawesome, 
        flagicon, 
        themifyicon,
        simplelineicon,
        feathericon
    );
});

/*Building vendor scripts needed for basic template rendering*/
gulp.task('buildBaseVendorScripts', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js', 
        './node_modules/popper.js/dist/umd/popper.min.js', 
        './node_modules/bootstrap/dist/js/bootstrap.min.js', 
        './node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'
    ])
      .pipe(concat('vendor.bundle.base.js'))
      .pipe(gulp.dest('./vendors/js'));
});

/*Building vendor styles needed for basic template rendering*/
gulp.task('buildBaseVendorStyles', function() {
    return gulp.src(['./node_modules/perfect-scrollbar/css/perfect-scrollbar.css'])
      .pipe(concat('vendor.bundle.base.css'))
      .pipe(gulp.dest('./vendors/css'));
});

/*Building optional vendor scripts for addons*/
gulp.task('buildOptionalVendorScripts', function() {
    return gulp.src([
        'node_modules/chart.js/dist/Chart.min.js', 
        'node_modules/progressbar.js/dist/progressbar.min.js',
        'node_modules/moment/moment.js',
        'node_modules/justgage/raphael-2.1.4.min.js',
        'node_modules/jquery-file-upload/js/jquery.uploadfile.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/select2/dist/js/select2.min.js',
        'node_modules/codemirror/lib/codemirror.js',
        'node_modules/codemirror/mode/javascript/javascript.js',
        'node_modules/codemirror/mode/shell/shell.js',
        'node_modules/owl-carousel-2/owl.carousel.min.js',
        'node_modules/typeahead.js/dist/typeahead.bundle.min.js',
        'node_modules/pwstabs/assets/jquery.pwstabs.min.js'
    ])
    .pipe(concat('vendor.bundle.addons.js'))
    .pipe(gulp.dest('./vendors/js'));
});

/*Building optional vendor styles for addons*/
gulp.task('buildOptionalVendorStyles', function() {
    return gulp.src([
        'node_modules/codemirror/lib/codemirror.css',
        'node_modules/codemirror/theme/ambiance.css',
        'node_modules/select2/dist/css/select2.min.css',
        'node_modules/owl-carousel-2/assets/owl.carousel.min.css',
        'node_modules/owl-carousel-2/assets/owl.theme.default.min.css',
        'node_modules/jquery-tags-input/dist/jquery.tagsinput.min.css',
        'node_modules/pwstabs/assets/jquery.pwstabs.min.css'
    ])
    .pipe(concat('vendor.bundle.addons.css'))
    .pipe(gulp.dest('./vendors/css'));
});

/*sequence for building vendor scripts and styles*/
gulp.task('bundleVendors', gulp.series('clean:vendors','copyRecursiveVendorFiles', 'buildBaseVendorStyles','buildBaseVendorScripts', 'buildOptionalVendorStyles', 'buildOptionalVendorScripts'));


gulp.task('default', gulp.series('serve'));
