import React from 'react'
import './Weather.css'
import { useEffect, useState, useRef  } from 'react';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';


const Weather = () => {

  const inputRef= useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async(city)=>{
    if(city === ""){
      alert('Enter City Name');
      return; 
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }
      
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  }

  useEffect(()=>{
    search("Mumbai")
  },[]) /* useEffect helps Automatically fetch weather data for a default
   city (e.g., "Mumbai") when the component first loads. */

  return (
      <div className="weather">
        <div className="search-bar">
          <input ref={inputRef} type='text' placeholder='Search'/>
          <img src={search_icon} alt='search-icon' onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData?<>
          <img src={weatherData.icon} alt='weather-icon' className='weather-icon'/>
        <p className='temparature'>{weatherData.temperature}&deg;c</p>
        <p className='location'>{weatherData.location}</p>

        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt='humidity-icon'/>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt='wind-icon'/>
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind speed</span>
              </div>
          </div>
        </div>
        </>:<></>}
        
      </div>
  )
}

export default Weather