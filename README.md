[![Build Status](https://travis-ci.com/luisaviaroma/WorkshopChat.svg?branch=master)](https://travis-ci.com/luisaviaroma/WorkshopChat)

# WorkshopChat

Workshop Chat Client

Chat Client sviluppato in React utilizzando le API di [Rocket.Chat](https://rocket.chat/).

## Step API

[Slides](https://slides.com/leonardolenzi/lvrlab#/0/9)

Implementazione delle Chiamate al Backend: le API messe a disposizione da utilizzare sono definite nella sezione [API](#api).

In questo Step andremo a chiamare le API di Rocket Chat:

- Faremo una Login.
- **Caricheremo la Lista degli utenti disponibili**.
- Creeremo delle Room per messaggiare direttamente con un utente.
- Aggiorneremo la Preview dei messaggi con l'ultimo ricevuto.
- **Invieremo i messaggi** e aggiorneremo le chat con i vari utenti.
- Aggiorneremo lo stato del nostro utente mostrando che siamo online.

---

## API

Le API messe a disposizione per questo Workshop sono:

### Login Utente

- api/v1/login - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/authentication/login/)

### Info Utente

- api/v1/me - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/authentication/me/)

## **Lista Utenti**

- api/v1/users.list - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/users/list/)

## **Invio Messaggio**

- api/v1/chat.postMessage - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage/)

### Lista Messaggi Diretti

- api/v1/im.messages - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/im/messages/)

### Creazione Messaggio Diretto con un Utente

- api/v1/im.create - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/im/create/)

---

## Esempio Implementazione Codice per la Login

```javascript
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
```

```javascript
fetch(`${config.apiUri}api/v1/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user,
    password
  })
}).then(parse);
```
