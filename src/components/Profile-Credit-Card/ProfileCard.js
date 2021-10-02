import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProfileCardCard } from "./ProfileCardCard";
import { addCard } from "../../actions/AddCard";
import { useHistory } from "react-router-dom";

import "./ProfileCard.css";

export const ProfileCard = () => {
  const [createCard, setCreateCard] = useState(true);
  const usersCards = useSelector((state) => state.userInfoReducer.cardInfo);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [type, setType] = useState();
  const [expiration, setExpiration] = useState();
  const [missingInfo, setMissingInfo] = useState(false);

  const history = useHistory();

  const addingCard = () => {
    const guest = localStorage.getItem("guest");
    if (guest) {
      history.push("/login");
    } else {
      const cardInfo = {
        name,
        cardNumber,
        type,
        expiration,
      };

      if (
        name === undefined ||
        cardNumber === undefined ||
        type === undefined ||
        expiration === undefined
      ) {
        setMissingInfo(true);
      } else {
        dispatch(addCard(userId, cardInfo));
        setCreateCard(false);
        setMissingInfo(false);
      }
    }
  };

  useEffect(() => {
    setName();
    setCardNumber();
    setType();
    setExpiration();
    if (usersCards.length > 0) {
      setCreateCard(false);
    }
  }, [usersCards.length]);

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
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setCardNumber(e.target.value)}
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
                      onChange={(e) => setType(e.target.value)}
                    />
                    <small id="cardNumberMute" className="form-text text-muted">
                      MasterCard, Visa, American Express, Discover
                    </small>
                    <label htmlFor="cardExpires" className="profile-card-label">
                      Expires *
                    </label>
                    <input
                      type="text"
                      className="form-control profile-card-input"
                      id="cardExpires"
                      aria-describedby="expiresExample"
                      onChange={(e) => setExpiration(e.target.value)}
                    />
                    <small id="expiresExample" className="form-text text-muted">
                      MM/YY
                    </small>
                  </div>
                </form>
              </div>
              <button
                className="profile-card-form-create"
                onClick={() => addingCard()}
              >
                Create New Card
              </button>
              <button
                className="profile-card-form-cancel"
                onClick={() => setCreateCard(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="addresses-content-container">
              <div className="card-content-title-container">
                <h1 className="card-content-title">card information</h1>
                <hr className="linebreak" />
              </div>
              {usersCards.map((card) => {
                return <ProfileCardCard card={card} key={card._id} />;
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
