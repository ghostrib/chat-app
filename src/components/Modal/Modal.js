import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './Login/Login';
import Signup from './Signup/Signup';
// import { useState } from 'react';

const Modal = ({ isModalVisible, isLoginForm, isSignupForm, app }) => {
  const className = isModalVisible ? s.visible : s.hidden;

  const showLogin = isModalVisible && isLoginForm; ;
  const showSignup = isModalVisible && isSignupForm;

  return (
    <div className={className}>
      {
       showLogin ? <LoginForm app={app}/> : showSignup ? <Signup app={app} /> : null
      }

    </div>
  );
};

Modal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  isLoginForm: PropTypes.bool.isRequired,
  isSignupForm: PropTypes.bool.isRequired,
  app: PropTypes.object.isRequired
};

export default Modal;


