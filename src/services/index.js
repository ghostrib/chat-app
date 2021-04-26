import {
  getUsersOnline,
  getMessages,
  createUserAccount,
  loginWith,
  isValidUsername,
  signupWithEmail,
  setOnlineStatus,
  getUser,
  isEmailAvailable,
  loginWithEmailAndPassword,
} from './firebase';

import { createIcon } from './icons';

const services = {
  getUsersOnline,
  getMessages,
  createUserAccount,
  loginWith,
  isValidUsername,
  createIcon,
  signupWithEmail,
  setOnlineStatus,
  getUser,
  isEmailAvailable,
  loginWithEmailAndPassword,
};

export default services;

// export services;
