import gulp from 'gulp';
import browsync from 'browser-sync'
const browsersync = browsync.create();
import fileinclude from 'gulp-file-include';
import gulpScss from 'gulp-sass';
import sass from 'sass';
const scss = gulpScss(sass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import group_media from 'gulp-group-css-media-queries';
import clean_css from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import normalize from 'node-normalize-scss';

let dist = './dist';
let srcProject = './src';

let path = {
    build: {
        html: dist + '/',
        css: dist + '/css',
        js: dist + '/js',
        images: dist + '/img',
        fonts: dist + '/fonts',
    },

    src: {
        html: [srcProject + '/html/*.html', '!' + srcProject + '/html/_*.html'],
        scss: srcProject + '/scss/style.scss',
        js: srcProject + '/**/main.js',
        images: srcProject + '/img/**/*.{jpg,jpeg,png,gif,webp}',
        svg: srcProject + '/img/**/*.svg',
        fonts: srcProject + '/fonts',
    },

    watch: {
        html: srcProject + '/**/*.html',
        css: srcProject + '/**/*.scss',
        js: srcProject + '/**/*.js',
        images: srcProject + '/img/**/*.{jpg,jpeg,png,gif,webp}',
        images: srcProject + '/img/**/*.svg',
    },

    clean: './' + dist + '/'
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + dist + '/'
        },
        port: 3012
        ,
    })
}

export function html() {
    return gulp.src(path.src.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream())
}

export function css() {
    return gulp.src(path.src.scss)
        .pipe(scss({
            outputStyle: "expanded",
            includePaths: normalize.includePaths
        }))
        .pipe(scss({ includePaths: ['./node_modules'] }))
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        })
        ]))
        .pipe(group_media())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream())
}

export function js() {
    return gulp.src(path.src.js)
        .pipe(fileinclude())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream())
}

export function images() {
    return gulp.src(path.src.images)
        .pipe(newer(path.build.images))
        .pipe(webp())
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.images))
        .pipe(newer(path.build.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.svg))
        .pipe(gulp.dest(path.build.images))
        .pipe(browsersync.stream())
}

export function otfToTtf() {
    return gulp.src(`./src/fonts/*.otf`)
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest(`${path.src.fonts}/`))
}

export function ttfToWoff() {
    return gulp.src(`${path.src.fonts}/*.ttf`)
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(gulp.dest(`${path.src.fonts}/`))
        .pipe(gulp.src(`${path.src.fonts}/*ttf`))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(`${path.build.fonts}/`))
        .pipe(gulp.src(`${path.src.fonts}/*{woff, woff2, ttf}`))
        .pipe(gulp.dest(`${path.build.fonts}/`))
}

const font = gulp.series(otfToTtf, ttfToWoff);

export function watchFile() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
}

const build = gulp.series(font, gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build, watchFile, browserSync);

gulp.task('default', watch)