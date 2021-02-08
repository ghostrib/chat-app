import React from 'react';
import PropTypes from 'prop-types';

const SignInButton = ({ toggleModal, buttonClass }) => {
  return (
    <button className={buttonClass} onClick={toggleModal}>
      Sign in
    </button>
  );
};

SignInButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
};

export default SignInButton;
