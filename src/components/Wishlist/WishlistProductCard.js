import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../actions/removeFromWishlist";
import { addToCart } from "../../actions/addToCart";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

export const WishlistProductCard = (props) => {
  const product = props.product;
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <div className="wishlist-product" key={product.id}>
        <img
          className="wishlist-product-img"
          src={product.productImg}
          alt="product"
        />
        <div className="wishlist-product-info">
          <h1 className="wishlist-product-title">{product.title}</h1>
          {/* <hr className="line-break wishlist-linebreak" /> */}
          <h2 className="wishlist-product-size">
            <span className="wishlist-product-size-title">Size: </span>
            {product.size}
          </h2>
          {/* <hr className="line-break wishlist-linebreak" /> */}
          <h2 className="wishlist-product-availability">
            <span className="wishlist-product-availability-title">
              Availability:{" "}
            </span>
            In Stock
          </h2>
          {/* <hr className="line-break wishlist-linebreak" /> */}
          <h2 className="wishlist-product-price">${product.price}</h2>
          {/* <hr className="line-break wishlist-linebreak" /> */}
          <div className="wishlist-buttons-container">
            <div className="wishlist-product-edit-and-remove">
              <button className="wishlist-product-edit">Edit Details</button>
              <span className="wishlist-button-seperation">|</span>
              <button
                className="wishlist-product-remove"
                onClick={() => dispatch(removeFromWishlist(userId, product.id))}
              >
                Remove
              </button>
            </div>
            <div className="wishlist-quantity-add-container">
              <div className="wishlist-quantity-container">
                <button
                  className="wishlist-quantity-minus"
                  onClick={() => decreaseProductQuantity()}
                >
                  <AiOutlineMinus />
                </button>
                <p className="current-quantity">{productQuantity}</p>
                <button
                  className="wishlist-quantity-plus"
                  onClick={() => increaseProductQuantity()}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <button
                className="wishlist-product-add"
                onClick={() => {
                  dispatch(
                    addToCart(userId, product.id, productQuantity, product.size)
                  ).then(() => {
                    dispatch(removeFromWishlist(userId, product.id));
                  });
                }}
              >
                Add To Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
