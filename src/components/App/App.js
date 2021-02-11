import React, { Component } from 'react';
import GridContainer from '../Grid/Grid';

import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

import firebase, { createNewUserEntry } from '../../firebase';
import { echo, checkCookies, initApp, parseCookies } from '../../utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isSignedIn: null,
      messages: [],
      usersOnline: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAuthStateChanged = this.handleAuthStateChanged.bind(this);
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible });
  }

  handleAuthStateChanged(user) {
    const isSignedIn = user !== null;
    echo({ isSignedIn });
    let profile = {};
    if (isSignedIn) {
      document.cookie = `login=${Date.now()}`;
      profile = {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        uid: user.uid,
        visible: false,
      };
    }

    profile = { ...profile, isSignedIn };
    this.setState(profile);

    const uid = this.state.uid;
    if (uid) {
      this.createOrUpdate();
    }
  }

  getUsersOnline() {
    const db = firebase.database().ref('/userlist');
    db.once('value')
      .then((query) => query.val())
      .then((data) => Object.values(data))
      .then((users) => users.filter((user) => user.online))
      .then((usersOnline) => this.setState({ usersOnline }))
      .catch(console.error);

    db.on('value', (data) => {
      const usersOnline = Object.values(data.val()).filter((users) => users.online);
      this.setState({ usersOnline });
    });
  }

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
        messages: [...this.state.messages, message.val()],
      });
    });
  }

  async createOrUpdate() {
    try {
      const userStatus = await firebase.database().ref(`/userlist/${this.state.uid}`);
      const query = await userStatus.get();
      const values = await query.val();

      values
        ? userStatus.update({ online: this.state.isSignedIn, image: this.state.image })
        : createNewUserEntry(this.state);
    } catch (error) {
      console.error(error.message);
    }
  }

  async componentDidMount() {
    // initApp();
    const watchForChanges = checkCookies();

    const id = setInterval(watchForChanges, 100);
    this.setState({ intervalId: id });

    this.getUsersOnline();
    this.getMessages();
    firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then((data) => echo({ data }))
      .catch(console.error);

    firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        user
          .getIdTokenResult()
          .then((data) => {
            echo({ data });
          })
          .catch(console.error);
        // user.getIdTokenResult();
      }
    });
  }

  render() {
    const { isSignedIn, name, image, usersOnline, messages, visible } = this.state;
    const { toggleModal, state } = this;
    return (
      <GridContainer>
        <Header toggleModal={toggleModal} isSignedIn={isSignedIn} name={name} image={image} />
        <SideBar usersOnline={usersOnline} />
        <ChatBox messages={messages} />
        <TextInput state={state} toggleModal={toggleModal} />
        <Footer />
        <Modal toggleModal={toggleModal} visible={visible} />
      </GridContainer>
    );
  }
}

export default App;
