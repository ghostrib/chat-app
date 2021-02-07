import React from 'react';
import s from './header.module.scss';
import SignInButton from './SignInButton/SignInButton';

import UserProfile from './UserProfile/UserProfile';
import PropTypes from 'prop-types';

const Header = ({ isSignedIn, toggleModal, name, image }) => {
  const buttonClass = isSignedIn ? s.hidden : s.visible;

  return (
    <header className={s.header}>
      {isSignedIn ? (
        <UserProfile name={name} image={image} />
      ) : (
        <SignInButton toggleModal={toggleModal} buttonClass={buttonClass} />
      )}
    </header>
  );
};

Header.propTypes = {
  toggleModal: PropTypes.func,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string,
};

export default Header;
