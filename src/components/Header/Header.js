import PropTypes from 'prop-types';
import React, { useState } from 'react';
import s from './header.module.scss';
import SVG from 'react-inlinesvg';
import firebase from '../../firebase';
import services from '../../services';


const signout = async () => {
  await services.setOnlineStatus(false);
  await firebase.auth().signOut();
};

const SlideOutMenu = ({ name }) => {
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

const UserProfile = ({ user }) => {
  const [ isVisible, setIsVisible ] = useState(false);
  const buttonClass = isVisible ? s.visible : s.hidden;
  const nameClass = isVisible ? s.hideName : s.showName;
  return (
    <div className={s.user}>
      <strong className={nameClass}>{user.name}</strong>
      <button className={buttonClass} onClick={() => setIsVisible(!isVisible)}>
        {
        isVisible
          ? <SlideOutMenu name={user.name} />
          : null
        }
        <SVG className={s.profile__image} src={user.image} width={40} height={40} />

      </button>
    </div>
  );
};


const LoginButton = ({ showLogin, isSignedIn }) => {
  const buttonClass = isSignedIn ? s.login__hidden : s.login__button;
  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <button className={buttonClass} onClick={showLogin}>
          <span className={s.login__button__text}>Sign in</span>
        </button>
      </div>
    </div>
  );
};


const Header = ({ user, app }) => {
  const { showLogin } = app;
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <div className={s.logo__name}>The Elbow Room</div>
      </div>
      {user.isSignedIn
        ? (
        <UserProfile user={user} />
      ) : (
        <LoginButton showLogin={showLogin} isSignedIn={user.isSignedIn} />
      )}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

export default Header;
