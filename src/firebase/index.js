import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);

const createNewUserEntry = (state) => {
  const { name, image, uid, isSignedIn } = state;
  const userStatus = firebase.database().ref(`/users/${uid}`);
  userStatus.set({ name, image, online: isSignedIn });
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  display: 'page',
});

googleProvider.addScope('profile');
facebookProvider.addScope('public_profile, email');

export { googleProvider, facebookProvider, createNewUserEntry };

export default firebase;
