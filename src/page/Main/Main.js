import "./Main.css";
import ChatNavigation from "../../components/ChatNavigation/ChatNavigation";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

const Main = ({ handleNewChat, sendMessage, messages, logOut }) => {
  return (
    <section className="main">
      <ChatNavigation handleNewChat={handleNewChat} />
      <ChatWindow
        sendMessage={sendMessage}
        messages={messages}
        logOut={logOut}
      />
    </section>
  );
};

export default Main;
