package com.example.WeatherApp.dto;

/**
 * Created by Catalina on 02.02.2016.
 */
public enum WeatherType {
    RAINY("Rainy"),
    STORMY("Stormy"),
    SUNNY("Sunny"),
    CLOUDY("Cloudy"),
    HOT("Hot"),
    WINDY("Windy"),
    SNOW("Snow"),
    FOGGY("Foggy");

    private String value;

    WeatherType(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
