import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css";
import axios from "axios";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";

export const ProductCard = (props) => {
  const [rating, setRating] = useState();
  const [title, setTitle] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productSize, setProductSize] = useState();
  const [addedToCart, setAddedToCart] = useState();
  const product = props.product;

  const cart = useSelector((state) => state.userInfoReducer.cart);

  const dispatch = useDispatch();

  const productTitle = product.title;
  const productReviews = product.reviews;
  const sizes = product.sizes;

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

  // const isInCart = (cart) => {
  //   cart.forEach((productId) => {
  //     if (productId === product._id) {
  //       setInCart(true);
  //     }
  //   });
  // };

  useEffect(() => {
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addProductToCart = async () => {
    const productId = product._id;
    const userId = localStorage.getItem("userId");

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/add-to-cart`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
          quantity: productQuantity,
        },
      }).then((response) => {
        const newCart = {
          cart: response.data,
        };
        dispatch({
          type: "SET_USER_INFO",
          payload: newCart,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addProductToWishList = async () => {
    const productId = product._id;
    const userId = localStorage.getItem("userId");

    try {
      await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/saved/${userId}/add-to-saved`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
          quantity: productQuantity,
        },
      }).then((response) => {
        console.log(response);
        const newWishlist = {
          wishlist: response.data,
        };
        dispatch({
          type: "SET_USER_INFO",
          payload: newWishlist,
        });
      });
    } catch (error) {
      console.error(error);
    }
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

  const viewDetailsStyle = {
    color: "#3D3D3D",
  };

  const increaseProductQuantity = () => {
    if (productQuantity < product.quantity) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
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
          <Link
            to="/"
            className="body-link"
            style={{ textDecoration: "none" }}
          ></Link>
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-text-rating">{rating}</Card.Text>
          <Card.Text className="card-text-price">${product.price}</Card.Text>
        </Card.Body>
      </Card>
      <div className="container">
        <div
          className="modal left fade"
          id="productModal"
          tabIndex=""
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog product-modal-dialog" role="document">
            <div className="modal-content product-modal-content">
              <div className="modal-header quickshop-modal-header">
                <p className="quickshop-title">Quick View</p>
                <button
                  type="button"
                  className="close quickshop-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body product-modal-body">
                <p className="quickshop-product-title">{title}</p>
                <img
                  src={product.image}
                  alt="product-img"
                  className="quickshop-product-image"
                />
                <hr className="line-break" />
                <div className="quickshop-price-container">
                  <p className="quickshop-price-title">Price:</p>
                  <p className="quickshop-price-number">${product.price}</p>
                </div>
                <hr className="line-break quickshop-linebreak" />
                <div className="quickshop-price-size-container">
                  <div className="quickshop-size-container">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue>SIZE</option>
                      {sizes.map((size) => {
                        return (
                          <option
                            onClick={() => setProductSize(size)}
                            key={size}
                          >
                            {size}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="quickshop-quantity-container">
                    <button
                      className="quickshop-minus"
                      onClick={() => decreaseProductQuantity()}
                    >
                      <AiOutlineMinus />
                    </button>
                    <p className="current-quantity">{productQuantity}</p>
                    <button
                      className="quickshop-plus"
                      onClick={() => increaseProductQuantity()}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <hr className="line-break quickshop-linebreak" />
                <div
                  className="quickshop-add-product"
                  onClick={() => {
                    addProductToCart();
                    setAddedToCart(true);
                  }}
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#productAddedModal"
                >
                  <p className="quickshop-add-to-cart">ADD TO CART</p>
                  <IoCartOutline className="quickshop-cart-icon" />
                </div>
                <div
                  className="quickshop-add-wishlist"
                  onClick={() => {
                    addProductToWishList();
                    setAddedToCart(false);
                  }}
                >
                  <p className="quickshop-add-to-wishlist">ADD TO WISH LIST</p>
                  <HiOutlineHeart className="quickshop-wishlist-icon" />
                </div>
                <Link
                  style={viewDetailsStyle}
                  to="/"
                  className="quickshop-view-all-details"
                >
                  View All Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="modal left fade"
          id="productAddedModal"
          tabIndex=""
          role="dialog"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog product-modal-dialog" role="document">
            <div className="modal-content product-modal-content">
              <div className="modal-header quickshop-modal-header">
                <button
                  className="product-added-back-container"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#productModal"
                >
                  <IoChevronBack className="product-added-arrow" />
                  <p className="product-added-back">Back</p>
                </button>
                <button
                  type="button"
                  className="close quickshop-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body product-modal-body">
                <p className="quickshop-product-title">
                  {addedToCart ? "Added to cart:" : "Added to wishlist"}
                </p>
                <div className="product-added-product-information">
                  <div className="product-added-product-image">
                    {product.image}
                  </div>
                  <div className="product-added-product-details">
                    <p className="product-added-product-title">{title}</p>
                    <p className="product-added-product-price">
                      ${product.price}
                    </p>
                    <p className="product-added-product-size">{productSize}</p>
                    <p className="product-added-product-quantity">
                      {productQuantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
