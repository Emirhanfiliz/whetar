import React from "react";
import { motion } from "framer-motion";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    sys: { country },
    main: { temp },
    weather: details,
  } = weather;

  const iconUrl = `https://openweathermap.org/img/wn/${details[0].icon}@4x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-white"
    >
      <div className="text-center mb-2">
        <h2 className="text-4xl font-bold tracking-wide">
          {name}, {country}
        </h2>
        <p className="text-xl font-light capitalize opacity-90">
          {details[0].description}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={iconUrl}
          alt={details[0].description}
          className="w-40 h-40 drop-shadow-2xl"
        />
        <h1 className="text-8xl font-thin tracking-tighter">
          {Math.round(temp)}°
        </h1>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
