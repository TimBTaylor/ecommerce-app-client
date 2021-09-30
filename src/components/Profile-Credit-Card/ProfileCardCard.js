import React from "react";
import { useDispatch } from "react-redux";
import { removeCard } from "../../actions/RemoveCard";
import { updateCard } from "../../actions/updateCard";

export const ProfileCardCard = (props) => {
  const card = props.card;
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

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

  const removingCard = () => {
    dispatch(removeCard(userId, card._id));
  };

  let name;
  let cardNumber;
  let type;
  let expiration;

  const updatingCard = () => {
    if (name === undefined) {
      name = card.name;
    }
    if (cardNumber === undefined) {
      cardNumber = card.cardNumber;
    }
    if (type === undefined) {
      type = card.type;
    }
    if (expiration === undefined) {
      expiration = card.expiration;
    }

    const cardInfo = {
      name,
      cardNumber,
      type,
      expiration,
      cardId: card._id,
    };

    dispatch(updateCard(userId, cardInfo));
  };

  return (
    <div className="card-content" key={card._id}>
      <p className="card-name">{card.name}</p>
      <p className="card-number">{card.cardNumber}</p>
      <p className="card-type">{card.type}</p>
      <p className="card-expires">{card.expiration}</p>
      <div className="card-button-container">
        <button className="card-button-edit" onClick={() => showEditCard()}>
          Edit
        </button>
        <button className="card-button-delete" onClick={() => removingCard()}>
          Delete
        </button>
      </div>
      <div className="edit-card-content-container" id={randomId}>
        <div className="edit-card-title-container">
          <h1 className="edit-card-title">edit card</h1>
        </div>
        <form className="edit-card-form">
          <div className="form-group">
            <label htmlFor="cardName" className="card-edit-label-1">
              Name On Card
            </label>
            <input
              type="text"
              className="form-control card-edit-input"
              id="cardName"
              aria-describedby="cardMuted"
              defaultValue={card.name}
              onChange={(e) => (name = e.target.value)}
            />
            <label htmlFor="cardNumber" className="card-edit-label">
              Card Number
            </label>
            <input
              type="text"
              className="form-control card-edit-input"
              id="cardNumber"
              defaultValue={card.cardNumber}
              onChange={(e) => (cardNumber = e.target.value)}
            />
            <label htmlFor="cardType" className="address-edit-label">
              Card Type
            </label>
            <input
              type="text"
              className="form-control card-edit-input"
              id="cardType"
              defaultValue={card.type}
              onChange={(e) => (type = e.target.value)}
            />
            <label htmlFor="cardExpires" className="card-edit-label">
              Expires
            </label>
            <input
              type="text"
              className="form-control card-edit-input"
              id="cardExpires"
              defaultValue={card.expiration}
              onChange={(e) => (expiration = e.target.value)}
            />
          </div>
        </form>
        <div className="card-edit-buttons-container">
          <button className="card-edit-update" onClick={() => updatingCard()}>
            Update
          </button>
          <button className="card-edit-cancel" onClick={() => showEditCard()}>
            Cancel
          </button>
        </div>
      </div>
      <hr className="line-break" />
    </div>
  );
};
