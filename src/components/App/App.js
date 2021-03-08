import React, { Component } from 'react';
import firebase, { providers } from '../../firebase';
import services from '../../services';
import { checkCookies } from '../../utils/cookies';
import ChatBox from '../ChatBox/ChatBox';
import Footer from '../Footer/Footer';
import GridContainer from '../Grid/Grid';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isLoginForm: false,
      isSignupForm: false,
      messages: [],
      usersOnline: [],
      user: {}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.setUser = this.setUser.bind(this);

    this.app = {
      showLogin: this.showLogin,
      showSignup: this.showSignup,
      toggleModal: this.toggleModal,
      setUser: this.setUser
    };
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  showLogin() {
    this.setState({ isModalVisible: true, isLoginForm: true, isSignupForm: false });
  }

  showSignup() {
    this.setState({ isModalVisible: true, isLoginForm: false, isSignupForm: true });
  }

  setUser(user) {
    this.setState({ user });
  }

  async handleAuthError(error) {
    if (error.email && error.credential && error.code === 'auth/account-exists-with-different-credential') {
      sessionStorage.setItem('credential', JSON.stringify(error.credential));

      const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(error.email);
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
      const usersOnline = this.state.usersOnline.filter(user => {
        return user.userId !== this.state.user.userId;
      });
      this.setState({ usersOnline, user: {} });
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
    setInterval(checkCookies(), 250);

    services.getUsersOnline((usersOnline) => this.setState({ usersOnline }));
    services.getMessages((messages) => this.setState({ messages }));

    firebase.auth().onAuthStateChanged(authUser => {
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
    const {
      usersOnline,
      messages,
      isModalVisible,
      isLoginForm,
      isSignupForm,
    } = this.state;
    const { state, app } = this;
    return (
      <GridContainer>
        <Header
          user={this.state.user}
          app={app}
        />
        <SideBar usersOnline={usersOnline} />
        <ChatBox messages={messages} />
        <TextInput user={this.state.user} state={state} app={app}/>
        <Footer />
        <Modal

          isModalVisible={isModalVisible}
          isLoginForm={isLoginForm}
          isSignupForm={isSignupForm}
          app={app}
        />
      </GridContainer>
    );
  }
}

export default App;

