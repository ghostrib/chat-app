import React from 'react';

import s from './long-button.module.scss';
import { facebookProvider } from '../../../../../firebase';
import { loginWith } from '../../../../../utils';

const FacebookButton = () => {
  return (
    <button className={s.button} onClick={() => loginWith(facebookProvider)}>
      <span href="#" className={s.button__anchor}>
        <i className="button__anchor__icon fa fa-facebook fa-2x"></i>
      </span>
      <span className={s.text__background}>
        <span className={s.button__text}>Login with Facebook</span>
      </span>
    </button>
  );
};

export default FacebookButton;
