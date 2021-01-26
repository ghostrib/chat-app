import React from 'react';
import s from './header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <button className={s.visible}>Sign in</button>
    </header>
  );
};

export default Header;
