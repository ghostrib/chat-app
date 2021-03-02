import {
  getUsersOnline,
  getMessages,
  getUserInfo,
  createUserAccount,
  loginWith,
  isNewUser,
  setUserOnline,
  isValidUsername,
  signupWithEmail
} from './firebase';


import { createIcon } from './icons';

const services = {
  getUsersOnline,
  getMessages,
  getUserInfo,
  createUserAccount,
  loginWith,
  isNewUser,
  setUserOnline,
  isValidUsername,
  createIcon,
  signupWithEmail
};

export default services;
