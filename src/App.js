import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Api from "./utils/Api";
import { formatId } from "./utils/formatId";
import Login from "./page/Login";
import Main from "./page/Main/Main";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const history = useHistory();

  const handleLogin = (idInstance, apiTokenInstance) => {
    setCurrentUser({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      isAuth: true,
    });
    history.push("/");
  };

  const receive = () => {
    Api.receiveNotification(
      currentUser.idInstance,
      currentUser.apiTokenInstance
    ).then((res) => {
      if (res) {
        const sender = res.body.senderData.sender;
        if (sender === formatId(currentUser.chatId)) {
          const message = res.body.messageData.textMessageData.textMessage;
          const messageData = {
            text: message,
            owner: "sender",
          };
          setMessages([
            ...JSON.parse(localStorage.getItem("messages")),
            messageData,
          ]);
        }
        Api.deleteNotification(
          currentUser.idInstance,
          currentUser.apiTokenInstance,
          res.receiptId
        );
      }
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
  };

  useEffect(() => {
    if (currentUser.isAuth && currentUser.chatId) {
      setInterval(() => {
        receive();
      }, 5000);
    }
  }, [currentUser.chatId]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleNewChat = (chatId) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      chatId: chatId,
    }));
    setMessages([]);
    localStorage.removeItem("messages");
  };

  const sendMessage = (message) => {
    Api.sendMessage(
      currentUser.idInstance,
      currentUser.apiTokenInstance,
      currentUser.chatId,
      message
    ).then(() => {
      const messageData = {
        text: message,
        owner: "me",
      };
      setMessages([...messages, messageData]);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
  };

  const logOut = () => {
    localStorage.clear();
    setCurrentUser([]);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {currentUser.hasOwnProperty("isAuth") ? (
              <Main
                handleNewChat={handleNewChat}
                sendMessage={sendMessage}
                messages={messages}
                logOut={logOut}
              />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
          <Route path="/sign-in">
            {!currentUser.hasOwnProperty("isAuth") ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Redirect to="/sign-in" />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
