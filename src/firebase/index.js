import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
// const twitterProvider = new firebase.auth.TwitterAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  display: 'page',
});

googleProvider.addScope('profile');
facebookProvider.addScope('public_profile, email');

const providers = {
  google: googleProvider,
  facebook: facebookProvider,
  // twitter: twitterProvider
};

export { providers };

// export { googleProvider, facebookProvider, twitterProvider };

window.firebase = firebase;

export default firebase;
