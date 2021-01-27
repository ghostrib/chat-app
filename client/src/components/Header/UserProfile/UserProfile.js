import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './user-profile.module.scss';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';

const UserProfile = ({ username, imageUrl, signOutWithGoogle }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <button
      className={s.profile}
      onClick={() => setIsVisible(!isVisible)}
    >
      {isVisible ? (
        <SlideOutMenu
          username={username}
          signOutWithGoogle={signOutWithGoogle}
        />
      ) : null}
      <img src={imageUrl} alt="" className={s.profile__image} />
    </button>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  signOutWithGoogle: PropTypes.func.isRequired,
};

export default UserProfile;
