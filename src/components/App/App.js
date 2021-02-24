import React, { Component } from 'react';
import firebase from '../../firebase';
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
      isSignedIn: null,
      messages: [],
      usersOnline: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);

    this.select = {
      showLogin: this.showLogin,
      showSignup: this.showSignup,
      toggleModal: this.toggleModal
    };

    // this.handleAuthStateChanged = this.handleAuthStateChanged.bind(this);
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

  // handleAuthStateChanged(user) {
  //   const isSignedIn = user !== null;
  //   console.log({ isSignedIn });
  //   let profile = {};
  //   if (isSignedIn) {
  //     document.cookie = `login=${Date.now()}`;
  //     profile = {
  //       name: user.displayName,
  //       image: user.photoURL,
  //       email: user.email,
  //       uid: user.uid,
  //       isModalVisible: false,
  //     };
  //   }

  //   profile = { ...profile, isSignedIn };
  //   this.setState(profile);

  //   const uid = this.state.uid;
  //   if (uid) {
  //     this.createOrUpdate();
  //   }
  // }

  // getUsersOnline() {
  //   const db = firebase.database().ref('/users');
  //   db.once('value')
  //     .then((query) => query.val())
  //     .then((data) => Object.values(data))
  //     .then((users) => users.filter((user) => user.online))
  //     .then((usersOnline) => this.setState({ usersOnline }))
  //     .catch(console.error);

  //   db.on('value', (data) => {
  //     const usersOnline = Object.values(data.val()).filter((users) => users.online);
  //     this.setState({ usersOnline });
  //   });
  // }

  getMessages() {
    const db = firebase.database().ref('/messages');
    db.limitToLast(10)
      .once('value')
      .then((query) => query.val())
      .then((data) => Object.values(data))
      .then((array) => array.sort((a, b) => a.time - b.time))
      .then((messages) => this.setState({ messages }))
      .catch(console.error);

    db.on('child_added', (message) => {
      this.setState({
        messages: [ ...this.state.messages, message.val() ],
      });
    });
  }

  // async createOrUpdate() {
  //   try {
  //     const userStatus = await firebase.database().ref(`/users/${this.state.uid}`);
  //     const query = await userStatus.get();
  //     const values = await query.val();

  //     values
  //       ? userStatus.update({ online: this.state.isSignedIn, image: this.state.image })
  //       : createNewUserEntry(this.state);
  //   }
  //   catch (error) {
  //     console.error(error.message);
  //   }
  // }

  async componentDidMount() {
    const watchForChanges = checkCookies();

    const id = setInterval(watchForChanges, 100);
    this.setState({ intervalId: id });

    // this.getUsersOnline();

    services.getUsersOnline((usersOnline) => {
      // console.log(usersOnline);
      this.setState({ usersOnline });
    });

    this.getMessages();
    // firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);
    firebase.auth().onAuthStateChanged((user) => {
      // user is not null so therefore is signed in
      if (user) {
        // determine if the user is a new user
        const {
          creationTime,
          lastSignInTime,
        } = firebase.auth().currentUser.metadata;
        const isNewUser = creationTime === lastSignInTime;

        user.getIdTokenResult().then((tokenResult) => {
          const userData = {
            name: tokenResult.claims.name,
            email: tokenResult.claims.email,
            image: tokenResult.claims.picture,
            uid: tokenResult.claims.user_id,
            online: true,
          };

          // console.log(userData);

          if (isNewUser) {
            services.createUserAccount(userData, (response) => {
              this.setState({
                name: response.name,
                image: response.image,
              });
            });
            // console.log(firebase.auth().currentUser);
          }
          else {
            // returning user.
            // retrieve info from database
            services
              .getUserInfo(user)
              .then((result) => {
                this.setState({
                  name: result.name,
                  image: result.image,
                });
              })
              .then(() => {
                const uid = firebase.auth().currentUser.uid;
                firebase.database().ref(`/users/${uid}`).update({
                  online: true,
                });
              });
          }
        });

        // user is authenticated and their data stored in database
        // now we can update the state of our app
        services.getUsersOnline((usersOnline) =>
          this.setState({ usersOnline, isSignedIn: true })
        );
      }
      else {
        // user is null therefore is signed out
        this.setState({
          isSignedIn: false,
          name: '',
          image: '',
        });
      }
    });

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(console.error);

    // firebase.auth().onIdTokenChanged((user) => {
    //   if (user) {
    //     user
    //       .getIdTokenResult()
    //       .then((data) => {
    //         console.log({ tokenResult: data });
    //       })
    //       .catch(console.error);
    //     // user.getIdTokenResult();
    //   }
    // });
  }

  render() {
    const {
      isSignedIn,
      name,
      image,
      usersOnline,
      messages,
      isModalVisible,
      isLoginForm,
      isSignupForm,
    } = this.state;
    const { toggleModal, state, select } = this;
    return (
      <GridContainer>
        <Header
          toggleModal={toggleModal}
          isSignedIn={isSignedIn}
          name={name}
          image={image}
          select={select}
        />
        <SideBar usersOnline={usersOnline} />
        <ChatBox messages={messages} />
        <TextInput state={state} toggleModal={toggleModal} />
        <Footer />
        <Modal
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          isLoginForm={isLoginForm}
          isSignupForm={isSignupForm}
          select={select}
        />
      </GridContainer>
    );
  }
}

export default App;
