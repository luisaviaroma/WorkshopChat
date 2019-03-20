[![Build Status](https://travis-ci.com/luisaviaroma/WorkshopChat.svg?branch=master)](https://travis-ci.com/luisaviaroma/WorkshopChat)

# WorkshopChat

Workshop Chat Client

Chat Client sviluppato in React utilizzando le API di [Rocket.Chat](https://rocket.chat/).

Nel Workshop andremo a sviluppare la UI come da Grafica e poi la integreremo con le API di Rocket.Chat.
Il Workshop è diviso in 4 Step:

1. Montaggio dei Componenti provenienti da una libreria esterna: [lab-chat](https://www.npmjs.com/package/@revh/lab-chat) come da **Grafica**. [Step 1](https://github.com/luisaviaroma/WorkshopChat/tree/step1)
2. Implementazione delle Chiamate al Backend: le API messe a disposizione da utilizzare sono definite nella sezione [API](#api). [Step 2](https://github.com/luisaviaroma/WorkshopChat/tree/step2)
3. Implementazione di un nuovo componente UI: in una seconda revisione Grafica è stato aggiunto un componente **Sort By** per filtrare fra gli utenti. [Step 3](https://github.com/luisaviaroma/WorkshopChat/tree/step3)
4. Implementazione di un **Test UI** sul Componente Sort By appena creato.

## Bonus

5. Implementare un nuovo componente in TDD partendo da un test che fallisce.

---

## API

Le API messe a disposizione per questo Workshop sono:

### Login Utente

- api/v1/login - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/authentication/login/)

### Info Utente

- api/v1/me - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/authentication/me/)

### Lista Utenti

- api/v1/users.list - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/users/list/)

### Invio Messaggio

- api/v1/chat.postMessage - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage/)

### Lista Messaggi Diretti

- api/v1/im.messages - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/im/messages/)

### Creazione Messaggio Diretto con un Utente

- api/v1/im.create - [documentazione](https://rocket.chat/docs/developer-guides/rest-api/im/create/)
