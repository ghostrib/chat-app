/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './login.module.scss';
import { useState, useRef, useEffect } from 'react';
import firebase from '../../../firebase';
import utils from '../../../utils';
import SocialMediaButton from './SocialMediaButton';
import googleLogo from '../../../assets/google.png';
import facebookLogo from '../../../assets/facebook.png';

const Login = ({ app }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ isChecked, setIsChecked ] = useState(true);
  const [ error, setError ] = useState({ email: '', password: '' });


  const emailLabelRef = useRef(null);
  const passwordLabelRef = useRef(null);
  const buttonRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setError({ [e.target.name]: '' });
    switch (e.target.name) {
      case 'email': return setEmail(value);
      case 'password': return setPassword(value);
      default: break;
    }
  };

  const handleFocusChange = (e) => {
    const type = e.type;
    const name = e.target.name;
    const value = e.target.value;
    let ref;

    if (name === 'email') {
      ref = emailLabelRef.current;
      emailRef.current.className = s.email;
    }
    if (name === 'password') {
      ref = passwordLabelRef.current;
      passwordRef.current.className = s.password;
    }

    ref.className =
      type === 'focus'
      ? s.label__focused
      : type === 'blur' && !value.length
      ? s.label__blur
      : ref.className;

    setIsDisabled(password.length === 0 || email.length === 0);
  };


  const handleEmailValidation = async () => {
    if (email.length === 0) {
      emailRef.current.className = s.email;
    }
    else if (utils.validateEmail(email)) {
      // emailRef.current.className = s.success;
    }
    else {
      emailRef.current.className = s.error;
      throw new Error({
        code: 'wrong',
        message: 'so you did something wrong...'
      });
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email.length && password.length) {
        await handleEmailValidation();
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await app.toggleModal();
      }
    }
    catch (error) {
      console.log({ error });
      if (error.code === 'auth/invalid-email') {
        // malformed email
        emailRef.current.className = s.error;
        setError({ email: 'Invalid email address' });
      }
      else if (error.code === 'auth/user-not-found') {
        emailRef.current.className = s.error;
        setError({ email: 'No account found' });
      }
      else if (error.code === 'auth/too-many-requests') {
        setError({ password: 'Account locked' });
        firebase.auth().sendPasswordResetEmail(email);
      }
      else if (error.code === 'auth/wrong-password') {
        passwordRef.current.className = s.error;
        setError({ password: 'Incorrect password' });
      }
      else {
        setError({ email: 'go home, you\'re obviously drunk' });
      }
    }
  };


  useEffect(() => {
    const { LOCAL, SESSION } = firebase.auth.Auth.Persistence;
    const persistence = isChecked ? LOCAL : SESSION;
    firebase.auth().setPersistence(persistence);
  }, [ isChecked ]);

  const { showSignup, toggleModal } = app;
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


          <label className={s.label} htmlFor="email" onClick={e => emailRef.current.focus()}>
            <div className={s.label__text} >
              <div className={s.label__blur} ref={emailLabelRef} >
                  Email
                <span className={s.error__message}>{error.email}</span>
              </div>
            </div>
          </label>

          <div className={s.container}>
            <input
              type="email"
              name="email"
              className={s.email}
              onChange={handleInputChange}
              onBlur={handleFocusChange}
              onFocus={handleFocusChange}
              value={email}
              required={false}

              ref={emailRef}
            />
          </div>

          <label className={s.label} htmlFor="password" name="password" onClick={e => passwordRef.current.focus()}>
            <div className={s.label__text}>
              <div className={s.label__blur} ref={passwordLabelRef}>
                Password
                <span className={s.error__message}>{error.password}</span>
              </div>
            </div>
          </label>

          <div className={s.container}>
            <input
              type="password"
              name="password"
              className={s.password}
              onChange={handleInputChange}
              onBlur={handleFocusChange}
              onFocus={handleFocusChange}
              value={password}
              // required={true}
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
                checked={isChecked}
                onChange={(e) => setIsChecked(!isChecked)}
              />
              <label htmlFor="remember">Keep me signed in</label>

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
            disabled={isDisabled}
          >
            <span>Join the room</span>
          </button>

        </section>

        <section className={s.divider}>
          <div className={s.divider__container}>
            <span className={s.divider__container__line}></span>
            <span className={s.divider__container__text}>Or</span>
            <span className={s.divider__container__line}></span>
          </div>
        </section>

        <section className={s.buttons}>
          <SocialMediaButton brand={'google'} imageSrc={googleLogo}/>
          <SocialMediaButton brand={'facebook'} imageSrc={facebookLogo} />
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

