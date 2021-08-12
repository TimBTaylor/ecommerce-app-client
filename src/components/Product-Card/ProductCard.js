import React from "react";
import { Card } from "react-bootstrap";

import "./ProductCard.css";

export class ProductCard extends React.Component {
  render() {
    const { product } = this.props;

    return (
      <Card className="product-card">
        <Card.Img className="product-img" variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
