# WorkshopChat

Workshop Chat Client

Chat Client sviluppato in React utilizzando le API di [Rocket.Chat](https://rocket.chat/).

## Step 1

[Slides Workshop](https://slides.com/leonardolenzi/lvrlab#/0/4)

Montaggio dei Componenti provenienti da una libreria esterna: [lab-chat](https://www.npmjs.com/package/@revh/lab-chat) come da [**Grafica**](#grafica).

I componenti possono essere visti su [Storybook](https://revh.github.io/lab-chat/).

---

## Grafica

![Step 1](/assets/Chat_1.jpg)

## Esempio implementazione

```javascript
import { ChatPreview } from '@revh/lab-chat';
```

```javascript
<ChatPreview
  title="Bruce Wayne"
  lastMessage={{
    message: 'Io dovevo ispirare il bene, non la follia, la morte',
    time: ''
  }}
  status="offline"
  active={false}
  onClick={() => {}}
/>
```

gli altri componenti possono essere presi da Storybook.

```javascript
<SendBox
  placeholder="placeholder"
  onChange={() => {}}
  onAttachClick={() => {}}
  onMicClick={() => {}}
  onSubmit={e => {
    e.preventDefault();
  }}
  onFocus={() => {}}
  value="value"
/>
```
