import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './Login/Login';
import Signup from './Signup/Signup';
// import { useState } from 'react';

const Modal = ({ forms, app }) => {
  const { isModalVisible, isLoginForm, isSignupForm } = forms;

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
  forms: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

export default Modal;


