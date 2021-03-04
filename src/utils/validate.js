/* eslint-disable no-control-regex */
// /^(.{0,5}|[^0-9]*|[^\s]*\s.*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
const regex = {
  password: /^(.{0,4}|[^0-9]*|[^\s]*\s.*|[^A-Z]*|[^a-z]*)$/,
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
};


export const validatePassword = (password) => {
  // a passing test means a failing password
  if (regex.password.test(password)) {
    return false;
  }
  return true;
};


export const validateEmail = (email) => {
  const re = new RegExp(regex.email);
  return re.test(email);
};
