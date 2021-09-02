import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProductCard } from "../Product-Card/ProductCard";
import { useSelector } from "react-redux";

import "./ProductList.css";

export const ProductList = () => {
  const filteredProductsList = useSelector(
    (state) => state.productReducer.filteredData
  );
  return (
    <div className="product-list-container">
      <Container>
        <Row xs={2} md={3} lg={4}>
          {filteredProductsList.map((product) => {
            return (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
