import { useState, useRef, useEffect } from 'react';

import s from './inputField.module.css';
const InputField = ({ type, label, value, setValue, setError, error }) => {
  const labelClass = `label__${label.toLowerCase()}`;
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  const [ isAutofilled, setIsAutofilled ] = useState(false);

  const moveLabel = e => {
    const isEmpty = !e.target.value || e.target.value.length === 0;
    if (e.type === 'focus') {
      labelRef.current.className = s.focused;
    }
    else if (e.type === 'blur') {
      if (!isAutofilled && isEmpty) {
        labelRef.current.className = s[labelClass];
      }
    }
    else if (e.type === 'click') {
      inputRef.current.focus();
    }
  };

  const handleAutofill = () => {
    inputRef.current.addEventListener('animationstart', e => {
      setIsAutofilled(true);
    });
  };

  const handleInputChange = e => {
    if (e.target.type === 'email') {
      setValue({ ...value, email: e.target.value });
    }
    if (e.target.type === 'password') {
      setValue({ ...value, password: e.target.value });
    }
    setError('');
  };

  useEffect(() => {
    handleAutofill();
  }, [ inputRef ]);

  return (
    <>
      <div className={s.input__wrapper} onClick={moveLabel}>
        <label ref={labelRef} className={s[labelClass]} htmlFor={label}>
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          className={s.input}
          onFocus={moveLabel}
          onBlur={moveLabel}
          onChange={handleInputChange}
          value={type === 'password' ? value.password : value.email}
        />
      </div>
    </>
  );
};

export default InputField;
