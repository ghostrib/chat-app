import React from 'react';
import s from './github.module.scss';

const GithubButton = () => {
  return (
    <button className={s.button}>
      <a href="#" className={s.button__anchor}>
        <i className="button__anchor__icon fa fa-github fa-2x"></i>
      </a>
      <div className={s.text__background}>
        <span className={s.button__text}>Login with Github</span>
      </div>
    </button>
  );
};

export default GithubButton;
