import firebase from '../firebase';

/* eslint-disable no-control-regex */
const regex = {
  password: /^(.{0,4}|[^0-9]*|[^\s]*\s.*|[^A-Z]*|[^a-z]*)$/,
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
};

// const createError = (message) => {
//   const error = JSON.stringify({ message });
//   return error;
// };


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


export const isCurrentUser = async (email) => {
  const array = await firebase.database().ref('users').get()
    .then(data => {
      return Object.values(data.val()).filter(user => {
        return user.email === email;
      });
    });
  return array.length > 0;
};

// const isBlank = (str) => {
//   return str.length === 0 || str === undefined || str === null;
// };

// const handleEmptyField = (field) => {
//   const error = createError(`${field} is empty`);
//   throw new Error(error);
// };

// const handleInvalidField = (field) => {
//   const error = createError(`${field} is invalid`);
//   throw new Error(error);
// };


// export const validateEmail = async (email) => {
//   const field = 'Email';
//   try {
//     if (isBlank(email)) {
//       handleEmptyField(field);
//     }
//     if (!isValidEmail(email)) {
//       handleInvalidField(field);
//     }

//     const userExists = await isCurrentUser(email);
//     console.log(userExists);
//     if (!userExists) {
//       const error = createError('No records found');
//       throw new Error(error);
//     }
//     else {
//       return true;
//     }
//   }
//   catch (error) {
//     const message = JSON.parse(error.message);
//     return message;
//   }
// };


// window.validateEmail = validateEmail;
