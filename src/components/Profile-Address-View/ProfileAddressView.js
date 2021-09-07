import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./ProfileAddressView.css";

export const ProfileAddressView = () => {
  const [createAddress, setCreateAddress] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const usersAddress = useSelector((state) => state.userInfoReducer.address);

  useEffect(() => {
    if (usersAddress.length > 0) {
      setCreateAddress(false);
    }
  }, [usersAddress.length]);

  const showEditAddress = () => {
    setEditAddress(!editAddress);
  };

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
                    />
                    <small id="addressMute" className="form-text text-muted">
                      Street Address, P.O. Box
                    </small>
                    <label
                      htmlFor="addressFName"
                      className="profile-address-label"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressFName"
                    />
                    <label
                      htmlFor="addressLName"
                      className="profile-address-label"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressLName"
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
                    />
                    <label
                      htmlFor="addressCountry"
                      className="profile-address-label"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressCountry"
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
                    />
                    <label
                      htmlFor="addressPhonenumber"
                      className="profile-address-label"
                    >
                      Phone *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-address-input"
                      id="addressPhonenumber"
                      aria-describedby="addressPhoneMute"
                    />
                    <small
                      id="addressPhoneMute"
                      className="form-text text-muted"
                    >
                      Example: 333-333-3333
                    </small>
                  </div>
                </form>
              </div>
              <button
                className="profile-address-form-create"
                onClick={() => setCreateAddress(false)}
              >
                Create New Address
              </button>
            </div>
          ) : (
            <div className="addresses-content-container">
              <div className="address-content-title-container">
                <h1 className="address-content-title">addresses</h1>
                <hr className="linebreak" />
              </div>
              {usersAddress.map((address) => {
                return (
                  <div
                    className="address-content"
                    key={usersAddress.indexOf(address)}
                  >
                    <p className="address-name">
                      {address.fName} {address.lName}
                    </p>
                    <p className="address-address">{address.Address}</p>
                    <p className="address-city-state-zip">
                      {address.City} {address.State} {address.ZIP}
                    </p>
                    <p className="address-country">{address.Country}</p>
                    <div className="address-button-container">
                      <button
                        className="address-button-edit"
                        onClick={() => showEditAddress()}
                      >
                        Edit
                      </button>
                      <button className="address-button-delete">Delete</button>
                    </div>
                    {editAddress ? (
                      <div className="edit-address-content-container">
                        <div className="edit-address-title-container">
                          <h1 className="edit-address-title">edit address</h1>
                        </div>
                        <form className="edit-address-form">
                          <div className="form-group">
                            <label
                              htmlFor="addressName"
                              className="address-edit-label-1"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressName"
                              aria-describedby="addressMuted"
                              defaultValue={address.Address}
                            />
                            <small
                              id="addressEditMute"
                              className="form-text text-muted"
                            >
                              Street Address, P.O. Box
                            </small>
                            <label
                              htmlFor="addressFName"
                              className="address-edit-label"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressFName"
                              defaultValue={address.fName}
                            />
                            <label
                              htmlFor="addressLName"
                              className="address-edit-label"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressLName"
                              defaultValue={address.lName}
                            />
                            <label
                              htmlFor="addressCity"
                              className="address-edit-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressCity"
                              defaultValue={address.City}
                            />
                            <label
                              htmlFor="addressCountry"
                              className="address-edit-label"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressCountry"
                              defaultValue={address.Country}
                            />
                            <label
                              htmlFor="addressState"
                              className="address-edit-label"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressState"
                              defaultValue={address.State}
                            />
                            <label
                              htmlFor="addressZipcode"
                              className="address-edit-label"
                            >
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              className="form-control address-edit-input"
                              id="addressZipcode"
                              defaultValue={address.ZIP}
                            />
                          </div>
                        </form>
                        <div className="address-edit-buttons-container">
                          <button className="address-edit-update">
                            Update
                          </button>
                          <button
                            className="address-edit-cancel"
                            onClick={() => showEditAddress()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <hr className="line-break" />
                  </div>
                );
              })}
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
