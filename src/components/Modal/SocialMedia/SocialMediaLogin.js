import React from 'react';

import GoogleButton from './GoogleButton/LongButton/LongButton';
import FacebookButton from './FacebookButton/LongButton/LongButton';

import s from './social.module.scss';

const SocialMediaLogin = () => {
  return (
    <footer className={s.footer}>
      <hr />
      {/* <div className={s.footer__start}></div> */}
      <div className={s.media__buttons}>
        <GoogleButton />
        <FacebookButton />
      </div>
      <div className={s.signup}>
        <p>Dont have an account?</p>
        <a href="">Sign up</a>
      </div>
    </footer>
  );
};

export default SocialMediaLogin;
