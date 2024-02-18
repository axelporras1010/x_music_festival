const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JS
const terser = require('gulp-terser-js');

function css (done) {

    src('src/scss/**/*.scss')         //Identificar el archivo
        .pipe(sourcemaps.init())
        .pipe( plumber() )
        .pipe( sass() )               //Compilarlo
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') );   //Almacenarlo en disco duro

    done();
}

function imagenes(done) {

    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( cache(imagemin(opciones)) )
        .pipe( dest('build/img') );

    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') );

    done();
}

function versionAvif(done) {
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.webp = versionWebp;
exports.avif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, javascript, dev);

