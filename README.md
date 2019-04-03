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

Nel Workshop andremo a sviluppare la UI come da Grafica e poi la integreremo con le API di Rocket.Chat.
Il Workshop è diviso in 4 Step:

1. Montaggio dei Componenti come da **Grafica**. [Step 1](https://github.com/luisaviaroma/WorkshopChat/tree/step1)
2. Implementazione di un **Test UI** sul Componente Sort By appena creato. [step-tests](https://github.com/luisaviaroma/WorkshopChat/tree/step-tests)
3. Implementazione delle Chiamate al Backend: le API messe a disposizione da utilizzare sono definite nella sezione [API](#api). [StepAPI](https://github.com/luisaviaroma/WorkshopChat/tree/stepAPI)

## Bonus

4. Implementare un nuovo componente in TDD partendo da un test che fallisce.

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
