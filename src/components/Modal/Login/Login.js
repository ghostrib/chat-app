/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './login.module.scss';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import { useState, useRef } from 'react';
import firebase from '../../../firebase';
// import TwitterButton from './TwitterButton';

const Login = ({ select }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);

  const emailLabelRef = useRef(null);
  const passwordLabelRef = useRef(null);
  const buttonRef = useRef(null);


  const handleInputChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      select.toggleModal();
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
    const ref = target === 'email'
      ? emailLabelRef.current
      : target === 'password'
      ? passwordLabelRef.current
      : target;
    ref.className = s.label__blur;
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
              className={s.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              value={email}
              required={true}
              autoFocus={true}
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
