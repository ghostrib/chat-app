import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from '../LoginButton/LoginButton';
import SignUpButton from '../SignUpButton/SignUpButton';

import s from './wrapper.module.scss';

const ButtonWrapper = ({ isSignedIn, toggleModal }) => {
  return (
    <div className={s.wrapper}>
      <LoginButton isSignedIn={isSignedIn} toggleModal={toggleModal} />
      <SignUpButton />
    </div>
  );
};

ButtonWrapper.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ButtonWrapper;
