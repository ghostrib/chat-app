import React from 'react';
import s from './signup.module.scss';

const SignUpButton = () => {
  return (
    <div className={s.signup}>
      <button className={s.signup__button} onClick={(e) => console.log(e)}>
        <span className={s.signup__button__text}>Sign Up</span>
      </button>
    </div>
  );
};

export default SignUpButton;
