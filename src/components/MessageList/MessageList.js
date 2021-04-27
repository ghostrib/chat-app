import React, { useEffect, useRef } from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

/** https://stackoverflow.com/a/61266099 */
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const MessageList = React.forwardRef(({ messages }, ref) => {
  return (
    <main ref={ref} style={{ gridArea: 'content', overflowY: 'scroll' }}>
      <ul>
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
});

export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};
