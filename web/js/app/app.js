
/**
 * @name 			rfx.directive:rAutogrow
 * @ngdoc 			overview
 * @requires 		ui-router for advanced routing capabilities
 * @description 	App configuration file. Should be kept anaemic of any
 *						business logic. 
 * @author Alexandru Dinca (alexandru.dinca2110@gmail.com)
 */
angular
	.module("weather", ['ui.router'])

	/**
	 * @description		Defines routing configuration and removes CORS headers
	 *
	 */
	.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
		
 		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
       
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

	/**
	 * @description 	Transforms the name of a city, to the name of the file
	 						where a representative photo is located.
	 * @example 		Rio de Janeiro -> riodejaneiro
	 */
	.filter("getImageName", function() {
		return function(input) {
			return input.trim().replace(/\s/g, "").toLowerCase();
		}			
	});

	;