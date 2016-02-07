// (function($, document, window){
	
// 	$(document).ready(function(){

// 		// Cloning main navigation for mobile menu
// 		$(".mobile-navigation").append($(".main-navigation .menu").clone());

// 		// Mobile menu toggle 
// 		$(".menu-toggle").click(function(){
// 			$(".mobile-navigation").slideToggle();
// 		});

// 		var map = $(".map");
// 		var latitude = map.data("latitude");
// 		var longitude = map.data("longitude");
// 		if( map.length ){
			
// 			map.gmap3({
// 				map:{
// 					options:{
// 						center: [latitude,longitude],
// 						zoom: 15,
// 						scrollwheel: false
// 					}
// 				},
// 				marker:{
// 					latLng: [latitude,longitude],
// 				}
// 			});
			
// 		}
// 	});

// 	$(window).load(function(){

// 	});

// })(jQuery, document, window);

angular
	.module("weather", ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
		
 		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
       

		/* For any unmatched url, redirect to /home */
        $urlRouterProvider.otherwise("/");	

        $stateProvider
        	.state('index', {
				url 		: '/',
				templateUrl : "current.html"        			
        	})
        	.state('contact', {
        		url 		: '/contact',
        		templateUrl : "contact.html"
        	});
	})
	.filter("getImageName", function() {
		return function(input) {
			return input.trim().replace(/\s/g, "").toLowerCase();
		}			
	});

	;