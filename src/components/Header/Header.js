import React from 'react';
import s from './header.module.scss';
// import SignInButton from './LoginButton/LoginButton';
import ButtonWrapper from './ButtonWrapper/ButtonWrapper';

import UserProfile from './UserProfile/UserProfile';
import PropTypes from 'prop-types';

const Header = ({ isSignedIn, toggleModal, name, image }) => {
  // const buttonClass = isSignedIn ? s.hidden : s.visible;

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <div className={s.logo__name}>Chat Ghost</div>
      </div>
      {isSignedIn ? (
        <UserProfile name={name} image={image} />
      ) : (
        <ButtonWrapper toggleModal={toggleModal} isSignedIn={isSignedIn} />
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
