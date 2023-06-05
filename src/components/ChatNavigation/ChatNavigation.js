import ChatList from "../ChatList/ChatList";
import "./ChatNavigation.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useInput from "../../hooks/useInput";

const ChatNavigation = ({ handleNewChat }) => {
  const currentUser = useContext(CurrentUserContext);
  const chatId = useInput("");

  const handleClick = (e) => {
    e.preventDefault();
    handleNewChat(chatId.value);
    chatId.setValue("");
  };

  return (
    <section className="chat-navigation">
      <header className="chat-navigation__header">
        <p className="chat-navigation__user">User: {currentUser.idInstance}</p>
      </header>
      <form className="chat-navigation__form">
        <input
          className="chat-navigation__form-input"
          value={chatId.value}
          onChange={chatId.onChange}
          placeholder="Номер получателя"
        ></input>
        <button
          className="chat-navigation__button-new-chat"
          onClick={handleClick}
        >
          New Chat
        </button>
      </form>
      <ChatList currentUser={currentUser} />
    </section>
  );
};

export default ChatNavigation;
