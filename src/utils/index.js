import { generateHash } from './hash';
import { checkCookies } from './cookies';
import { debounce } from './debounce';
import { validatePassword, validateEmail, validateUsername } from './validate';

const utils = {
  generateHash,
  checkCookies,
  debounce,
  validateEmail,
  validatePassword,
  validateUsername,
};

export default utils;
window.utils = utils;
