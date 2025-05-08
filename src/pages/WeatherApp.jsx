import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { FiSunset } from "react-icons/fi";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { MdOutlineVisibility, MdOutlineWaves } from "react-icons/md";

const WeatherApp = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("Mumbai");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        fetchApiData(search);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [search]);

  const fetchApiData = (name) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${name.trimEnd()}&appid=${import.meta.env.VITE_API_KEY}`;

    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod === "404") {
          setError("City not found");
          setApiData(null);
        } else if (res.cod === "400") {
          setError("Please enter a city name");
          setApiData(null);
        } else {
          setError(null);
          setApiData(res);
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again .");
        setApiData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchApiData(search);
  }, []);

  if (error) return <ErrorPage err={error} seterr={setError}/>;

  if (isLoading) return <Loader />
  return (
    <section className="home-section f-column ">
      <div className="home-container  ">
        <div className="current-weather  ">
          <div className="search ">
            <input
              placeholder="Search "
              autoComplete="true"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <button onClick={() => fetchApiData(search)}>
              <FaSearch />
            </button>
          </div>

          {apiData && (
            <div className="weather ">
              <span>
                <h3>
                  {apiData.city.name}-{apiData.city.country}
                </h3>
                <p>{apiData.list[0].weather[0].description}</p>
                <h1>{Math.round(apiData.list[0].main.temp - 273.15)}°C</h1>
                <p>
                  {new Date().getDate() +
                    "/" +
                  months[new Date().getMonth()] +
                    "/" +
                    new Date().getFullYear()}
                </p>
              </span>
              <img
                className="climateIcon"
                src={`http://openweathermap.org/img/wn/${apiData.list[0].weather[0].icon}@2x.png`}
                alt="weather"
              />
            </div>
          )}
          <div className="hourlyData ">
            {apiData?.list.slice(0, 6).map((item, index) => (
              <span key={index}>
                <p>
                  {new Date(item.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="clouds"
                />
                <h4>{Math.round(item.main.temp - 273.15)}°C</h4>
              </span>
            ))}
          </div>

          {apiData && (
            <div className="weather-desc ">
              <h5>More about today's weather</h5>
              <div className="detailData ">
                <span>
                  <WiSunrise />
                  <p>Sunrise</p>
                  <h4>
                    {new Date(apiData.city.sunrise * 1000).toLocaleTimeString()}
                  </h4>
                </span>
                <span>
                  <FiSunset />
                  <p>Sunset</p>
                  <h4>
                    {new Date(apiData.city.sunset * 1000).toLocaleTimeString()}
                  </h4>
                </span>
                <span>
                  <FaTemperatureArrowUp />
                  <p>Temp Max</p>
                  <h4>
                    {Math.round(apiData.list[0].main.temp_max - 273.15)}°C
                  </h4>
                </span>
                <span>
                  <FaTemperatureArrowDown />
                  <p>Temp Min</p>
                  <h4>
                    {Math.round(apiData.list[0].main.temp_min - 273.15)}°C
                  </h4>
                </span>
                <span>
                  <WiHumidity />
                  <p>Humidity</p>
                  <h4>{apiData.list[0].main.humidity}%</h4>
                </span>
                <span>
                  <FaWind />
                  <p>Wind Speed</p>
                  <h4>{apiData.list[0].wind.speed} m/s</h4>
                </span>
                <span>
                  <MdOutlineVisibility />
                  <p>Visibility</p>
                  <h4>{apiData.list[0].visibility / 1000} km</h4>
                </span>
                <span>
                  <MdOutlineWaves />
                  <p>Sea Level</p>
                  <h4>
                    {apiData.list[0].main.sea_level
                      ? `${apiData.list[0].main.sea_level} hPa`
                      : "N/A"}
                  </h4>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="weaklyforcast  ">
          {apiData && (
            <div className="weakData ">
              <h3>5 Days Forecast</h3>
              {apiData.list
                .filter((item) => item.dt_txt.includes("12:00:00")) // get 12 PM for each day
                .slice(0, 5) // take only 5 days
                .map((item, index) => (
                  <span key={index} className="">
                    <p>
                      {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                    <p>{item.weather[0].main}</p>
                    <p>
                      {Math.round(item.main.temp_max - 273.15)}° /{" "}
                      {Math.round(item.main.temp_min - 273.15)}°
                    </p>
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
