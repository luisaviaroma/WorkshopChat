import React from 'react';
import ReactDOM from 'react-dom';
import { ChatPreview, SendBox, SearchBox, Message } from '@revh/lab-chat';
import './styles.css';
import launchWebSocket from './helpers/websocket';
import config from './config';

class App extends React.Component {
  state = {
    messageValue: '',
    authToken: '',
    userId: '',
    user: '',
    userStatus: 'offline',
    username: 'lvr_lab_N',
    password: '',
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

  checkChat = () => {};

  checkListMessages = () => {};

  callApiLogin = e => {
    e.preventDefault();
    fetch(config.apiUri + 'api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        this.setState(
          {
            authToken: responseJson.data.authToken,
            userId: responseJson.data.userId,
            user: responseJson.data.me.username
          },
          () => {
            launchWebSocket(
              responseJson.data.authToken,
              this.checkLoggedinUserInfo
            );
            this.callApiListUser();
            this.checkChat();
            this.checkListMessages();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkLoggedinUserInfo = () => {};

  callApiListUser = () => {};

  callApiPostMessage = e => {};

  callApiRoomMessages = username => {};

  createDirectMessageChat = username => {};

  render() {
    const {
      username,
      userStatus,
      user,
      searchValue,
      rooms,
      activeUser,
      messageValue
    } = this.state;

    return (
      <div className="Chat">
        {!this.state.authToken && (
          <div className="loginPanel">
            <div className="panel_inner">
              <h2>Login</h2>
              <form>
                <div>
                  <input
                    value={username}
                    onChange={e => this.setState({ username: e.target.value })}
                    type="text"
                  />
                </div>
                <div>
                  <input
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password"
                  />
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
                  Loggedin as <b>{user}</b>
                </span>
                <span className={`userStatus ${userStatus}`} />
              </div>
              <div className="searchBoxContainer">
                <SearchBox
                  placeholder="Seach User"
                  onChange={e => this.setState({ searchValue: e.target.value })}
                  value={searchValue}
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                />
              </div>
              <div className="chatList">
                {this.searchUser
                  .filter(user => user.username !== user)
                  .map((user, i) => {
                    return (
                      <ChatPreview
                        key={i}
                        title={user.username}
                        lastMessage={{
                          message:
                            rooms[user.username] &&
                            rooms[user.username].lastMessage
                              ? rooms[user.username].lastMessage.msg
                              : '',
                          time:
                            rooms[user.username] &&
                            rooms[user.username].lastMessage
                              ? rooms[user.username].lastMessage.ts
                              : ''
                        }}
                        status={user.status}
                        active={activeUser.username === user.username}
                        onClick={() => {
                          this.setState({
                            activeUser: user,
                            messageValue: ''
                          });
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="chatPanel">
              {activeUser.username && (
                <div className="chatPanelInfo">
                  <ChatPreview
                    title={activeUser.username}
                    status={activeUser.status}
                    active={false}
                    onClick={() => {}}
                  />
                </div>
              )}
              <div className="messageList">
                {this.state.rooms[activeUser.username] &&
                  this.state.rooms[activeUser.username].messages.map(
                    message => {
                      return (
                        <Message
                          key={message._id}
                          message={message.msg}
                          dateMessage={message.ts}
                          received={message.u.username === activeUser.username}
                        />
                      );
                    }
                  )}
              </div>
              {activeUser.username && (
                <div className="sendBoxContainer">
                  <SendBox
                    placeholder="Insert Message"
                    onChange={e =>
                      this.setState({ messageValue: e.target.value })
                    }
                    value={messageValue}
                    onSubmit={this.callApiPostMessage}
                  />
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
