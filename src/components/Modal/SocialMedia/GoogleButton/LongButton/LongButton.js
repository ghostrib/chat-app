import React from 'react';
import googleLogo from '../../../../../assets/g-logo.png';
import s from './long-button.module.scss';
import { googleProvider } from '../../../../../firebase';
import services from '../../../../../services';
const { loginWith } = services;

const GoogleButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(googleProvider)}>
      <span href="#" className={s.button__anchor}>
        <img className={s.button__logo} src={googleLogo} alt="" />
        {/* <i className="button__anchor__icon fa fa-google fa-2x"></i> */}
      </span>
      <div className={s.text__background}>
        <span className={s.button__text}>Login with Google</span>
      </div>
    </button>
  );
};

export default GoogleButton;
