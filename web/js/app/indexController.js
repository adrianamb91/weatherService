
/**
 * @name 			rfx.directive:rAutogrow
 * @ngdoc 			overview
 * @requires 		weatherService
 * @description 	Should hold all the business logic related to the main page.
 * @author Alexandru Dinca (alexandru.dinca2110@gmail.com)
 */
angular
	.module("weather")
	.controller("indexController", ['$scope', 'weatherService', function($scope, weatherService) {

		$scope.date = new Date();

		/**
		 *  @description	Fetches weather data for the given city. Updates
		 *						the main weather table with the new data.
		 */ 
		function refreshWeatherData(cityId) {
			weatherService.byCity(cityId).then(function(data) {
				$scope.weatherData = data;
			});						
		}	
		
		refreshWeatherData(683506);

		/**
		 *  @description	Fetches some of the cities and summarised data about
		 *						them. Updates the panel with the cities.
		 */ 
		weatherService.worldCities().then(function(data) {
			$scope.world = shuffle(data.weather);
		});


		/**
		 * @description		onClickListener for the city cards. Refreshes the
		 *						main table of weather data with the given city
		 */
		$scope.changeCity= function(cityId) {
			refreshWeatherData(cityId);				
		}


		/**
		 * @description		Shuffles the given array
		 * @returns			The shuffled array
		 */			
		function shuffle(o){
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		}
	}]);