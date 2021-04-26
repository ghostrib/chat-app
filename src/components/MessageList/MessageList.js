import React, { useEffect, useRef } from 'react';
import Message from './Message';
import PropTypes from 'prop-types';
import s from './messagelist.module.scss';
import Content from './Content';

/** https://stackoverflow.com/a/61266099 */
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const MessageList = ({ messages }) => {
  return (
    <main className={s.main}>
      <ul className={s.main__list}>
        {messages.map((messageObject, i) => {
          const { name, message, image } = messageObject;
          return (
            <Message image={image} name={name} key={i} message={message} />
          );
        })}
        <AlwaysScrollToBottom />
      </ul>
    </main>
  );
};

export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};
