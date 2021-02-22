import PropTypes from 'prop-types';
import React from 'react';
import firebase from '../../../firebase';
import s from './slide-out-menu.module.scss';

const SlideOutMenu = ({ name }) => {
  const signout = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}`)
      .update({ online: false })
      .then(() => firebase.auth().signOut())
      .catch(console.error);
  };

  return (
    <div className={s.slideout}>
      <ul className={s.slideout__list}>
        {/* <li className={s.slideout__list__name}>{name}</li> */}
        <li className={s.slideout__list__signout}>
          <span className={s.signout} onClick={signout}>
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

SlideOutMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SlideOutMenu;
