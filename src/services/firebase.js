/* eslint-disable node/no-callback-literal */
import firebase from '../firebase';
import { createIcon } from './icons';
import { generateHash } from '../utils/hash';

// const supportedPopupSignInMethods = [
//   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
// ];

// function getProvider(providerId) {
//   switch (providerId) {
//     case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
//       return new firebase.auth.GoogleAuthProvider();
//     case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
//       return new firebase.auth.FacebookAuthProvider();
//     // case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
//     //   return new firebase.auth.TwitterAuthProvider();
//     default:
//       throw new Error(`No provider implemented for ${providerId}`);
//   }
// }

export const loginWith = async (provider) => {
  try {
    await firebase.auth().signInWithRedirect(provider);
  }
  catch (error) {
    console.error(error);
  }
};

// const handleRedirect = async (callback) => {
//   await firebase.auth().getRedirectResult()
//     .then(result => {
//       console.log({ REDIRECT_RESULT: result });
//       if (result.user) {
//         console.log({ OPERATION_TYPE: result.operationType });

//         if (result.operationType === 'signIn') {
//           // user just signed in
//           console.log({ NEW_SIGN_IN: result.user });
//           console.log(result.additionalUserInfo);
//           if (result.additionalUserInfo.isNewUser) {
//             // a new user
//             // create user profile and save to database
//             const userData = {
//               name: result.user.displayName,
//               image: result.user.photoURL,
//               email: result.user.email,
//               uid: result.user.uid,
//               online: true
//             };
//             createUserAccount(userData, (response) => {
//               callback(response);
//             // this.setState({ user: { name: response.name, image: response.image, userId: response.userId }, isSignedIn: true });
//             });
//           }
//           else {
//             // returning user
//             console.log({ RETURNING_USER: result.user });
//             const isSignedIn = result.user !== null;
//             setUserOnline(result.user.uid, (userData) => callback(userData, isSignedIn));
//           // setUserOnline(authUser.uid, (user) => this.setState({ user, isSignedIn }));
//           }
//         }

//         if (result.operationType === 'link') {
//           // accounts are linked
//         }
//       }
//       // else {
//       //   const usersOnline = this.state.usersOnline.filter(user => {
//       //     return user.userId !== this.state.user.userId;
//       //   });
//       //   this.setState({ isSignedIn: false, usersOnline, user: {} });
//       // }
//       return result;
//     })
//     .catch(error => {
//       console.log({ REDIRECT_ERROR: error });
//       handleAuthError(error);
//     });
// };

// const handleAuthError = async (error) => {
//   if (error.email && error.credential && error.code === 'auth/account-exists-with-different-credential') {
//     firebase.auth().fetchSignInMethodsForEmail(error.email).then(async signInMethods => {
//       console.log({ signInMethods });

//       const providerKey = signInMethods[0].split('.')[0];
//       const provider = providers[providerKey];

//       console.log({ provider });

//       provider.setCustomParameters({ login_hint: error.email });

//       const result = await firebase.auth().signInWithPopup(provider);
//       result.user.linkWithCredential(error.credential).then(data => {
//         console.log({ DATA: data });
//         const info = data.additionalUserInfo;
//         const credential = data.credential;
//         const operationType = data.operationType;
//         const user = data.user;

//         console.log({ info, credential, operationType, user });

//         return data;
//       }).catch(error => {
//         console.log({ AN_ERROR: error });
//       });
//     });
//   }
// };


// export async function loginWith(provider) {
// try {
// await firebase.auth().signInWithRedirect(provider);
// }
// catch (err) {
//   if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
//     const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email);

//     const firstPopupProviderMethod = providers.find((p) =>
//       supportedPopupSignInMethods.includes(p)
//     );

//     if (!firstPopupProviderMethod) {
//       throw new Error('Your account is linked to a provider that isn\'t supported.');
//     }

//     const linkedProvider = getProvider(firstPopupProviderMethod);
//     linkedProvider.setCustomParameters({ login_hint: err.email });

//     const result = await firebase.auth().signInWithPopup(linkedProvider);
//     result.user.linkWithCredential(err.credential);
//   }
// }
// }


// export const loginWithProvider = async (provider) => {
//   try {
//     await firebase.auth().signInWithPopup(provider);
//   }
//   catch (error) {
//     console.error(error);
//   }
// };


export const isNewUser = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const { creationTime, lastSignInTime } = currentUser.metadata;
    return creationTime === lastSignInTime;
  }
  return null;
};


export const getUsersOnline = (callback) => {
  return firebase.database().ref('/users')
    .orderByChild('online')
    .equalTo(true)
    .on('value', data => {
      if (data.val()) {
        const usersOnline = Object.values(data.val()).map(user => {
          return {
            name: user.name,
            image: user.image,
            userId: user.userId
          };
        });
        callback(usersOnline);
      }
    });
};

export const getMessages = (callback) => {
  return firebase
    .database()
    .ref('/messages')
    .limitToLast(50)
    .on('value', (data) => {
      if (data.val()) {
        const messages = Object.values(data.val());
        callback(messages);
      }
    });
};

export const setUserOnline = async (uid, callback) => {
  const userRef = firebase.database().ref(`/users/${uid}`);
  await userRef.update({ online: true });
  const data = await userRef.get();
  if (data.val()) {
    console.log(data.val());
    const { name, image, userId } = data.val();
    const userData = { name, image, userId };
    callback(userData);
  }
};


// export const isAvailable = (username, callback) => {
//   username = username.trim().toLowerCase();
//   firebase.database().ref('/users')
//     .orderByChild('username')
//     .equalTo(username)
//     .once('value', data => {
//       const available = data.val() === null;
//       callback(available);
//     });
// };


export const isValidUsername = (name, callback) => {
  name = name.trim().toLowerCase();
  firebase.database().ref('/users')
    .orderByChild('username')
    .equalTo(name)
    .once('value', snapshot => {
      snapshot.val() === null ? callback(true) : callback(false);
    })
    .catch(error => {
      callback(JSON.stringify(error));
    });
};


// export const getMessages = () => {
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


export const getUserInfo = (user) => {
  return firebase
    .database()
    .ref(`/users/${user.uid}`)
    .get()
    .then((data) => data.val())
    .then(result => {
      if (!result) {
        throw new Error(`
          result is null or undefined:
          value of result = ${result}`
        );
      }
      else {
        return result;
      }
    })
    .catch(console.error);
};


export const createUserAccount = async (userData, callback) => {
  console.log(userData.uid);
  await generateHash(userData.uid).then(hashedValue => {
    const color = hashedValue.slice(0, 6);
    const image = createIcon(hashedValue, color);
    userData.image = image;
    userData.userId = hashedValue;
    userData.online = true;
  });
  await firebase.database().ref(`/users/${userData.uid}`).set(userData)
    .then(() => {
      const data = { name: userData.name, image: userData.image, userId: userData.userId };
      callback(data);
    })
    .catch(console.error);
};

export const signupWithEmail = (name, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      const userData = { name, email, uid };

      createUserAccount(userData, response => {
        user.updateProfile({
          displayName: response.name,
          photoURL: response.image,
          uid: user.uid,
          email: user.email
        });
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};


window.getUsersOnline = getUsersOnline;
window.getUserInfo = getUserInfo;
window.getMessages = getMessages;
window.isNewUser = isNewUser;
window.isValidUsername = isValidUsername;
