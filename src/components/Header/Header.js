import PropTypes from 'prop-types';
import React from 'react';
import s from './header.module.scss';
import UserProfile from './UserProfile/UserProfile';
import LoginButton from './LoginButton/LoginButton';

const Header = ({ isSignedIn, toggleModal, name, image }) => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <div className={s.logo__name}>The Elbow Room</div>
      </div>
      {isSignedIn ? (
        <UserProfile name={name} image={image} />
      ) : (
        <LoginButton toggleModal={toggleModal} isSignedIn={isSignedIn} />
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
