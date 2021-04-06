/* eslint-disable node/no-callback-literal */
import firebase from '../firebase';
import { createIcon } from './icons';
import { generateHash } from '../utils/hash';

export const loginWith = async provider => {
  try {
    await firebase.auth().signInWithRedirect(provider);
  }
  catch (error) {
    console.error(error);
  }
};

export const getUsersOnline = callback => {
  return firebase
    .database()
    .ref('/users')
    .orderByChild('online')
    .equalTo(true)
    .on('value', data => {
      if (data.val()) {
        const usersOnline = Object.values(data.val()).map(user => {
          return {
            name: user.name,
            image: user.image,
            userId: user.userId,
          };
        });
        callback(usersOnline);
      }
    });
};

export const getMessages = callback => {
  return firebase
    .database()
    .ref('/messages')
    .limitToLast(50)
    .on('value', data => {
      if (data.val()) {
        const messages = Object.values(data.val());
        callback(messages);
      }
    });
};

export const setOnlineStatus = status => {
  if (typeof status !== 'boolean') {
    throw new Error({ message: `Cannot set online status to ${status}` });
  }
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.database().ref('users').child(user.uid)
      .update({ online: status });
  }
};

export const getUser = async uid => {
  uid = uid || firebase.auth().currentUser.uid;
  const data = await firebase.database().ref('/users').child(uid)
    .get();
  const { name, image, userId, online } = await data.val();
  return { name, image, userId, isSignedIn: online };
};

export const isValidUsername = (name, callback) => {
  name = name.trim().toLowerCase();
  firebase
    .database()
    .ref('/users')
    .orderByChild('username')
    .equalTo(name)
    .once('value', snapshot => {
      snapshot.val() === null ? callback(true) : callback(false);
    })
    .catch(error => {
      callback(JSON.stringify(error));
    });
};

export const createUserAccount = async authUser => {
  try {
    const userId = await generateHash(authUser.uid);
    const image = createIcon(userId, '#191919');
    const { displayName, uid, email } = authUser;
    const userData = { name: displayName, image, uid, userId, email };

    await firebase.database().ref(`/users/${uid}`).set(userData);
    await setOnlineStatus(true);
    return await getUser(uid);
  }
  catch (error) {
    console.error(error);
  }
};

export const signupWithEmail = async (name, email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const authUser = userCredential.user;
    await authUser.updateProfile({ displayName: name });
    const userData = await createUserAccount(authUser);
    return userData;
  }
  catch (error) {
    console.error(error);
  }
};

export const isEmailAvailable = async email => {
  const data = await firebase.database().ref('users').get();
  const values = await data.val();
  const matches = Object.values(values)
    .map(value => value.email)
    .filter(usedEmail => usedEmail === email);
  return matches.length === 0;
};
