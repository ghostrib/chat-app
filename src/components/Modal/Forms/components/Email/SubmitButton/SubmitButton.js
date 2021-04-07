import s from './submitButton.module.css';
import { useState, useEffect, useRef } from 'react';
import utils from '../../../../../../utils';

const SubmitButton = ({ buttonText, value, setError, handleLogin }) => {
  const [ isDisabled, setIsDisabled ] = useState(true);
  const { email, password } = value;
  const buttonRef = useRef(null);

  const login = async () => {
    const loginError = await handleLogin(email, password);
    if (loginError) {
      console.log(loginError);
      setError('Your username or password is incorrect');
    }
  };

  useEffect(() => {
    const isValidEmail = utils.validateEmail(email);
    const isValidPassword = password.length >= 5;
    const isValid = isValidEmail && isValidPassword;
    setIsDisabled(!isValid);
  }, [ email, password ]);

  return (
    <>
      <button
        ref={buttonRef}
        type="submit"
        disabled={isDisabled}
        className={s.submit}
        onClick={login}
      >
        {buttonText}
      </button>
    </>
  );
};

export default SubmitButton;
