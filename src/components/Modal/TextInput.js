import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import s from './TextInput.module.css';

const TextInput = ({ type, placeholder, label }) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldRef = useRef(null);
  const labelRef = useRef(null);
  const legendRef = useRef(null);
  const inputRef = useRef(null);
  const [refs, setRefs] = useState([]);

  const handleFocus = e => {
    return e.type === 'focus' || e.target.value.length ? setIsFocused(true) : setIsFocused(false);
  };

  const focusElements = () => {
    refs.forEach(element => {
      const className = element.current.className;

      element.current.classList.add('focus');
      element.current.classList.remove('blur');
    });
  };

  const blurElements = () => {
    refs.forEach(element => {
      element.current.classList.remove('focus');
      element.current.classList.add('blur');
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setRefs([inputRef, fieldRef, labelRef, legendRef]);
    return isFocused ? focusElements() : blurElements();
  });

  useLayoutEffect(() => {
    return isFocused ? focusElements() : blurElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <>
      <label ref={labelRef} className={s.label}>
        {isFocused ? label : placeholder}
      </label>
      <input
        onFocus={handleFocus}
        onBlur={handleFocus}
        className={s.input}
        type={type}
        ref={inputRef}
      />
      <fieldset ref={fieldRef} className={s.fieldset}>
        <legend ref={legendRef} className={s.legend}>
          {isFocused ? label : placeholder}
        </legend>
      </fieldset>
    </>
  );
};

// ReactDOM.render(
//   <TextInput type="email" placeholder="Email" label="Who do we spam?" />,
//   document.querySelector("#root")
// );

export default TextInput;
