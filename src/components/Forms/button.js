import styled from 'styled-components';
import { useState, useEffect } from 'react';
import services from '../../services';

const { loginWithEmailAndPassword } = services;

export default function SignInButton({ ...props }) {
  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   if (isValid.email && isValid.password) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  //   console.log('from button', isValid);
  // }, [isValid, isDisabled]);

  return (
    <Row top={props.top} bottom={props.bottom}>
      <SubmitButton type="submit" disabled={isDisabled}>
        Sign In
      </SubmitButton>
    </Row>
  );
}

export const Button = styled.button`
  /* background: hsl(211, 36%, 42%); */
  border: none;
  border-radius: 4px;
  /* box-shadow: 0 0 0 1px #303e4d; */

  /* color: white; */
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  letter-spacing: 0.1rem;
  outline: none;
  padding: 0.75rem 1rem;
`;

export const SubmitButton = styled.button.attrs((props) => ({
  disabled: props.isDisabled,
  type: props.type,
}))`
  background: hsl(211, 36%, 42%);
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #303e4d;

  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  letter-spacing: 0.1rem;
  outline: none;
  padding: 1rem;
  width: 100%;

  &:hover {
    background: hsl(211, 56%, 42%);
    cursor: pointer;
  }

  &:focus {
    background: hsl(211, 66%, 42%);
    box-shadow: 0 0 0 2px hsl(211, 100%, 0%);
  }

  &:active {
    background: hsl(211, 66%, 52%);
  }

  &:disabled {
    background: hsla(0, 0%, 54%, 1);
  }
  &:disabled:hover {
    background: hsla(0, 0%, 54%, 1);
  }

  /* @media (max-width: 768px) {
    margin: 16px 0 0 0;
  } */
`;

const Row = styled.div`
  display: block;
  padding-bottom: ${(props) => `${props.bottom}px`};
  padding-top: ${(props) => `${props.top}px`};

  @media (max-width: 768px) {
    padding-top: ${({ size }) => `${size / 4}px`};
  }
`;
