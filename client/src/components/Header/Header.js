import React from 'react';
import s from './header.module.scss';
import SignInButton from './SignInButton/SignInButton';

import UserProfile from './UserProfile/UserProfile';
import PropTypes from 'prop-types';

const Header = ({
  isSignedIn,
  toggleModal,
  username,
  imageUrl,
  signOutWithGoogle,
}) => {
  const buttonClass = isSignedIn ? s.hidden : s.visible;

  const Component = isSignedIn ? (
    <UserProfile
      username={username}
      imageUrl={imageUrl}
      signOutWithGoogle={signOutWithGoogle}
    />
  ) : !isSignedIn && isSignedIn !== null ? (
    <SignInButton
      toggleModal={toggleModal}
      buttonClass={buttonClass}
    />
  ) : null;

  return (
    <header className={s.header}>
      {isSignedIn ? (
        <UserProfile
          username={username}
          imageUrl={imageUrl}
          signOutWithGoogle={signOutWithGoogle}
        />
      ) : !isSignedIn && isSignedIn !== null ? (
        <SignInButton
          toggleModal={toggleModal}
          buttonClass={buttonClass}
        />
      ) : null}
    </header>
  );
};

Header.propTypes = {
  toggleModal: PropTypes.func,
  isSignedIn: PropTypes.bool,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  signOutWithGoogle: PropTypes.func.isRequired,
};

export default Header;

// import React, { useState } from 'react';
// import s from './header.module.scss';
// import PropTypes from 'prop-types';

// const Header = ({ toggleModal }) => {
//   return (
//     <header className={s.header}>
//       <button onClick={toggleModal} className={s.visible}>
//         Sign in
//       </button>
//     </header>
//   );
// };

// export default Header;

// Header.propTypes = {
//   toggleModal: PropTypes.func.isRequired,
// };
