import React from 'react';
import PropTypes from 'prop-types';
import s from './message.module.scss';
import SVG from 'react-inlinesvg';


const Message = ({ name, image, message }) => {
  return (
    <li className={s.container__user}>
      <div className={s.user}>
        <div className={s.image}>
          <SVG className={s.svg} src={image} width={44} height={44} />
          {/* <img src={image} alt="avatar" className={s.user__image} /> */}
        </div>
        <div className={s.user__name}>{name}</div>
        <div className={s.user__message}>{message}</div>
      </div>
    </li>
  );
};

Message.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
