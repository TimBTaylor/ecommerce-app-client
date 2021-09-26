import React from "react";
import { useSelector } from "react-redux";
import "./Orders.css";
import { OrderCard } from "./OrderCard";

export const Orders = () => {
  const usersOrders = useSelector((state) => state.userInfoReducer.orders);

  return (
    <>
      <div className="order-content-container">
        <div className="container">
          <div className="order-title-container">
            <h1 className="order-title">Your orders</h1>
          </div>
          {usersOrders.length > 0 ? (
            <div className="users-orders-content-container">
              {usersOrders.map((order) => {
                return <OrderCard order={order} key={order._id} />;
              })}
            </div>
          ) : (
            <div className="no-orders">No orders</div>
          )}
        </div>
      </div>
    </>
  );
};
