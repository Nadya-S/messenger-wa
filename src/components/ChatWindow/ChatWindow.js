import MessageList from "../MessageList/MessageList";
import "./ChatWindow.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useInput from "../../hooks/useInput";

const ChatWindow = ({ sendMessage, messages, logOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const message = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message.value);
    message.setValue("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    logOut();
  };

  const handleDisabled = () => {
    return !currentUser.hasOwnProperty("chatId");
  };

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <p className="chat-window__user">Chat with: {currentUser.chatId}</p>
        <button className="chat-window__logout-button" onClick={handleClick}>
          Log out
        </button>
      </header>
      <div className="chat-window__conteiner">
        <div className="chat-window__messages">
          <MessageList messages={messages} />
        </div>
        <form className="chat-window__form" onSubmit={handleSubmit}>
          <input
            className="chat-window__input"
            value={message.value}
            onChange={message.onChange}
          ></input>
          <button
            className="chat-window__submit-button"
            type="submit"
            disabled={handleDisabled()}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatWindow;
