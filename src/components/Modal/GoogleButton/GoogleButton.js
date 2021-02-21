import React from 'react';
import googleLogo from '../../../assets/g-logo.png';
// import PropTypes from 'prop-types';
import s from './google-button.module.scss';
import firebase, { provider } from '../../../firebase';

const GoogleButton = () => {
  const login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).catch(console.error);
  };

  return (
    <form className={s.google__form} onSubmit={login}>
      <button className={s.google__button}>
        <img className={s.google__image} src={googleLogo} alt="" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

export default GoogleButton;
