import { useState, useRef } from 'react';
import s from './input.module.scss';

const Input = ({ type }) => {
  type = type.charAt(0).toUpperCase() + type.slice(1);

  const fieldsetRef = useRef(null);
  const labelRef = useRef(null);

  const [ value, setValue ] = useState('');

  const handleFocus = (e) => {
    e.target.className = `${s.input} ${s.input__focused}`;
    labelRef.current.className = `${s.label} ${s.label__focused}`;
    fieldsetRef.current.className = `${s.fieldset} ${s.fieldset__focused}`;
  };

  const handleBlur = (e) => {
    if (!e.target.value.length) {
      e.target.className = `${s.input} ${s.input__blurred}`;
      labelRef.current.className = `${s.label} ${s.label__blurred}`;
      fieldsetRef.current.className = `${s.fieldset}`;
    }
  };

  return (
    <div className={s.container}>
      <label ref={labelRef} className={s.label}>
        {type}
      </label>
      <div className={s.input_wrapper}>
        <input
          type="text"
          className={s.input}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value)}
        />
        <fieldset className={s.fieldset} ref={fieldsetRef}>
          <legend className={s.legend}>
            <span>{type}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
};


export default Input;
