import PropTypes from 'prop-types';
import React from 'react';
import s from './usercard.module.scss';
const UserCard = ({ name, image }) => {
  return (
    <li className={s.sidebar__list__item}>
      <img className={s.avatar} src={image} alt="user avatar" />
      <span className={s.name}>{name}</span>
    </li>
  );
};

export default UserCard;

UserCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};
