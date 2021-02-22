import firebase from '../firebase';
import { createIcon } from './icons';
import { generateHash } from '../utils/hash';

const supportedPopupSignInMethods = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
];

function getProvider(providerId) {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return new firebase.auth.GoogleAuthProvider();
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return new firebase.auth.FacebookAuthProvider();
    case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
      return new firebase.auth.TwitterAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

export async function loginWith(provider) {
  try {
    await firebase.auth().signInWithRedirect(provider);
  }
  catch (err) {
    if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
      const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email);

      const firstPopupProviderMethod = providers.find((p) =>
        supportedPopupSignInMethods.includes(p)
      );

      if (!firstPopupProviderMethod) {
        throw new Error('Your account is linked to a provider that isn\'t supported.');
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: err.email });

      const result = await firebase.auth().signInWithPopup(linkedProvider);
      result.user.linkWithCredential(err.credential);
    }
  }
}


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
            image: user.image
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


export const getUserInfo = (user) => {
  return firebase
    .database()
    .ref(`/users/${user.uid}`)
    .get()
    .then((data) => data.val())
    .catch(console.error);
};


export const createUserAccount = async (userData, callback) => {
  console.log(userData.uid);
  await generateHash(userData.uid).then(hashedValue => {
    const color = hashedValue.slice(0, 6);
    const image = createIcon(hashedValue, color);
    userData.image = image;
  });
  await firebase.database().ref(`/users/${userData.uid}`).set(userData)
    .then(() => {
      const data = { name: userData.name, image: userData.image };
      callback(data);
    })
    .catch(console.error);
};

window.getUsersOnline = getUsersOnline;
window.getUserInfo = getUserInfo;
window.getMessages = getMessages;
window.isNewUser = isNewUser;
