import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOrder } from "../../actions/removeOrder";
import { useHistory } from "react-router-dom";

export const OrderCard = (props) => {
  const [deliveryEstimate, setDeliveryEstimate] = useState();
  const order = props.order;
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  function settingDeliveryEstimate() {
    if (order.shippingType === "5") {
      setDeliveryEstimate("3-7 business days");
    } else if (order.shippingType === "8") {
      setDeliveryEstimate("3-5 business days");
    } else if (order.shippingType === "13") {
      setDeliveryEstimate("2 business days");
    } else {
      setDeliveryEstimate("Tomorrow");
    }
  }

  useEffect(() => {
    settingDeliveryEstimate();
  });

  const allProducts = useSelector((state) => state.productReducer.data);

  const orderProducts = order.products;

  const productsToDisplay = [];

  orderProducts.map((entry) => {
    allProducts.map((product) => {
      const currentProduct = {};
      if (entry.id === product._id) {
        currentProduct.productImg = product.image;
        currentProduct.id = product._id;
        if (product.title.length > 60) {
          currentProduct.title = product.title.substring(0, 60) + "...";
        } else {
          currentProduct.title = product.title;
        }
        productsToDisplay.push(currentProduct);
      }
      return currentProduct;
    });
    return productsToDisplay;
  });

  const routeToProductview = (id) => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      payload: id,
    });
    history.push("/product-view");
  };

  const routeToProductReview = (id) => {
    dispatch({
      type: "SET_CURRENT_PRODUCT_REVIEW",
      payload: id,
    });
    history.push("/product-review");
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-information">
          <div className="order-placed-container">
            <p className="order-placed">
              Order placed <br />
              <span className="order-header-bold">{order.date} </span>
            </p>
          </div>
          <div className="order-total-container">
            <p className="order-total">
              Total
              <br />
              <span className="order-header-bold">${order.total}</span>
            </p>
          </div>
          <div className="order-ship-to-container">
            <p className="order-ship-to">
              Ship to
              <br />
              <span className="order-header-bold">{order.name}</span>
            </p>
          </div>
        </div>
        <div className="order-number-container">
          <p className="order-number">Order # {order.orderNumber}</p>
        </div>
      </div>
      <h1 className="order-status">
        <span className="order-status-title">Order Status: </span> Processing{" "}
      </h1>
      <h1 className="order-arrival">
        <span className="order-arrival-title">Arrival: </span>
        {deliveryEstimate}
      </h1>
      <div className="order-products-container">
        {productsToDisplay.map((product) => {
          return (
            <div
              className="order-product-container"
              key={productsToDisplay.indexOf(product)}
            >
              <img
                className="order-product-img"
                src={product.productImg}
                alt="product"
              />
              <div>
                <h1 className="order-product-title">{product.title}</h1>
                <div className="order-product-buttons">
                  <button
                    className="order-product-review"
                    onClick={() => routeToProductReview(product.id)}
                  >
                    Write a product review
                  </button>
                  <button
                    className="order-product-view"
                    onClick={() => routeToProductview(product.id)}
                  >
                    View your item
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="order-footer-container">
        <button
          className="order-cancel"
          onClick={() => dispatch(removeOrder(userId, order._id))}
        >
          Cancel order
        </button>
      </div>
    </div>
  );
};
