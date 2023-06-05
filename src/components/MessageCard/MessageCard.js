import "./MessageCard.css";

const MessageCard = ({ message }) => {
  const owner = message.owner;

  if (owner === "me") {
    return (
      <li className="message-card_my-card">
        <p className="message-card__text">{message.text}</p>
      </li>
    );
  } else {
    return (
      <li className="message-card">
        <p className="message-card__text">{message.text}</p>
      </li>
    );
  }
};

export default MessageCard;
