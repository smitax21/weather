import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./WeatherCard.scss";

const WeatherCard = ({ props, weatherCards }) => {
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
};

export default WeatherCard;
