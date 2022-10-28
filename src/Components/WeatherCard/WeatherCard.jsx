import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./WeatherCard.scss";

const WeatherCard = ({ weatherCard, items }) => {
  // weather card recieves obj straight from db
  // parses that object
  // displays it correctly
  return (
    <>
      <Card style={{ width: "300px" }}>
        <Card.Header>{weatherCard.date}</Card.Header>

        <Card.Body>
          <Card.Img
            id="wicon"
            className="cardImage mx-auto"
            variant="top"
            src={weatherCard.picture}
          />

          <Card.Title className="title">{weatherCard.description}</Card.Title>

          <Row>
            <Col xs={8}>Celcius</Col>
            <Col>Wind</Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>max: {weatherCard.tempMax}</Card.Text>
            </Col>
            <Col>
              <Card.Text>min: {weatherCard.tempMin}</Card.Text>
            </Col>
            <Col>
              <Card.Text>speed: {weatherCard.windSpeed}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {items.map((item, index) => {
        return (
          <Card key={index} style={{ width: "300px" }}>
            <Card.Header>{item.date}</Card.Header>

            <Card.Body>
              <Card.Img
                id="wicon"
                className="cardImage mx-auto"
                variant="top"
                src={item.picture}
              />

              <Card.Title className="title">{item.description}</Card.Title>

              <Row>
                <Col xs={8}>Celcius</Col>
                <Col>Wind</Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>max: {item.tempMax}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>min: {item.tempMin}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>speed: {item.windSpeed}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default WeatherCard;
