'use strict';

var cndConfig = {
      accessKeyId: '',
      secretAccessKey: ''
    },
    s3Bucket = '';

var sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    sprite = require('gulp.spritesmith'),
    jpgCompress = require('imagemin-jpeg-recompress'),
    pngCompress = require('gulp-tinypng'),
    gzip = require('gulp-gzip'),
    s3 = require('gulp-s3-upload')( cndConfig ),
    webp = require('gulp-webp'),
    sassVariables = require('gulp-sass-variables');

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');

const $ = gulpLoadPlugins();

var srcPath = 'src',
    distPath = 'app/public';

let dev = true;

// IMAGES

gulp.task('compress:jpg', [], function () {
  return gulp.src(distPath + '/images/**/*.jpg')
    .pipe(jpgCompress({
      quality: 'high'
    })())
    .pipe(gulp.dest(distPath + '/images'));
});

gulp.task('compress:png', [], function () {
  return gulp.src([distPath + '/images/**/*.png'])
    .pipe(pngCompress('VqZLFmu-8dZ3f499y7Jav4l_CVtnsdSP'))
    .pipe(gulp.dest(distPath + '/images'));
});

gulp.task('compress', [], function () {
  var funcArry = process.argv,
      file = funcArry[funcArry.length - 1],
      pathProcess1 = file.substr(0, file.indexOf('/')),
      pathProcess2 = pathProcess1.split('/'),
      path = pathProcess2[pathProcess2.length -1];

  process.stdout.write('\nComprimindo /images/' + file + ' ...\n\n');

  if ( file.indexOf('.jpg') >= 0 ) {

    return gulp.src(distPath + '/images/' + file)
      .pipe(jpgCompress({
        quality: 'high'
      })())
      .pipe(gulp.dest(distPath + '/images/' + path));

  } else if ( file.indexOf('.png') >= 0 ) {

    return gulp.src(distPath + '/images/' + file)
      .pipe(pngCompress('VqZLFmu-8dZ3f499y7Jav4l_CVtnsdSP'))
      .pipe(gulp.dest(distPath + '/images/' + path));

  }

});

gulp.task('convert:webp', [ 'compress:jpg' ], function() {
  gulp.src(distPath + '/images/**/*.jpg')
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest(distPath + '/images'));
});

gulp.task('imgcompress', ['convert:webp', 'compress:png'], function() {

  process.stdout.write('\nUse `gulp compress -o caminho/arquivo.ext` para otimizar imagens individualmente.\n\n');

});

// SPRITE

gulp.task('sprite', [], function () {
  return gulp.src(distPath + '/images/sprite-src/**/*.png')
    .pipe(sprite({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: '../../../' + srcPath + '/styles/helpers/_sprite-png.scss',
      cssFormat: 'scss',
      cssVarMap: function (sprite) {
        sprite.name = 'sprite-' + sprite.name;
      }
    }))
    .pipe(gulp.dest(distPath + '/images'));
});

// CSS

gulp.task('clean:css', function () {
  return del(distPath + '/styles/*');
});

