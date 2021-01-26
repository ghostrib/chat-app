import React from 'react';
import PropTypes from 'prop-types';
import s from './grid.module.scss';

const Grid = ({ children }) => (
  <section className={s.container}>{children}</section>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
