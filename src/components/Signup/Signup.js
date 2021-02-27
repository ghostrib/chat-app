/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './signup.module.scss';
import firebase from '../../firebase';
import services from '../../services';
import React from 'react';
import Tooltip from 'react-tooltip-lite';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isValid: null,
      email: '',
      password: '',
      confirmPassword: '',
      tooltip: false,
    };

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmRef = React.createRef();
    this.tooltipRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleConfirmUsername = this.handleConfirmUsername.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleConfirmPassword(e) {
    const current = e.target.value;
    const password = this.state.password;
    if (current !== password && password.length) {
      this.confirmRef.current.className = s.error;
      if (current.length === password.length) {
        this.passwordRef.current.className = s.error;
      }
      else {
        this.passwordRef.current.className = s.password;
      }
    }
    else if (current === password) {
      this.passwordRef.current.className = s.success;
      this.confirmRef.current.className = s.success;
    }
  }

  handleInputFocus() {
    this.setState({ isValid: null });
  }

  handleConfirmUsername() {
    const username = this.state.username;
    if (username.length >= 6) {
      services.isValidUsername(username, (isValid) =>
        this.setState({ isValid })
      );
    }
    else {
      this.setState({ isValid: false });
    }
  }

  handleRegister(e) {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
      // Signed in
        const user = userCredential.user;
        console.log({ user });

        const userData = {
          name: this.state.username,
          email: user.email,
          uid: user.uid,
          image: '',
          online: true
        };


        services.createUserAccount(userData, response => {
          user.updateProfile({
            displayName: response.name,
            photoURL: response.image,
            uid: user.uid,
            email: user.email
          });
        });
      })
      .then(() => this.props.select.toggleModal())
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        // ..
      });
  }

  render() {
    const { toggleModal, showLogin } = this.props.select;
    const { username, email, password, confirmPassword, isValid } = this.state;

    const {
      handleInputChange,
      handleRegister,
      handleConfirmPassword,
      handleConfirmUsername,
      handleInputFocus,
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
              onBlur={handleConfirmUsername}
              minLength="6"
              maxLength="30"
              className={
                isValid === true
                  ? s.success
                  : isValid === false
                  ? s.error
                  : s.username
              }
              ref={this.usernameRef}
            />

            <Tooltip
              content={'6 - 30 characters'}
              tagName="span"
              color="white"
              background="#191919"
              arrow={false}
              ref={this.tooltipRef}
              isOpen={isValid === true ? false : isValid === false}
            >
              <label htmlFor="username" className={s.label__username}></label>
            </Tooltip>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              id="email"
              value={email}
              onChange={handleInputChange}
              className={s.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              id="password"
              value={password}
              onChange={handleInputChange}
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
              onKeyUp={handleConfirmPassword}
              className={s.confirm}
              ref={this.confirmRef}
            />
            <input
              type="submit"
              name="register"
              id="register"
              value="REGISTER"
              className={s.register}
              onClick={handleRegister}
            />
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

// const handleConfirmPassword = (e) => {
//   const current = e.target.value;
//   confirmRef.current.className =
//     current === password
//       ? s.success
//       : current !== password && current.length === password.length
//       ? s.error
//       : s.confirm;

//   passwordRef.current.className = confirmRef.current.className;
// };
