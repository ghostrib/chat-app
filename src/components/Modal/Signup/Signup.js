/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './signup.module.css';
import services from '../../../services';
import utils from '../../../utils';
import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isValidEmail: null,
      isValidUsername: null,
      isValidPassword: null,
      passwordErrors: {
        tooShort: {
          error: false,
          message: [ 'Password should be at least 6 characters long' ]
        },
        weakPass: {
          error: false,
          message: [ 'Password should have at least:', '1 uppercase letter', '1 lowercase letter', '1 number' ]
        }
      },
      emailErrors: {
        malformed: {
          error: false,
          message: [ 'Not a valid email address' ]
        },
        unavailable: {
          error: false,
          message: [ 'An account with this email address already exists' ]
        }
      }
    };

    this.usernameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.buttonRef = React.createRef();

    this.usernameLabelRef = React.createRef();
    this.emailLabelRef = React.createRef();
    this.passwordLabelRef = React.createRef();


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handleUsernameValidation = this.handleUsernameValidation.bind(this);

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handleInputValidation = this.handleInputValidation.bind(this);
    this.setUsernameClass = this.setUsernameClass.bind(this);
    // this.setPasswordClass = this.setPasswordClass.bind(this);
    this.setButtonStatus = this.setButtonStatus.bind(this);
  }


  handleInputFocus(e) {
    let ref;
    if (e.target.name === 'username') {
      ref = this.usernameLabelRef.current;
    }
    else if (e.target.name === 'email') {
      ref = this.emailLabelRef.current;
    }
    else if (e.target.name === 'password') {
      ref = this.passwordLabelRef.current;
    }
    else {
      return null;
    }
    ref.className = s.label__focused;
  }

  handleInputBlur(e) {
    let ref;
    if (e.target.name === 'username') {
      ref = this.usernameLabelRef.current;
    }
    else if (e.target.name === 'email') {
      ref = this.emailLabelRef.current;
    }
    else if (e.target.name === 'password') {
      ref = this.passwordLabelRef.current;
    }
    else {
      return null;
    }
    if (e.target.value.length === 0) {
      ref.className = s.label__blur;
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleInputValidation(e) {
    switch (e.target.name) {
      case 'password':
        this.handleInputBlur(e);
        break;
      case 'email':
        this.handleEmailValidation(e);
        this.handleInputBlur(e);
        break;
      case 'username':
        this.handleUsernameValidation(e);
        this.handleInputBlur(e);
        break;
      default:
        this.setButtonStatus();
    }
  }

  setUsernameClass() {
    const { isValidUsername } = this.state;
    return isValidUsername === true
      ? s.success
      : isValidUsername === false
      ? s.error
      : s.username;
  }


  setButtonStatus() {
    const {
      isValidUsername,
      isValidEmail,
      isValidPassword,
    } = this.state;
    const status =
      isValidUsername && isValidEmail && isValidPassword;
    this.buttonRef.current.disabled = !status;
    return !status;
  }

  handleUsernameValidation() {
    const username = this.state.username;
    if (username.length >= 3) {
      services.isValidUsername(username, (isValid) =>
        this.setState({ isValidUsername: isValid })
      );
    }
    else if (username.length === 0) {
      this.setState({ isValidUsername: null });
    }
    else {
      this.setState({ isValidUsername: false });
    }
  }

  async handleEmailValidation(e) {
    const email = e.target.value;
    const errors = { ...this.state.emailErrors };
    let isValidEmail = this.state.isValidEmail;
    if (email.length === 0) {
      this.emailRef.current.className = s.email;
      isValidEmail = null;
    }
    else if (utils.validateEmail(email)) {
      const isAvailable = await services.isEmailAvailable(email);
      errors.malformed.error = false;
      if (isAvailable) {
        this.emailRef.current.className = s.success;
        errors.unavailable.error = false;
        isValidEmail = true;
      }
      else {
        this.emailRef.current.className = s.error;
        errors.unavailable.error = true;
        isValidEmail = false;
      }
    }
    else {
      this.emailRef.current.className = s.error;
      errors.malformed.error = true;
      isValidEmail = false;
    }
    this.setState((state) => ({ ...state, errors, isValidEmail }));
  }


  handlePasswordValidation(e) {
    const password = e.target.value;
    const errors = { ...this.state.passwordErrors };
    let isValidPassword = this.state.isValidPassword;
    if (!password.length) {
      this.passwordRef.current.className = s.password;
      isValidPassword = false;
    }
    else if (password.length) {
      if (!utils.validatePassword(password)) {
        isValidPassword = false;
        if (password.length < 5) {
          errors.weakPass.error = true;
          errors.tooShort.error = true;
          this.passwordRef.current.className = s.error;
        }
        else if (password.length >= 5) {
          errors.tooShort.error = false;
          errors.weakPass.error = true;
          this.passwordRef.current.className = s.error;
        }
      }
      else {
        errors.weakPass.error = false;
        errors.tooShort.error = false;
        this.passwordRef.current.className = s.success;
        isValidPassword = true;
      }
    }

    this.setState((prevState) => ({ ...prevState, errors, isValidPassword }));
  }


  async handleRegister(e) {
    e.preventDefault();
    const { email, password, username } = this.state;
    const { setUser } = this.props.app;
    try {
      const user = await services.signupWithEmail(username, email, password);
      return setUser(user);
      // return user;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.props.app.toggleModal();
    }
  }

  componentDidUpdate() {
    this.setButtonStatus();
  }

  render() {
    const { toggleModal, showLogin } = this.props.app;
    const { username, email, password } = this.state;

    const {
      handleInputChange,
      handleRegister,
      handleInputFocus,
      handleInputValidation,
      setUsernameClass,
      handlePasswordValidation
    } = this;
    return (
      <div className={s.modal}>
        <div className={s.overlay}></div>

        <form className={s.form} onSubmit={handleRegister}>
          <header className={s.header}>
            <h4 className={s.title}>
              SIGN UP
              <span onClick={toggleModal} className={s.close}>
                &times;
              </span>
            </h4>
          </header>

          <section className={s.inputs}>

            <label className={s.label} htmlFor="username">
              <div className={s.label__text}>
                <div className={s.label__blur} ref={this.usernameLabelRef}>
                  Username
                </div>
              </div>
            </label>


            <div className={s.container}>

              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputValidation}
                className={setUsernameClass()}
                autoFocus={true}
                minLength="3"
                maxLength="30"
              />
            </div>


            <label className={s.label} htmlFor="email">
              <div className={s.label__text}>
                <div className={s.label__blur} ref={this.emailLabelRef}>
                  Email
                </div>
              </div>
            </label>


            <div className={s.container}>

              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                onBlur={handleInputValidation}
                onFocus={handleInputFocus}
                className={s.email}
                ref={this.emailRef}
              />
            </div>


            <label className={s.label} htmlFor="password">
              <div className={s.label__text}>
                <div className={s.label__blur} ref={this.passwordLabelRef}>
                  Password
                </div>
              </div>
            </label>

            <div className={s.container}>

              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputValidation}
                onKeyUp={handlePasswordValidation}
                className={s.password}
                ref={this.passwordRef}
              />
            </div>
          </section>

          <section className={s.errors}>
            <ul className={s.errors__list}>

              {
                Object.entries(this.state.emailErrors)
                  .filter(err => err[1].error)
                  .map(err => err[1].message)
                  .flat(Infinity)
                  .map(error => <li key={Math.random()}>{error}</li>)
              }

            </ul>
            <br/>
            <ul className={s.errors__list} htmlFor="">
              {
                Object.entries(this.state.passwordErrors)
                  .filter(err => err[1].error)
                  .map(err => err[1].message)
                  .flat(Infinity)
                  .map(error => <li key={Math.random()}>{error}</li>)
              }
            </ul>
          </section>

          <button
            name="register"
            id="register"
            className={s.button}
            onClick={handleRegister}
            ref={this.buttonRef}
            disabled={true}
          >
            <span>Create your account</span>
          </button>

          <footer className={s.footer}>
            <p>Already have an account?</p>
            <a href="#" onClick={showLogin}>
              Log in
            </a>
          </footer>
        </form>
      </div>
    );
  }
}
export default Signup;

