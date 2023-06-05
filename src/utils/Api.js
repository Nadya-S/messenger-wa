class Api {
  constructor() {
    this.baseUrl = "https://api.green-api.com/";
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  sendMessage(idInstance, apiTokenInstance, chatId, message) {
    return fetch(
      `${this.baseUrl}waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          chatId: chatId + "@c.us",
          message: message,
        }),
      }
    ).then(this._checkResponse);
  }

  receiveNotification(idInstance, apiTokenInstance) {
    return fetch(
      `${this.baseUrl}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      {
        method: "GET",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  deleteNotification(idInstance, apiTokenInstance, receiptId) {
    return fetch(
      `${this.baseUrl}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default new Api();
