import React from 'react';
import s from './header.module.scss';

import PropTypes from 'prop-types';

const LoginHeader = ({ toggleModal }) => {
  return (
    <header className={s.header}>
      <h4 className={s.title}>
        {' '}
        Chat Login
        <span onClick={toggleModal} className={s.close}>
          &times;
        </span>
      </h4>
    </header>
  );
};

LoginHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default LoginHeader;
