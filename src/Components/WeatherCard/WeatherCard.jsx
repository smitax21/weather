import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const APIkey = process.env.REACT_APP_API_KEY;
const base_url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${APIkey}`;

function WeatherCard() {
  const [weatherCards, createCards] = useState({
    date: "",
    dayOfWeek: "",
    picture: "",
    desc: "",
    tempMax: "",
    tempMin: "",
    windSpeed: "",
  });

  useEffect(() => {
    axios.get(base_url).then((res) =>
      createCards({
        date: res.dt,
        dayOfWeek: "",
        picture: "",
        desc: res.data.weather[0].description,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        windSpeed: res.data.wind.speed,
      })
    );
    console.log(createCards.date);
  }, []);

  return (
    <Card style={{ width: "300px" }}>
      <Card.Header>The date {weatherCards.date}</Card.Header>
      <Card.Header>Day of the week {weatherCards.dayOfWeek}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={weatherCards.picture} />
        <Card.Title>
          Some summary text describing the weather conditions:{" "}
          {weatherCards.desc}
        </Card.Title>
        <Card.Text>The maximum temperature: {weatherCards.tempMax}</Card.Text>
        <Card.Text>The minimum temperature: {weatherCards.tempMin}</Card.Text>
        <Card.Text>The wind speed: {weatherCards.windSpeed}</Card.Text>
      </Card.Body>
    </Card>
  );
  // let promise = fetch(
  //   "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={lat}&lon={lon}&exclude={part}&appid={071b215412d0eab5fef2a63c265b5f06}"
  // );
  // console.log(promise);
}

export default WeatherCard;
