package com.example.WeatherApp.dto;

import java.util.List;

/**
 * Created by Catalina on 06.02.2016.
 */
public class WeatherDetailsResponse {

    private String cityName;
    private WeatherDetailsDto current;
    private WeatherDetailsHourlyDto hourly;
    private WeatherDetailsDailyDto daily;

    public WeatherDetailsDailyDto getDaily() {
        return daily;
    }

    public void setDaily(WeatherDetailsDailyDto daily) {
        this.daily = daily;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public WeatherDetailsDto getCurrent() {
        return current;
    }

    public void setCurrent(WeatherDetailsDto current) {
        this.current = current;
    }

    public WeatherDetailsHourlyDto getHourly() {
        return hourly;
    }

    public void setHourly(WeatherDetailsHourlyDto hourly) {
        this.hourly = hourly;
    }

}
