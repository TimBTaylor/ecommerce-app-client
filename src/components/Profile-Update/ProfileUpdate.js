import React from "react";

import "./ProfileUpdate.css";

export const ProfileUpdate = () => {
  const fName = localStorage.getItem("firstName");
  const lName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

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
                  />
                  <label htmlFor="lNameInput" className="name-email-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-control name-email-input"
                    id="lNameInput"
                    defaultValue={lName}
                  />
                  <label htmlFor="emailInput" className="name-email-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control name-email-input"
                    id="emailInput"
                    defaultValue={email}
                  />
                  <label htmlFor="confirmEmail" className="name-email-label">
                    Confirm Email *
                  </label>
                  <input
                    type="email"
                    className="form-control name-email-input"
                    id="confirmEmail"
                  />
                </div>
              </form>
              <button className="name-email-button">Apply</button>
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
                  />
                </div>
              </form>
              <button className="password-update-button">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
