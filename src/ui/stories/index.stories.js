import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select, object, date } from '@storybook/addon-knobs';

import { 
  SampleComponent
  , SearchBox
  , ChatPreview
  , Message
  , SendBox
} from '../';

storiesOf('SearchBox', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => (
    <SearchBox
      placeholder={text('placeholder')}
      onChange={action('onChange')}
      onSubmit={e => { e.preventDefault(); action('onSubmit')(e); }}
      onFocus={action('onFocus')}
      value={text('value')} />
  ))
  .add('full example', () => (
    <SearchBox
      placeholder={text('placeholder', 'Enter for search...')}
      onChange={action('onChange')}
      onSubmit={e => { e.preventDefault(); action('onSubmit')(e); }}
      onFocus={action('onFocus')}
      value={text('value')} />
  ));

storiesOf('ChatPreview', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => (
    <ChatPreview
      title={text('title')}
      image={text('image')}
      badge={number('badge', 0)}
      status={select('status', { online: 'online', offline: 'offline' }, 'online')}
      active={boolean('active')}
      infoPreview={boolean('infoPreview')}
      onClick={action('onClick')}
    />
  ))
  .add('full example', () => (
    <ChatPreview
      title={text('title', 'Bruce Wayne')}
      image={text('image')}
      lastMessage={object('lastMessage', {
        message: text('message', 'Hi Robin! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae erat at leo luctus rutrum. Suspendisse potenti. Nunc sit amet congue tortor. Morbi tristique aliquet erat vel consectetur.'),
        time: date('time', (() => { const d = new Date(); d.setHours(d.getHours() - 2); return d })())
      })}
      badge={number('badge', 2)}
      status={select('status', { online: 'online', offline: 'offline' }, 'online')}
      active={boolean('active')}
      onClick={action('onClick')}
    />
  ));

storiesOf('SendBox', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => (
    <SendBox
      placeholder={text('placeholder')}
      onChange={action('onChange')}
      onAttachClick={action('onAttachClick')}
      onMicClick={action('onMicClick')}
      onSubmit={e => { e.preventDefault(); action('onSubmit')(e); }}
      onFocus={action('onFocus')}
      value={text('value')} />
  ));

storiesOf('Message', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => (
    <Message
      message={text('Messaggio')}
      dateMessage={date('time', (() => { const d = new Date(); d.setHours(d.getHours() - 2); return d })())}
      received={boolean('Received', true)}
      type={action('onChange')}
      onClick={action('onClick')}
    />
  ));


storiesOf('SampleComponent', module)
  .addDecorator(withKnobs())
  .add('to Storybook', () => (
    <SampleComponent
      onClick={action('clicked')}
      focused={boolean('focused', false)}>
      Sample Component!
    </SampleComponent>
  ));
