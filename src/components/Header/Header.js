import PropTypes from 'prop-types';
import React, { useState } from 'react';
import s from './header.module.scss';
import SVG from 'react-inlinesvg';
import firebase from '../../firebase';


const signout = () => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/users/${uid}`)
    .update({ online: false })
    .then(() => firebase.auth().signOut())
    .catch(console.error);
};

const SlideOutMenu = () => {
  return (
    <div className={s.slideout}>
      <ul className={s.slideout__list}>
        <li className={s.slideout__list__signout}>
          <span className={s.signout} onClick={signout}>
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

const UserProfile = ({ name, image }) => {
  const [ isVisible, setIsVisible ] = useState(false);
  const className = isVisible ? s.visible : s.hidden;
  return (
    <button className={className} onClick={() => setIsVisible(!isVisible)}>
      {
        isVisible
          ? <SlideOutMenu name={name} />
          : null
      }
      <SVG className={s.profile__image} src={image} width={40} height={40} />

    </button>
  );
};


const LoginButton = ({ toggleModal, isSignedIn }) => {
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
