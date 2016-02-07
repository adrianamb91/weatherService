"use strict";

var express = require ("express");
var request = require('request');
var async = require('async');
var dateFormat = require('dateformat');

var openWeatherBaseUrl = "http://api.openweathermap.org/data/2.5/";
var appKey = "f6832b2d70e3873f88c73926d1aa8551";

module.exports = function setup(options, imports, register) {
  var app = express ();
  
  /**
   * Method to add headers on each request
   */
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  /**
   * Get all frequent cities current weather info endpoint
   * 
   * This method calls an openweathermap endpoint on each city to retrieve current weather
   */
  app.get ('/weather/all', function (apiRequest, apiResponse, next)
  {
      //Moskow, Kiev, London, Barcelona, Paris, Bucharest, New York, Lisbon, Rio de Janeiro, Tokyo
      var cityIds = "524901,703448,2643743,6356055,6455259,683506,5128638,2267057,3451190,1850147";
      var requestUrl = openWeatherBaseUrl + "group" + "?id=" + cityIds + "&units=metric&appid=" + appKey;
      console.log(requestUrl);
      request(requestUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var jsonWeather = JSON.parse(body);
              var myJson = {"numberOfCities" : jsonWeather["cnt"]};
              var myJsonCitiesArray = [];
              for (var i = 0; i < jsonWeather["cnt"]; i++) {
                var jsonCity = jsonWeather["list"][i];
                var myJsonCity = {"cityName" : jsonCity["name"]};
                myJsonCity.temp = jsonCity["main"]["temp"];
                myJsonCity.weatherType = jsonCity["weather"][0]["main"];
                myJsonCity.cityId = jsonCity["id"];
                myJsonCitiesArray.push(myJsonCity);
              }
              myJson.weather = myJsonCitiesArray;
              apiResponse.send(JSON.stringify(myJson));
              console.log(body)
           }
      });
      
  });
  
  /**
   * Get detailed weather info for city
   * 
   * This method calls 3 openweathermap endpoints for the city, one for current weather, one for hourly prognosis and one for daily prognosis
   */
  app.get ('/weather/:cityId', function (apiRequest, apiResponse, next)
  {
      var cityId = apiRequest.params.cityId;
      
      var myCurrentWeatherJSON = {};
      var myForecastJSON = {};
      var myDailyForecastJSON = {};
      var myCityName;
      async.parallel([
        function (callback) {
          var requestUrl = openWeatherBaseUrl + "weather?id=" + cityId + "&units=metric&appid=" + appKey;
          console.log(requestUrl);
          request(requestUrl, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  var jsonWeather = JSON.parse(body);
                  myCityName = jsonWeather["name"];
                  myCurrentWeatherJSON.temp = jsonWeather["main"]["temp"];
                  myCurrentWeatherJSON.pressure = jsonWeather["main"]["pressure"];
                  myCurrentWeatherJSON.humidity = jsonWeather["main"]["humidity"];
                  myCurrentWeatherJSON.windSpeed = jsonWeather["wind"]["speed"];
                  myCurrentWeatherJSON.weatherType = jsonWeather["weather"][0]["main"];
                  myCurrentWeatherJSON.weatherDescription = jsonWeather["weather"][0]["description"];
                  console.log(body);  
                  callback();
               }
          });  
        }, 
        function (callback) {
            var requestUrl = openWeatherBaseUrl + "forecast?id=" + cityId + "&units=metric&appid=" + appKey;  
            console.log(requestUrl);
            request(requestUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonWeather = JSON.parse(body);
                    myForecastJSON.counter = 16;
                    var myForecastArrayJSON = [];
                    for (var i = 0; i < 16; i++) {
                        var currentJSONObj = jsonWeather["list"][i];
                        var myCurrentForecast = {};
                        myCurrentForecast.temp = currentJSONObj["main"]["temp"];
                        myCurrentForecast.pressure = currentJSONObj["main"]["pressure"];
                        myCurrentForecast.humidity = currentJSONObj["main"]["humidity"];
                        myCurrentForecast.dateTime = currentJSONObj["dt_txt"];
                        myCurrentForecast.weatherType = currentJSONObj["weather"][0]["main"];
                        myCurrentForecast.weatherDescription = currentJSONObj["weather"][0]["description"];
                        myForecastArrayJSON.push(myCurrentForecast);
                    }
                    myForecastJSON.list = myForecastArrayJSON;
                    console.log(body);  
                    callback();
                }
            });  
        },
        function (callback) {
            var requestUrl = openWeatherBaseUrl + "forecast/daily?id=" + cityId + "&units=metric&cnt=10&appid=" + appKey;  
            console.log(requestUrl);
            request(requestUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonWeather = JSON.parse(body);
                    myDailyForecastJSON.counter = 10;
                    var myDailyForecastArrayJSON = [];
                    for (var i = 0; i < 10; i++) {
                        var currentJSONObj = jsonWeather["list"][i];
                        var myOneDayForecast = {};
                        myOneDayForecast.tempMin = currentJSONObj["temp"]["min"];
                        myOneDayForecast.tempMax = currentJSONObj["temp"]["max"];
                        myOneDayForecast.pressure = currentJSONObj["pressure"];
                        myOneDayForecast.humidity = currentJSONObj["humidity"];
                        myOneDayForecast.weatherType = currentJSONObj["weather"][0]["main"];
                        myOneDayForecast.weatherDescription = currentJSONObj["weather"][0]["description"];
                        var timestamp = currentJSONObj["dt"];
                        var date = new Date(timestamp * 1000);
                        myOneDayForecast.date = dateFormat(date, 'yyyy-mm-dd');
                        myDailyForecastArrayJSON.push(myOneDayForecast);
                    }
                    myDailyForecastJSON.list = myDailyForecastArrayJSON;
                    console.log(body);  
                    callback();
                }
            });  
        }
      ], function(err) {
          if (err) {
            console.log(err);
          }
          var myResponseJson = {};
          myResponseJson.cityName = myCityName;
          myResponseJson.current = myCurrentWeatherJSON;
          myResponseJson.hourly = myForecastJSON;
          myResponseJson.daily = myDailyForecastJSON;
          apiResponse.send(JSON.stringify(myResponseJson));  
      });
  });

  app.get ('/', function (request, response, next)
  {
      response.send("Hello world!");
  });
    
  app.listen (process.env.PORT);
  
  var provides = {};
  provides.server = app;
  
  register(null, provides);
};