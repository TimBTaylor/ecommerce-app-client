import React from "react";
import {
  Navbar,
  Nav,
  Brand,
  Collaspe,
  Link,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import shoppingcart from "./shopping-cart.svg";

import "./Navigation.css";

export const Navigation = () => {
  return (
    <div>
      <Navbar className="navbar" bg="light" expand="md">
        <Navbar.Brand className="navbar-brand" href="#">
          Timazon <img src={shoppingcart} alt="shopping cart" />{" "}
        </Navbar.Brand>
        <Form className="d-flex">
          <FormControl type="search" className="mr-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="mr-auto my-2 my-lg-0">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Orders</Nav.Link>
          <Nav.Link href="#">Account</Nav.Link>
          <Nav.Link href="#">Cart</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
