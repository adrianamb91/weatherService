package com.example.WeatherApp.dto;

import java.util.List;

/**
 * Created by Catalina on 05.02.2016.
 */
public class WeatherResponse {

    private Long numberOfCities;
    private List<WeatherDto> weather;

    public Long getNumberOfCities() {
        return numberOfCities;
    }

    public void setNumberOfCities(Long numberOfCities) {
        this.numberOfCities = numberOfCities;
    }

    public List<WeatherDto> getWeather() {
        return weather;
    }

    public void setWeather(List<WeatherDto> weather) {
        this.weather = weather;
    }
}
