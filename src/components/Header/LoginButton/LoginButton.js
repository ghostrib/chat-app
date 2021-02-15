import PropTypes from "prop-types";
import React from "react";
import s from "./login.module.scss";

const LoginButton = ({ toggleModal, isSignedIn }) => {
  // const isSignedIn = firebase.auth().currentUser !== null;
  const buttonClass = isSignedIn ? s.login__hidden : s.login__button;

  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <button className={buttonClass} onClick={toggleModal}>
          <span className={s.login__button__text}>Sign in</span>
        </button>
      </div>
    </div>
  );
};

LoginButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isSignedIn: PropTypes.any,
};

export default LoginButton;
