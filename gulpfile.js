var gulp = require('gulp'),
			less = require('gulp-less'),
			path = require('path'),
			watch = require('gulp-watch'),
			autoprefixer = require('gulp-autoprefixer'),
			browserSync = require('browser-sync'),
			uglify = require('gulp-uglify'),
			sourcemaps = require('gulp-sourcemaps'),
			jshint = require('gulp-jshint'),
			imageResize = require('gulp-image-resize'),
			rename = require("gulp-rename"),
            uglifycss = require("gulp-uglifycss"),
            plumber = require("gulp-plumber"),

			changed = require("gulp-changed"),
                  cmq = require('gulp-combine-media-queries');




    var penthouse = require('penthouse');
    var fs = require('fs');
//gulp.src(['js/**/*.js', '!js/**/*.min.js'])

var run = require('gulp-run');
var build_require = require('./node-build.js');



gulp.task('default', ['compile-css', 'rjs'], function () {


    browserSync({
            proxy: 'dabbous.dev.chand.co',
            files: "css/*.css",
            port: 8080,
        });
    
    gulp.watch('./less/**/*.less', ['compile-css']);

    gulp.watch(['./partials/**/*.*', './build/*.html'], ['build-html', browserSync.reload]);

    // gulp.watch('./js/*.js', ['javascript', browserSync.reload]);

//    gulp.watch(['./js/requirejs/**/*.js', '!./js/requirejs/main-built.js', '!./js/main-built.js', '!./js/requirejs/min/**/*.js'], ['rjs']);


   


});

gulp.task('rjs', function() {

    build_require();

});




var fileinclude = require('gulp-file-include');
var markdown = require('markdown');

gulp.task('build-html', function() {

    
    gulp.src('./build/*.html')
    

    .pipe( fileinclude({
        prefix: '@@',
        basepath: './partials/',
        filters: {
            markdown: markdown.parse
        }
    }))

    .pipe(gulp.dest('./'));


});



gulp.task('compile-css', function () {
	gulp.src('./less/main.less')
                .pipe(plumber())
				.pipe(sourcemaps.init())
			    .pipe(less())
			    //.pipe(autoprefixer())
                //.pipe(uglifycss())
			    .pipe(sourcemaps.write('./maps'))
			    .pipe(gulp.dest('./css/'));


});

gulp.task('dist-css', function () {
    gulp.src('./less/main.less')
                //.pipe(sourcemaps.init())
                .pipe(less())
                .pipe(autoprefixer())
                .pipe(cmq({
                  log: true
                }))
                .pipe(uglifycss())
                .pipe(gulp.dest('./css/'));


    build_require();

});


gulp.task('build', ['critical', 'rjs'], function() {
    console.log('building all the things');
})


var pages = [
        {
            url: 'http://odba.dev.chand.co/',
            cssPath: 'homepage'

        }
    ];


gulp.task('crit', function() {

    console.log("I hope you ran 'gulp dist-css' first...");
    var yargs = require('yargs').argv;

    if (!yargs.c) { 
        console.log("no argument.  try \"gulp crit -c nameofcssID\""); 
    } else {

        var tpage = false;

       
        pages.forEach(function(page, index) {
            
            if (page.cssPath == yargs.c) {
                tpage = pages[index];
            }
        }); 

        if (!tpage) {
            console.log(yargs.c + ' not found');
            return;
        }

        var page = tpage;

        penthouse({
            url : page.url,
            css : './css/main.css',
            width : 640,   // viewport width
            height : 1100   // viewport height
        }, function(err, criticalCss) {

            if (err) throw err;
            fs.writeFile('./css/critical/' + page.cssPath + '-mobile.css', criticalCss, function(err2) {
                if (err2) throw err2;
                console.log("Saved " + page.cssPath + '-mobile.css');
            })
        });


        penthouse({
            url : page.url,
            css : './css/main.css',
            width : 1200,   // viewport width
            height : 1100   // viewport height
        }, function(err, criticalCss) {

            if (err) throw err;

            //console.log(criticalCss);
            fs.writeFile('./css/critical/' + page.cssPath + '-desktop.css', criticalCss, function(err2) {
                if (err2) throw err2;
                console.log("Saved " + page.cssPath + '-desktop.css');
            })
        });
    }

});

gulp.task('critical',  function() {
    

   

    var doPenthouse = function(index, suffix, settings) {

         // save mobile
      
        if (!pages[index]) return;
        
            var page = pages[index];
        

           

        settings.url = page.url;


                

            // save desktop
        console.log('processing ' + page.cssPath + '...');
        penthouse(settings, function(err, criticalCss) {

            if (err) throw err;

            //console.log(criticalCss);
            fs.writeFile('./css/critical/' + page.cssPath + suffix, criticalCss, function(err2) {
                if (err2) throw err2;
                console.log("Saved " + page.cssPath + suffix);
                console.log('');

                if (suffix == '-desktop.css') {
                    doPenthouse(index, '-mobile.css', mobileSettings);
                } else {
                    doPenthouse((index+1), '-desktop.css', desktopSettings);
                }

            });
        });
    


    };


    var mobileSettings = {
                    
                    css : './css/main.css',
                    width : 640,   // viewport width
                    height : 1100   // viewport height
            };


            var desktopSettings = {
                    css : './css/main.css',
                    width : 1200,   // viewport width
                    height : 1100   // viewport height
            };



    doPenthouse(0, '-desktop.css', desktopSettings);
    


    
 
});

gulp.task('resize-images', function () {

	// this doesn't happen automatically, because it's a bit intensive, it should be done when we need.
	
	var originalName;

     gulp.src("images/src/**/*.{jpg,png}")
    .pipe(changed("images/dist"))


    // This isn't ideal, but it'll work fine
    // Make sure that you go BIGGEST FIRST because of piping

    // Need to change renaming to the wordpress convention

    // need to specify heights?

    // need to do lossless optimisation

    // remember to set new name as well as new size for each resize.
    .pipe(imageResize({ 
    	imageMagick : true,
    	width : 200
    }))
    .pipe(rename(function (path) {
    	originalName = path.basename;
        path.basename = originalName + "-200";        
    }))
    .pipe(gulp.dest("images/dist"))
 

    .pipe(imageResize({ 
    	imageMagick : true,
    	width : 100
    }))
    .pipe(rename(function (path) {
        path.basename = originalName + "-100";        
    }))
    .pipe(gulp.dest("images/dist"));

});




