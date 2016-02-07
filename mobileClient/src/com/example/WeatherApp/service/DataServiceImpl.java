package com.example.WeatherApp.service;

import com.example.WeatherApp.dto.WeatherDetailsResponse;
import com.example.WeatherApp.dto.WeatherResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

/**
 * Created by Catalina on 05.02.2016.
 */
public class DataServiceImpl implements DataService{

    private String URL = "https://weather-service-adrianamb.c9users.io/weather/";
    private RestTemplate restTemplate = new RestTemplate();


    @Override
    public WeatherResponse getWeather() {
        String s = restTemplate.getForObject(URL + "all", String.class);
        WeatherResponse ob = null;
        try {
            ob = new ObjectMapper().readValue(s, WeatherResponse.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ob;
    }

    @Override
    public WeatherDetailsResponse getWeatherDetails(Long cityId) {
        String s = restTemplate.getForObject(URL + cityId, String.class);
        WeatherDetailsResponse ob = null;
        try {
            ob = new ObjectMapper().readValue(s, WeatherDetailsResponse.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ob;
    }
}
