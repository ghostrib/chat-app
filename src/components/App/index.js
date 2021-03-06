import React, { Component } from 'react';
import firebase, { providers } from '../../firebase';
import services from '../../services';
import { checkCookies } from '../../utils/cookies';
import MessageList from '../MessageList/MessageList';

import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput';

import s from './app.module.scss';

const GridContainer = ({ children }) => (
  <section className={s.container}>{children}</section>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {
        isModalVisible: false,
        isLoginForm: false,
        isSignupForm: false,
        isOptionsPage: false,
        isResetPage: false,
      },
      messages: [],
      usersOnline: [],
      user: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.showReset = this.showReset.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUsersOnline = this.setUsersOnline.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.inputRef = React.createRef();
    this.mainRef = React.createRef();

    this.app = {
      showLogin: this.showLogin,
      showSignup: this.showSignup,
      showOptions: this.showOptions,
      showReset: this.showReset,
      toggleModal: this.toggleModal,
      setUser: this.setUser,
      setMessages: this.setMessages,
    };
  }

  toggleModal() {
    this.setState({
      forms: { isModalVisible: !this.state.forms.isModalVisible },
    });
  }

  showLogin() {
    this.setState({
      forms: {
        isModalVisible: true,
        isLoginForm: true,
        isSignupForm: false,
        isOptionsPage: false,
        isResetPage: false,
      },
    });
  }

  showSignup() {
    this.setState({
      forms: {
        isModalVisible: true,
        isLoginForm: false,
        isSignupForm: true,
        isOptionsPage: false,
        isResetPage: false,
      },
    });
  }

  showOptions() {
    this.setState({
      forms: {
        isModalVisible: true,
        isLoginForm: false,
        isSignupForm: false,
        isOptionsPage: true,
        isResetPage: false,
      },
    });
  }

  showReset() {
    this.setState({
      forms: {
        isModalVisible: true,
        isLoginForm: false,
        isSignupForm: false,
        isOptionsPage: false,
        isResetPage: true,
      },
    });
  }

  setUser(user) {
    this.setState({ user });
  }

  setUsersOnline(usersOnline) {
    this.setState({ usersOnline });
  }

  setMessages(messages) {
    this.setState({ messages });
  }

  async handleAuthError(error) {
    if (
      error.email &&
      error.credential &&
      error.code === 'auth/account-exists-with-different-credential'
    ) {
      sessionStorage.setItem('credential', JSON.stringify(error.credential));

      const signInMethods = await firebase
        .auth()
        .fetchSignInMethodsForEmail(error.email);
      const providerKey = signInMethods[0].split('.')[0];
      const provider = providers[providerKey];
      firebase.auth().signInWithRedirect(provider);
    }
  }

  handleLinkingAccounts(authUser) {
    const savedItem = sessionStorage.getItem('credential');
    const creds = firebase.auth.AuthCredential.fromJSON(savedItem);
    const credential = firebase.auth.FacebookAuthProvider.credential(creds);
    sessionStorage.removeItem('credential');
    authUser.linkWithCredential(credential);
  }

  async handleAuthChange(authUser) {
    if (authUser) {
      document.cookie = `login=${Date.now()}`;
      await services.setOnlineStatus(true);
      const user = await services.getUser(authUser.uid);
      this.setState({ user });
    } else {
      const uid = this.state.user.userId;
      const usersOnline = this.state.usersOnline.filter(
        (user) => user.userId !== uid
      );
      this.setState({ user: {}, usersOnline });
    }
  }

  async handleCreatingNewAccount(authUser) {
    const user = await services.createUserAccount(authUser);
    this.setState({ user });
  }

  async handleRedirect() {
    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.user) {
        const { operationType, additionalUserInfo } = result;
        if (operationType === 'signIn') {
          if (additionalUserInfo.isNewUser) {
            this.handleCreatingNewAccount(result.user);
          } else {
            await services.setOnlineStatus(true);
            const user = await services.getUser(result.user.uid);
            this.setState({ user });
          }
        }
        if (sessionStorage.getItem('credential')) {
          this.handleLinkingAccounts(result.user);
        }
      }
      return result;
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  handleScroll() {
    this.mainRef.current.addEventListener('touchstart', (e) => {
      this.inputRef.current.blur();
    });
  }

  componentDidMount() {
    this.handleScroll();
    const { setUsersOnline, setMessages } = this;

    window.addEventListener('unload', () => {
      services.setOnlineStatus(false);
    });

    setInterval(checkCookies(), 250);
    services.getUsersOnline(setUsersOnline);
    services.getMessages(setMessages);

    firebase.auth().onAuthStateChanged((authUser) => {
      this.handleAuthChange(authUser);
      this.handleRedirect();
    });
  }

  componentWillUnmount() {
    if (this.state.usersOnline.length === 1) {
      console.log('only you');
    }
    this.setState = (state, callback) => {
      return null;
    };
  }

  render() {
    const { usersOnline, messages, forms, user, message } = this.state;
    const { state, app } = this;
    return (
      <>
        <GridContainer>
          <Header user={user} app={app} />
          <SideBar usersOnline={usersOnline} />
          <MessageList ref={this.mainRef} messages={messages} />
          <TextInput ref={this.inputRef} user={user} state={state} app={app} />
        </GridContainer>
        <Modal forms={forms} app={app} />
      </>
    );
  }
}

export default App;
