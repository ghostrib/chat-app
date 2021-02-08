import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const createNewUserEntry = (state) => {
  const { name, image, uid, isSignedIn } = state;
  const userStatus = firebase.database().ref(`/userlist/${uid}`);
  userStatus.set({ name, image, online: isSignedIn });
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  display: 'page',
});

provider.addScope('profile');

export { provider, db, createNewUserEntry };

export default firebase;
