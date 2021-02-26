import React from 'react';
import facebookLogo from '../../../assets/facebook.png';
import s from './facebook.module.scss';
// import { facebookProvider } from '../../../firebase';
import { providers } from '../../../firebase';
import services from '../../../services';

const { loginWith } = services;
const { facebook } = providers;

const FacebookButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(facebook)}>
      <span className={s.button__anchor}>
        <img className={s.button__logo} src={facebookLogo} alt="facebook" />
      </span>
      <span className={s.text__background}>
        <span className={s.button__text}>Login with Facebook</span>
      </span>
    </button>
  );
};

export default FacebookButton;
