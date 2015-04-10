var requirejs = require('requirejs');

   

    var config = {
        baseUrl: "./js/",
        name: "main",
        out: "./js/main-built.js",
        preserveLicenseComments: false,
        paths: {
          // typekit : 'http://use.typekit.net/jfl7esy',
          ga :  'vendor/analytics',
       //   components: 'min/components',
       //   vendor: 'min/vendor',
        },
        //optimize: "none",
        "shim": {
              'vendor/magnific-popup' : ['jquery'],
              'vendor/modernizr': {
                exports: 'Modernizr'
              },

              'ga' : {
                exports: 'ga'
              }  
        }
    };

    
    module.exports = function() {
        console.log("Building RJS file...");
        requirejs.optimize(config, function (buildResponse) {
            var contents = fs.readFileSync(config.out, 'utf8');
        }, function(err) {
            //optimization err callback
            console.log(err);
        });
    };