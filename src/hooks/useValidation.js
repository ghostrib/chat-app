import utils from '../utils';

export const getCallback = (type) => {
  let callback;

  if (type === 'email') {
    callback = utils.validateEmail;
  }
  if (type === 'password') {
    callback = utils.validatePassword;
  }
  if (type === 'text') {
    callback = utils.validateUsername;
  }

  return callback;
};

export const useValidation = (input) => {
  const clone = { ...input };
  Object.keys(input).forEach((key) => {
    const callback = getCallback(key);
    clone[key] = callback(input[key]);
  });
  return clone;
};
