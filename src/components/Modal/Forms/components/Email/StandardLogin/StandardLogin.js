import InputField from '../InputField/InputField';

import SubmitButton from '../SubmitButton/SubmitButton';

import s from './standardLogin.module.css';

const StandardLogin = ({ handleLogin, setValue, value, error, setError, app }) => {
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
      {/* <ForgotPassword /> */}
      <div className={s.forgot__password}>
        <button
          type="button"
          onClick={() => app.showReset()}
          className={s.forgot__password__button}
        >
          Forgot password?
        </button>
      </div>

      <SubmitButton
        setError={setError}
        error={error}
        value={value}
        buttonText="Sign in"
        handleLogin={handleLogin}
      />

      {/* <RememberMe /> */}
      <div className={s.remember__me}>
        <input className={s.checkbox} type="checkbox" id="checkbox" />
        <label className={s.remember__me__label} htmlFor="checkbox">
          Stay logged in
        </label>
      </div>

      {/* <Error error={error} /> */}
      <div className={s.error}>
        <p className={s.error__message}>{error}</p>
      </div>
    </div>
  );
};

export default StandardLogin;
