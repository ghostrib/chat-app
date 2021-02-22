import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';
import s from './user-profile.module.scss';


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

UserProfile.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

export default UserProfile;
