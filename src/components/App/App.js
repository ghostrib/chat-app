import React, { Component } from 'react';
import firebase, { providers } from '../../firebase';
import services from '../../services';
import { checkCookies } from '../../utils/cookies';
import ChatBox from '../ChatBox/ChatBox';
// import Footer from '../Footer/Footer';
import GridContainer from '../Grid/Grid';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import s from './app.module.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {
        isModalVisible: false,
        isLoginForm: false,
        isSignupForm: false,
        isOptionsPage: false,
      },
      messages: [],
      usersOnline: [],
      user: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUsersOnline = this.setUsersOnline.bind(this);
    this.setMessages = this.setMessages.bind(this);

    this.app = {
      showLogin: this.showLogin,
      showSignup: this.showSignup,
      showOptions: this.showOptions,
      toggleModal: this.toggleModal,
      setUser: this.setUser,
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
    }
    else {
      this.setState({ user: {} });
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
            // first time user
            this.handleCreatingNewAccount(result.user);
          }
          else {
            // returning user
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
    }
    catch (error) {
      this.handleAuthError(error);
    }
  }

  componentDidMount() {
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
    this.setState = (state, callback) => {
      return null;
    };
  }

  render() {
    const { usersOnline, messages, forms, user } = this.state;
    const { state, app } = this;
    return (
      <div className={s.app}>
        <GridContainer>
          <Header user={user} app={app} />
          <SideBar usersOnline={usersOnline} />
          <ChatBox messages={messages} />
          <TextInput user={user} state={state} app={app} />
        </GridContainer>
        <Modal forms={forms} app={app} />
      </div>

    );
  }
}

export default App;
