import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  myWeather: any;
  temperature: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  feelsLike: number = 0;
  summary: string = '';
  weatherIcon: string = '';
  city: string = 'Mombasa';
  units: string = 'metric';


  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {

    this.weatherService.getWeather(
      this.city,
      this.units) 

      .subscribe({

      next: (res) => {
        console.log(res)
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.feelsLike = this.myWeather.main.feels_like;
        this.summary = this.myWeather.weather[0].main;
        this.weatherIcon = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png'
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API Call Successfull.')
    })
    
  }

}
