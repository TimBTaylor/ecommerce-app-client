import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <div className="footer-container">
      <Container>
        <Row>
          <Col>
            <h4>title</h4>
            <ul className="list-unstyled">
              <li>3232</li>
              <li>New York, US</li>
              <li>123 street south north</li>
            </ul>
          </Col>
          <Col>
            <h4>anotehr</h4>
            <ul className="list-unstyled">
              <li>dank</li>
              <li>more dank</li>
              <li>alot dank</li>
            </ul>
          </Col>
          <Col>
            <h4>anotehr</h4>
            <ul className="list-unstyled">
              <li>dank</li>
              <li>more dank</li>
              <li>alot dank</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Tim Taylor | All right reserved
          </p>
        </Row>
      </Container>
    </div>
  );
};
