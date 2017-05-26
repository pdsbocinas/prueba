var gulp = require('gulp');
var sass = require('gulp-sass');
var stream = require('merge-stream');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 

// Distribucion
var source = 'src/';
var dest = 'web/';

// Bootstrap source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};
    
// fonts
var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

// Js
var bootstrapJs = {
    in: [source + 'assets/js/*.*', bootstrapSass.in + 'assets/javascripts/**/*'],
    out: dest + 'js/',
    watch: source + '/js/**/*'
};

// Scss
var scss = {
    in: source + '/assets/scss/app.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copia las fuentes que usa bootstrap
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compila los scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});

// compilas los js
gulp.task('js', function () {
    return gulp.src(bootstrapJs.in)
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(bootstrapJs.out));
});

// se queda escuchando cambios
gulp.task('default', ['sass','js'], function () {
     gulp.watch(scss.watch, ['sass','js']);
});