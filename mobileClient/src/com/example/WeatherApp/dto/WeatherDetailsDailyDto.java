package com.example.WeatherApp.dto;

import java.util.List;

/**
 * Created by Catalina on 06.02.2016.
 */
public class WeatherDetailsDailyDto {
    private Long counter;
    private List<WeatherDetailsElementDto> list;

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }

    public List<WeatherDetailsElementDto> getList() {
        return list;
    }

    public void setList(List<WeatherDetailsElementDto> list) {
        this.list = list;
    }
}
