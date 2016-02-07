package com.example.WeatherApp.service;

import com.example.WeatherApp.dto.WeatherDetailsResponse;
import com.example.WeatherApp.dto.WeatherResponse;
import org.springframework.web.client.RestClientException;

/**
 * Created by Catalina on 05.02.2016.
 */
public interface DataService{

    WeatherResponse getWeather() throws RestClientException;
    WeatherDetailsResponse getWeatherDetails(Long cityId);

}
