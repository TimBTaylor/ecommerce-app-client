import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProductReview.css";
import { ImStarEmpty } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import { addReview } from "../../actions/addReview";

export const ProductReview = () => {
  const [starRate, setStarRate] = useState();
  const [message, setMessage] = useState();
  const [buyAgain, setBuyAgain] = useState("Yes");
  const [missingRating, setMissingRating] = useState(false);
  const [reviewSubmitted, setReviewSubmittied] = useState(false);

  const dispatch = useDispatch();

  const fName = localStorage.getItem("firstName");

  const currentProduct = useSelector(
    (state) => state.userInfoReducer.currentProductReview
  );

  const allProducts = useSelector((state) => state.productReducer.data);

  let productToDisplay;
  let title;

  let name;

  // sets title and current product
  allProducts.map((product) => {
    if (product._id === currentProduct) {
      productToDisplay = product;
      if (product.title.length > 60) {
        title = product.title.substring(0, 60) + "...";
      }
    }
    return productToDisplay;
  });

  const submitReview = () => {
    let productIndex;
    let newProductList;

    allProducts.map((product) => {
      if (product._id === currentProduct) {
        productIndex = allProducts.indexOf(product);
      }
      return product;
    });

    if (name === undefined) {
      name = fName;
    }

    let productInfo = {
      name,
      rating: starRate,
      description: message,
      buyAgain,
      productId: currentProduct,
    };

    allProducts[productIndex].reviews.push(productInfo);
    newProductList = allProducts;
    if (starRate === undefined) {
      setMissingRating(true);
    } else {
      console.log("success");
      dispatch(addReview(productInfo, newProductList));
    }
    setReviewSubmittied(true);
  };

  return (
    <>
      <div className="product-review-container">
        <h1 className="product-review-title">Create Review</h1>
        <div className="product-review-product">
          <img
            className="review-product-img"
            src={productToDisplay.image}
            alt="product"
          />
          <h2 className="review-product-title">{title}</h2>
        </div>
        <hr className="line-break" />
        <div className="review-product-review">
          <div className="review-product-review-container">
            <h2 className="review-product-review-title">Overall Rating</h2>
            <p className="review-product-review-stars">
              {starRate >= 1 ? (
                <ImStarFull
                  className="star-full"
                  onClick={() => setStarRate(1)}
                />
              ) : (
                <ImStarEmpty
                  className="star-empty"
                  onClick={() => setStarRate(1)}
                />
              )}
              {starRate >= 2 ? (
                <ImStarFull
                  className="star-full"
                  onClick={() => setStarRate(2)}
                />
              ) : (
                <ImStarEmpty
                  className="star-empty"
                  onClick={() => setStarRate(2)}
                />
              )}
              {starRate >= 3 ? (
                <ImStarFull
                  className="star-full"
                  onClick={() => setStarRate(3)}
                />
              ) : (
                <ImStarEmpty
                  className="star-empty"
                  onClick={() => setStarRate(3)}
                />
              )}
              {starRate >= 4 ? (
                <ImStarFull
                  className="star-full"
                  onClick={() => setStarRate(4)}
                />
              ) : (
                <ImStarEmpty
                  className="star-empty"
                  onClick={() => setStarRate(4)}
                />
              )}
              {starRate >= 5 ? (
                <ImStarFull
                  className="star-full"
                  onClick={() => setStarRate(5)}
                />
              ) : (
                <ImStarEmpty
                  className="star-empty"
                  onClick={() => setStarRate(5)}
                />
              )}
            </p>
            {missingRating ? (
              <p className="missing-rating">! Must choose a rating</p>
            ) : (
              ""
            )}
          </div>
          <button
            className="review-product-review-clear"
            onClick={() => setStarRate(0)}
          >
            Clear
          </button>
        </div>
        <div className="review-product-buy-again">
          <h2 className="review-product-buy-again-title">
            Would you buy this item again?
          </h2>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active">
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                onClick={() => setBuyAgain("Yes")}
              />{" "}
              Yes
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                onClick={() => setBuyAgain("No")}
              />{" "}
              No
            </label>
          </div>
        </div>
        <hr className="line-break" />
        <div className="review-product-message">
          <h2 className="review-product-message-title">
            Add a written message
          </h2>
          <input
            type="text"
            className="form-control review-product-message-input"
            placeholder="What did you like or dislike?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <h2 className="review-product-name-title">Choose your public name</h2>
          <p className="review-product-appear">
            This is how you'll appear to other customers
          </p>
          <div className="review-product-user-info">
            <IoPersonCircle className="review-product-profile" />
            <input
              type="text"
              className="form-control review-product-profile-name"
              defaultValue={fName}
              onChange={(e) => (name = e.target.value)}
            />
          </div>
          <hr className="line-break" />
          <button
            className="review-product-submit"
            onClick={() => submitReview()}
          >
            Submit
          </button>
          {reviewSubmitted ? (
            <h2 className="review-submitted">
              Thank you for submitting your review
            </h2>
          ) : (
            ""
          )}
          {missingRating ? (
            <p className="missing-rating">Missing information</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
