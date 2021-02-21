import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './user-profile.module.scss';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';

const UserProfile = ({ name, image }) => {
  const [ isVisible, setIsVisible ] = useState(false);

  return (
    <button className={s.profile} onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? <SlideOutMenu name={name} /> : null}
      <img src={image} alt="" className={s.profile__image} />
    </button>
  );
};

UserProfile.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

export default UserProfile;
