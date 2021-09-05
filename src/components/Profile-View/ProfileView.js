import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { IoMdClipboard } from "react-icons/io";
import { BiHeart } from "react-icons/bi";

import "./ProfileView.css";

export const ProfileView = () => {
  const usersFullName =
    localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

  return (
    <>
      <div className="profile-view-container">
        <div className="container">
          <div className="profile-view-title">
            <h1 className="profile-title-text">
              <span className="my-account">my account</span>{" "}
              <span className="divider">|</span> welcome, {usersFullName}
            </h1>
          </div>
          <hr className="line-break" />
          <div className="profile-list-container">
            <ul className="profile-list">
              <div className="row profile-list-row">
                <li className="profile-list-item col-md">
                  <div className="profile-list-item-container">
                    <IoPersonOutline className="profile-view-icons" />
                    <div className="profile-list-item-text">
                      <p className="list-item-title">personal data</p>
                      <p className="list-item-description">
                        Show or update update your personal information
                      </p>
                    </div>
                  </div>
                </li>
                <li className="profile-list-item col-md">
                  <div className="profile-list-item-container">
                    <FiMapPin className="profile-view-icons" />
                    <div className="profile-list-item-text">
                      <p className="list-item-title">addresses</p>
                      <p className="list-item-description">
                        Manage your billing and shipping addresses
                      </p>
                    </div>
                  </div>
                </li>
              </div>
              <div className="row profile-list-row">
                <li className="profile-list-item col-md">
                  <div className="profile-list-item-container">
                    <BsCreditCard className="profile-view-icons" />
                    <div className="profile-list-item-text">
                      <p className="list-item-title">payment settings</p>
                      <p className="list-item-description">Manage cards</p>
                    </div>
                  </div>
                </li>
                <li className="profile-list-item col-md">
                  <div className="profile-list-item-container">
                    <IoMdClipboard className="profile-view-icons" />
                    <div className="profile-list-item-text">
                      <p className="list-item-title">order history</p>
                      <p className="list-item-description">
                        Check the status of orders or see past orders
                      </p>
                    </div>
                  </div>
                </li>
              </div>
              <div className="row profile-list-row">
                <li className="profile-list-item wishlist col-md-6">
                  <div className="profile-list-item-container">
                    <BiHeart className="profile-view-icons" />
                    <div className="profile-list-item-text">
                      <p className="list-item-title">wishlist</p>
                      <p className="list-item-description">
                        View and modify items
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
