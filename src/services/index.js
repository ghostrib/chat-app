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
};

export default services;