gulp.task('build:css', ['clean:css', 'sprite'], function () {
  return gulp.src(srcPath + '/styles/**/*.scss')
    .pipe(sassVariables({
      $fileHash: new Date().valueOf()
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(distPath + '/styles'))
    .pipe(livereload());
});

gulp.task('copy:css', ['build:css'], function() {
  return gulp.src(distPath + '/styles/*')
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('minify', ['copy:css'], function() {
  return gulp.src('.tmp/styles/*')
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(gulp.dest(distPath + '/styles'));
});

//JS

gulp.task('clean:js', function () {
  return del([
    '.tmp/scripts/*',
    '!.tmp/scripts/libs/*',
    distPath + '/scripts/main.js'
  ]);
});

gulp.task('clean:jslibs', function () {
  return del([
    '!.tmp/scripts/*',
    '.tmp/scripts/libs/*',
    distPath + '/scripts/libs.js'
  ]);
});

gulp.task('build:js', ['clean:js'], function() {
  return gulp.src([srcPath + '/scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(distPath + '/scripts'))
    .pipe(livereload());
});

gulp.task('build:jslibs', ['clean:jslibs'], function() {
  return gulp.src(srcPath + '/scripts/libs/**/*.js')
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(distPath + '/scripts'))
    .pipe(livereload());
});

gulp.task('copy:concat', ['build:js', 'build:jslibs'], function() {
  return gulp.src(distPath + '/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('uglify', ['copy:concat'], function() {
  return gulp.src('.tmp/scripts/**/*.js')
    .pipe(uglify({compress: {drop_console: true}}))
    .on('error', function(err) {
      process.stdout.write('\\' + err.toString() + '\\n\n');
    })
    .pipe(gulp.dest(distPath + '/scripts'))
});

// TEMPLATE

gulp.task('reload:template', function() {
  return gulp.src('app/public/index.twig')
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

// NODEMON

gulp.task('start', function () {
  nodemon({
    script: './app/bin/www',
    env: { 'NODE_ENV': 'development' }
  })
})

// WORKFLOW

gulp.task('default', function() {
  process.stdout.write('\nUse `gulp build`\n\n');
});

gulp.task('prepare:dev', ['build:js', 'build:jslibs', 'build:css']);

// SERVE

gulp.task('serve', ['prepare:dev', 'start'], function() {

  livereload.listen();

  process.stdout.write('\nConfigure a raíz do Apache para /app/public\n\nSource de js e css no diretório /src\n\nImagens no diretório /app/public/images\n\nServindo em localhost\n\n');

  // WATCH

  // CSS
  gulp.watch(
    [
      srcPath + '/styles/**/*.scss',
      srcPath + '/images/sprite-src/**/*.png',
      srcPath + '/images/sprite-src/**/*.svg',
    ],
    [
      'build:css'
    ]
  );
  // JS
  gulp.watch(
    [
      srcPath + '/scripts/**/*.js',
      '!' + srcPath + '/scripts/libs/*.*.js'
    ],
    [
      'build:js'
    ]
  );
  gulp.watch(
    [
      '!' + srcPath + '/scripts/**/*.js',
      srcPath + '/scripts/libs/*'
    ],
    [
      'build:jslibs'
    ]
  );
  // TEMPLATE
  gulp.watch(
    [
      'app/**/*.twig'
    ],
    [
      'reload:template'
    ]
  );
});

// BUILD

gulp.task('build', ['minify', 'uglify'], function() {

  process.stdout.write('\nJs e css compilados em /app/public.\n\nOtimize o diretório de imagens /app/public/images com `gulp imgcompress`.\n\n');

});

// GZIP

gulp.task('clean:gzip', function () {
  return del([
    './gzipped/*',
  ]);
});

gulp.task( 'gzip', [ 'clean:gzip','minify', 'uglify' ], function() {
  return gulp.src([
      distPath + '/**/*.js',
      distPath + '/**/*.css',
      distPath + '/**/*.eot',
      distPath + '/**/*.svg',
      distPath + '/**/*.ttf',
      distPath + '/**/*.woff',
      '!' + distPath + '/images/*'
    ])
    .pipe(gzip( {
      append: false
    } ))
    .pipe(gulp.dest('./gzipped'));
} );

// CDN S3

// gulp.task( 'uploadgzip', [ 'gzip' ], function() {
//   return gulp.src( './gzipped/**/*.*' )
//   .pipe( s3( {
//     Bucket: s3Bucket,
//     ACL: 'public-read',
//     ContentEncoding: 'gzip',
//     CacheControl: 'max-age=1296000'
//   }, {
//     maxRetries: 5
//   } ) );
// } );

// gulp.task( 'uploadimg', [], function() {
//   return gulp.src([
//     distPath + '/**/*.jpg',
//     distPath + '/**/*.png',
//     distPath + '/**/*.webp'
//   ])
//   .pipe( s3( {
//     Bucket: s3Bucket,
//     ACL: 'public-read',
//     CacheControl: 'max-age=1296000'
//   }, {
//     maxRetries: 5
//   } ) );
// } );

// gulp.task( 'uploads3', [ 'uploadgzip', 'uploadimg' ]);
