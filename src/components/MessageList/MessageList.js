import MessageCard from "../MessageCard/MessageCard";
import "./MessageList.css";

const MessageList = ({ messages }) => {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <MessageCard message={message} key={index} />
      ))}
    </ul>
  );
};

export default MessageList;
