import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const APIkey = process.env.REACT_APP_API_KEY;
// const APIkey = "4b0d1c5c1a6f2b04adf92c038fc18e73";
function WeatherCard() {
  const [weatherCards, createCards] = useState({
    date: "",
    dayOfWeek: "",
    picture: "",
    description: "",
    tempMax: "",
    tempMin: "",
    windSpeed: "",
  });
  const fetchWeather = async () => {
    let response = await fetch(
      // "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=daily&appid=4b0d1c5c1a6f2b04adf92c038fc18e73"
      `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${APIkey}`
    );
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    createCards({
      date: jsonResponse.dt,
      dayOfWeek: "Tuesday",
      picture: "",
      description: "all is fine",
      tempMax: jsonResponse.temp,
      tempMin: jsonResponse.temp,
      windSpeed: jsonResponse.wind_speed,
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Card style={{ width: "300px" }}>
      <Card.Header>The date {weatherCards.date}</Card.Header>
      <Card.Header>Day of the week {weatherCards.dayOfWeek}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={weatherCards.picture} />
        <Card.Title>
          Some summary text describing the weather conditions{" "}
          {weatherCards.description}
        </Card.Title>
        <Card.Text>The maximum temperature {weatherCards.tempMax}</Card.Text>
        <Card.Text>The minimum temperature {weatherCards.tempMin}</Card.Text>
        <Card.Text>The wind speed {weatherCards.windSpeed}</Card.Text>
      </Card.Body>
    </Card>
  );
  // let promise = fetch(
  //   "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={lat}&lon={lon}&exclude={part}&appid={071b215412d0eab5fef2a63c265b5f06}"
  // );
  // console.log(promise);
}

export default WeatherCard;
