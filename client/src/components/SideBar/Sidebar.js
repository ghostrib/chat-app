import React from 'react';
import s from './sidebar.module.scss';

const SideBar = () => {
  return (
    <aside className={s.sidebar}>
      <ul>
        <li className={s.sidebar__list__item}>
          <span className={s.username}>billy bob backscratch</span>
        </li>
        <li className={s.sidebar__list__item}>
          <span className={s.username}>Chuck the fabulous</span>
        </li>
        <li className={s.sidebar__list__item}>
          {' '}
          <span className={s.username}>Raymond peters</span>
        </li>
        <li className={s.sidebar__list__item}>
          {' '}
          <span className={s.username}>Jason Marshals</span>
        </li>
        <li className={s.sidebar__list__item}>
          {' '}
          <span className={s.username}>Pauline Chambers</span>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
