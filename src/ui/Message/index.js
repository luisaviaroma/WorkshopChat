import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import BubbleMessage from './bubbleMessage';

const MessageContainer = styled.div`
  box-sizing: border-box;
  display: block;
  flex-direction: column;
  padding: 0;
  background-color: transparent;
  max-width: 50%;
  position: relative;
  align-self: ${props => (props.received ? 'flex-start' : 'flex-end')};

  ${props =>
    props.received &&
    css`
      ${BubbleMessageContainer} {
        left: 3px;
        right: auto;
        transform: rotate(-15deg);
      }
      ${MessageBrief} {
        color: #000;
        background: #fff;
      }
      ${MessageDate} {
        align-self: flex-start;
        margin-left: 20px;
        margin-right: auto;
      }
    `}
`;

const MessageContainerInner = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
`;

const BubbleMessageContainer = styled.div`
  position: absolute;
  bottom: -8px;
  left: auto;
  right: 3px;
  z-index: -1;
  transform: rotateY(165deg) rotateZ(-15deg);
`;

const MessageBrief = styled.div`
  width: auto;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: normal;
  padding: 20px;
  border-radius: 100px;
  display: inline-block;
  color: #fff;
  background: #f44a4a;
`;

const MessageDate = styled.div`
  height: 22px;
  opacity: 0.3;
  font-family: Arial;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.83;
  letter-spacing: normal;
  color: #181c2f;
  align-self: flex-end;
  z-index: 3;
  margin-right: 20px;
  margin-left: auto;
`;

const Message = ({ message, type, dateMessage, onClick, received }) => (
  <MessageContainer received={received} onClick={onClick}>
    <MessageContainerInner>
      <MessageBrief>{message}</MessageBrief>
      <BubbleMessageContainer>
        <BubbleMessage fill={received ? '#fff' : '#F44A4A'} />
      </BubbleMessageContainer>
    </MessageContainerInner>
    {dateMessage && <MessageDate>{moment(dateMessage).fromNow()}</MessageDate>}
  </MessageContainer>
);

Message.defaultProps = {
  message: null,
  type: 'text',
  dateMessage: null,
  received: true,
  onClick: () => {}
};

export default Message;
