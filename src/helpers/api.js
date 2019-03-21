import config from '../config';

function parse(res) {
  return res.json();
}

class Api {
  /**
   * Creates an instance of Api.
   * @memberof Api
   */
  constructor() {
    this.authToken = '';
  }

  /**
   *
   *
   * @param {*} authToken
   * @memberof Api
   */
  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  /**
   *
   *
   * @param {*} { user, password }
   * @returns
   * @memberof Api
   */
  login({ user, password }) {
    return fetch(`${config.apiUri}api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user,
          password
        })
      })
        .then(parse);
  }
  
  /**
   *
   *
   * @param {*} { userId }
   * @returns
   * @memberof Api
   */
  fetchUserInfo({ userId }) {
    return fetch(`${config.apiUri}api/v1/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.authToken,
        'X-User-Id': userId
      }
    })
      .then(parse);
  }

  /**
   *
   *
   * @param {*} { userId }
   * @returns
   * @memberof Api
   */
  fetchRooms({ userId }) {
    return fetch(config.apiUri + 'api/v1/users.list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.authToken,
        'X-User-Id': userId
      }
    }).then(parse);
  }

  /**
   *
   *
   * @param {*} { userId, activeRoom, message }
   * @returns
   * @memberof Api
   */
  sendMessage({ userId, activeRoom, message }) {
    return fetch(config.apiUri + 'api/v1/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.authToken,
        'X-User-Id': userId
      },
      body: JSON.stringify({
        roomId: activeRoom,
        text: message
      })
    }).then(parse)
  }
  
  /**
   *
   *
   * @param {*} { username, userId }
   * @returns
   * @memberof Api
   */
  fetchRoomMessages({ username, userId }) {
    return fetch(`${config.apiUri}api/v1/im.messages?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.authToken,
        'X-User-Id': userId
      }
    })
      .then(parse)
  };

  /**
   *
   *
   * @param {*} { username, userId }
   * @returns
   * @memberof Api
   */
  createChatWith({ username, userId }) {
    return fetch(`${config.apiUri}api/v1/im.create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.authToken,
        'X-User-Id': this.state.userId
      },
      body: JSON.stringify({
        username: username
      })
    }).then(parse);
  }
}

export default new Api()
