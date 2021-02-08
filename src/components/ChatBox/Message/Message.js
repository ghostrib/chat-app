import React from 'react';
import PropTypes from 'prop-types';
import s from './message.module.scss';

const Message = ({ name, message, avatar }) => (
  <li className={s.container__user}>
    <div className={s.user}>
      <div className={s.image}>
        <img src={avatar} alt="avatar" className={s.user__image} />
      </div>
      <div className={s.user__name}>{name}</div>
      <div className={s.user__message}>{message}</div>
    </div>
  </li>
);

Message.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
