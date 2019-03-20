import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faMicrophoneAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperclip);
library.add(faMicrophoneAlt);
library.add(faPaperPlane);

const MessageContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background-color: #F9F8F8;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  opacity: 1;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  color: #B9BBC4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 99em;
  transition: background-color .2s ease-in-out;
  cursor: pointer;

  &:hover{
    background-color: #e6e6e6;
  }
`;

const IconButtonContainer = styled.div`
  width: 23px;
  height: 23px;
  color: #B9BBC4;
  margin: 0 auto;
  font-size: 15px;
  line-height: 15px;
`;

const MessageInputContainer = styled.div`
  margin-left: 10px;
  flex: 1;
`;

const MessageInput = styled.input`
  border: none;
  background: none;
  width: 100%;
  height: 25.6px;
  font-family: Arial;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #B9BBC4;

  &:focus {
    outline: none;
  }
`;

const AudioClip = styled.div`
  width: 40px;
  margin-right: 10px;
`;

const Button = styled.button`
  background: #F44A4A;
  border: none;
  border-radius: 999em;
  width: 52px;
  height: 52px;
  cursor: pointer;
  transition: background-color .2s ease-in-out;

  &:hover{
    background: #A72424;
  }
  &:focus{
    outline: none;
  }
`;

const SendBox = ({ placeholder, value, onAttachClick, onChange, onMicClick, onSubmit }) => (
  <MessageContainer onSubmit={onSubmit} action="">
    <label htmlFor="labChatMessageInput">
      <IconContainer onClick={onAttachClick}>
        <FontAwesomeIcon icon="paperclip" color="#B9BBC4" />
      </IconContainer>
    </label>

    <MessageInputContainer>
      <MessageInput
        id="labChatMessageInput"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </MessageInputContainer>
    <AudioClip>
      <IconContainer onClick={onMicClick}>
        <FontAwesomeIcon icon="microphone-alt" color="#B9BBC4" />
      </IconContainer>
    </AudioClip>
    <Button onClick={onSubmit}>
      <IconButtonContainer>
        <FontAwesomeIcon size="lg" icon="paper-plane" color="#FFFFFF" />
      </IconButtonContainer>
    </Button>
  </MessageContainer>
);

SendBox.defaultProps = {
  placeholder: '',
  value: '',
  onAttachClick: () => { },
  onMicClick: () => { },
  onChange: () => { },
  onSubmit: () => { }
};

export default SendBox