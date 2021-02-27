import {
  getUsersOnline,
  getMessages,
  getUserInfo,
  createUserAccount,
  loginWith,
  isNewUser,
  setUserOnline,
  isValidUsername,
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
  createIcon
};

export default services;
