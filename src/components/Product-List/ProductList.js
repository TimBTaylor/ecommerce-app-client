import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { ProductCard } from "../Product-Card/ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  async function getProducts() {
    try {
      const productList = await axios.get(
        "http://ecommersappbytim.herokuapp.com/product/all-products"
      );
      setProducts(productList.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {products.map((product) => {
        return (
          <Col md={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        );
      })}
    </div>
  );
};
