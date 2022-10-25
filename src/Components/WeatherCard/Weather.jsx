import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import "./WeatherCard.scss";

const APIkey = process.env.REACT_APP_API_KEY;
const base_url = `https://api.openweathermap.org/data/2.5/weather?lat=53.38&lon=-1.47&exclude=hourly,daily&appid=${APIkey}`;
// const base_url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${APIkey}`;
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

  // const fetchWeather = async () => {
  //   let response = await fetch(base_url);
  //   let jsonResponse = await response.json((data) => console.log(data));

  //   console.log(jsonResponse);
  //   createCards({
  //     date: jsonResponse.dt,
  //     dayOfWeek: "",
  //     picture: jsonResponse.weather[0].icon,
  //     desc: jsonResponse.weather[0].description,
  //     tempMax: jsonResponse.main.temp_max,
  //     tempMin: jsonResponse.main.temp_min,
  //     windSpeed: jsonResponse.data.wind.speed,
  //   });
  // };

  useEffect(() => {
    // fetchWeather();
    axios.get(base_url).then((res) =>
      // console.log(res.data.daily)
      createCards({
        date: res.data.dt,
        dayOfWeek: "",
        picture: res.data.weather[0].icon,
        desc: res.data.weather[0].description,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        windSpeed: res.data.wind.speed,
      })
    );
  }, []);

  return (
    <Card style={{ width: "300px" }} className="card">
      <Card.Header>The date {weatherCards.date}</Card.Header>
      <Card.Header>Day of the week {weatherCards.dayOfWeek}</Card.Header>
      <Card.Body>
        <Card.Img
          variant="top"
          src={createCards.picture}
          alt={createCards.picture}
        />
        {/* <img src={createCards.picture} /> */}

        <Card.Title className="title">{weatherCards.desc}</Card.Title>
        <Row className="row">
          <Col xs={8}>celcius</Col>

          <Col>Wind</Col>
        </Row>
        <Row className="row">
          <Col>
            <Card.Text>max: {weatherCards.tempMax}</Card.Text>
          </Col>
          <Col>
            <Card.Text>min: {weatherCards.tempMin}</Card.Text>
          </Col>
          <Col>
            <Card.Text> {weatherCards.windSpeed}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
