import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";

export const ProductCard = (props) => {
  const [rating, setRating] = useState();
  const [title, setTitle] = useState("");
  const product = props.product;

  // const cart = useSelector((state) => state.userInfoReducer.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const productTitle = product.title;
  const productReviews = product.reviews;
  const productType = product.type;

  const allProducts = useSelector((state) => state.productReducer.data);

  const mayAlsoLike = [];

  allProducts.map((products) => {
    if (
      products.type === productType &&
      products.title !== productTitle &&
      mayAlsoLike.length < 4
    ) {
      mayAlsoLike.push(products);
    }
    return mayAlsoLike;
  });

  const settingRating = (reviews) => {
    const listofRatings = reviews.map((rating) => {
      return rating.rating;
    });
    const totalRating = listofRatings.reduce((a, b) => a + b, 0);
    const overallRating = totalRating / listofRatings.length;
    const starRating = [];
    for (let i = 0; i <= 4; i++) {
      const difference = overallRating - i;
      if (difference > 0.5) {
        starRating.push(<ImStarFull key={i} />);
      } else if (difference === 0.5) {
        starRating.push(<ImStarHalf key={i} />);
      } else {
        starRating.push(<ImStarEmpty key={i} />);
      }
    }
    setRating(starRating);
  };

  const settingTitle = (title) => {
    if (title.length > 60) {
      const newTitle = title.substring(0, 60);
      setTitle(newTitle + "...");
    } else {
      setTitle(title);
    }
  };

  useEffect(() => {
    settingTitle(productTitle);
    settingRating(productReviews);
  }, []);

  const productId = product._id;

  const routeToProductview = () => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      payload: productId,
    });
    history.push("/product-view");
  };

  const buttonStyle = {
    boxShadow: "none",
    border: "none",
    background: "#4da58b",
    color: "#000",
    transition: "0.5s",
    borderRadius: "20px",
    width: "150px",
  };

  return (
    <>
      <Card className="product-card">
        <div className="image">
          <Card.Img
            className="product-img d-block mx-auto"
            variant="top"
            src={product.image}
          />
          <div className="image-overlay">
            <Button
              onClick={() => {
                dispatch({
                  type: "SET_MODAL_PRODUCT",
                  payload: product,
                });
              }}
              data-toggle="modal"
              data-target="#productModal"
              className="cart-button"
              style={buttonStyle}
            >
              quick shop
            </Button>
          </div>
        </div>
        <Card.Body className="text-center">
          <Card.Title
            className="card-title"
            onClick={() => routeToProductview()}
          >
            {title}
          </Card.Title>
          <Card.Text className="card-text-rating">{rating}</Card.Text>
          <Card.Text className="card-text-price">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
