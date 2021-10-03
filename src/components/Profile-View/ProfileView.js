import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { IoMdClipboard } from "react-icons/io";
import { BiHeart } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../actions/removeUser";

import "./ProfileView.css";

export const ProfileView = () => {
  const usersFullName =
    localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
  const guest = localStorage.getItem("guest");
  const userEmail = useSelector((state) => state.userInfoReducer.email);
  const userId = useSelector((state) => state.userInfoReducer._id);
  const dispatch = useDispatch();

  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
    dispatch({
      type: "SET_GUEST",
      payload: true,
    });
  };

  const deleteAccount = () => {
    dispatch(removeUser(userId)).then(() => history.push("/login"));
  };

  return (
    <>
      <div className="profile-view-container">
        <div className="container">
          <div className="profile-view-title">
            <h1 className="profile-title-text">
              <span className="my-account">my account</span>{" "}
              <span className="divider">|</span> welcome
              {guest ? "" : `, ${usersFullName}`}
            </h1>
          </div>
          <hr className="line-break" />
          <div className="profile-list-container">
            <ul className="profile-list">
              <div className="row profile-list-row">
                <li className="profile-list-item col-md">
                  <NavLink to="/profile-update" style={{ all: "unset" }}>
                    <div className="profile-list-item-container">
                      <IoPersonOutline className="profile-view-icons" />
                      <div className="profile-list-item-text">
                        <p className="list-item-title">personal data</p>
                        <p className="list-item-description">
                          Show or update update your personal information
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </li>
                <li className="profile-list-item col-md">
                  <NavLink to="/profile-address" style={{ all: "unset" }}>
                    <div className="profile-list-item-container">
                      <FiMapPin className="profile-view-icons" />
                      <div className="profile-list-item-text">
                        <p className="list-item-title">addresses</p>
                        <p className="list-item-description">
                          Manage your billing and shipping addresses
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              </div>
              <div className="row profile-list-row">
                <li className="profile-list-item col-md">
                  <NavLink to="/profile-card" style={{ all: "unset" }}>
                    <div className="profile-list-item-container">
                      <BsCreditCard className="profile-view-icons" />
                      <div className="profile-list-item-text">
                        <p className="list-item-title">payment settings</p>
                        <p className="list-item-description">Manage cards</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
                <li className="profile-list-item col-md">
                  <NavLink to="/orders" style={{ all: "unset" }}>
                    <div className="profile-list-item-container">
                      <IoMdClipboard className="profile-view-icons" />
                      <div className="profile-list-item-text">
                        <p className="list-item-title">order history</p>
                        <p className="list-item-description">
                          Check the status of orders or see past orders
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              </div>
              <div className="row profile-list-row">
                <li className="profile-list-item wishlist col-md">
                  <NavLink to="/wishlist" style={{ all: "unset" }}>
                    <div className="profile-list-item-container">
                      <BiHeart className="profile-view-icons" />
                      <div className="profile-list-item-text">
                        <p className="list-item-title">wishlist</p>
                        <p className="list-item-description">
                          View and modify items
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </li>
                <li className="col-md"></li>
              </div>
            </ul>
          </div>
          <div className="delete-logout">
            {userEmail ? (
              <>
                <button
                  className="delete-account"
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  Delete Account
                </button>
                <button className="logout-account" onClick={() => logout()}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className={guest ? "logout-account" : "d-none"}
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body delete-modal-body">
              <h1 className="delete-modal-title">
                Click the button below to confirm
              </h1>
              <button
                className="delete-modal-button"
                onClick={() => deleteAccount()}
                data-dismiss="modal"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
