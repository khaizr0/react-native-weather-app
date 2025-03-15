import React from "react";
import styled from "styled-components/native";

const CurrentForecast = ({ currentWeather }) => {
  return (
    <CurrentView>
      <Timezone>{currentWeather.location?.name}, {currentWeather.location?.country}</Timezone>
      <MainInfoContainer>
        <CurrentTempView>
          {currentWeather.current && (
            <WeatherIcon
              source={{
                uri: `https:${currentWeather.current.condition.icon}`,
              }}
              resizeMode={"contain"}
            />
          )}
          <CurrentDegrees>
            {Math.round(currentWeather.current?.temp_c)}°C
          </CurrentDegrees>
        </CurrentTempView>
        <Description>
          {currentWeather.current?.condition.text}
        </Description>
      </MainInfoContainer>
      <SecondaryInfoContainer>
        <Row>
          <DetailsBox>
            <Label>Feels</Label>
            <Details>
              {currentWeather.current && Math.round(currentWeather.current.feelslike_c)}°C
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Low</Label>
            <Details>
              {currentWeather.forecast && Math.round(currentWeather.forecast.forecastday[0].day.mintemp_c)}°C
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>High</Label>
            <Details>
              {currentWeather.forecast && Math.round(currentWeather.forecast.forecastday[0].day.maxtemp_c)}°C
            </Details>
          </DetailsBox>
        </Row>
        <Row>
          <DetailsBox>
            <Label>Wind</Label>
            <Details>
              {currentWeather.current && currentWeather.current.wind_kph} km/h
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Humidity</Label>
            <Details>
              {currentWeather.current && currentWeather.current.humidity}%
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Rain</Label>
            <Details>
              {currentWeather.forecast ? currentWeather.forecast.forecastday[0].day.totalprecip_mm : "0"} MM
            </Details>
          </DetailsBox>
        </Row>
      </SecondaryInfoContainer>
    </CurrentView>
  );
};

const CurrentView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CurrentTempView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MainInfoContainer = styled.View`
  display: flex;
  align-items: center;
`;

const Description = styled.Text`
  color: white;
  font-size: 15px;
  text-transform: capitalize;
`;

const SecondaryInfoContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 10px;
  width: 95%;
  max-width: 478px;
`;

const WeatherIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const Timezone = styled.Text`
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 15px;
`;

const CurrentDegrees = styled.Text`
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 60px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: black;
  padding: 10px 30px;
`;

const DetailsBox = styled.View`
  display: flex;
`;

const Label = styled.Text`
  font-size: 18px;
`;

const Details = styled.Text`
  color: black;
  font-size: 15px;
  text-transform: capitalize;
`;

export default CurrentForecast;