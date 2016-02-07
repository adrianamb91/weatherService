# weatherService

Endpoints:
https://weather-service-adrianamb.c9users.io/weather/all - current weather for main cities

Response:
{   
    "numberOfCities":50,
    "weather":[
        {"cityName":"Barcelona","temp":11,"weatherType":"Clear","cityId":6356055},
        {"cityName":"Paris","temp":8,"weatherType":"Clear","cityId":6455259},
        {"cityName":"Bucharest","temp":-1.61,"weatherType":"Clouds","cityId":683506},
        {"cityName":"New York","temp":-0.97,"weatherType":"Clear","cityId":5128638},
        {"cityName":"Rio de Janeiro","temp":32.19,"weatherType":"Clear","cityId":3451190},
        ...
    ]
}


https://weather-service-adrianamb.c9users.io/weather/{city_id} - current weather + hourly forecast + daily forecast for city specified by id

Response: 
{
    "cityName":"Barcelona",
    "current": {
        "temp":11.04,
        "pressure":1031.1,
        "humidity":100,
        "windSpeed":7.11,
        "weatherType":"Clouds",
        "weatherDescription":"scattered clouds"},
    "hourly": { 
        "counter":16,
        "list":[
            {
                "temp":10.94,
                "pressure":1030.68,
                "humidity":100,
                "dateTime":"2016-02-06 00:00:00",
                "weatherType":"Clouds",
                "weatherDescription":"scattered clouds"
            },
            {   
                "temp":11.31,
                "pressure":1029.98,
                "humidity":100,
                "dateTime":"2016-02-06 03:00:00",
                "weatherType":"Clouds",
                "weatherDescription":"overcast clouds"},
            ,...
        ]
    },
    "daily": {
        "counter":10,
        "list":[
            {"tempMin":14.65,"tempMax":17.91,"pressure":1010.19,"humidity":76,"weatherType":"Clouds","weatherDescription":"few clouds","date":"2016-02-09"},
            {"tempMin":13.52,"tempMax":15.2,"pressure":1009.62,"humidity":0,"weatherType":"Clear","weatherDescription":"sky is clear","date":"2016-02-10"},
            ...
        ]
    }
}