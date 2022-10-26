import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./WeatherCard.scss";

const APIkey = process.env.REACT_APP_API_KEY;

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

  const fetchWeather = async (lat, lon) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=53.38&lon=-1.47&appid=${APIkey}`
    );
    let jsonResponse = await response.json();
    console.log(jsonResponse);

    // convert the date
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let unixTimestamp = jsonResponse.dt;
    let jsdate = new Date(unixTimestamp * 1000);
    const nameDay = days[jsdate.getDay(jsdate)];
    const month = months[jsdate.getMonth(jsdate)];
    const date = jsdate.getDate(jsdate);

    // convert kelvin to celcius
    let kelvinMax = jsonResponse.main.temp_max;
    let maxTemp = Math.floor(kelvinMax - 273.15);
    let kelvinMin = jsonResponse.main.temp_min;
    let minTemp = Math.floor(kelvinMin - 273.15);

    createCards({
      date: date + " " + month,
      dayOfWeek: nameDay,
      picture: jsonResponse.weather[0].icon,
      description: jsonResponse.weather[0].description,
      tempMax: maxTemp,
      tempMin: minTemp,
      windSpeed: jsonResponse.wind.speed,
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Card style={{ width: "300px" }}>
      <Card.Header>
        {weatherCards.date + ", "} {weatherCards.dayOfWeek}
      </Card.Header>

      <Card.Body>
        <Card.Img
          className="cardImage"
          variant="top"
          src={weatherCards.picture}
        />
        <Card.Title className="title">{weatherCards.description}</Card.Title>

        <Row>
          <Col xs={8}>Celcius</Col>
          <Col>Wind</Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>max: {weatherCards.tempMax}</Card.Text>
          </Col>
          <Col>
            <Card.Text>min: {weatherCards.tempMin}</Card.Text>
          </Col>
          <Col>
            <Card.Text>speed: {weatherCards.windSpeed}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
