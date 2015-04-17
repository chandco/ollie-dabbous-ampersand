requirejs.config({ 

  baseUrl: requirebase,

  shim: {
        'vendor/modernizr': {
          exports: 'Modernizr'
        },
  }

});

require(['vendor/velocity', 'components/arrayForEach'], function( Velocity ) {
	Velocity(document.querySelector('html'), { opacity: 1 });

	var magic_blocks = document.querySelectorAll('.magic');


	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	


	[].forEach.call(magic_blocks, function(element) {
 

		var delay = getRandomInt(500,1600);
		
		var thisEl = element;
		setTimeout( function( ) {

/*transform:
		translateY(30px)
		perspective( 500px ) rotateX(45deg);*/
			
			Velocity(thisEl, {
				opacity:1, 
				translateY: "0",
				
				rotateX: 0,


				complete: function() {
					
				}
			}, {duration: 1400});
		
		} , delay);

	});
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


	var trigger_value = 400;
	var ste = new Steady({
      throttle: 100,
      handler: fn,
      conditions: {
      	"min-top" : 0
      }
    });
    
    function addMyClass(el, classname) {
	  var classString = el.className; // returns the string of all the classes for myDiv
	  var newClass = classString.concat(" " + classname); // Adds the class "main__section" to the string (notice the leading space)
	  el.className = newClass; // sets className to the new string
	}
 
 	var header = document.querySelector('#first-page');

    
    function fn(values, done) {
      
      	

      	if (values.top > trigger_value && values.top < (trigger_value * 2)) {
      		if ( !hasClass(header, 'above-fold') ) {
      			addClass(header, 'above-fold');
      		}
      	} else if (values.top > (trigger_value * 2)) {
      		addClass(header, 'after-fold');
      	} else {
      		removeClass(header, 'after-fold');
      		removeClass(header, 'above-fold');
      	}
      	
      	
      
      
      done();
    }
});



require(['vendor/velocity', 'components/arrayForEach'], function(Velocity) {

	var quotes = document.querySelectorAll('.quotes li');

	var timer;
	var fadeNext = function(element, index) {

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
			
				timer = setTimeout( fadeNext(element, nextIndex), 10000 ); // next slide
			}
		}, { duration: 1500 }); // fade in time
		}, 1000); // delay from fadein



		

		
	}

	fadeNext(quotes, 1);

	
});