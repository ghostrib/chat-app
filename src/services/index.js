import {
  getUsersOnline,
  getMessages,
  createUserAccount,
  loginWith,
  isValidUsername,
  signupWithEmail,
  setOnlineStatus,
  getUser,
  emailAccountExists,
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
  emailAccountExists,
  loginWithEmailAndPassword,
};

export default services;

// export services;
