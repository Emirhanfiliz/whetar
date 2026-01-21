import { useState, useEffect } from "react";

import "./App.css";

const API_BASE_URL = "https://api.openweathermap.org";
const API_KEY = import.meta.env.VITE_WHETAR_API_KEY;
const API_OPTIONS = {};

function App() {
  const [sehir, setSehir] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=tr`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("faild to fetch weather");
      }
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error(`hava durumu alinamadi: ${error}`);
      setErrorMessage("Hava durumu alınamadı");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather("");
  }, []);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <h1 className="text-white">Tüm hava durumu burada</h1>
            <input
              type="text"
              value={sehir}
              onChange={(e) => setSehir(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchWeather(sehir);
              }}
              placeholder="şehir ara..."
              ke
            />
            <button onClick={() => fetchWeather(sehir)}>Ara</button>
          </header>

          {weather && (
            <div className="text-white">
              <h2>{weather.name}</h2>
              <p>Sıcaklık: {weather.main.temp}°C</p>
              <p>Hissedilen sıcaklık: {weather.main.feels_like}°C</p>
              <p>Durum: {weather.weather[0].description}</p>
              <p>nem:{weather.main.humidity}</p>
              <p>rüzgar:{weather.wind.speed}km/h</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
