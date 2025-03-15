import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";

const DailyForecast = ({ day, index }) => {
  return (
    <DayContainer>
      <DateContainer>
        <WeekDay>{moment(day.date).format("ddd")}</WeekDay>
      </DateContainer>
      <IconTempView>
        <WeatherIcon
          source={{
            uri: `https:${day.day.condition.icon}`,
          }}
          resizeMode={"contain"}
        />
        <Text>{day.day.condition.text}</Text>
      </IconTempView>
      <DegreeView>
        <Degree>{Math.round(day.day.maxtemp_c)}°C</Degree>
        <FeelsLike>Avg {Math.round(day.day.avgtemp_c)}°C</FeelsLike>
      </DegreeView>
    </DayContainer>
  );
};

const DayContainer = styled.View`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  max-width: 478px;
`;

const DateContainer = styled.View`
  text-align: right;
  flex: 1;
`;

const WeekDay = styled.Text`
  font-size: 24px;
  text-align: center;
  margin: 3px;
`;

const IconTempView = styled.View`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  flex: 2;
`;

const WeatherIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const DegreeView = styled.View`
  text-align: center;
  flex: 1;
`;

const Degree = styled.Text`
  font-size: 24px;
`;

const FeelsLike = styled.Text`
  font-size: 14px;
`;

export default DailyForecast;