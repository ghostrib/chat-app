import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './Login/Login';
import Signup from '../Signup/Signup';
// import { useState } from 'react';

const Modal = ({ isModalVisible, isLoginForm, isSignupForm, select }) => {
  const className = isModalVisible ? s.visible : s.hidden;

  const showLogin = isModalVisible && isLoginForm; ;
  const showSignup = isModalVisible && isSignupForm;

  return (
    <div className={className}>
      {
       showLogin ? <LoginForm select={select}/> : showSignup ? <Signup select={select} /> : null
      }

    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

export default Modal;


