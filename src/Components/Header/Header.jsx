import React, { useState, useEffect, useSyncExternalStore } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Header.scss";

function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Container className="nav-container">
        <Navbar.Brand href="#"> Weather App</Navbar.Brand>
        <Form className="d-flex">
          <Form.Group className="mb-3">
            <Form.Label>select city</Form.Label>
            <Form.Select>
              <option id="sheffield" value="sheffield">
                Sheffield
              </option>
              <option id="london" value="london">
                London
              </option>
              <option id="manchester" value="manchester">
                Manchester
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
        <Button className="btn" variant="primary">
          5 days forecast
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
