import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../actions/updateProfile";
import "./ProfileUpdate.css";

export const ProfileUpdate = () => {
  var bcrypt = require("bcryptjs");

  const fName = useSelector((state) => state.userInfoReducer.firstName);
  const lName = useSelector((state) => state.userInfoReducer.lastName);
  const email = useSelector((state) => state.userInfoReducer.email);
  const password = useSelector((state) => state.userInfoReducer.password);
  const token = useSelector((state) => state.userInfoReducer.token);
  const [missingPassword, setMissingPassword] = useState();
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  let firstName;
  let lastName;
  let userEmail;
  let currentPassword;
  let firstPassword;
  let secondPassword;

  const updatingProfile = () => {
    if (firstName === undefined) {
      firstName = fName;
    }
    if (lastName === undefined) {
      lastName = lName;
    }
    if (userEmail === undefined) {
      userEmail = email;
    }
    if (bcrypt.compareSync(currentPassword, password)) {
      if (firstPassword.length >= 6) {
        if (firstPassword === secondPassword) {
          let userInfo = {
            fName: firstName,
            lName: lastName,
            email: userEmail,
            password: secondPassword,
          };
          console.log(userInfo);
          dispatch(updateProfile(userId, userInfo));
          console.log("success");
        } else {
          setPasswordsMatch(false);
          console.log("faile her");
        }
      } else {
        setInvalidNewPassword(true);
        console.log("fail here");
      }
    } else {
      setInvalidPassword(true);
      console.log("failing here");
    }
  };

  return (
    <>
      <div className="profile-update-container">
        <div className="container">
          <div className="profile-update-title-container">
            <h1 className="profile-update-title">edit account</h1>
          </div>
          <hr className="line-break" />
          <div className="row">
            <div className="name-email-container col-md">
              <h1 className="name-email-title">change name/email</h1>
              <form className="profile-update-form-container">
                <div className="form-group">
                  <label htmlFor="fNameInput" className="name-email-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="form-control name-email-input"
                    id="fNameInput"
                    defaultValue={fName}
                    onChange={(e) => (firstName = e.target.value)}
                  />
                  <label htmlFor="lNameInput" className="name-email-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-control name-email-input"
                    id="lNameInput"
                    defaultValue={lName}
                    onChange={(e) => (lastName = e.target.value)}
                  />
                  <label htmlFor="emailInput" className="name-email-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control name-email-input"
                    id="emailInput"
                    defaultValue={email}
                    onChange={(e) => (userEmail = e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="password-update-container col-md">
              <h1 className="password-update-title">change password</h1>
              <form className="profile-update-form-container">
                <div className="form-group">
                  <label
                    htmlFor="currentPassord"
                    className="password-update-label"
                  >
                    Current Password *
                  </label>
                  <input
                    type="password"
                    className="form-control password-update-input"
                    id="currentPassword"
                    onChange={(e) => (currentPassword = e.target.value)}
                  />
                  <label
                    htmlFor="newPassword"
                    className="password-update-label"
                  >
                    New Password *
                  </label>
                  <input
                    type="password"
                    className="form-control password-update-input"
                    id="newPassword"
                    onChange={(e) => (firstPassword = e.target.value)}
                  />
                  <label
                    htmlFor="confirmNewPassword"
                    className="password-update-label"
                  >
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    className="form-control password-update-input"
                    id="confirmNewPassword"
                    onChange={(e) => (secondPassword = e.target.value)}
                  />
                </div>
              </form>
              <button
                className="password-update-button"
                onClick={() => updatingProfile()}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
