import React from 'react';
import s from './twitter.module.scss';

const TwitterButton = () => {
  return (
    <button className={s.button}>
      <a href="#" className={s.button__anchor}>
        <i className="button__anchor__icon fa fa-twitter fa-2x"></i>
      </a>
      <div className={s.text__background}>
        <span className={s.button__text}>Login with Twitter</span>
      </div>
    </button>
  );
};

export default TwitterButton;
