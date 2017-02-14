'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const merge = require('merge-stream');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const eslint = require('gulp-eslint');

// Load Environment constiables
require('dotenv').config();
const webpackConfig = process.env.NODE_ENV === 'development'
  ? require('./webpack.config.js')
  : require('./webpack.config.prod.js');

const jsPaths = [
  'src/js/components/*.js'
];
const sassPaths = [
  'static/scss/*.scss',
  './node_modules/bootstrap/dist/css/bootstrap.min.css'
];

const filesToCopy = [
  {
    src: './node_modules/react/dist/react.min.js',
    dest: './static/build'
  },
  {
    src: './node_modules/react-dom/dist/react-dom.min.js',
    dest: './static/build'
  },
  {
    src: './node_modules/react-bootstrap/dist/react-bootstrap.min.js',
    dest: './static/build'
  },
  {
    src: './images/favicon.ico',
    dest: './static/build'
  },

  {
    src: './icomoon/symbol-defs.svg',
    dest: './static/build'
  }
];

gulp.task('copy:react:files', () => {
  const streams = [];
  filesToCopy.forEach((file) => {
    streams.push(gulp.src(file.src).pipe(gulp.dest(file.dest)));
  });
  return merge.apply(this, streams);
});

gulp.task('uglify:js', () => gulp.src(jsPaths)
    .pipe(uglify())
    .pipe(gulp.dest('static/build')));

gulp.task('build:js', (callback) => {
  webpack(Object.create(webpackConfig), (err, stats) => {
    if (err) {
      throw new gutil.PluginError('build:js', err);
    }
    gutil.log('[build:js]', stats.toString({ colors: true, chunks: false }));
    callback();
  });
});

gulp.task('build:sass', () => gulp.src(sassPaths[0])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat('advanced-tech.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./static/build'))
    .pipe(livereload()));

gulp.task('build:vendor:sass', () => gulp.src([...sassPaths.slice(1)])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./static/build')));

gulp.task('watch:js', () => {
  const config = Object.create(webpackConfig);
  config.watch = true;
  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('watch:js', err);
    }
    gutil.log('[watch:js]', stats.toString({ colors: true, chunks: false }));
  });
  gulp.watch('static/js/components/*.js', ['uglify:js', 'build:js']);
});

gulp.task('watch:sass', () => {
  gulp.watch('static/scss/*.scss', ['build:sass']);
});

gulp.task('watch-lint', () => {
  // Lint only files that change after this watch starts
  const lintAndPrint = eslint();
  // format results with each file, since this stream won't end.
  lintAndPrint.pipe(eslint.formatEach());

  return gulp.watch(['*.js', 'routes/*.js', 'models/*.js', 'db/*.js', 'config/*.js', 'bin/www', 'static/js/components/*.jsx', 'static/js/actions/index.js', 'static/js/constants/constants.js', 'static/js/data/data.js', 'static/js/reducers/*.js', 'static/js/store/*.js', 'static/js/utils/ajax.js', '__tests__/*.js'], event => {
    if (event.type !== 'deleted') {
      gulp.src(event.path).pipe(lintAndPrint, {end: false});
    }
  });
});


gulp.task('start', () => {
  nodemon({
    script: './bin/www',
    exec: 'node --harmony',
    ignore: ['static/*'],
    env: {
      PORT: '3000'
    }
  });
});

gulp.task('dev:debug', () => {
  nodemon({
    script: './bin/www',
    exec: 'node --inspect --harmony',
    ignore: ['static/*'],
    env: {
      PORT: '3000'
    }
  });
});

gulp.task('build', (cb) => {
  runSequence('copy:react:files', 'uglify:js', 'build:js', 'build:sass', 'build:vendor:sass', cb);
});

gulp.task('dev', (cb) => {
  livereload.listen();
  runSequence('copy:react:files', 'uglify:js', 'build:sass', 'build:vendor:sass', ['watch:js', 'watch:sass', 'watch-lint'], 'start', cb);
});

gulp.task('debug', (cb) => {
  livereload.listen();
  runSequence('copy:react:files', 'uglify:js', 'build:sass', 'build:vendor:sass', ['watch:js', 'watch:sass', 'watch-lint'], 'dev:debug', cb);
});
