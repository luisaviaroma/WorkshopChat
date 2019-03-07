import React from "react";
import ReactDOM from "react-dom";
import { ChatPreview, SendBox, SearchBox, Message } from "@revh/lab-chat";
import "./styles.css";
import launchWebSocket from "./helpers/websocket";


class App extends React.Component {
  state = {
    messageValue: '',
    authToken: '',
    userId: '',
    user: '',
    username: '',
    password: '',
    listUsers: [],
    activeUser: {},
    rooms: {},
    searchValue: ''
  }

  get searchUser() {
    return this.state.searchValue.length ? this.state.listUsers.filter( (user) => user.username.includes(this.state.searchValue)) : this.state.listUsers
  }

  checkChat = () => {
    setInterval(() => {
      if(this.state.activeUser.username) {
        this.callApiRoomMessages(this.state.activeUser.username)
      }
    }, 1000);
  }

  checkListMessages = () => {
    setInterval(() => {
      this.state.listUsers.forEach((user) => {
        this.createDirectMessageChat(user.username);
      }); 
    }, 1000);
  }

  callApiLogin = (e) => {
    e.preventDefault();
    fetch("http://tower01-it-d:3002/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          authToken : responseJson.data.authToken,
          userId : responseJson.data.userId,
          user: responseJson.data.me.username
        },
        () => {
          this.callApiListUser();
          this.checkChat();
          //this.checkListMessages();
          launchWebSocket(responseJson.data.authToken);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  callApiListUser = () => {
    fetch('http://tower01-it-d:3002/api/v1/users.list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": this.state.authToken,
        "X-User-Id": this.state.userId
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          listUsers: responseJson.users
        })
        responseJson.users.forEach((user) => {
          this.createDirectMessageChat(user.username)
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  callApiPostMessage = (e) => {
    e.preventDefault();
    var msgVal = this.state.messageValue;
    this.setState({
      messageValue : ''
    })
    fetch("http://tower01-it-d:3002/api/v1/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": this.state.authToken,
        "X-User-Id": this.state.userId
      },
      body: JSON.stringify({
        roomId: this.state.activeRoom,
        text: msgVal
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.callApiRoomMessages(this.state.activeUser.username);
        this.createDirectMessageChat(this.state.activeUser.username);
      })
      .catch(error => {
        console.log(error);
      });
  }

  callApiRoomMessages = (username) => {
    fetch("http://tower01-it-d:3002/api/v1/im.messages?username="+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": this.state.authToken,
        "X-User-Id": this.state.userId
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(prevState => ({
          rooms: {
            ...prevState.rooms,
            [username] : {
              ...prevState.rooms[username],
              messages : responseJson.messages
            }
        },
        }))
      })
      .catch(error => {
        console.log(error);
      });
  }

  createDirectMessageChat = (username) => {
    fetch("http://tower01-it-d:3002/api/v1/im.create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": this.state.authToken,
        "X-User-Id": this.state.userId
      },
      body: JSON.stringify({
        username: username,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(prevState => ({
          rooms: {
              ...prevState.rooms,
              [username] : {
                room: responseJson.room._id,
                username : username,
                lastMessage : responseJson.room.lastMessage,
                messages : []
              }
          },
          activeRoom: responseJson.room._id
        }),
          () => this.callApiRoomMessages(username)
        )
      })
      .catch(error => {
        console.log(error);
      });
  }


  render(){
    return (
      <div className="Chat">
        {!this.state.authToken && <div className="loginPanel">
          <div className="panel_inner">
            <h2>Login</h2>
            <form>
              <div>
                <input value={this.state.username} onChange={(e) => this.setState({username : e.target.value})} type="text" />
              </div>
              <div>
                <input value={this.state.password} onChange={(e) => this.setState({password : e.target.value})} type="password" />
              </div>
              <div>
                <input className="submitButton" type="submit" value="Accedi" onClick={this.callApiLogin} />
              </div>
            </form>
          </div>
        </div>}
        {this.state.authToken && <div className="loggedIn">
        <div className="sidePanel">
          <div className="searchBoxContainer">
            <SearchBox placeholder='Seach User' onChange={(e) => this.setState({searchValue : e.target.value})} value={this.state.searchValue} onSubmit={(e) => {e.preventDefault()}} />
          </div>
          <div className="chatList">
            {this.searchUser.filter( user => user.username !== this.state.user ).map((user, i) => {
              return(
                <ChatPreview
                key={i}
                title={user.username}
                lastMessage={{
                  message:
                  this.state.rooms[user.username] && this.state.rooms[user.username].lastMessage ? this.state.rooms[user.username].lastMessage.msg : '',
                  time: this.state.rooms[user.username] && this.state.rooms[user.username].lastMessage ? this.state.rooms[user.username].lastMessage.ts: ''
                }}
                status={user.status}
                active={this.state.activeUser.username === user.username}
                onClick={() => {
                  this.createDirectMessageChat(user.username)
                  this.setState({
                    activeUser: user,
                    messageValue: ''
                  })
                }}
              />
              )
            })}
          </div>
        </div>
        <div className="chatPanel">
          {this.state.activeUser.username && <div className="chatPanelInfo">
            <ChatPreview
              title={this.state.activeUser.username}
              status={this.state.activeUser.status}
              active={false}
              onClick={() => {}}
            />
          </div>}
          <div className="messageList">
          {this.state.rooms[this.state.activeUser.username] && this.state.rooms[this.state.activeUser.username].messages.map((message) => {
            return <Message key={message._id} message={message.msg} dateMessage={message.ts} received={message.u.username === this.state.activeUser.username} />
          })} 
          </div>
          {this.state.activeUser.username && <div className="sendBoxContainer">
            <SendBox placeholder='Insert Message' onChange={(e) => this.setState({messageValue : e.target.value})} value={this.state.messageValue} onSubmit={this.callApiPostMessage} />
          </div>}
        </div>
        </div>}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
