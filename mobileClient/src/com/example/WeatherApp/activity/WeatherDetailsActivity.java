package com.example.WeatherApp.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import com.example.WeatherApp.R;
import com.example.WeatherApp.dto.*;
import com.example.WeatherApp.service.DataService;
import com.example.WeatherApp.service.DataServiceImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Catalina on 03.02.2016.
 */
public class WeatherDetailsActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.weather_details_activity);

        Long cityId = Long.parseLong(getIntent().getStringExtra("cityId"));
        new WeatherDetailsAsyncTask(this).execute(cityId);

    }
}

class WeatherDetailsAsyncTask extends AsyncTask<Object, Object, Object> {

    Activity activity;

    public WeatherDetailsAsyncTask(Activity activity) {
        this.activity = activity;
    }

    @Override
    protected Object doInBackground(Object... params) {
        Long cityId = (Long)params[0];
        DataService dataService = new DataServiceImpl();
        WeatherDetailsResponse weatherResponse = dataService.getWeatherDetails(cityId);
        return weatherResponse;
    }

    @Override
    protected void onPostExecute(Object result) {
        WeatherDetailsResponse weatherDetailsResponse = (WeatherDetailsResponse) result;


        TextView tvCityName = (TextView) activity.findViewById(R.id.tvCityName);
        tvCityName.setText(weatherDetailsResponse.getCityName());

        TextView tvDate = (TextView) activity.findViewById(R.id.tvDate);
        Calendar currentDate = new GregorianCalendar();
        String dayOfWeek = currentDate.getDisplayName(Calendar.DAY_OF_WEEK , Calendar.LONG, Locale.ENGLISH);
        tvDate.setText(dayOfWeek);

        TextView tvTemp = (TextView) activity.findViewById(R.id.tvTempValue);
        tvTemp.setText(String.valueOf(weatherDetailsResponse.getCurrent().getTemp().intValue())  + (char) 0x00B0 + "C");

        TextView tvHumidity = (TextView) activity.findViewById(R.id.tvHumidity);
        tvHumidity.setText(Html.fromHtml("Humidity: <b>" + weatherDetailsResponse.getCurrent().getHumidity().toString() + "%</b>"));

        TextView tvWind = (TextView) activity.findViewById(R.id.tvWind);
        tvWind.setText(Html.fromHtml("Wind speed: <b>" + weatherDetailsResponse.getCurrent().getWindSpeed().toString() + "m/s</b>"));

        List<WeatherDetailsElementDto> weatherDetailsElementDtos = weatherDetailsResponse.getHourly().getList();
        ListView lv = (ListView) activity.findViewById(R.id.lvWeather);
        lv.setAdapter(new WeatherDetailsListAdapter(activity, weatherDetailsElementDtos));
    }
}

class WeatherDetailsListAdapter extends BaseAdapter {
    class WeatherDetailsViewHolder{
        TextView tvHour;
        TextView tvDetailsWeather;
        TextView tvDetailsHumidity;
        TextView tvDetailsWind;
        int position;
    }

    private Activity activity;
    private List<WeatherDetailsElementDto> weatherDetailsElementDtos;
    private LayoutInflater inflater;

    public WeatherDetailsListAdapter(Activity activity, List<WeatherDetailsElementDto> weatherDetailsHourlyDtoList) {
        this.activity = activity;
        this.weatherDetailsElementDtos = weatherDetailsHourlyDtoList;
    }

    public int getCount() {
        return weatherDetailsElementDtos.size();
    }

    public WeatherDetailsElementDto getItem(int position) {
        return weatherDetailsElementDtos.get(position);
    }

    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        WeatherDetailsViewHolder viewHolder;
        WeatherDetailsElementDto weatherDetailsElementDto = weatherDetailsElementDtos.get(position);

        if (inflater == null)
            inflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null){
            convertView = inflater.inflate(R.layout.weather_details_list_item, null);

            viewHolder = new WeatherDetailsViewHolder();
            viewHolder.tvHour = (TextView) convertView.findViewById(R.id.tvHour);
            viewHolder.tvDetailsWeather = (TextView) convertView.findViewById(R.id.tvDetailsWeather);
            viewHolder.tvDetailsHumidity = (TextView) convertView.findViewById(R.id.tvDetailsHumidity);
            viewHolder.tvDetailsWind = (TextView) convertView.findViewById(R.id.tvDetailsWind);

            convertView.setTag(viewHolder);
        }
        else {
            viewHolder = (WeatherDetailsViewHolder) convertView.getTag();
        }

        if (position != viewHolder.position) {
            viewHolder.position = position;
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(weatherDetailsElementDto.getDateTime());
            int hours = calendar.get(Calendar.HOUR_OF_DAY);
            String hoursStr = (hours < 10) ? ("0" + hours) : hours + "";
            viewHolder.tvHour.setText(hoursStr + ":00");
            viewHolder.tvDetailsWeather.setText(Html.fromHtml("<font color='#66ccff'>" + String.valueOf(weatherDetailsElementDto.getTemp().intValue()) + (char) 0x00B0 + "C</font> (" + weatherDetailsElementDto.getWeatherType() + " - " + weatherDetailsElementDto.getWeatherDescription() + ")"));
            viewHolder.tvDetailsHumidity.setText(Html.fromHtml("Humidity: <b>" + weatherDetailsElementDto.getHumidity() + "%</b>"));
            viewHolder.tvDetailsWind.setText(Html.fromHtml("Atm. pressure: <b>" + weatherDetailsElementDto.getPressure() + "mbar</b>"));

        }

        return (convertView);

    }
}