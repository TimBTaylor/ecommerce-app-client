import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../actions/removeFromCart";
import { addToWishlist } from "../../actions/addToWishlist";
import { updateCartItem } from "../../actions/updateCartItem";
import { useHistory } from "react-router-dom";

export const CartProductCard = (props) => {
  const product = props.product;

  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
    const currentProductQuantity = productQuantity + 1;
    dispatch(
      updateCartItem(userId, product.id, currentProductQuantity, product.size)
    );
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
    const currentProductQuantity = productQuantity - 1;
    dispatch(
      updateCartItem(userId, product.id, currentProductQuantity, product.size)
    );
  };

  const routeToProductview = () => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      payload: product.id,
    });
    history.push("/product-view");
  };
  return (
    <div key={product.id}>
      <div className="cart-product">
        <img
          className="cart-product-img"
          src={product.productImg}
          alt="product"
          onClick={() => routeToProductview()}
        />
        <div className="cart-product-info">
          <h1
            className="cart-product-title"
            onClick={() => routeToProductview()}
          >
            {product.title}
          </h1>
          <h2 className="cart-product-size">
            <span className="cart-product-size-title">Size: </span>{" "}
            {product.size}
          </h2>
          <h2 className="cart-product-availability">
            <span className="cart-product-availability">Availability: </span> In
            Stock
          </h2>
          <h2 className="cart-product-price">${product.price}</h2>
          <div className="cart-buttons-container">
            <div className="cart-product-edit-and-remove">
              <button
                className="cart-product-edit"
                onClick={() => routeToProductview()}
              >
                Edit Details
              </button>
              <span className="cart-buttons-seperation">|</span>
              <button
                className="cart-product-remove"
                onClick={() => dispatch(removeFromCart(userId, product.id))}
              >
                Remove
              </button>
            </div>
            <div className="cart-quantity-add-container">
              <div className="cart-quantity-container">
                <button
                  className="cart-quantity-minus"
                  onClick={() => decreaseProductQuantity()}
                >
                  <AiOutlineMinus />
                </button>
                <p className="cart-current-quantity">{productQuantity}</p>
                <button
                  className="cart-quantity-minus"
                  onClick={() => increaseProductQuantity()}
                >
                  <AiOutlinePlus />{" "}
                </button>
              </div>
              <button
                className="cart-product-add"
                onClick={() => {
                  dispatch(
                    addToWishlist(
                      userId,
                      product.id,
                      productQuantity,
                      product.size
                    )
                  ).then(() => {
                    dispatch(removeFromCart(userId, product.id));
                  });
                }}
              >
                Add To Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
