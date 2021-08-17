import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProductCard } from "../Product-Card/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { product } from "../../actions/products";

import "./ProductList.css";

export const ProductList = () => {
  // const [products, setProducts] = useState([]);
  const productsList = useSelector((state) => state.productReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(product());
  }, []);

  return (
    <div className="product-list-container">
      <Container>
        <Row xs={2} md={3} lg={4}>
          {productsList.map((product) => {
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
