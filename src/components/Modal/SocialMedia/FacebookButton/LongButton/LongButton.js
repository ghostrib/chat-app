import React from 'react';
import facebookLogo from '../../../../../assets/f-logo.png';
import s from './long-button.module.scss';
import { facebookProvider } from '../../../../../firebase';
import services from '../../../../../services';
const { loginWith } = services;

const FacebookButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(facebookProvider)}>
      <span className={s.button__anchor}>
        <img className={s.button__logo} src={facebookLogo} alt="" />
        {/* <i className="button__anchor__icon fa fa-facebook fa-2x"></i> */}
      </span>
      <span className={s.text__background}>
        <span className={s.button__text}>Login with Facebook</span>
      </span>
    </button>
  );
};

export default FacebookButton;
