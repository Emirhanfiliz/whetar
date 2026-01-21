import React from "react";

const ForecastList = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Filter to get daily forecast (approx every 24h) or use first 5 items for hourly
  // Let's take one reading per day (e.g., noon) for the next 5 days
  const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

  return (
    <div className="w-full max-w-2xl mt-8">
      <h3 className="text-white text-xl font-semibold mb-4 px-2">5-Day Forecast</h3>
      <div className="flex flex-col gap-3">
        {dailyForecast.map((item) => (
          <div
            key={item.dt}
            className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-sm"
          >
            <p className="text-white font-medium w-1/4">
              {new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <div className="flex items-center justify-center w-1/4">
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />
            </div>
            <p className="text-gray-200 capitalize w-1/4 text-center text-sm">
              {item.weather[0].description}
            </p>
            <p className="text-white font-bold w-1/4 text-right">
              {Math.round(item.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
