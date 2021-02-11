import React from 'react';
import googleLogo from '../../../../../assets/g-logo.png';
import s from './long-button.module.scss';
import firebase, { googleProvider } from '../../../../../firebase';
import { loginWith } from '../../../../../utils';

const GoogleButton = () => {
  const login = async () => {
    const auth = firebase.auth();
    const pop = await auth.signInWithPopup(googleProvider);
    console.log({ pop });

    // const result = await auth.getRedirectResult();
    // console.log({ result });
    // .then(async (data) => {
    //   console.log({ data });
    //   const result = await firebase.auth().getRedirectResult();
    //   echo({ result });
    // });
  };

  return (
    <button className={s.button} onClick={() => loginWith(googleProvider)}>
      <a href="#" className={s.button__anchor}>
        <img className={s.button__logo} src={googleLogo} alt="" />
        {/* <i className="button__anchor__icon fa fa-google fa-2x"></i> */}
      </a>
      <div className={s.text__background}>
        <span className={s.button__text}>Login with Google</span>
      </div>
    </button>
  );
};

export default GoogleButton;
