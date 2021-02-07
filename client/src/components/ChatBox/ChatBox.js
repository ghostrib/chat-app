import React, { useEffect, useRef } from 'react';
import Message from './Message/Message';
import PropTypes from 'prop-types';
import s from './chatbox.module.scss';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const ChatBox = ({ messages }) => {
  return (
    <main className={s.main}>
      <ul className={s.main__list}>
        {messages.map((messageObject, i) => {
          const { name, message, image } = messageObject;
          return <Message avatar={image} name={name} message={message} key={i} />;
        })}
        <AlwaysScrollToBottom />
      </ul>
    </main>
  );
};

export default ChatBox;

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
};
