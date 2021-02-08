import React from 'react';
import s from './slide-out-menu.module.scss';
import PropTypes from 'prop-types';
import firebase from '../../../firebase';

const SlideOutMenu = ({ name }) => {
  const signout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={s.slideout}>
      <ul className={s.slideout__list}>
        <li className={s.slideout__list__name}>{name}</li>
        <li className={s.slideout__list__signout}>
          <a href="#" className={s.signout} onClick={signout}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

SlideOutMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SlideOutMenu;
