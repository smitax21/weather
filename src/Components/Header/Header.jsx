import React from "react";
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
              <option>London</option>
              <option>Sheffield</option>
              <option>Manchester</option>
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
