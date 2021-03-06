import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";
import { useDispatch } from "react-redux";

export const ProductCard = (props) => {
  const [rating, setRating] = useState();
  const [title, setTitle] = useState("");
  const product = props.product;

  const dispatch = useDispatch();
  const history = useHistory();

  const productTitle = product.title;
  const productReviews = product.reviews;

  // sets rating of current product
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

  // sets the title of current product
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
  }, [productReviews, productTitle]);

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

  // on smaller screens images a clickable to route to product view page
  const cardImgRoute = () => {
    if (window.innerWidth <= 500) {
      routeToProductview();
    }
  };

  return (
    <>
      <Card className="product-card">
        <div className="image" onClick={() => cardImgRoute()}>
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
          {product.salePrice > 0 ? (
            <>
              <Card.Text className="card-text-price-prev">
                ${product.price}
              </Card.Text>
              <Card.Text className="card-text-price-on-sale">
                ${product.salePrice}
              </Card.Text>
            </>
          ) : (
            <Card.Text className="card-text-price">${product.price}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
