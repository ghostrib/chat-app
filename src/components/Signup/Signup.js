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
    };

    this.usernameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmRef = React.createRef();
    this.tooltipRef = React.createRef();
    this.buttonRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handleUsernameValidation = this.handleUsernameValidation.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handleInputValidation = this.handleInputValidation.bind(this);
    this.setUsernameClass = this.setUsernameClass.bind(this);
    // this.setEmailClass = this.setEmailClass.bind(this);
    this.setPasswordClass = this.setPasswordClass.bind(this);
    this.setButtonStatus = this.setButtonStatus.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleInputValidation(e) {
    switch (e.target.name) {
      case 'confirmPassword':
        this.handlePasswordValidation(e);
        break;
      case 'password':
        this.handlePasswordValidation(e);
        break;
      case 'email':
        this.handleEmailValidation(e);
        break;
      case 'username':
        this.handleUsernameValidation(e);
        break;
      default:
        this.setButtonStatus();
    }
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
    const { isValidUsername, isValidEmail, isValidPassword, isConfirmed } = this.state;
    const status = isValidUsername && isValidEmail && isValidPassword && isConfirmed;
    // // const disabled = !enabled;
    this.buttonRef.current.disabled = !status;
    return !status;
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
      this.confirmRef.current.className = s.error;
      if (current.length >= password.length) {
        this.setState({ isValidPassword: false, isConfirmed: false });
        this.passwordRef.current.className = s.error;
        this.confirmRef.current.className = s.error;
      }
      else {
        this.setState({ isValidPassword: null, isConfirmed: null });
        this.passwordRef.current.className = s.password;
      }
    }
    else if (current === password && password.length > 6) {
      this.setState({ isValidPassword: true, isConfirmed: true });
      this.passwordRef.current.className = s.success;
      this.confirmRef.current.className = s.success;
    }
  }

  handleInputFocus(e) {
    this.setState({ isValid: { [e.target.name]: null } });
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
      confirmPassword,
      // isValidUsername,
    } = this.state;

    const {
      handleInputChange,
      handleRegister,
      handleInputFocus,
      handleInputValidation,
      setUsernameClass,
      setButtonStatus,
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
            <input
              type="text"
              name="username"
              placeholder="What should we call you?"
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

            {/* <Tooltip
              content={'6 - 30 characters'}
              tagName="span"
              color="white"
              background="#191919"
              arrow={false}
              ref={this.tooltipRef}
              isOpen={isValid === true ? false : isValid === false}
            >
              <label htmlFor="username" className={s.label__username}></label>
            </Tooltip> */}

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              id="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleInputValidation}
              onFocus={handleInputFocus}
              className={s.email}
              ref={this.emailRef}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              id="password"
              value={password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputValidation}
              className={s.password}
              ref={this.passwordRef}
            />
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
            <button
              type="submit"
              name="register"
              id="register"
              className={s.button}
              onClick={handleRegister}
              disabled={true}
              ref={this.buttonRef}

            >
              Create your account
            </button>
          </section>

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

// const { showLogin, toggleModal } = select;
// const passwordRef = useRef(null);
// const confirmRef = useRef(null);
// const usernameRef = useRef(null);

// const [ username, setUsername ] = useState('');
// const [ email, setEmail ] = useState('');
// const [ password, setPassword ] = useState('');
// const [ confirm, setConfirm ] = useState('');
// const [ isAvailable, setIsAvailable ] = useState(null);

// const handleRegister = (e) => {
//   e.preventDefault();

//   console.log({ password, confirm });

//   // setIsError(true);
//   passwordRef.current.className = password !== confirm ? s.error : s.password;

//   services.isValidUsername(username, (response) => setIsAvailable(response));
//   if (!isAvailable) {
//     // username is already taken
//     console.log('username not available');
//   }
// };

// const handleUsernameInput = (e) => {
//   setUsername(e.target.value);
//   usernameRef.current.className = s.username;
// };

// const handlePasswordValidation = (e) => {
//   const current = e.target.value;
//   confirmRef.current.className =
//     current === password
//       ? s.success
//       : current !== password && current.length === password.length
//       ? s.error
//       : s.confirm;

//   passwordRef.current.className = confirmRef.current.className;
// };

// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     const userData = {
//       name: this.state.username,
//       email: user.email,
//       uid: user.uid,
//       image: '',
//       online: true
//     };

//     services.createUserAccount(userData, response => {
//       user.updateProfile({
//         displayName: response.name,
//         photoURL: response.image,
//         uid: user.uid,
//         email: user.email
//       });
//     });
//   })
//   .then(() => this.props.select.toggleModal())
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log({ errorCode, errorMessage });
//     // ..
//   });
