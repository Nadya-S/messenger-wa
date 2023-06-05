import ContactCard from "../ContactCard/ContactCard";

const ChatList = ({ currentUser }) => {
  return (
    <ul className="chat-list">
      <ContactCard key={currentUser.chatId} currentUser={currentUser} />
    </ul>
  );
};

export default ChatList;
