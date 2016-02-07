

/**
 * @name 			rfx.directive:rAutogrow
 * @ngdoc 			service 
 * @requires 		$http, $q
 * @description 	Call weatherAPI to bring weather data.
 * @author Alexandru Dinca (alexandru.dinca2110@gmail.com)
 */
angular
	.module('weather')
	.service('weatherService', ['$http', '$q', function($http, $q) {

		var _weatherService = {};


		/**
		 * @ngdoc			method	
		 * @description 	Fetches summarised information about the cities
		 * 						provided by the API
		 * @returns			{object} promise
		 */
		_weatherService.worldCities = function() {
			var deferred = $q.defer();

			$http.get('https://weather-service-adrianamb.c9users.io/weather/all')
				.then(function(response) {
					console.log(response.data);
					deferred.resolve(response.data);					
				}, deferred.reject);

			return deferred.promise;
		}


		/**
		 * @ngdoc			method
		 * @description 	Fetches detailed information (daily, hourly) about
		 *						the given city
		 * @returns 		{object} a promise
		 */
		_weatherService.byCity = function(cityId) {
			var deferred = $q.defer();				
			var request = {
				url : 'https://weather-service-adrianamb.c9users.io/weather/' + cityId,
                method: 'GET'
			};				

			$http(request).then(function(response) {
				console.log(response.data);
				deferred.resolve(response.data);					
			}, deferred.reject);

			return deferred.promise;
		}			


		return _weatherService;			

	}]);