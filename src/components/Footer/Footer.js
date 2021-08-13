import React from "react";
import "./Footer.css";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import github from "./github.svg";
import linkedIn from "./linkedin.svg";
import portfolio from "./portfolio.svg";

export const Footer = () => {
  return (
    <div className="footer-container">
      <Router>
        <Container>
          <Row>
            <div className="media-container">
              <div className="media">
                <a
                  href="https://github.com/TimBTaylor/ecommerce-app-client"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={github} alt="github" className="github" />
                </a>
                <a
                  className="social-media"
                  href="https://github.com/TimBTaylor/ecommerce-app-client"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </div>
              <div className="media">
                <a
                  href="https://www.linkedin.com/in/tim-taylor-aaa970207/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={linkedIn} alt="linkedin" className="linkedIn" />
                </a>
                <a
                  className="social-media"
                  href="https://www.linkedin.com/in/tim-taylor-aaa970207/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
              <div className="media">
                <a
                  href="https://timbtaylor.github.io/personal-portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={portfolio} alt="portfolio" className="portfolio" />
                </a>
                <a
                  className="social-media"
                  href="https://timbtaylor.github.io/personal-portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </Row>
          <hr />
          <Row>
            <div className="legal">
              <p className="col-sm">
                &copy;{new Date().getFullYear()} Tim Taylor
              </p>
            </div>
          </Row>
        </Container>
      </Router>
    </div>
  );
};
