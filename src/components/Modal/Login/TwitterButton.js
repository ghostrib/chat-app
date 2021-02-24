import React from 'react';
import twitterLogo from '../../../assets/twitter.png';
import s from './twitter.module.scss';
import { twitterProvider } from '../../../firebase';
import services from '../../../services';
const { loginWith } = services;

const TwitterButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(twitterProvider)}>
      <span className={s.button__anchor}>
        <img className={s.button__logo} src={twitterLogo} alt="twitter" />
      </span>
      <span className={s.text__background}>
        <span className={s.button__text}>Login with Twitter</span>
      </span>
    </button>
  );
};

export default TwitterButton;
