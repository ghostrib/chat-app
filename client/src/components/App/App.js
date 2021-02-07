import React, { Component } from 'react';
import GridContainer from '../Grid/Grid';

import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

import firebase, { provider, db, createNewUserEntry } from '../../firebase';

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
    let profile = {};
    if (isSignedIn) {
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

  async createOrUpdate() {
    try {
      const userStatus = await firebase.database().ref(`/userlist/${this.state.uid}`);
      const query = await userStatus.get();
      const values = await query.val();

      values
        ? userStatus.update({ online: this.state.isSignedIn })
        : createNewUserEntry(this.state);
    } catch (error) {
      console.error(error.message);
    }
  }

  async componentDidMount() {
    console.clear();

    // this.getUsersOnline();
    // this.getMessages();
    firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);
  }

  render() {
    return (
      <>
        <GridContainer>
          <>
            <Header
              toggleModal={this.toggleModal}
              isSignedIn={this.state.isSignedIn}
              name={this.state.name}
              image={this.state.image}
              signOutWithGoogle={this.signOutWithGoogle}
            />
            <SideBar usersOnline={this.state.usersOnline} />
            <ChatBox messages={this.state.messages} />
            <TextInput saveMessage={this.saveMessage} />
            <Footer />
          </>
        </GridContainer>
        <Modal
          toggleModal={this.toggleModal}
          visible={this.state.visible}
          signInWithGoogle={this.signInWithGoogle}
        />
      </>
    );
  }
}

export default App;
