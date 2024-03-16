import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import img_1 from "../assets/113.png";
import img_2 from "../assets/305.png";
import {
  defaultCountries,
  fetchCountryWeather,
  fetchUserLocation,
} from "../util/http";
import Country from "./Country";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [countries, setCountries] = useState("");
  const [weather, setWeather] = useState("");

  const london = countries
    ? countries.london.data.current.condition.icon
    : null;
  const newyork = countries
    ? countries.newyork.data.current.condition.icon
    : null;
  const berlin = countries
    ? countries.berlin.data.current.condition.icon
    : null;
  const paris = countries ? countries.paris.data.current.condition.icon : null;
  const abuja = countries ? countries.abuja.data.current.condition.icon : null;
  const beijing = countries
    ? countries.beijing.data.current.condition.icon
    : null;

  // fetch user location
  useEffect(() => {
    async function userLocation() {
      setTimeout(async () => {
        const currLoaction = await fetchUserLocation();
        if (currLoaction) {
          handleWeather(currLoaction);
        }
      }, 1000);
    }

    userLocation();
  }, []);

  useEffect(() => {
    async function fetchcountries() {
      const countriesData = await defaultCountries();
      setCountries((countries) => countriesData);
    }

    fetchcountries();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (userInput.length >= 3) {
        const data = await fetchCountryWeather(userInput);
        handleWeather(data);
      }
    }, 4000);
  }, [userInput]);

  function handleInput(value) {
    setUserInput((Input) => value);
  }

  function handleWeather(data) {
    if (weather) setWeather("");
    setWeather(
      (weather) =>
        (weather = {
          text: data?.data && data.data.current.condition.text,
          icon: data?.data && data.data.current.condition.icon,
          humidity: data?.data && data.data.current.humidity,
          pressure: data?.data && data.data.current.pressure_in,
          wind: data?.data && data.data.current.wind_mph,
          cloud: data?.data && data.data.current.cloud,
          query: data?.data && data.data.location.name,
          location: data?.data && data.data.location,
        })
    );
  }

  return (
    <div>
      <h1 className="mt-12 text-center text-2xl md:text-4xl font-bold uppercase border-b-2 border-b-slate-500 pb-5">
        #1 Weather App
      </h1>

      <main className="w-[80%] md:w-[60%] mx-auto mb-5 mt-10">
        <Input
          input={{
            onChange: (e) => handleInput(e.target.value),
            value: userInput,
          }}
        />
        <div className="flex items-center justify-center gap-1 my-4">
          <img
            src={weather ? weather.icon : img_2}
            alt="#1 weather app"
            className="w-24 md:w-28"
          />
          <small className="text-3xl md:text-4xl  mb-5">
            {weather ? weather.cloud : "#1"}
            <sup>&deg;c </sup>
          </small>
        </div>
        <p className="text-xl md:text-2xl mx-11 md:mx-60">
          {weather ? weather.text : "#1"}
        </p>
        <p className="text-xl md:text-2xl text-right mr-11 md:mr-60 -mt-2">
          {weather ? weather.query : "#1"}
        </p>
        <div
          className="w-[90%] md:w-[50%] mx-auto gap-3 mt-4 grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
          }}
        >
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Wind</span>
            <span className="text-lg">
              {weather ? weather.wind : "#1"} <sup>mph</sup>
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Humidity</span>
            <span className="text-lg">
              {weather ? weather.humidity : "#1"} <sup>%</sup>
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Pressure</span>
            <span className="text-lg">
              {weather ? weather.pressure : "#1"} <sup>in</sup>
            </span>
          </div>
        </div>
      </main>

      <footer
        className="px-8 py-4 mt-12 grid gap-4 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        }}
      >
        <Country img={newyork} countryName="New York" />
        <Country img={london} countryName="London" />
        <Country img={berlin} countryName="Berlin" />
        <Country img={paris} countryName="Paris" />
        <Country img={abuja} countryName="Abuja" />
        <Country img={beijing} countryName="Beijing" />
      </footer>
    </div>
  );
}
