import React from 'react';
import s from './sidebar.module.scss';

import PropTypes from 'prop-types';
import UserCard from './UserCard/UserCard';

const SideBar = ({ usersOnline }) => {
  return (
    <aside className={s.sidebar}>
      <div className={s.container}>


        <ul className={s.list}>
          {usersOnline.map((user, i) => {
            return (
              <UserCard key={(i + 1) * Math.random()} name={user.name} image={user.image} />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;

SideBar.propTypes = {
  usersOnline: PropTypes.array,
};
