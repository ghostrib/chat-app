import React from 'react';
import PropTypes from 'prop-types';
import s from './loginform.module.scss';

import ManualEntryForm from '../ManualEntry/ManualEntry';
import SocialMediaLogin from '../SocialMedia/SocialMediaLogin';
import LoginHeader from '../LoginHeader/LoginHeader';

const LoginForm = ({ toggleModal }) => {
  return (
    <div>
      <LoginHeader toggleModal={toggleModal} />
      <section className={s.container}>
        <ManualEntryForm />
        <SocialMediaLogin />
      </section>
    </div>
  );
};

LoginForm.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default LoginForm;
