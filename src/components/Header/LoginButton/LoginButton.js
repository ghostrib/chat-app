import React from 'react';
import PropTypes from 'prop-types';
import s from './login.module.scss';

const SignInButton = ({ toggleModal, isSignedIn }) => {
  const buttonClass = isSignedIn ? s.login__hidden : s.login__button;
  return (
    <div className={s.login}>
      <button className={buttonClass} onClick={toggleModal}>
        <span className={s.login__button__text}>Log in</span>
      </button>
    </div>
  );
};

SignInButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};

export default SignInButton;
