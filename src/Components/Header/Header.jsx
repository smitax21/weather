import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Header.scss";

function Header() {
  const [location, setLocation] = useState({
    london: "",
    sheffield: "",
    manchester: "",
  });

  const refreshSelect = (event) => {
    setLocation(event.target.value);
  };

  return (
    <Navbar bg="light" variant="light">
      <Container className="nav-container">
        <Navbar.Brand href="#"> Weather App</Navbar.Brand>
        <Form className="d-flex">
          <Form.Group className="mb-3">
            <Form.Label>select city</Form.Label>
            <Form.Select>
              <option value="london">London</option>
              <option value="sheffield">Sheffield</option>
              <option vallue="manchester">Manchester</option>
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
