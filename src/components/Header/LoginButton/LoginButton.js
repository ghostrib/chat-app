import React from 'react';
import PropTypes from 'prop-types';
import s from './login.module.scss';
import firebase from '../../../firebase';

const LoginButton = ({ toggleModal, isSignedIn }) => {
  // const isSignedIn = firebase.auth().currentUser !== null;
  const buttonClass = isSignedIn ? s.login__hidden : s.login__button;

  return (
    <div className={s.login}>
      <button className={buttonClass} onClick={toggleModal}>
        <span className={s.login__button__text}>Sign in</span>
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isSignedIn: PropTypes.any,
};

export default LoginButton;
