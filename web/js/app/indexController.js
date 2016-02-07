
angular
	.module("weather")
	.controller("indexController", ['$scope', 'weatherService', function($scope, weatherService) {

		$scope.date = new Date();

		function refreshWeatherData(cityId) {
			weatherService.byCity(cityId).then(function(data) {
				$scope.weatherData = data;
			});						
		}	
		
		refreshWeatherData(683506);

		weatherService.worldCities().then(function(data) {
			$scope.world = shuffle(data.weather);
		});

		$scope.changeCity= function(cityId) {
			console.log(cityId);
			refreshWeatherData(cityId);				
		}

		function shuffle(o){
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		}
	}]);