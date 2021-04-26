import styled from 'styled-components/macro';
import { useEffect, useRef, useState } from 'react';

const errors = {
  uppers: '1 uppercase letter',
  lowers: '1 lowercase letter',
  nums: '1 number',
};

export default function InputField({
  type,
  placeholder,
  hooks,
  page,
  validate,
  ...props
}) {
  const { input, setInput, isValid } = hooks;
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [shouldPaint, setShouldPaint] = useState(null);
  console.log(validate, props);
  // const handleFocusChange = (e) => {
  //   const event = e.type;
  //   const isEmpty = e.target.value.length === 0;
  //   if (event === 'focus') setIsFocused(true);
  //   if (event === 'blur') {
  //     setIsValid(value);

  //     // setIsValid(value);
  //     // if (isEmpty) {
  //     //   setIsFocused(false);
  //     // }
  //   }

  //   // setShouldPaint(isFocused === false && isValid === false);

  //   // if (event === 'blur' && isEmpty) setIsFocused(false);
  //   // if (event === 'blur' && !isEmpty) setIsValid(value);
  // };

  // const handleInputChange = (e) => {
  //   setValue(e);
  //   const currentField = isValid[e.target.type];
  //   console.log(currentField);
  //   // if (currentField !== null && currentField !== undefined) {
  //   setIsValid(value);
  //   if (
  //     props.validate &&
  //     e.target.type === 'password' &&
  //     e.target.value.length > 1
  //   ) {
  //     setPasswordErrors(value.password);
  //   }
  //   // }
  // };

  const handleFocus = (e) => {};

  const handleBlur = (e) => {};

  const handleChange = (e) => {
    setInput(e);

    console.log({ isValid });
  };

  const handleKeyUp = (e) => {};

  const handleFocusChange = (e) => {
    if (e.type === 'focus') {
      setShouldPaint(null); // white background
      setIsFocused(true);
    }
    if (e.type === 'blur') {
      setIsFocused(false);
      const isEmpty = e.target.value.length === 0;
      if (validate) {
        const paint = isEmpty ? null : isValid[e.target.type];
        setShouldPaint(paint);
      } else {
        setShouldPaint(null);
      }
      setIsFocused(!isEmpty);
    }
  };

  useEffect(() => {
    const value = input[type];
    console.log({ isValid });
  });

  return (
    <Row {...props}>
      <Label
        onClick={() => ref.current.focus()}
        isFocused={isFocused}
        htmlFor={type}
      >
        {placeholder}
      </Label>
      <TextInput
        isValid={shouldPaint}
        isFocused={isFocused}
        onBlur={handleFocusChange}
        onChange={handleChange}
        onFocus={handleFocusChange}
        onKeyUp={handleKeyUp}
        ref={ref}
        type={type}
        value={input[type]}
        // placeholder={isFocused ? '' : inputLabel}
      />
    </Row>
  );
}

const Label = styled.label`
  color: ${(props) => (props.isFocused ? 'blue' : 'hsla(0deg, 0%, 0%, 0.5)')};
  cursor: ${(props) => (props.isFocused ? 'revert' : 'text')};
  font-size: ${(props) => (props.isFocused ? '0.8rem' : '1rem')};
  font-weight: ${(props) => (props.isFocused ? '700' : '400')};
  position: absolute;
  transform: ${(props) =>
    props.isFocused ? 'translate(0, -4px) ' : 'translate(1.5rem, 1.9rem)'};
  transition: all 0.2s linear;
  width: 0;
  z-index: 33;
`;

const TextInput = styled.input.attrs((props) => {
  return {
    type: props.type,
    placeholder: props.placeholder,
  };
})`
  background: ${(props) => `${props.isValid === null && 'white'}`};
  background: ${(props) =>
    `${
      props.isValid === false &&
      `${props.isFocused === false}` &&
      'hsla(0deg, 30%, 55%, 0.4)'
    }`};
  background: ${(props) =>
    `${props.isValid === true && 'hsla(120deg, 30%, 55%, 0.4)'}`};

  border-radius: 4px;
  border: none;
  bottom: 0;
  box-shadow: 0 0 0 1px grey;
  font-size: 1rem;
  left: 0;
  max-height: 48px;
  outline: none;
  padding: var(--padding);
  position: absolute;
  width: 100%;

  &:active,
  &:focus {
    box-shadow: 0 0 0 2px dodgerblue;
  }

  &:-webkit-autofill {
    -webkit-animation-name: onAutoFillStart;
    animation-name: onAutoFillStart;
  }

  &:not(:-webkit-autofill) {
    -webkit-animation-name: onAutoFillCancel;
    animation-name: onAutoFillCancel;
  }

  @-webkit-keyframes onAutoFillStart {
  }

  @keyframes onAutoFillStart {
  }

  @-webkit-keyframes onAutoFillCancel {
  }

  @keyframes onAutoFillCancel {
  }

  @supports (-webkit-touch-callout: none) {
    border-radius: 4px;
    border: revert;
    font-size: 1rem;
    max-height: 48px;
    outline: revert;
    padding: 1rem 0 1rem 1rem;
    width: 100%;
  }
`;

const Row = styled.div`
  display: block;
  height: 100%;
  max-height: 64px;
  position: relative;
`;
