import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProfileAddressCard } from "./ProfileAddressCard";
import { addAddress } from "../../actions/addAddress";
import { useHistory } from "react-router-dom";

import "./ProfileAddressView.css";

export const ProfileAddressView = () => {
  const [createAddress, setCreateAddress] = useState(true);
  const usersAddress = useSelector((state) => state.userInfoReducer.address);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();
  const [missingInfo, setMissingInfo] = useState(false);

  const history = useHistory();

  const addingAddress = () => {
    const guest = localStorage.getItem("guest");
    if (guest) {
      history.push("/login");
    } else {
      const addressInfo = {
        name,
        streetAddress,
        city,
        state,
        zipcode,
      };

      if (
        name === undefined ||
        streetAddress === undefined ||
        city === undefined ||
        state === undefined ||
        zipcode === undefined
      ) {
        setMissingInfo(true);
      } else {
        dispatch(addAddress(userId, addressInfo));
        setCreateAddress(false);
        setMissingInfo(false);
      }
    }
  };

  useEffect(() => {
    setName();
    setStreetAddress();
    setCity();
    setState();
    setZipcode();
    setMissingInfo(false);
    if (usersAddress.length > 0) {
      setCreateAddress(false);
    }
  }, [usersAddress.length]);

  return (
    <>
      <div className="profile-address-container">
        <div className="container">
          {createAddress ? (
            <div className="form-content-container">
              <div className="profile-address-form-title-container">
                <h1 className="profile-address-form-title">add address</h1>
                <hr className="linebreak" />
              </div>
              <div>
                <form className="profile-address-form">
                  <div className="form-group">
                    <label
                      htmlFor="addressName"
                      className="profile-address-label-1"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressName"
                      aria-describedby="addressMuted"
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <small id="addressMute" className="form-text text-muted">
                      Street Address, P.O. Box
                    </small>
                    <label
                      htmlFor="addressFName"
                      className="profile-address-label"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressFName"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="addressCity"
                      className="profile-address-label"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressCity"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <label
                      htmlFor="addressState"
                      className="profile-address-label"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressState"
                      onChange={(e) => setState(e.target.value)}
                    />
                    <label
                      htmlFor="addressZipcode"
                      className="profile-address-label"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressZipcode"
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              {missingInfo ? (
                <div className="missing-info">
                  Missing information in required fields *
                </div>
              ) : (
                ""
              )}
              <button
                className="profile-address-form-create"
                onClick={() => {
                  addingAddress();
                }}
              >
                Create New Address
              </button>
              <button
                className="profile-address-form-cancel"
                onClick={() => setCreateAddress(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="addresses-content-container">
              <div className="address-content-title-container">
                <h1 className="address-content-title">addresses</h1>
                <hr className="linebreak" />
              </div>
              {usersAddress.length > 0
                ? usersAddress.map((address) => {
                    return (
                      <ProfileAddressCard key={address._id} address={address} />
                    );
                  })
                : ""}
              <div className="address-content-button-container">
                <button
                  className="address-content-add-address-button"
                  onClick={() => setCreateAddress(true)}
                >
                  Add New Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
