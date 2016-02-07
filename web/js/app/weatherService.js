
angular
	.module('weather')
	.service('weatherService', ['$http', '$q', function($http, $q) {

		var _weatherService = {};

		_weatherService.worldCities = function() {
			var deferred = $q.defer();

			$http.get('https://weather-service-adrianamb.c9users.io/weather/all')
				.then(function(response) {
					console.log(response.data);
					deferred.resolve(response.data);					
				}, deferred.reject);

			return deferred.promise;
			// return {"numberOfCities":10,"weather":[{"cityName":"Moscow","temp":-1.71,"weatherType":"Clouds","cityId":524901},{"cityName":"Kiev","temp":0.23,"weatherType":"Clouds","cityId":703448},{"cityName":"London","temp":9.62,"weatherType":"Rain","cityId":2643743},{"cityName":"Barcelona","temp":11.04,"weatherType":"Clouds","cityId":6356055},{"cityName":"Paris","temp":8.99,"weatherType":"Clouds","cityId":6455259},{"cityName":"Bucharest","temp":1.98,"weatherType":"Clear","cityId":683506},{"cityName":"New York","temp":0.66,"weatherType":"Clear","cityId":5128638},{"cityName":"Lisbon","temp":11.03,"weatherType":"Clouds","cityId":2267057},{"cityName":"Rio de Janeiro","temp":32.19,"weatherType":"Clear","cityId":3451190},{"cityName":"Tokyo","temp":2.06,"weatherType":"Clear","cityId":1850147}]};
		}


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

			// return {"cityName":"Barcelona","current":{"temp":11.04,"pressure":1031.1,"humidity":100,"windSpeed":7.11,"weatherType":"Clouds","weatherDescription":"scattered clouds"},"hourly":{"counter":16,"list":[{"temp":11.82,"pressure":1030.85,"humidity":100,"dateTime":"2016-02-06 00:00:00","weatherType":"Clouds","weatherDescription":"scattered clouds"},{"temp":12.08,"pressure":1029.95,"humidity":100,"dateTime":"2016-02-06 03:00:00","weatherType":"Rain","weatherDescription":"light rain"},{"temp":12.41,"pressure":1029.01,"humidity":100,"dateTime":"2016-02-06 06:00:00","weatherType":"Rain","weatherDescription":"light rain"},{"temp":13.37,"pressure":1028.6,"humidity":100,"dateTime":"2016-02-06 09:00:00","weatherType":"Rain","weatherDescription":"light rain"},{"temp":14.31,"pressure":1026.95,"humidity":95,"dateTime":"2016-02-06 12:00:00","weatherType":"Clouds","weatherDescription":"few clouds"},{"temp":14.29,"pressure":1024.13,"humidity":95,"dateTime":"2016-02-06 15:00:00","weatherType":"Clear","weatherDescription":"sky is clear"},{"temp":13.4,"pressure":1022.29,"humidity":100,"dateTime":"2016-02-06 18:00:00","weatherType":"Clear","weatherDescription":"sky is clear"},{"temp":13.22,"pressure":1020.68,"humidity":100,"dateTime":"2016-02-06 21:00:00","weatherType":"Clouds","weatherDescription":"scattered clouds"},{"temp":14.26,"pressure":1017.76,"humidity":94,"dateTime":"2016-02-07 00:00:00","weatherType":"Clear","weatherDescription":"sky is clear"},{"temp":14.83,"pressure":1015.28,"humidity":92,"dateTime":"2016-02-07 03:00:00","weatherType":"Clouds","weatherDescription":"few clouds"},{"temp":13.36,"pressure":1014.31,"humidity":100,"dateTime":"2016-02-07 06:00:00","weatherType":"Rain","weatherDescription":"light rain"},{"temp":12.83,"pressure":1015.09,"humidity":100,"dateTime":"2016-02-07 09:00:00","weatherType":"Rain","weatherDescription":"light rain"},{"temp":14.19,"pressure":1015.71,"humidity":94,"dateTime":"2016-02-07 12:00:00","weatherType":"Clear","weatherDescription":"sky is clear"},{"temp":14,"pressure":1018.05,"humidity":96,"dateTime":"2016-02-07 15:00:00","weatherType":"Clouds","weatherDescription":"few clouds"},{"temp":13.51,"pressure":1020.79,"humidity":97,"dateTime":"2016-02-07 18:00:00","weatherType":"Clear","weatherDescription":"sky is clear"},{"temp":12.3,"pressure":1022.17,"humidity":100,"dateTime":"2016-02-07 21:00:00","weatherType":"Clear","weatherDescription":"sky is clear"}]},"daily":{"counter":10,"list":[{"tempMin":9.75,"tempMax":11.04,"pressure":1031.06,"humidity":100,"weatherType":"Clear","weatherDescription":"sky is clear","date":"2016-02-05"},{"tempMin":10.92,"tempMax":12.96,"pressure":1027.61,"humidity":100,"weatherType":"Rain","weatherDescription":"light rain","date":"2016-02-06"},{"tempMin":10.87,"tempMax":12.86,"pressure":1014.75,"humidity":100,"weatherType":"Rain","weatherDescription":"moderate rain","date":"2016-02-07"},{"tempMin":10.44,"tempMax":16.39,"pressure":1018.51,"humidity":88,"weatherType":"Clear","weatherDescription":"sky is clear","date":"2016-02-08"},{"tempMin":14.65,"tempMax":17.91,"pressure":1010.19,"humidity":76,"weatherType":"Clouds","weatherDescription":"few clouds","date":"2016-02-09"},{"tempMin":16.43,"tempMax":17.88,"pressure":1011.33,"humidity":0,"weatherType":"Rain","weatherDescription":"light rain","date":"2016-02-10"},{"tempMin":14.85,"tempMax":17.11,"pressure":1003.32,"humidity":0,"weatherType":"Rain","weatherDescription":"light rain","date":"2016-02-11"},{"tempMin":12.31,"tempMax":14.16,"pressure":1009.51,"humidity":0,"weatherType":"Rain","weatherDescription":"light rain","date":"2016-02-12"},{"tempMin":11.1,"tempMax":13.55,"pressure":1017.34,"humidity":0,"weatherType":"Rain","weatherDescription":"light rain","date":"2016-02-13"},{"tempMin":13.52,"tempMax":15.2,"pressure":1009.62,"humidity":0,"weatherType":"Clear","weatherDescription":"sky is clear","date":"2016-02-14"}]}};				

		}			


		return _weatherService;			

	}]);