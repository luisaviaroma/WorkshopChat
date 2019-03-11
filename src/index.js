import React from 'react';
import ReactDOM from 'react-dom';
import { ChatPreview } from '@revh/lab-chat';
import './styles.css';
//import launchWebSocket from './helpers/websocket';
//import config from './config';

class App extends React.Component {

  render() {
    return (
      <div className="Chat">
          <div className="loggedIn">
            <div className="sidePanel">
              <div className="chatList">
                <ChatPreview
                  title="Bruce Wayne"
                  lastMessage={{
                    message: 'Io dovevo ispirare il bene, non la follia, la morte',
                    time: ''
                  }}
                  status='offline'
                  active={false}
                  onClick={() => {}}
                />
              </div>  
            </div>
            <div className="chatPanel">
            </div>
          </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
