import React from 'react';
import s from './sidebar.module.scss';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

const SideBar = ({ usersOnline }) => {
  const displayUsersOnline = () => {
    return usersOnline.map((user, i) => {
      return <UserCard key={Math.random()} name={user.name} image={user.image} />;
    });
  };

  return (
    <aside className={s.sidebar}>
      <div className={s.container}>
        <ul className={s.list}>{displayUsersOnline()}</ul>
      </div>
    </aside>
  );
};

export default SideBar;

SideBar.propTypes = {
  usersOnline: PropTypes.array,
};
