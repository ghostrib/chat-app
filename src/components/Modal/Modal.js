import React from 'react';
import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './LoginForm/LoginForm';

const Modal = ({ visible, toggleModal }) => {
  return (
    <>
      <div className={visible ? s.visible : s.hidden}>
        <div className={s.modal}></div>
        <div className={s.modal__window}>
          <LoginForm toggleModal={toggleModal} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Modal;
