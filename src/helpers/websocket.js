const wsUri = 'ws://tower01-it-d:3002/websocket';
var websocket;
let sendProgr = 1;
var sendAuthToken;
function launchWebSocket(authToken) {
  sendAuthToken = authToken;
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    onOpen(evt);
  };
  websocket.onmessage = function(evt) {
    onMessage(evt);
  };
}

function doSend(message) {
  websocket.send(message);
}

function onOpen(evt) {
  var connect = {
    msg: 'connect',
    version: '1',
    support: ['1']
  };
  var login = {
    msg: 'method',
    method: 'login',
    params: [
      {
        resume: sendAuthToken
      }
    ],
    id: '' + sendProgr++
  };

  doSend(JSON.stringify(connect));
  doSend(JSON.stringify(login));
}

function onMessage(evt) {
  console.log(evt);
  const message = JSON.parse(evt.data);
  if (message.msg === 'ping') {
    doSend(JSON.stringify({ msg: 'pong' }));
  }
}

export default launchWebSocket;
