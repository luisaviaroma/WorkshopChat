import config from './../config';
var websocket;
let sendProgr = 1;
var sendAuthToken;
var functionCallback;

function launchWebSocket(authToken, callback) {
  sendAuthToken = authToken;
  //callback();
  functionCallback = callback;
  websocket = new WebSocket(config.wsUri);
  websocket.onopen = function (evt) {
    onOpen(evt);
  };
  websocket.onmessage = function (evt) {
    onMessage(evt);
  };
}

function doSend(message) {
  //console.log('doSend', message);
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
    params: [{
      resume: sendAuthToken
    }],
    id: '' + sendProgr++
  };

  doSend(JSON.stringify(connect));
  doSend(JSON.stringify(login));
}

function onMessage(evt) {
  //console.log(evt.data);
  const message = JSON.parse(evt.data);
  if (message.msg === 'ping') {
    doSend(
      JSON.stringify({
        msg: 'pong'
      })
    );
  }
  if (message.msg === 'result') {
    functionCallback();
  }
}

export default launchWebSocket;