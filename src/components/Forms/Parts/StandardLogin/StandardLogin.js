import { useState } from 'react';
import InputField from '../InputField/InputField';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import RememberMe from '../RememberMe/RememberMe';
import SubmitButton from '../SubmitButton/SubmitButton';
import Error from '../Error/Error';

import s from './standardLogin.module.css';

const StandardLogin = ({ handleLogin, setValue, value, error, setError }) => {
  // const [ value, setValue ] = useState({ email: '', password: '' });
  // const [ error, setError ] = useState('');

  return (
    <div className={s.standard}>
      <p className={s.paragraph}>Login with email and password</p>
      <InputField
        setValue={setValue}
        value={value}
        setError={setError}
        error={error}
        type="email"
        label="Email"
      />

      <InputField
        setValue={setValue}
        value={value}
        setError={setError}
        error={error}
        type="password"
        label="Password"
      />
      <ForgotPassword />

      <SubmitButton
        setError={setError}
        error={error}
        value={value}
        buttonText="Sign in"
        handleLogin={handleLogin}
      />
      <RememberMe />

      <Error error={error} />
    </div>
  );
};

export default StandardLogin;
