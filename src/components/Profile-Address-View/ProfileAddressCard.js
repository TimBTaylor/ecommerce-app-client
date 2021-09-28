import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAddress } from "../../actions/updateAddress";
import { removeAddress } from "../../actions/removeAddress";

export const ProfileAddressCard = (props) => {
  const address = props.address;
  const usersAddress = useSelector((state) => state.userInfoReducer.address);
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const randomId = Math.floor(Math.random() * 99999);
  let editAddressPre = false;
  const showEditAddress = () => {
    if (editAddressPre) {
      document.getElementById(randomId).style.display = "none";
      editAddressPre = false;
    } else {
      document.getElementById(randomId).style.display = "flex";
      editAddressPre = true;
    }
  };

  let name;
  let streetAddress;
  let city;
  let state;
  let zipcode;

  const removingAddress = () => {
    dispatch(removeAddress(userId, address._id));
  };

  const updatingAddress = () => {
    if (name === undefined) {
      name = address.name;
    }
    if (streetAddress === undefined) {
      streetAddress = address.streetAddress;
    }
    if (city === undefined) {
      city = address.city;
    }
    if (state === undefined) {
      state = address.state;
    }
    if (zipcode === undefined) {
      zipcode = address.zipcode;
    }
    const addressInfo = {
      name,
      streetAddress,
      city,
      state,
      zipcode,
      addressId: address._id,
    };

    dispatch(updateAddress(userId, addressInfo));
  };

  useEffect(() => {});

  return (
    <>
      <div className="address-content" key={usersAddress.indexOf(address)}>
        <p className="address-name">{address.name}</p>
        <p className="address-address">{address.streetAddress}</p>
        <p className="address-city-state-zip">
          {address.city}, {address.state} {address.zipcode}
        </p>
        <div className="address-button-container">
          <button
            className="address-button-edit"
            onClick={() => showEditAddress()}
          >
            Edit
          </button>
          <button
            className="address-button-delete"
            onClick={() => removingAddress()}
          >
            Delete
          </button>
        </div>
        <div className="edit-address-content-container" id={randomId}>
          <div className="edit-address-title-container">
            <h1 className="edit-address-title">edit address</h1>
          </div>
          <form className="edit-address-form">
            <div className="form-group">
              <label htmlFor="addressName" className="address-edit-label-1">
                Address
              </label>
              <input
                type="text"
                className="form-control address-edit-input"
                id="addressName"
                aria-describedby="addressMuted"
                defaultValue={address.streetAddress}
                onChange={(e) => (streetAddress = e.target.value)}
              />
              <small id="addressEditMute" className="form-text text-muted">
                Street Address, P.O. Box
              </small>
              <label htmlFor="addressFName" className="address-edit-label">
                Name
              </label>
              <input
                type="text"
                className="form-control address-edit-input"
                id="addressFName"
                defaultValue={address.name}
                onChange={(e) => (name = e.target.value)}
              />
              <label htmlFor="addressCity" className="address-edit-label">
                City
              </label>
              <input
                type="text"
                className="form-control address-edit-input"
                id="addressCity"
                defaultValue={address.city}
                onChange={(e) => (city = e.target.value)}
              />
              <label htmlFor="addressState" className="address-edit-label">
                State
              </label>
              <input
                type="text"
                className="form-control address-edit-input"
                id="addressState"
                defaultValue={address.state}
                onChange={(e) => (state = e.target.value)}
              />
              <label htmlFor="addressZipcode" className="address-edit-label">
                ZIP Code
              </label>
              <input
                type="text"
                className="form-control address-edit-input"
                id="addressZipcode"
                defaultValue={address.zipcode}
                onChange={(e) => (zipcode = e.target.value)}
              />
            </div>
          </form>
          <div className="address-edit-buttons-container">
            <button
              className="address-edit-update"
              onClick={() => updatingAddress()}
            >
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
        <hr className="line-break" />
      </div>
    </>
  );
};
