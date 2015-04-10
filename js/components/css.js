
define(['components/loadcss', 'components/arrayForEach'], function(loadCSS) {


	// relative to document root
	var css = [
		{
			url: cssbase + 'main.css',
			id: 'main'
		}

		
		

		];

	
	
	


	var sheetLoaded = function() {
	}

	css.forEach( function(css, index) {
		
		var ss = loadCSS( css.url );

		/*
		
		// We are not loading cookies any more thanks to wp total cache. It's probably better to serve a sligthly bigger full on HTML page than faff about with selective PHP or javascript to do this.
		var CookieDate = new Date();
		CookieDate.setMonth(CookieDate.getMonth() + 3);
		var CookieDate_gmt = CookieDate.toGMTString();


		ss.onload = function() {
			

			// set a cookie
			document.cookie = 
				'cssloaded[' + css.id + ']=' + css.url +
				';path=/' +
				';max-age=max-age-in-seconds' +
				';expires=' + CookieDate_gmt +
				';domain=' + window.location.hostname;

		}
		*/

	});
	



});