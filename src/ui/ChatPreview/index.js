import React from 'react';
import styled, { css } from 'styled-components'
import moment from 'moment'
import defaultAvatar from './defaultAvatar.jpeg';

const ChatPreviewContainer = styled.div`
  box-sizing: border-box;
  height: ${props => props.infoPreview ? 'auto' : '143px'};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${props => props.active ? '#454545' : '#ffffff'};
  cursor: pointer;
  overflow: hidden;

  ${props => props.active && css`
    ${Title}, ${Status}, ${MessageBrief}, ${LastMessage} {
      color: #fff;
      opacity: 1;
    }
  `}
`;

const PictureContainer = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
`;

const Image = styled.img`
  border-radius: 46px;
  width: 46px;
  height: 46px;
`;

const Title = styled.div`
  height: 22px;
  font-family: Arial;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.22;
  letter-spacing: normal;
  color: #313131;
  width: 93%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.div`
  height: 22px;
  opacity: 0.3;
  font-family: Arial;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #181c2f;
  text-transform: capitalize;
`;

const StatusLed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background: ${props => props.status === 'online' ? '#34d859' : '#cfd0d3'};
  border: 3px solid #fff;
  border-radius: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LastMessage = styled.div`
  min-width: 80px;
  height: 22px;
  opacity: 0.3;
  font-family: Arial;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.83;
  letter-spacing: normal;
  text-align: right;
  color: #181c2f;
`;

const MessagesBriefContainer = styled.div`
  display: flex;
  margin-top: 15px;
  position: relative;
`;

const MessageBrief = styled.div`
  width: 93%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #000000;
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  overflow: hidden;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.08);
  background-color: #f34848;
  border-radius: 26px;
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const ChatPreview = ({ title, image, badge, lastMessage, status, active, infoPreview, onClick }) => (
  <ChatPreviewContainer onClick={onClick} active={active} infoPreview={infoPreview}>
    <CardContainer>
      <PictureContainer>
        {status && <StatusLed status={status} />}
        <Image src={image} />
      </PictureContainer>

      <div style={{ flex: 1, marginLeft: '15px' }}>
        <Title>{title}</Title>
        {!!status && <Status>{status}</Status>}
      </div>
      {!!lastMessage && lastMessage.time && <LastMessage>{moment(lastMessage.time).fromNow()}</LastMessage>}
    </CardContainer>

    {!!lastMessage && <MessagesBriefContainer>
      <MessageBrief>{lastMessage.message}</MessageBrief>
      {!!badge && <Badge>{badge}</Badge>}
    </MessagesBriefContainer>}
  </ChatPreviewContainer>
);

ChatPreview.defaultProps = {
  title: 'Untitled Chat',
  image: defaultAvatar,
  lastMessage: null,
  status: null,
  badge: 0,
  active: false,
  infoPreview: false,
  onClick: () => { }
};

export default ChatPreview