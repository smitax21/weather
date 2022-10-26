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

  const fetchWeather = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=53.38&lon=-1.47&appid=${APIkey}`
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

    let unixTimestamp = jsonResponse.list[0].dt;
    let jsdate = new Date(unixTimestamp * 1000);
    const nameDay = days[jsdate.getDay(jsdate)];
    const month = months[jsdate.getMonth(jsdate)];
    const date = jsdate.getDate(jsdate);

    // convert kelvin to celcius
    let kelvinMax = jsonResponse.list[0].main.temp_max;
    let maxTemp = Math.floor(kelvinMax - 273.15);
    let kelvinMin = jsonResponse.list[0].main.temp_min;
    let minTemp = Math.floor(kelvinMin - 273.15);

    //convert icon code to image
    let iconcode = jsonResponse.list[0].weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

    createCards({
      date: date + "-" + month + "-" + nameDay,
      picture: iconURL,
      description: jsonResponse.list[0].weather[0].description,
      tempMax: maxTemp,
      tempMin: minTemp,
      windSpeed: jsonResponse.list[0].wind.speed,
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Card style={{ width: "300px" }}>
      <Card.Header>{weatherCards.date}</Card.Header>

      <Card.Body>
        <Card.Img
          id="wicon"
          className="cardImage mx-auto"
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
