/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './login.module.scss';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import { useState, useRef, useEffect } from 'react';
import firebase from '../../../firebase';
import utils from '../../../utils';
// import TwitterButton from './TwitterButton';

const Login = ({ select }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ isValidEmail, setIsValidEmail ] = useState(null);
  const [ isValidPassword, setIsValidPassword ] = useState(null);
  const [ isDisabled, setIsDisabled ] = useState(true);


  const [ errorEmail, setErrorEmail ] = useState('');

  const emailLabelRef = useRef(null);
  const passwordLabelRef = useRef(null);
  const buttonRef = useRef(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleInputChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };


  const handleInputFocus = (e) => {
    let ref;

    if (e.target.name === 'email') {
      ref = emailLabelRef.current;
    }
    else if (e.target.name === 'password') {
      ref = passwordLabelRef.current;
    }
    else {
      return null;
    }
    ref.className = s.label__focused;
  };

  const handleInputBlur = (e) => {
    const target = e.target.name;
    let ref;
    if (target === 'email') {
      ref = emailLabelRef.current;
    }
    else if (target === 'password') {
      ref = passwordLabelRef.current;
    }
    else {
      return null;
    }

    if (e.target.value.length === 0) {
      ref.className = s.label__blur;
    }
  };


  const handleEmailValidation = async () => {
    // const email = e.target.value;
    if (email.length === 0) {
      emailRef.current.className = s.email;
      setIsValidEmail(null);
    }
    else if (utils.validateEmail(email)) {
      const methods = await firebase.auth().fetchSignInMethodsForEmail(email);
      if (methods.length) {
        // email provider found for user email
        emailRef.current.className = s.success;
        setIsValidEmail(true);
      }
      else {
        // no email provider found
        emailRef.current.className = s.error;
        setIsValidEmail(false);
        throw new Error(`No registered user found for ${email}`);
      }
    }
    else {
      // email address is malformed
      emailRef.current.className = s.error;
      setIsValidEmail(false);
      setErrorEmail(`${email} is not a valid email address`);
      // throw new Error(`${email} is not a valid email address`);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await handleEmailValidation();
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await select.toggleModal();
    }
    catch (error) {
      console.error(error);
    }
  };

  const setEmailClass = () => {
    return isValidEmail === true
      ? s.success
      : isValidEmail === false
      ? s.error
      : s.email;
  };


  const { showSignup, toggleModal } = select;
  return (
    <div className={s.modal}>
      <div className={s.overlay}></div>

      <form className={s.form} onSubmit={handleLogin}>
        <header className={s.header}>
          <h4 className={s.title}>
            LOGIN
            <span className={s.close} onClick={toggleModal}>
              &times;
            </span>
          </h4>
        </header>

        <section className={s.inputs}>
          <label className={s.label} htmlFor="email">
            <div className={s.label__text}>
              <div className={s.label__blur} ref={emailLabelRef}>
                Email
              </div>
            </div>
          </label>

          <div className={s.container}>
            <input
              type="email"
              name="email"
              // placeholder="Email"
              className={setEmailClass()}
              onChange={handleInputChange}
              onBlur={handleEmailValidation}
              onFocus={e => handleInputFocus(e)}
              value={email}
              required={true}

              ref={emailRef}
            />
          </div>

          <label className={s.label} htmlFor="password">
            <div className={s.label__text}>
              <div className={s.label__blur} ref={passwordLabelRef}>
                Password
              </div>
            </div>
          </label>

          <div className={s.container}>
            <input
              type="password"
              name="password"
              // placeholder="Password"
              className={s.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}

              value={password}
              required={true}
              ref={passwordRef}
            />
          </div>

          <div className={s.options}>
            <a className={s.forgot}> Forgot password?</a>
            <div className="checkbox">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className={s.checkbox}
              />
              <label htmlFor="remember">Remember me</label>

            </div>
          </div>
        </section>

        <section className={s.login}>
          <button
            name="login"
            id="login"
            className={s.button}
            onClick={handleLogin}
            ref={buttonRef}
          >
            <span>Login to chat</span>
          </button>

          {/* <span className={s.remember}> */}

          {/* <label htmlFor="remember" className={s.remember}> */}
          {/* remember me */}
          {/* </label> */}
          {/* </span> */}
        </section>

        <section className={s.divider}>
          <div className={s.divider__container}>
            <span className={s.divider__container__line}></span>
            <span className={s.divider__container__text}>Or</span>
            <span className={s.divider__container__line}></span>
          </div>
        </section>

        <section className={s.buttons}>
          <GoogleButton />
          <FacebookButton />
        </section>

        <footer className={s.footer}>
          <p>Dont have an account?</p>
          <a href="#" onClick={showSignup}>
            Sign up
          </a>
        </footer>
      </form>
    </div>
  );
};

export default Login;
