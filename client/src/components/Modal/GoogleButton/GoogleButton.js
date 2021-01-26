import React from 'react';
import googleLogo from '../../../assets/g-logo.png';
import PropTypes from 'prop-types';
import s from './google-button.module.scss';

const GoogleButton = ({ signInWithGoogle }) => {
  return (
    <form className={s.google__form} onSubmit={signInWithGoogle}>
      <button className={s.google__button}>
        <img className={s.google__image} src={googleLogo} alt="" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

GoogleButton.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
};

export default GoogleButton;
