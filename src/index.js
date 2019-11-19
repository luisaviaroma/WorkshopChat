import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ChatPreview, SendBox, SearchBox, Message } from './ui';
import { launchWebSocket, Api } from './helpers';
import './styles.css';

class App extends Component {
  state = {
    messageValue: '',
    authToken: '',
    userId: '',
    user: '',
    userStatus: 'offline',
    username: 'lvr_lab_N',
    password: 'lvr_lab_N',
    showPassword: false,
    listUsers: [],
    activeUser: {},
    rooms: {},
    searchValue: '',
    orderByValue: 'nameDESC'
  };

  get searchUser() {
    return this.state.searchValue.length
      ? this.state.listUsers.filter(user =>
          user.username.includes(this.state.searchValue)
        )
      : this.state.listUsers;
  }

  checkChat = () => {
    setInterval(() => {
      if (this.state.activeUser.username) {
        this.callApiRoomMessages(this.state.activeUser.username);
      }
    }, 1000);
  };

  checkListMessages = () => {
    setInterval(() => {
      this.state.listUsers.forEach(user => {
        this.updateStatus(user.username);
      });
    }, 10000);
  };

  callApiLogin = e => {
    e.preventDefault();
    console.log('login', this.state);
    return Api.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(responseJson => {
        if (responseJson.error) {
          console.warn({ responseJson });
          return;
        }
        Api.setAuthToken(responseJson.data.authToken);
        this.setState(
          {
            authToken: responseJson.data.authToken,
            userId: responseJson.data.userId,
            user: responseJson.data.me.username
          },
          () => {
            this.fetchRooms({ userId: responseJson.data.userId });
            this.checkChat();
            //this.checkListMessages();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkLoggedinUserInfo = () => {
    return Api.fetchUserInfo({ userId: this.state.userId }).then(
      responseJson => {
        //console.log('me', responseJson);
        this.setState({
          userStatus: responseJson.status
        });
      }
    );
  };

  fetchRooms = () => {
    return Api.fetchRooms({ userId: this.state.userId })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listUsers: responseJson.users
        });
        responseJson.users.forEach(user => {
          this.createDirectMessageChat(user.username);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  callApiPostMessage = e => {
    e.preventDefault();
    const { userId, messageValue: message, activeRoom } = this.state;
    this.setState({
      messageValue: ''
    });
    Api.sendMessage({
      userId,
      message,
      activeRoom
    })
      .then(responseJson => {
        this.callApiRoomMessages(this.state.activeUser.username);
        this.createDirectMessageChat(this.state.activeUser.username);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateStatus = username => {
    this.callApiRoomMessages(username);
  };

  callApiRoomMessages = username => {
    const { userId } = this.state;
    return Api.fetchRoomMessages({ username, userId })
      .then(responseJson => {
        this.setState(prevState => ({
          rooms: {
            ...prevState.rooms,
            [username]: {
              ...prevState.rooms[username],
              lastMessage: responseJson.messages[0],
              messages: responseJson.messages
            }
          }
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  createDirectMessageChat = username => {
    return Api.createChatWith({ username, userId: this.state.userId })
      .then(responseJson => {
        this.setState(
          prevState => ({
            rooms: {
              ...prevState.rooms,
              [username]: {
                room: responseJson.room._id,
                username: username,
                lastMessage: responseJson.room.lastMessage,
                messages: []
              }
            },
            activeRoom: responseJson.room._id
          }),
          () => this.callApiRoomMessages(username)
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSelectOrderBy = type => {
    let arrayToSort = this.state.listUsers;
    if (type === 'nameDESC') {
      arrayToSort.sort(function(a, b) {
        var nameA = a.username.toUpperCase();
        var nameB = b.username.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (type === 'nameASC') {
      arrayToSort.sort(function(a, b) {
        var nameA = a.username.toUpperCase();
        var nameB = b.username.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (type === 'status') {
      arrayToSort.sort(function(a, b) {
        var nameA = a.status.toUpperCase();
        var nameB = b.status.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({
      listUsers: arrayToSort,
      orderByValue: type
    });
  };

  render() {
    return (
      <div className="Chat">
        {!this.state.authToken && (
          <div className="loginPanel">
            <div className="panel_inner">
              <h2>Login</h2>
              <form>
                <div>
                  <input
                    value={this.state.username}
                    onChange={e => {
                      this.setState({ username: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div>
                  <div className="inputPasswordContainer">
                    <input
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                      type={this.state.showPassword ? 'text' : 'password'}
                    />
                    <span
                      className="ShowButtonPassword"
                      onClick={() =>
                        this.setState({
                          showPassword: !this.state.showPassword
                        })
                      }
                    >
                      {this.state.showPassword ? 'nascondi' : 'mostra'}
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    className="submitButton"
                    type="submit"
                    value="Accedi"
                    onClick={this.callApiLogin}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {this.state.authToken && (
          <div className="loggedIn">
            <div className="sidePanel">
              <div className="userInfo">
                <span>
                  Loggedin as <b>{this.state.user}</b>
                </span>
                <span className={`userStatus ${this.state.userStatus}`} />
              </div>
              <div className="searchBoxContainer">
                {/* TODO Insert here the search box */}
              </div>
              <div className="orderBy">
                <form>
                  {/* TODO Insert here the order by select */}
                </form>
              </div>
              <div className="chatList">
                {this.searchUser
                  .filter(user => user.username !== this.state.user)
                  .map((user, i) => {
                    {/* TODO Insert here the chat preview */}
                    return null;
                  })}
              </div>
            </div>
            <div className="chatPanel">
              {this.state.activeUser.username && (
                <div className="chatPanelInfo">
                  <ChatPreview
                    title={this.state.activeUser.username}
                    status={this.state.activeUser.status}
                    active={false}
                    onClick={() => {}}
                  />
                </div>
              )}
              <div className="messageList">
                {this.state.rooms[this.state.activeUser.username] &&
                  this.state.rooms[this.state.activeUser.username].messages.map(
                    message => {
                      {/* TODO Insert here the messages */}
                      return null;
                    }
                  )}
              </div>
              {this.state.activeUser.username && (
                <div className="sendBoxContainer">
                  {/* TODO Insert here the sendbox */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
