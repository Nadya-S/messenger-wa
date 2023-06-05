import "./ContactCard.css";

const ContactCard = ({ currentUser }) => {
  if (currentUser.hasOwnProperty("chatId")) {
    return (
      <li className="contact-card">
        <div className="contact-card__number">{currentUser.chatId}</div>
      </li>
    );
  }
};

export default ContactCard;
