import firebase from '../firebase';
import { createIcon } from './icons';

export const loginWithProvider = async (provider) => {
  try {
    await firebase.auth().signInWithPopup(provider);
  }
  catch (error) {
    console.error(error);
  }
};

export const isNewUser = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const { creationTime, lastSignInTime } = currentUser.metadata;
    return creationTime === lastSignInTime;
  }
  return null;
};

// export const getUsersOnline = (callback) => {
//   return firebase
//     .database()
//     .ref('/users')
//     .orderByChild('online')
//     .equalTo(true)
//     .on('value', (data) => {
//       if (data.val()) {
//         // const { name, image } = Object.values(data.val());
//         const { name, image } = Object.values(data.val())[0];
//         // console.log({ blahblah: Object.values(data.val())[0] });
//         console.log({ name, image });
//         const usersOnline = Object.values(data.val());
//         callback(usersOnline);
//       }
//     });
// };


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
    .on('value', (query) => {
      const messages = Object.values(query.val());
      callback(messages);
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

// const userData = (user) => {
//   return {
//     name: user.displayName,
//     email: user.email,
//     image: user.photoURL,
//     uid: user.uid
//   };
// };

// export const createUserAccount = (user) => {
//   const data = userData(user)
//   firebase.database().ref(`/users/${user.uid}`).set({
//     name: user.displayName,
//     email: user.email,
//     image: user.photoURL, // createIcon(user.uid),
//     online: true,
//     uid: user.uid
//   })
//     .then((data) => console.log(data))
//     .catch(console.error);
// };

export const createUserAccount = (userData, callback) => {
  const image = createIcon(userData.uid);
  userData.image = image;
  firebase.database().ref(`/users/${userData.uid}`).set(userData)
    .then(() => {
      const data = { name: userData.name, image: userData.image };
      callback(data);
    })
    .catch(console.error);
};

