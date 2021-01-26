import React from 'react';
import PropTypes from 'prop-types';
import s from './usercard.module.scss';
const UserCard = ({ username, imageUrl }) => {
  return (
    <li className={s.sidebar__list__item}>
      <img
        className={s.avatar}
        src={imageUrl}
        alt="user profile picture"
      />
      <span className={s.username}>{username}</span>
    </li>
  );
};

export default UserCard;

UserCard.propTypes = {
  username: PropTypes.string,
  imageUrl: PropTypes.string,
};
