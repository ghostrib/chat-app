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
      isSignedIn: null,
      messages: [],
      usersOnline: [],
      user: {}
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


  async handleAuthError(error) {
    if (error.email && error.credential && error.code === 'auth/account-exists-with-different-credential') {
      firebase.auth().fetchSignInMethodsForEmail(error.email).then(async signInMethods => {
        console.log({ signInMethods });

        const providerKey = signInMethods[0].split('.')[0];
        const provider = providers[providerKey];

        console.log({ provider });

        provider.setCustomParameters({ login_hint: error.email });

        const result = await firebase.auth().signInWithPopup(provider);
        result.user.linkWithCredential(error.credential).then(data => {
          console.log({ DATA: data });
          const info = data.additionalUserInfo;
          const credential = data.credential;
          const operationType = data.operationType;
          const user = data.user;

          console.log({ info, credential, operationType, user });

          return data;
        }).catch(error => {
          console.log({ AN_ERROR: error });
        });
      });
    }
  }

  async onRedirect() {
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log({ RESULT: result });
          const info = result.additionalUserInfo;
          const credential = result.credential;
          const operationType = result.operationType;
          const user = result.user;

          console.log({ info, credential, operationType, user });
          return result;
        }
      })
      .catch(error => {
        console.log({ ERROR: error });
        this.handleAuthError(error).then(resultFromHandleError => {
          console.log({ resultFromHandleError });
        });
      });
  }

  // const firstPopupProviderMethod = authProviders.find((p) =>
  //   supportedPopupSignInMethods.includes(p)
  // );

  // if (!firstPopupProviderMethod) {
  //   throw new Error('Your account is linked to a provider that isn\'t supported.');
  // }

  // const linkedProvider = providers[firstPopupProviderMethod.split('.')[0]]; // (firstPopupProviderMethod);
  // linkedProvider.setCustomParameters({ login_hint: error.email });

  // const result = await firebase.auth().signInWithPopup(linkedProvider);
  // result.user.linkWithCredential(error.credential);
  // }
  // }


  async componentDidMount() {
    const watchForChanges = checkCookies();

    const id = setInterval(watchForChanges, 100);
    this.setState({ intervalId: id });

    services.getUsersOnline((usersOnline) => this.setState({ usersOnline }));
    services.getMessages((messages) => this.setState({ messages }));

    firebase.auth().onAuthStateChanged(async authUser => {
      const isSignedIn = authUser !== null;

      if (isSignedIn) {
        document.cookie = `login=${Date.now()}`;

        services.setUserOnline(authUser.uid, (user) => this.setState({ user, isSignedIn }));

        console.log({ USER: authUser });

        await firebase.auth().getRedirectResult()
          .then(result => {
            console.log({ REDIRECT_RESULT: result });
            if (result.user) {
              console.log({ OPERATION_TYPE: result.operationType });

              if (result.operationType === 'signIn') {
                // user just signed in
                console.log({ NEW_SIGN_IN: result.user });
                console.log(result.additionalUserInfo);
                if (result.additionalUserInfo.isNewUser) {
                  // a new user
                  // create user profile and save to database
                  const userData = {
                    name: result.user.displayName,
                    image: result.user.photoURL,
                    email: result.user.email,
                    uid: result.user.uid,
                    online: true
                  };
                  services.createUserAccount(userData, (response) => {
                    this.setState({ user: { name: response.name, image: response.image, userId: response.userId }, isSignedIn: true });
                  });
                }
                else {
                  // returning user
                  console.log({ RETURNING_USER: authUser });
                  services.setUserOnline(authUser.uid, (user) => this.setState({ user, isSignedIn }));
                }
              }

              if (result.operationType === 'link') {
                // accounts are linked
              }

              // const userData = {
              //   name: user.displayName,
              //   email: user.email,
              //   uid: user.uid,
              //   image:
              // }
              // services.createUserAccount(userData, (response) => {
              //   this.setState({
              //     name: response.name,
              //     image: response.image,
              //   });
              // });
            }
            return result;
          })
          .catch(error => {
            console.log({ REDIRECT_ERROR: error });
            this.handleAuthError(error);
          });
      }
      else {
        await firebase.auth().getRedirectResult().catch(this.handleAuthError);
      }
      console.log('SIGNED OUT');
      // user is null
      // not authenticated
      const usersOnline = this.state.usersOnline.filter(user => {
        return user.userId !== this.state.user.userId;
      });
      this.setState({ isSignedIn: false, usersOnline, user: {} });
    });
  }

  // async componentDidMount() {
  //   const watchForChanges = checkCookies();

  //   services.getMessages(messages => this.setState({ messages }));
  //   services.getUsersOnline(usersOnline => this.setState({ usersOnline }));

  //   const id = setInterval(watchForChanges, 100);
  //   this.setState({ intervalId: id });

  //   // this.getUsersOnline();

  //   // services.getUsersOnline((usersOnline) => {
  //   //   // console.log(usersOnline);
  //   //   this.setState({ usersOnline });
  //   // });

  //   // this.getMessages();
  //   // firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);
  //   firebase.auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       await this.onRedirect().catch(error => {
  //         console.error({ ERROR_REDIRECT: error });
  //       });
  //       const { creationTime, lastSignInTime } = firebase.auth().currentUser.metadata;
  //       const isNewUser = creationTime === lastSignInTime;

  //       user.getIdTokenResult()
  //         .then((tokenResult) => {
  //           console.log({ tokenResult });
  //           const userData = {
  //             name: tokenResult.claims.name,
  //             email: tokenResult.claims.email,
  //             image: tokenResult.claims.picture,
  //             uid: tokenResult.claims.user_id,
  //             online: true,
  //           };

  //           // console.log(userData);

  //           if (isNewUser) {
  //             services.createUserAccount(userData, (response) => {
  //               this.setState({
  //                 name: response.name,
  //                 image: response.image,
  //               });
  //             });
  //           // console.log(firebase.auth().currentUser);
  //           }
  //           else {
  //           // returning user.
  //           // retrieve info from database
  //             services
  //               .getUserInfo(user)
  //               .then((result) => {
  //                 if (result) {
  //                   this.setState({
  //                     name: result.name,
  //                     image: result.image,
  //                   });
  //                 }
  //                 else {
  //                   throw new Error('result is either null or undefined. value is: ' + result);
  //                 }
  //               })
  //               .then(() => {
  //                 const uid = firebase.auth().currentUser.uid;
  //                 firebase.database().ref(`/users/${uid}`).update({
  //                   online: true,
  //                 });
  //               })
  //               .catch(console.error);
  //           }
  //         });

  //       // user is authenticated and their data stored in database
  //       // now we can update the state of our app
  //       services.getUsersOnline((usersOnline) =>
  //         this.setState({ usersOnline, isSignedIn: true })
  //       );
  //     }
  //     else {
  //       // user is null therefore is signed out
  //       this.setState({
  //         isSignedIn: false,
  //         name: '',
  //         image: '',
  //       });
  //     }
  //   });

  //   firebase
  //     .auth()
  //     .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //     .catch(console.error);

  //   // firebase.auth().onIdTokenChanged((user) => {
  //   //   if (user) {
  //   //     user
  //   //       .getIdTokenResult()
  //   //       .then((data) => {
  //   //         console.log({ tokenResult: data });
  //   //       })
  //   //       .catch(console.error);
  //   //     // user.getIdTokenResult();
  //   //   }
  //   // });
  // }

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
          user={this.state.user}
          select={select}
        />
        <SideBar usersOnline={usersOnline} />
        <ChatBox messages={messages} />
        <TextInput state={state} select={select}/>
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

// getMessages() {
//   const db = firebase.database().ref('/messages');
//   db.limitToLast(10)
//     .once('value')
//     .then((query) => query.val())
//     .then((data) => Object.values(data))
//     .then((array) => array.sort((a, b) => a.time - b.time))
//     .then((messages) => this.setState({ messages }))
//     .catch(console.error);

//   db.on('child_added', (message) => {
//     this.setState({
//       messages: [ ...this.state.messages, message.val() ],
//     });
//   });
// }

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


/*

GOOGLE ADDITIONAL USER INFO

email: "ominous.808@gmail.com"
family_name: "Bob"
given_name: "Ominous"
granted_scopes: "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
id: "109483724713450615447"
locale: "en"
name: "Ominous Bob"
picture: "https://lh4.googleusercontent.com/-fWGLGkbI17Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkP9dkPx1eoW3j_KPWvs68b7APxg/s96-c/photo.jpg"
verified_email: true

*/
