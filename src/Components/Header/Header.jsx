import React, { useState, useEffect, useSyncExternalStore } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Header.scss";

const APIkey = process.env.REACT_APP_API_KEY;
function Header() {
  const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    let london = document.getElementById("london").value;
    let sheffield = document.getElementById("sheffield").value;
    let manchester = document.getElementById("manchester").value;
    if (london) {
      let url = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let lat = 51.51;
        let lon = -0.12;
        getDatafor7days(lat, lon);
      } catch (error) {}
    } else if (manchester) {
      let url = `http://api.openweathermap.org/geo/1.0/direct?q=Manchester&limit=5&appid={APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let lat = 53.48;
        let lon = -2.24;
        getDatafor7days(lat, lon);
      } catch (error) {}
    } else if (sheffield) {
      let url = `https://api.openweathermap.org/geo/1.0/direct?q=Sheffield&limit=5&appid={APIkey}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let lat = 53.38;
        let lon = -1.47;
        getDatafor7days(lat, lon);
      } catch (error) {}
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container className="nav-container">
        <Navbar.Brand href="#"> Weather App</Navbar.Brand>
        <Form className="d-flex">
          <Form.Group className="mb-3">
            <Form.Label>select city</Form.Label>
            <Form.Select onSelect={(event) => getData(event)}>
              <option id="sheffield" value="sheffield">
                Sheffield
              </option>
              <option id="london" value="london">
                London
              </option>
              <option id="manchester" vallue="manchester">
                Manchester
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
        <Button variant="primary">5 days forecast</Button>
        <Button variant="primary">7 days forecast</Button>
      </Container>
    </Navbar>
  );
}

export default Header;
