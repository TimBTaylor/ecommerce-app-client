import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi";
import { addToCart } from "../../actions/addToCart";
import { addToWishlist } from "../../actions/addToWishlist";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { IoPersonCircle } from "react-icons/io5";

import "./ProductView.css";

export const ProductView = () => {
  const [productSize, setProductSize] = useState();
  const [productQuantity, setProductQuantity] = useState(1);
  const [sizeInvalid, setSizeInvalid] = useState(false);
  const [addedToCart, setAddedToCart] = useState();

  const productId = useSelector((state) => state.userInfoReducer.productView);

  const cart = useSelector((state) => state.userInfoReducer.cart);

  const wishlist = useSelector((state) => state.userInfoReducer.wishlist);

  const dispatch = useDispatch();
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const allProducts = useSelector((state) => state.productReducer.data);

  let alikeProducts = [];

  let productToDisplay;

  let title;

  allProducts.map((product) => {
    if (product._id === productId) {
      productToDisplay = product;
      if (product.title.length > 60) {
        title = product.title.substring(0, 60) + "...";
      } else {
        title = product.title;
      }
    }
    return productToDisplay;
  });

  allProducts.map((product) => {
    if (
      product.type === productToDisplay.type &&
      alikeProducts.length < 3 &&
      product._id !== productId &&
      product.gender === productToDisplay.gender
    ) {
      let title;
      if (product.title.length > 60) {
        title = product.title.substring(0, 60) + "...";
      } else {
        title = product.title;
      }
      const newProduct = {
        productImg: product.image,
        productId: product._id,
        price: product.price,
        title,
      };

      alikeProducts.push(newProduct);
    }
    return alikeProducts;
  });

  //added to cart/wishlist modal recommendations
  let mayAlsoLikeProduct = [];
  let listOfSameGender = [];
  allProducts.map((product) => {
    if (
      product.gender === productToDisplay.gender &&
      product._id !== productId
    ) {
      listOfSameGender.push(product);
    }
    return listOfSameGender;
  });

  while (mayAlsoLikeProduct.length <= 3) {
    const randomIndex = Math.floor(Math.random() * listOfSameGender.length);
    mayAlsoLikeProduct.push(listOfSameGender[randomIndex]);
  }

  //setting product rating
  let rating;
  if (rating === undefined) {
    const listofRatings = productToDisplay.reviews.map((rating) => {
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
    rating = starRating;
  }

  //setting review ratings
  let reviewRatings = [];
  productToDisplay.reviews.map((review) => {
    let reviewStarRating = [];
    for (let i = 0; i <= 4; i++) {
      const difference = review.rating - i;
      if (difference > 0.5) {
        reviewStarRating.push(<ImStarFull key={i} />);
      } else if (difference === 0.5) {
        reviewStarRating.push(<ImStarHalf key={i} />);
      } else {
        reviewStarRating.push(<ImStarEmpty key={i} />);
      }
    }
    reviewRatings.push(reviewStarRating);
    return reviewRatings;
  });

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const addProductToCart = () => {
    if (productSize !== undefined && productSize !== "SIZE") {
      const guest = localStorage.getItem("guest");
      if (guest) {
        let currentProduct = {
          productId,
          quantity: productQuantity,
          size: productSize,
        };
        let cartArray = cart;
        cartArray.push(currentProduct);
        dispatch({
          type: "SET_CART",
          payload: cartArray,
        });
        setSizeInvalid(false);
        setAddedToCart(true);
      } else {
        dispatch(addToCart(userId, productId, productQuantity, productSize));
        setSizeInvalid(false);
        setAddedToCart(true);
      }
    } else {
      setSizeInvalid(true);
    }
  };

  const addProductToWishlist = () => {
    if (productSize !== undefined && productSize !== "SIZE") {
      const guest = localStorage.getItem("guest");
      if (guest) {
        let currentProduct = {
          productId,
          quantity: productQuantity,
          size: productSize,
        };
        let wishlistArray = wishlist;
        wishlistArray.push(currentProduct);
        dispatch({
          type: "SET_WISHLIST",
          payload: wishlistArray,
        });
        setSizeInvalid(false);
        setAddedToCart(false);
      } else {
        dispatch(
          addToWishlist(userId, productId, productQuantity, productSize)
        );
        setSizeInvalid(false);
        setAddedToCart(false);
      }
    } else {
      setSizeInvalid(true);
    }
  };

  const routeToProductview = (currentDisplayedId) => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      payload: currentDisplayedId,
    });
    history.push("/product-view");
  };

  const settingProductReview = () => {
    dispatch({
      type: "SET_CURRENT_PRODUCT_REVIEW",
      payload: productId,
    });
  };

  return (
    <>
      <div className="product-view-container" key={productId}>
        <div className="product-view-product-info">
          <div className="product-view-image-container">
            <img
              className="product-view-image"
              src={productToDisplay.image}
              alt="product"
            />
          </div>
          <div className="product-information-checkout-container">
            <div className="product-view-information-container">
              <h1 className="product-view-title">{productToDisplay.title}</h1>
              <p className="product-view-rating">{rating}</p>
              <p className="product-view-brand">
                <span className="product-view-brand-title">Brand: </span>
                {productToDisplay.brand}
              </p>
              <p className="product-view-price">
                <span className="product-view-price-title">Price: </span>
                <span className="product-view-price-number">
                  ${productToDisplay.price}
                </span>
              </p>
              <p className="product-view-instock">In Stock</p>
              <p className="product-view-description-title">Description:</p>
              <ul className="product-view-description">
                {productToDisplay.description.map((description) => {
                  return (
                    <li
                      className="product-view-description-item"
                      key={productToDisplay.description.indexOf(description)}
                    >
                      {description}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="product-view-checkout-box">
              <p className="checkout-price">
                <span className="checkout-price-number">
                  ${productToDisplay.price}
                </span>{" "}
                <br /> & FREE RETURNS
              </p>
              <p className="checkout-free-delivery">FREE DELIVERY IN U.S</p>
              <p className="checkout-fastest-delivery">
                Fastest Delivery:{" "}
                <span className="delivery-tomorrow">Tomorrow</span>
              </p>
              <div className="checkout-quantity-size-container">
                <div className="checkout-quantity-container">
                  <button
                    className="checkout-quantity-minus"
                    onClick={() => decreaseProductQuantity()}
                  >
                    <AiOutlineMinus />
                  </button>
                  <p className="checkout-current-quantity">{productQuantity}</p>
                  <button
                    className="checkout-quantity-add"
                    onClick={() => increaseProductQuantity()}
                  >
                    <AiOutlinePlus />{" "}
                  </button>
                </div>
                <div
                  className={
                    sizeInvalid
                      ? "checkout-size-container invalid"
                      : "checkout-size-container"
                  }
                >
                  <select
                    className="form-select checkout-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setProductSize(e.target.value);
                    }}
                  >
                    <option defaultValue>SIZE</option>
                    {productToDisplay.sizes.map((size) => {
                      return (
                        <option value={size} key={size}>
                          {size}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="checkout-wishlist-cart">
                <button
                  className="checkout-wishlist"
                  data-toggle="modal"
                  data-target={sizeInvalid ? "" : "#productAddedToCart"}
                  onClick={() => {
                    addProductToWishlist();
                  }}
                >
                  <HiOutlineHeart className="heart" />
                </button>
                <button
                  data-toggle="modal"
                  className="checkout-cart"
                  onClick={() => {
                    addProductToCart();
                  }}
                  data-target={sizeInvalid ? "" : "#productAddedToCart"}
                >
                  <IoCartOutline className="cart" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-view-alike-products-container">
          <h1 className="product-view-alike-title">
            Products related to this item
          </h1>
          <div className="product-view-alike-products">
            <Container>
              <Row xs={2} md={3} lg={4}>
                {alikeProducts.map((product) => {
                  return (
                    <Col key={product.productId}>
                      <div
                        className="alike-product-container"
                        data-dismiss="modal"
                      >
                        <img
                          className="product-view-alike-img"
                          src={product.productImg}
                          alt="product"
                          onClick={() => routeToProductview(product.productId)}
                        />

                        <p
                          className="product-alike-title"
                          onClick={() => routeToProductview(product.productId)}
                        >
                          {product.title}
                        </p>
                        <p className="product-alike-price">${product.price}</p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </div>
        <div className="product-view-review-content">
          <div className="review-give-your-review">
            <p className="review-give-review">Review this product</p>
            <p className="review-share-thoughts">
              Share your thoughts with other customers
            </p>
            <NavLink to="/product-review" style={{ all: "unset" }}>
              <button
                className="review-write-review-button"
                onClick={() => settingProductReview()}
              >
                Write a customer review
              </button>
            </NavLink>
          </div>
          <div className="customer-reviews">
            <h1 className="customer-reviews-title">Customer reviews</h1>
            <p className="customer-review-stars">{rating}</p>
            {productToDisplay.reviews.map((review) => {
              return (
                <div className="review-information" key={review._id}>
                  <p className="review-information-name">
                    <IoPersonCircle className="review-customer-icon" />{" "}
                    {review.name}
                  </p>
                  <p className="review-information-rating">
                    {reviewRatings[productToDisplay.reviews.indexOf(review)]}
                  </p>
                  <p className="review-information-verified">
                    Verified purchase
                  </p>
                  <p className="review-information-description">
                    {review.description}
                  </p>
                  <p className="review-information-buy-again">
                    Buy Again?{" "}
                    <span className="buy-again-answer">{review.buyAgain}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="modal left fade"
          id="productAddedToCart"
          tabIndex=""
          role="dialog"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog product-view-modal-dialog"
            role="document"
          >
            <div className="modal-content product-view-modal-content">
              <div className="modal-header product-view-modal-header">
                <button
                  type="button"
                  className="close product-view-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" className="product-view-close-x">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body .product-view-modal-body">
                <p className="product-view-added-modal-title">
                  {addedToCart ? "Added to cart:" : "Added to wishlist"}
                </p>
                <div className="product-view-added-product-information">
                  <img
                    className="product-view-added-product-image"
                    src={productToDisplay.image}
                    alt="product"
                  />
                  <div className="product-view-added-product-details">
                    <p className="product-view-added-product-title">{title}</p>
                    <p className="product-view-added-product-price">
                      ${productToDisplay.price}
                    </p>
                    <p className="product-view-added-product-size">
                      Size: {productSize}
                    </p>
                    <p className="product-view-added-product-quantity">
                      Qty: {productQuantity}
                    </p>
                  </div>
                </div>
                <div
                  className="product-view-added-keep-shopping-container"
                  data-dismiss="modal"
                >
                  <p className="product-view-added-keep-shopping">
                    KEEP SHOPPING
                  </p>
                </div>
                <div
                  className="product-view-added-view-cart-container"
                  onClick={() =>
                    addedToCart
                      ? history.push("/cart")
                      : history.push("/wishlist")
                  }
                  data-dismiss="modal"
                >
                  <p className="product-view-added-view-cart">
                    {addedToCart ? "VIEW CART" : "VIEW WISHLIST"}{" "}
                  </p>
                  {addedToCart ? (
                    <IoCartOutline className="product-view-added-cart-icon" />
                  ) : (
                    <HiOutlineHeart className="product-view-added-wishlist-icon" />
                  )}
                </div>
                <hr className="line-break quickshop-linebreak" />
                <div className="product-view-added-also-like-container">
                  <p className="product-view-added-also-like-title">
                    You may also like:
                  </p>
                  <div className="product-view-added-also-like-products">
                    {mayAlsoLikeProduct.map((product) => {
                      return (
                        <div
                          className="product-view-added-also-like-product"
                          key={product._id}
                          data-dismiss="modal"
                        >
                          <img
                            className="product-view-added-also-like-image"
                            src={product.image}
                            alt="product"
                            onClick={() => routeToProductview(product._id)}
                          />
                        </div>
                      );
                    })}
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
