import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./ProfileCard.css";

export const ProfileCard = () => {
  const [createCard, setCreateCard] = useState(true);
  const [editCard, setEditCard] = useState(false);
  const usersCards = useSelector((state) => state.userInfoReducer.cardInfo);

  useEffect(() => {
    if (usersCards.length > 0) {
      setCreateCard(false);
    }
  }, [usersCards.length]);

  const showEditCard = () => {
    setEditCard(!editCard);
  };

  return (
    <>
      <div className="profile-card-container">
        <div className="container">
          {createCard ? (
            <div className="form-content-container">
              <div className="profile-card-form-title-container">
                <h1 className="profile-card-form-title">add card</h1>
                <hr className="linebreak" />
              </div>
              <div>
                <form className="profile-card-form">
                  <div className="form-group">
                    <label htmlFor="cardName" className="profile-card-label-1">
                      Name On Card *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-card-input"
                      id="cardName"
                      aria-describedby="cardMuted"
                    />
                    <label
                      htmlFor="cardNumber"
                      className="profile-address-label"
                    >
                      Card Number *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-card-input"
                      id="cardNumber"
                      aria-describedby="cardNumberMute"
                    />
                    <small id="cardNumberMute" className="form-text text-muted">
                      Example: 0000000000000000
                    </small>
                    <label htmlFor="cardType" className="profile-card-label">
                      Card Type *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-card-input"
                      id="cardType"
                    />
                    <label htmlFor="cardExpires" className="profile-card-label">
                      Expires *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-card-input"
                      id="cardExpires"
                      aria-describedby="expiresExample"
                    />
                    <small id="expiresExample" className="form-text text-muted">
                      MM/YY
                    </small>
                  </div>
                </form>
              </div>
              <button
                className="profile-card-form-create"
                onClick={() => setCreateCard(false)}
              >
                Create New Card
              </button>
            </div>
          ) : (
            <div className="addresses-content-container">
              <div className="card-content-title-container">
                <h1 className="card-content-title">card information</h1>
                <hr className="linebreak" />
              </div>
              {usersCards.map((card) => {
                const randomId = Math.floor(Math.random() * 99999);
                let editCard = false;
                const showEditCard = () => {
                  if (editCard) {
                    document.getElementById(randomId).style.display = "none";
                    editCard = false;
                  } else {
                    document.getElementById(randomId).style.display = "flex";
                    editCard = true;
                  }
                };

                return (
                  <div className="card-content" key={usersCards.indexOf(card)}>
                    <p className="card-name">{card.name}</p>
                    <p className="card-number">{card.cardNumber}</p>
                    <p className="card-type">{card.cardType}</p>
                    <p className="card-expires">{card.expires}</p>
                    <div className="card-button-container">
                      <button
                        className="card-button-edit"
                        onClick={() => showEditCard()}
                      >
                        Edit
                      </button>
                      <button className="card-button-delete">Delete</button>
                    </div>
                    <div className="edit-card-content-container" id={randomId}>
                      <div className="edit-card-title-container">
                        <h1 className="edit-card-title">edit card</h1>
                      </div>
                      <form className="edit-card-form">
                        <div className="form-group">
                          <label
                            htmlFor="cardName"
                            className="card-edit-label-1"
                          >
                            Name On Card
                          </label>
                          <input
                            type="text"
                            className="form-control card-edit-input"
                            id="cardName"
                            aria-describedby="cardMuted"
                            defaultValue={card.name}
                          />
                          <label
                            htmlFor="cardNumber"
                            className="card-edit-label"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="form-control card-edit-input"
                            id="cardNumber"
                            defaultValue={card.cardNumber}
                          />
                          <label
                            htmlFor="cardType"
                            className="address-edit-label"
                          >
                            Card Type
                          </label>
                          <input
                            type="text"
                            className="form-control card-edit-input"
                            id="cardType"
                            defaultValue={card.cardType}
                          />
                          <label
                            htmlFor="cardExpires"
                            className="card-edit-label"
                          >
                            Expires
                          </label>
                          <input
                            type="text"
                            className="form-control card-edit-input"
                            id="cardExpires"
                            defaultValue={card.expires}
                          />
                        </div>
                      </form>
                      <div className="card-edit-buttons-container">
                        <button className="card-edit-update">Update</button>
                        <button
                          className="card-edit-cancel"
                          onClick={() => showEditCard()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <hr className="line-break" />
                  </div>
                );
              })}
              <div className="card-content-button-container">
                <button
                  className="card-content-add-card-button"
                  onClick={() => setCreateCard(true)}
                >
                  Add New Card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
