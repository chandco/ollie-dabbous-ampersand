requirejs.config({ 

  baseUrl: requirebase,

  shim: {
        'vendor/modernizr': {
          exports: 'Modernizr'
        },
  }

});


require(['vendor/modernizr'], function (Modernizr) {

});


// require(['components/css']);

require(['vendor/steady'], function(Steady) {


	var hasClass = function (elem, className) {
	    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}

	var addClass = function (elem, className) {
	    if (!hasClass(elem, className)) {
	        elem.className += ' ' + className;
	    }
	}

	var removeClass = function (elem, className) {
	    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	    if (hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	}


	
 
 	
});



require(['vendor/velocity', 'components/arrayForEach'], function(Velocity) {

	var quotes = document.querySelectorAll('.quotes li');

	var timer;
	
	var fadeNext = function(element, index) {

		console.log('fired');
		if (element[index + 1]) {
			var nextIndex = index + 1;
		} else {
			var nextIndex = 0;
		}

		Velocity( element, {
			opacity:0, 
			perspective: "500px",
			rotateX: "45deg",
			
		}, { duration: 1500 });

		// fadein
		setTimeout( function() {
			Velocity( element[index], {
			opacity:1, 

				perspective: 0,
				rotateX: 0,

			complete:function() {
			
				timer = setTimeout( function() {
				fadeNext(element, nextIndex);
				}, 8000 ); // next slide
			}
		}, { duration: 1500 }); // fade in time
		}, 2000); // delay from fadein



		

		
	}

	setTimeout( function() {
		fadeNext(quotes, 1);
	}, 3000 );

	
});