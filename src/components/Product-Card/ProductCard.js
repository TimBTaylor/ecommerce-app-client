import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css";
import axios from "axios";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";

export const ProductCard = (props) => {
  const [rating, setRating] = useState();
  const [title, setTitle] = useState("");
  const [inCart, setInCart] = useState();
  const product = props.product;

  const cart = useSelector((state) => state.userInfoReducer.cart);

  const dispatch = useDispatch();

  const productTitle = product.title;
  const productReviews = product.reviews;

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

  // const setCart = () => {
  //   setUsersCart(localStorage.getItem("cart"));
  //   console.log(usersCart);
  // };

  const isInCart = (cart) => {
    cart.forEach((productId) => {
      if (productId === product._id) {
        setInCart(true);
      }
    });
  };

  useEffect(() => {
    isInCart(cart);
    settingTitle(productTitle);
    settingRating(productReviews);
  }, []);

  const removeProduct = async () => {
    const productId = product._id;
    const userId = localStorage.getItem("userId");
    try {
      await axios({
        method: "delete",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/delete-from-cart`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
        },
      }).then((response) => {
        const newCart = {
          cart: response.data,
        };
        dispatch({
          type: "SET_USER_INFO",
          payload: newCart,
        });
        setInCart(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    const productId = product._id;
    const userId = localStorage.getItem("userId");

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/add-to-cart`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
        },
      }).then((response) => {
        const newCart = {
          cart: response.data,
        };
        dispatch({
          type: "SET_USER_INFO",
          payload: newCart,
        });
        setInCart(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card className="product-card">
        <Link className="img-link" style={{ textDecoration: "none" }}>
          <Card.Img
            className="product-img d-block mx-auto"
            variant="top"
            src={product.image}
          />
        </Link>
        <Card.Body className="text-center">
          <Link className="title-link" style={{ textDecoration: "none" }}>
            <Card.Title className="card-title">{title}</Card.Title>
          </Link>
          <Card.Text>{rating}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
          {/* {inCart ? (
            <Button onClick={() => removeProduct()}>Remove from cart</Button>
          ) : (
            <Button onClick={() => addProduct()}>add to cart</Button>
          )} */}
        </Card.Body>
      </Card>
    </>
  );
};
