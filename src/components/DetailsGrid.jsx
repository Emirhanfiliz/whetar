import React from "react";
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from "react-icons/wi";

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
    <Icon className="text-3xl text-white mb-2" />
    <span className="text-sm text-gray-200 font-medium">{label}</span>
    <span className="text-lg text-white font-bold">{value}</span>
  </div>
);

const DetailsGrid = ({ weather }) => {
  if (!weather) return null;

  const {
    main: { humidity, pressure, feels_like },
    wind: { speed },
  } = weather;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-8">
      <DetailItem icon={WiHumidity} label="Humidity" value={`${humidity}%`} />
      <DetailItem icon={WiStrongWind} label="Wind Speed" value={`${Math.round(speed)} km/h`} />
      <DetailItem icon={WiBarometer} label="Pressure" value={`${pressure} hPa`} />
      <DetailItem icon={WiThermometer} label="Feels Like" value={`${Math.round(feels_like)}°`} />
    </div>
  );
};

export default DetailsGrid;
