import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone'; 
import cloudy from '../Assets/cloudy.png';
import sunny from '../Assets/sunny.png';
import rainy from '../Assets/rainy.png';
import snowy from '../Assets/snowy.png';
import loadinggif from '../Assets/loading.gif';

import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsSearch, BsMoon, BsSun } from "react-icons/bs";
import { API_KEY } from '../utils/utils';

const Home = () => {
  // State variables to manage weather data, user input location, loading state, and dark mode
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch weather data for the default location on component mount
  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  // Function to fetch weather data for the default location (Bengaluru)
  const fetchDefaultWeather = async () => {
    const defaultLocation = "Bengaluru";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const defaultData = await response.json();
    setWeatherData(defaultData);
  };

  // Function to fetch weather data based on user input location
  const searchingData = async () => {
    if (location.trim() !== "") {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const searchData = await response.json();
      setLoading(false);
      if (searchData.cod !== 200) {
        setWeatherData({ notFound: true });
      } else {
        setWeatherData(searchData);
        setLocation('');
      }
    }
  };

  // Mapping weather conditions to corresponding images
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  // Setting background images based on weather conditions and dark mode
  const backgroundImages = {
    Clear: darkMode ? 'linear-gradient(to right, #1a202c, #2d3748)' : 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: darkMode ? 'linear-gradient(to right, #2d3748, #4a5568)' : 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: darkMode ? 'linear-gradient(to right, #2d3748, #4a5568)' : 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: darkMode ? 'linear-gradient(to right, #4a5568, #718096)' : 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: darkMode ? 'linear-gradient(to right, #2d3748, #4a5568)' : 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: darkMode ? 'linear-gradient(to right, #2d3748, #4a5568)' : 'linear-gradient(to right, #57d6d4, #71eeec)',
  };

  const backgroundImage = weatherData.weather
    ? backgroundImages[weatherData.weather[0].main]
    : darkMode
      ? 'linear-gradient(to right, #1a202c, #2d3748)'
      : 'linear-gradient(to right, #f3b07c, #fcd283)';

  // Handling Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchingData();
    }
  };

  // Updating location state as user types
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  // Formatting time based on timezone
  const getFormattedTime = (timezone) => {
    return moment().tz(timezone).format('HH:mm');
  };

  // Formatting date based on timezone
  const getFormattedDate = (timezone) => {
    return moment().tz(timezone).format('YYYY-MM-DD');
  };

  // Calculating timezone string for moment-timezone
  const timezone = weatherData.timezone ? `Etc/GMT${weatherData.timezone / 3600 >= 0 ? '-' : '+'}${Math.abs(weatherData.timezone / 3600)}` : 'Etc/GMT';

  // Toggling dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`absolute w-full bg-cover h-fit text-gray-600 font-bold font-mono ${darkMode ? 'dark' : ''}`}>
      <div style={{ backgroundImage }} className='shadow-2xl bg-blur-sm m-auto rounded-xl p-10 my-32 md:w-[600px] sm:w-[370px]'>
        <div className='flex justify-between'>
          <div className='flex'>
            <FaMapLocationDot className='lg:text-xl dark:text-zinc-300'/>
            <h1 className='pl-2 -mt-1 text-black dark:text-white lg:text-xl'>{weatherData.name}</h1>
          </div>
          <button onClick={toggleDarkMode} className='text-black dark:text-white'>
            {darkMode ? <BsSun className='text-2xl' /> : <BsMoon className='text-2xl' />}
          </button>
        </div>
        <div className='py-5'>
          <input
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={location}
            className='text-gray-600 dark:text-gray-300 bg-transparent border-solid border-gray-600 dark:border-gray-300 border-[1px] absolute rounded-lg py-3 pl-3 lg:w-[530px] md:w-[230px] sm:w-[300px]'
            type='text'
            placeholder='Enter Location'
          />
          <BsSearch onClick={searchingData} className='text-gray-500 dark:text-gray-300 absolute mt-4 cursor-pointer lg:ml-[500px] md:ml-[400px] sm:ml-[260px]' />
        </div>
        {loading ? (
          <img className='h-10 m-auto mt-44' src={loadinggif} alt='Loading' />
        ) : weatherData.notFound ? (
          <div className='text-red-500 flex items-center mt-44 font-bold text-2xl'> Location Not Found..</div>
        ) : (
          <>
            {weatherData.weather && <img className='mt-2 sm:mt-8' src={weatherImages[weatherData.weather[0].main]} alt='Weather' />}
            <div className='flex justify-between pb-4 -mt-24 sm:pt-10'>
              <h1 className='dark:text-zinc-300'>Date: <span className='text-black dark:text-white'>{getFormattedDate(timezone)}</span></h1>
              <h1 className='dark:text-zinc-300'>Time: <span className='text-black dark:text-white'>{getFormattedTime(timezone)}</span></h1>
            </div>
            <div className='flex flex-col items-center'>
              <h1 className='text-xl text-black dark:text-white md:-mt-28 md:mb-20 sm:pt-10'>{weatherData.weather ? weatherData.weather[0].main : null}</h1>
              <h1 className='text-8xl text-black dark:text-white font-serif-Merriweather'>{weatherData.main ? `${Math.floor(weatherData.main.temp)}°` : null}</h1>
            </div>
            <div className='flex justify-between py-8'>
              <div className='bg-transparent flex flex-col items-center shadow-lg p-4 rounded-md lg:w-2/6 md:w-2/6 sm:w-3/6'>
                <h1 className='dark:text-zinc-300'>Humidity</h1>
                <WiHumidity className='text-white text-4xl my-2'/>
                <p className='text-black dark:text-white font-sans text-2xl'>{weatherData.main ? weatherData.main.humidity : null}%</p>
              </div>
              <div className='bg-transparent flex flex-col items-center shadow-lg p-4 rounded-md lg:w-2/6 md:w-2/6 sm:w-3/6'>
                <h1 className='dark:text-zinc-300'>Wind</h1>
                <FaWind className='text-white text-4xl my-2'/>
                <p className='text-black dark:text-white font-sans text-2xl'>{weatherData.wind ? weatherData.wind.speed : null} km/hr</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
