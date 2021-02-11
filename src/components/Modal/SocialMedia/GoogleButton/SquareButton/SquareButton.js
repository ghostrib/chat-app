import React from 'react';
import googleIcon from '../../../../assets/g-logo.png';
import s from './square.module.scss';

const SquareButton = () => {
  return (
    <div className={s.wrapper}>
      <button className={s.button}>
        <span href="#" className={s.button__logo}>
          <img src={googleIcon} alt="" className={s.button__logo__icon} />
        </span>
      </button>
    </div>
  );
};

export default SquareButton;
