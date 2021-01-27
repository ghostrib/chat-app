import React from 'react';
import s from './modal.module.scss';

import PropTypes from 'prop-types';
import GoogleButton from './GoogleButton/GoogleButton';

const Modal = ({ visible, toggleModal, signInWithGoogle }) => {
  return (
    <>
      <div className={visible ? s.visible : s.hidden}>
        <div className={s.modal}></div>
        <div className={s.modal__window}>
          <GoogleButton signInWithGoogle={signInWithGoogle} />
          <span className={s.close}>
            <button onClick={toggleModal}>X</button>
          </span>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
};

export default Modal;
