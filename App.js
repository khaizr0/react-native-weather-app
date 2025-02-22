import React, { useEffect, useState } from "react";
import { ScrollView, ImageBackground } from "react-native";
import ForecastSearch from "./components/ForecastSearch";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import styled from "styled-components/native";
import config from "./config";
import bgImg from "./assets/4.png";

const App = () => {
  const [toggleSearch, setToggleSearch] = useState("city");
  const [city, setCity] = useState("Toronto");
  const [postalCode, setPostalCode] = useState("L4W1S9");
  const [weather, setWeather] = useState({});

  const controller = new AbortController();
  const signal = controller.signal;

  // Fetch weather by city
  const fetchLatLongHandler = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${config.WEATHER_API_KEY}&q=${city}&days=7&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  // Fetch weather by postal code
  const fetchByPostalHandler = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${config.WEATHER_API_KEY}&q=${postalCode}&days=7&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  // Initial weather fetch
  useEffect(() => {
    fetchLatLongHandler();
    return () => controller.abort();
  }, []);

  return (
    <Container>
      <ImageBackground source={bgImg} style={{ width: "100%", height: "100%" }}>
        <ForecastSearch
          city={city}
          setCity={setCity}
          fetchLatLongHandler={fetchLatLongHandler}
          toggleSearch={toggleSearch}
          setToggleSearch={setToggleSearch}
          fetchByPostalHandler={fetchByPostalHandler}
          setPostalCode={setPostalCode}
          postalCode={postalCode}
        />
        <CurrentForecast currentWeather={weather} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
          <FutureForecastContainer>
            {weather.forecast ? (
              weather.forecast.forecastday.map((day, index) => {
                if (index !== 0) {
                  return <DailyForecast key={day.date_epoch} day={day} index={index} />;
                }
              })
            ) : (
              <NoWeather>No Weather to show</NoWeather>
            )}
          </FutureForecastContainer>
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: dodgerblue;
`;

const NoWeather = styled.Text`
  text-align: center;
  color: white;
`;

const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;