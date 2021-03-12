import PropTypes from 'prop-types';
import s from './header.module.scss';

import SVG from 'react-inlinesvg';

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

const OptionsButton = ({ user, showOptions }) => {
  return (
    <button className={s.optionsButton} onClick={showOptions}>
      <SVG className={s.profile__image} src={user.image} />
    </button>
  );
};

const Header = ({ user, app }) => {
  const { showLogin, showOptions } = app;
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <div className={s.logo__name}>The Elbow Room</div>
        </div>
        {user.isSignedIn ? (
          <OptionsButton user={user} showOptions={showOptions}/>
        ) : (
          <LoginButton showLogin={showLogin} isSignedIn={user.isSignedIn} />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default Header;
