/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './signup.module.css';
import services from '../../services';
import utils from '../../utils';
import React from 'react';
// import Tooltip from 'react-tooltip-lite';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      tooltip: false,
      isValidEmail: null,
      isValidUsername: null,
      isValidPassword: null,
      isConfirmed: null,
      errors: {
        tooShort: {
          error: false,
          message: [ 'Password should be at least 6 characters long' ]
        },
        weakPass: {
          error: false,
          // message: 'Password should have at least:',
          message: [ 'Password should have at least:', '1 uppercase letter', '1 lowercase letter', '1 number' ]
        }
      },
    };

    this.usernameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmRef = React.createRef();
    this.tooltipRef = React.createRef();
    this.buttonRef = React.createRef();

    this.usernameLabelRef = React.createRef();
    this.emailLabelRef = React.createRef();
    this.passwordLabelRef = React.createRef();

    this.passwordErrorsRef = React.createRef();
    this.passwordWrapper = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handleUsernameValidation = this.handleUsernameValidation.bind(this);

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handleInputValidation = this.handleInputValidation.bind(this);
    this.setUsernameClass = this.setUsernameClass.bind(this);
    // this.setEmailClass = this.setEmailClass.bind(this);
    this.setPasswordClass = this.setPasswordClass.bind(this);
    this.setButtonStatus = this.setButtonStatus.bind(this);

    this.checkPassword = this.checkPassword.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
  }

  checkPassword(e) {
    const password = e.target.value;
    const errors = { ...this.state.errors };
    if (!utils.validatePassword(password)) {
      if (password.length && password.length < 8) {
        errors.weakPass.error = true;
        errors.tooShort.error = true;
      }
      else if (password.length && password.length >= 8) {
        errors.tooShort.error = false;
        errors.weakPass.error = true;
      }
    }
    else {
      errors.weakPass.error = false;
      errors.tooShort.error = false;
    }

    this.setState((prevState) => ({ ...prevState, errors }));
    console.log({ state: this.state });
  }

  displayErrors() {
    return (
      <div className={s.status}>
        <div className={s.container}>

        </div>
      </div>
    );
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
    console.log(ref);
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
    console.log(ref);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleInputValidation(e) {
    switch (e.target.name) {
      case 'password':
        this.handlePasswordValidation(e);
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

  // setEmailClass() {
  //   const { isValidEmail } = this.state;
  //   return isValidEmail === true
  //     ? s.success
  //     : isValidEmail === false
  //     ? s.error
  //     : s.email;
  // }

  setPasswordClass() {
    const { isValidPassword } = this.state;
    return isValidPassword === true
      ? s.success
      : isValidPassword === false
        ? s.error
        : s.confirm;
  }

  setButtonStatus() {
    const {
      isValidUsername,
      isValidEmail,
      isValidPassword,
      isConfirmed,
    } = this.state;
    const status =
      isValidUsername && isValidEmail && isValidPassword && isConfirmed;
    // // const disabled = !enabled;
    this.buttonRef.current.disabled = !status;
    return !status;
  }

  handleUsernameValidation() {
    const username = this.state.username;
    if (username.length >= 6) {
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

  handleEmailValidation(e) {
    const email = e.target.value;
    if (email.length === 0) {
      this.emailRef.current.className = s.email;
      this.setState({ isValidEmail: null });
    }
    else if (utils.validateEmail(email)) {
      this.emailRef.current.className = s.success;
      this.setState({ isValidEmail: true });
    }
    else {
      this.emailRef.current.className = s.error;
      this.setState({ isValidEmail: false });
    }
  }


  handlePasswordValidation(e) {
    const current = e.target.value;
    const password = this.state.password;
    console.log({ current, password });
    if (current !== password && password.length && current.length) {
      this.setState({ isValidPassword: false, isConfirmed: false });
      // this.confirmRef.current.className = s.error;
      if (current.length >= password.length) {
        this.setState({ isValidPassword: false, isConfirmed: false });
        this.passwordRef.current.className = s.error;
        // this.confirmRef.current.className = s.error;
      }
      else {
        this.setState({ isValidPassword: null, isConfirmed: null });
        this.passwordRef.current.className = s.password;
      }
    }
    else if (current === password && password.length > 6) {
      this.setState({ isValidPassword: true, isConfirmed: true });
      this.passwordRef.current.className = s.success;
      // this.confirmRef.current.className = s.success;
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const { email, password, username } = this.state;
    await services.signupWithEmail(username, email, password);
    this.props.select.toggleModal();
  }

  componentDidUpdate() {
    console.log('updating');
    this.setButtonStatus();
  }

  render() {
    const { toggleModal, showLogin } = this.props.select;
    const {
      username,
      email,
      password,
      // confirmPassword,
      // isValidUsername,
    } = this.state;

    const {
      handleInputChange,
      handleRegister,
      handleInputFocus,
      handleInputValidation,
      setUsernameClass,
      checkPassword,
      // setButtonStatus,

      // setPasswordClass,
      // setEmailClass,
      // setPasswordClass
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
              {/* <div className={s.placeholder}></div> */}

              <input
                type="text"
                name="username"
                // placeholder="What should we call you?"
                id="username"
                value={username}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputValidation}
                autoFocus={true}
                minLength="6"
                maxLength="30"
                className={setUsernameClass()}
                ref={this.usernameRef}
              />
            </div>


            {/* <label className={s.label} htmlFor="email" ref={this.emailLabelRef}>Email</label> */}

            <label className={s.label} htmlFor="username">
              <div className={s.label__text}>
                <div className={s.label__blur} ref={this.emailLabelRef}>
                  Email
                </div>
              </div>
            </label>


            <div className={s.container}>
              {/* <span className={s.placeholder}></span> */}

              <input
                type="email"
                name="email"
                // placeholder="Enter your email address"
                id="email"
                value={email}
                onChange={handleInputChange}
                onBlur={handleInputValidation}
                onFocus={handleInputFocus}
                className={s.email}
                ref={this.emailRef}
              />
            </div>


            <label className={s.label} htmlFor="username">
              <div className={s.label__text}>
                <div className={s.label__blur} ref={this.passwordLabelRef}>
                  Password
                </div>
              </div>
            </label>

            {/* <label className={s.label} htmlFor="password" ref={this.passwordLabelRef}>Password</label> */}
            <div className={s.container}>
              {/* <span className={s.placeholder}></span> */}

              <input
                type="password"
                name="password"
                // placeholder="Enter a password"
                id="password"
                value={password}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputValidation}
                onKeyUp={checkPassword}
                className={s.password}
                ref={this.passwordRef}
              />
            </div>
          </section>

          <section className={s.errors}>
            <ul className={s.errors__list} htmlFor="">
              {
                Object.entries(this.state.errors)
                  .filter(err => err[1].error)
                  .map(err => err[1].message)
                  .flat(Infinity)
                  .map(error => <li>{error}</li>)
              }
            </ul>
          </section>


          {/* <section> */}
          <button
            name="register"
            id="register"
            className={s.button}
            onClick={handleRegister}
            // disabled={true}
            ref={this.buttonRef}
          >
            Create your account
          </button>
          {/* </section> */}

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

// eslint-disable-next-line no-lone-blocks
{
  /* <div className={s.container}>
              <div className={s.label}>
                <label htmlFor="confirm">
                  <span>Confirm password</span>


                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    id="confirm"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    onKeyUp={handleInputValidation}
                    onFocus={handleInputFocus}
                    // onBlur={handleInputValidation}
                    className={s.confirm}
                    ref={this.confirmRef}
                  />

                </label>
              </div>
            </div> */
}
