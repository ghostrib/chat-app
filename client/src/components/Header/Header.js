import React, { useState } from 'react';
import s from './header.module.scss';
import PropTypes from 'prop-types';

const Header = ({ toggleModal }) => {
  return (
    <header className={s.header}>
      <button onClick={toggleModal} className={s.visible}>
        Sign in
      </button>
    </header>
  );
};

export default Header;

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
