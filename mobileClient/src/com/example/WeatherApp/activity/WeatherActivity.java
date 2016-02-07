package com.example.WeatherApp.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;

import com.example.WeatherApp.R;
import com.example.WeatherApp.dto.WeatherDto;
import com.example.WeatherApp.dto.WeatherResponse;
import com.example.WeatherApp.service.DataService;
import com.example.WeatherApp.service.DataServiceImpl;

import java.util.List;

public class WeatherActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.weather_activity);

        new WeatherAsyncTask(this).execute();

    }
}

class WeatherAsyncTask extends AsyncTask<Object, Object, Object> {

    Activity activity;

    public WeatherAsyncTask(Activity activity) {
        this.activity = activity;
    }

    @Override
    protected Object doInBackground(Object... params) {
        DataService dataService = new DataServiceImpl();
        WeatherResponse weatherResponse = dataService.getWeather();
        return weatherResponse.getWeather();
    }

    @Override
    protected void onPostExecute(Object result) {
        List<WeatherDto> weatherDtoList = (List) result;
        ListView lv = (ListView) activity.findViewById(R.id.lvWeather);
        lv.setAdapter(new WeatherListAdapter(activity, weatherDtoList));
    }
}

class WeatherListAdapter extends BaseAdapter {
    class WeatherViewHolder{
        TextView tvCityName;
        TextView tvTempValue;
        TextView tvDescription;
        ImageView ivWeather;
        ImageButton btnSeeWeatherDetails;
        int position;
    }

    private Activity activity;
    private List<WeatherDto> weatherDtoList;
    private LayoutInflater inflater;

    public WeatherListAdapter(Activity activity, List<WeatherDto> weatherDtoList) {
        this.activity = activity;
        this.weatherDtoList = weatherDtoList;
    }

    public int getCount() {
        return weatherDtoList.size();
    }

    public WeatherDto getItem(int position) {
        return weatherDtoList.get(position);
    }

    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        WeatherViewHolder viewHolder;
        WeatherDto weatherDto = weatherDtoList.get(position);

        if (inflater == null)
            inflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null){
            convertView = inflater.inflate(R.layout.weather_list_item, null);

            viewHolder = new WeatherViewHolder();
            viewHolder.tvCityName = (TextView) convertView.findViewById(R.id.tvCityName);
            viewHolder.tvTempValue = (TextView) convertView.findViewById(R.id.tvTempValue);
            viewHolder.tvDescription = (TextView) convertView.findViewById(R.id.tvWeatherType);
            viewHolder.ivWeather = (ImageView) convertView.findViewById(R.id.ivWeather);
            viewHolder.btnSeeWeatherDetails = (ImageButton) convertView.findViewById(R.id.btnSeeWeatherDetails);

            convertView.setTag(viewHolder);
        }
        else {
            viewHolder = (WeatherViewHolder) convertView.getTag();
        }

        if (position != viewHolder.position) {
            viewHolder.position = position;
            viewHolder.tvCityName.setText(weatherDto.getCityName());
            viewHolder.tvTempValue.setText(String.valueOf(weatherDto.getTemp().intValue()) + (char) 0x00B0);
            viewHolder.tvDescription.setText(weatherDto.getWeatherType());

            switch (weatherDto.getWeatherType()){
                case "Clouds":
                    viewHolder.ivWeather.setImageResource(R.drawable.cloudy);
                    break;
                case "Clear":
                    viewHolder.ivWeather.setImageResource(R.drawable.sunny);
                    break;
                case "Drizzle":
                    viewHolder.ivWeather.setImageResource(R.drawable.snow);
                    break;
                default:
                    viewHolder.ivWeather.setImageResource(R.drawable.rainy);
                    break;

            }

            viewHolder.btnSeeWeatherDetails.setTag(weatherDto.getCityId());
            viewHolder.btnSeeWeatherDetails.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, WeatherDetailsActivity.class);
                    intent.putExtra("cityId", v.getTag().toString());
                    activity.startActivity(intent);
                }
            });
        }


        return (convertView);

    }
}
