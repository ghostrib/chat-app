/* eslint-disable default-case */
import { useState, useMemo, useEffect } from 'react';
import { useInput } from './useInput';
import utils from '../utils';

const validate = (obj) => {
  return Object.keys(obj)
    .map((item) => {
      const callback =
        item === 'password'
          ? utils.validatePassword
          : item === 'email'
          ? utils.validateEmail
          : utils.validateUsername;

      const isValid = callback(obj[item]);
      return { [item]: isValid };
    })
    .reduce((storage, curr) => {
      const key = Object.keys(curr);
      storage[key] = curr[key];
      return storage;
    }, {});
};

const getInitialState = (obj) => {
  const clone = { ...obj };
  for (const key in clone) {
    if (clone[key] === '') {
      clone[key] = null;
    }
  }
  return clone;
};

// export const useValidation = (obj) => {
//   const [state, setState] = useState(getInitialState(obj));
//   const handler = useMemo(() => {
//     return {
//       setIsValid: () => {
//         const result = validate(obj);
//         setState(result);
//       },
//     };
//   }, [obj]);
//   return [state, handler];
// };

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

// export const useValidation = () => {
//   // const [value, setValue] = useState(null)
//   const [input, setInput] = useInput();
//   const handler = useMemo(() => (e) => setInput(e), []);
// };

// export const useValidation = () => {
//   const [input, setInput] = useInput();
//   const [fn, setFn] = useState(null);
//   const callback = useMemo(() => {
//     const setValue = (e) => {};
//     return setValue;
//   }, [input]);
// };

// export const useValidation = () => {
//   const [input, setInput] = useInput();

//   const handler = useMemo(() => {
//     const setValue = (e) => {
//       setInput(e);
//     };
//     return [setValue];
//   }, [setInput]);
// };

// const [callback, setCallback] = useState(null);
// const [state, setState] = useState(input);

// const type = e.target.type;
// switch (type) {
//   case 'email':
//     setCallback(utils.validateEmail);
//     break;
//   case 'password':
//     setCallback(utils.validatePassword);
//     break;
//   case 'text':
//     setCallback(utils.validateUsername);
//     break;
//   default:
//     return null;
// }

// const isValid = callback(input[type]);
// setState({ ...state, [type]: isValid });
// return state;
// };
