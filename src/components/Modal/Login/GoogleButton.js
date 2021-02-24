import React from 'react';
import googleLogo from '../../../assets/google.png';
import s from './google.module.scss';
import { googleProvider } from '../../../firebase';
import services from '../../../services';
const { loginWith } = services;

const GoogleButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(googleProvider)}>
      <span className={s.button__anchor}>
        <img className={s.button__logo} src={googleLogo} alt="google" />
      </span>
      <span className={s.text__background}>
        <span className={s.button__text}>Login with Google</span>
      </span>
    </button>
  );
};

export default GoogleButton;
