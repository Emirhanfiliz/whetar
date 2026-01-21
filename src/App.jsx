import { useState, useEffect, useCallback } from "react";
import { OrbitProgress } from "react-loading-indicators";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import DetailsGrid from "./components/DetailsGrid";
import ForecastList from "./components/ForecastList";
import "./App.css";

const API_BASE_URL = "https://api.openweathermap.org";
const API_KEY = import.meta.env.VITE_WHETAR_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgClass, setBgClass] = useState("from-blue-500 to-purple-600");

  const updateBackground = (weatherMain) => {
    if (!weatherMain) return;
    const main = weatherMain.toLowerCase();
    if (main.includes("clear")) setBgClass("from-blue-400 to-blue-200");
    else if (main.includes("clouds")) setBgClass("from-gray-400 to-gray-200");
    else if (main.includes("rain")) setBgClass("from-gray-700 to-gray-500");
    else if (main.includes("snow")) setBgClass("from-blue-100 to-white");
    else if (main.includes("thunderstorm")) setBgClass("from-gray-900 to-gray-800");
    else setBgClass("from-blue-500 to-purple-600");
  };

  const fetchWeather = async (query) => {
    setIsLoading(true);
    setError("");
    try {
      // Fetch Current Weather
      const weatherRes = await fetch(
        `${API_BASE_URL}/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=tr`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      updateBackground(weatherData.weather[0].main);

      // Fetch Forecast
      const forecastRes = await fetch(
        `${API_BASE_URL}/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric&lang=tr`
      );
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError("");
    try {
      const weatherRes = await fetch(
        `${API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
      );
      if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      updateBackground(weatherData.weather[0].main);

      const forecastRes = await fetch(
        `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
      );
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default city if permission denied or error
          fetchWeather("Istanbul");
        }
      );
    } else {
      fetchWeather("Istanbul");
    }
  }, []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center py-10 px-4 bg-gradient-to-br ${bgClass} transition-all duration-1000 ease-in-out`}
    >
      <SearchBar onSearch={fetchWeather} />

      <div className="flex-grow w-full flex flex-col items-center justify-start mt-10 max-w-4xl">
        {isLoading ? (
          <div className="mt-20">
            <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-white p-4 rounded-lg mt-10 backdrop-blur-md border border-red-500/30">
            {error}
          </div>
        ) : (
          weather && (
            <>
              <WeatherCard weather={weather} />
              <DetailsGrid weather={weather} />
              <ForecastList forecast={forecast} />
            </>
          )
        )}
      </div>
      
       <footer className="mt-10 text-white/50 text-sm">
        Designed with ❤️ using React & Tailwind
      </footer>
    </div>
  );
}

export default App;
