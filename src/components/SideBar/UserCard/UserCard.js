import PropTypes from 'prop-types';
import React from 'react';
import s from './usercard.module.scss';
import SVG from 'react-inlinesvg';

const UserCard = ({ name, image }) => {
  return (
    <li className={s.sidebar__list__item}>
      <SVG src={image} width={40} height={40} className={s.image}/>
      <span className={s.name}>{name}</span>
    </li>
  );
};

export default UserCard;

UserCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};
