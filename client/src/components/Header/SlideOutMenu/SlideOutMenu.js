import React from 'react';
import s from './slide-out-menu.module.scss';
import PropTypes from 'prop-types';

const SlideOutMenu = ({ username, signOutWithGoogle }) => {
  return (
    <div className={s.slideout}>
      <ul className={s.slideout__list}>
        <li className={s.slideout__list__username}>{username}</li>
        <li className={s.slideout__list__signout}>
          <a
            href="#"
            className={s.signout}
            onClick={signOutWithGoogle}
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

SlideOutMenu.propTypes = {
  username: PropTypes.string.isRequired,
  signOutWithGoogle: PropTypes.func.isRequired,
};

export default SlideOutMenu;
