[![Build Status](https://travis-ci.com/luisaviaroma/WorkshopChat.svg?branch=master)](https://travis-ci.com/luisaviaroma/WorkshopChat)

DEMO [https://luisaviaroma.github.io/WorkshopChat/](https://luisaviaroma.github.io/WorkshopChat/)
# WorkshopChat

Workshop Chat Client

Chat Client sviluppato in React utilizzando le API di [Rocket.Chat](https://rocket.chat/).
## Per iniziare

### Prerequisiti
Prima di iniziare assicurati di avere almeno almeno la version 10 di Node installata sulla tua macchina

- Node [https://nodejs.org/it/download/](https://nodejs.org/it/download/)

E anche il package manager Yarn anche se opzionale
- Yarn [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/)

## Step 0

```
git clone https://github.com/luisaviaroma/WorkshopChat.git
```
```
cd WorkshopChat
```
```
yarn or npm install
```
```
yarn start
```

## Step API

<<<<<<< HEAD
Implementazione delle Chiamate al Backend: le API messe a disposizione da utilizzare sono definite nella sezione [API](#api).
=======
1. Montaggio dei Componenti come da **Grafica**. [Step 1](https://github.com/luisaviaroma/WorkshopChat/tree/step1)
2. Implementazione delle Chiamate al Backend: le API messe a disposizione da utilizzare sono definite nella sezione [API](#api). [Step 2](https://github.com/luisaviaroma/WorkshopChat/tree/step2)
3. Implementazione di un nuovo componente UI: in una seconda revisione Grafica è stato aggiunto un componente **Sort By** per filtrare fra gli utenti. [Step 3](https://github.com/luisaviaroma/WorkshopChat/tree/step3)
4. Implementazione di un **Test UI** sul Componente Sort By appena creato.
>>>>>>> d989225fb6547886db6b0112b66e392269a9bc69

In questo Step andremo a chiamare le API di Rocket Chat:

- Faremo una Login.
- Caricheremo la Lista degli utenti disponibili.
- Creeremo delle Room per messaggiare direttamente con un utente.
- Aggiorneremo la Preview dei messaggi con l'ultimo ricevuto.
- Invieremo i messaggi e aggiorneremo le chat con i vari utenti.
- Aggiorneremo lo stato del nostro utente mostrando che siamo online.

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
