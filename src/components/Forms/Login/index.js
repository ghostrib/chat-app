import { useState } from 'react';
import Divider from '../divider';
import { ErrorMessage } from '../error';
import InputField from '../input';
import Layout from '../Template';
import PrivacyPolicy from '../privacy';
import services from '../../../services';
import BasicButton from '../button';
import SocialButton from '../social';
import styled from 'styled-components/macro';

import { useInput } from '../../../hooks/useInput';
import { useValidation } from '../../../hooks/useValidation';

const { loginWithEmailAndPassword } = services;

export default function Form({ app }) {
  const [input, setInput] = useInput();
  const isValid = useValidation(input);
  const [error, setError] = useState(null);
  const hooks = { input, setInput, isValid };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    try {
      const result = await loginWithEmailAndPassword(email, password);
      app.toggleModal();
      return result;
    } catch (error) {
      setError('The email or password you entered is incorrect');
    }
  };

  return (
    <Layout app={app} page="login">
      <MaxWidthWrapper>
        <Body onSubmit={handleLogin} hooks={hooks}>
          <Inputs>
            <SectionText>Login with email and password</SectionText>
            <GridStack rows={2}>
              <InputField
                validate={false}
                size={48}
                hooks={hooks}
                type="email"
                placeholder="Email"
              />
              <InputField
                validate={false}
                size={16}
                hooks={hooks}
                type="password"
                placeholder="Password"
              />
            </GridStack>

            <PasswordResetButton onClick={app.showReset}>
              Forgot your password?
            </PasswordResetButton>
            <SignInButton top={72} hooks={hooks} />
            <StayLoggedIn />
          </Inputs>
          <Divider />
          <Social>
            <SectionText>Login with Social Media</SectionText>
            <GridStack rows={2}>
              <SocialButton size={32} provider="google" />
              <SocialButton size={32} provider="facebook" />
            </GridStack>
            <PrivacyPolicy />
            <ErrorMessage>{error}</ErrorMessage>
          </Social>
        </Body>
      </MaxWidthWrapper>
    </Layout>
  );
}

const Body = styled.form`
  background: #e0e0e0;
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  grid-template-rows: auto;
  /* height: calc(600px - 144px); */
  /* min-height: 840px; */
  /* min-width: 300px; */
  padding: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    max-width: 520px;
    margin: auto;
    /* margin-top: 1rem; */
    margin-top: -1rem;
  }
`;

const PasswordResetButton = styled.button.attrs(() => ({ type: 'button' }))`
  border: none;
  background: none;
  color: blue;
  /* place-self: start; */
  cursor: pointer;
  /* margin-top: -32px; */
`;

function StayLoggedIn() {
  return (
    <CheckboxWrapper>
      <CheckboxInput />
      <CheckboxLabel>Stay Logged In</CheckboxLabel>
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  color: black;
  display: flex;
  font-size: 12px;
  padding: 0rem 0px 1rem 0.5rem;
  place-self: start;
`;

const CheckboxLabel = styled.label.attrs((props) => ({
  htmlFor: 'checkbox',
}))`
  padding: 0 1rem;
  cursor: pointer;
`;

const CheckboxInput = styled.input.attrs((p) => ({
  type: 'checkbox',
  id: 'checkbox',
}))`
  cursor: pointer;
`;

const GridStack = styled.div`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rows}, 5rem)`};
`;

const MaxWidthWrapper = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    max-width: 360px;
    width: 100%;
    margin: auto;
  }
`;

const SectionText = styled.p`
  color: black;
  font-size: 0.85rem;
  margin: 0 0;
  margin-bottom: 1rem;
  margin-top: -1rem;
  text-align: center;
  visibility: visible;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled(MaxWidthWrapper)`
  align-self: flex-end;
  padding: 1rem 0;
  position: relative;
`;

const FormButton = styled(BasicButton)`
  position: absolute;
`;

function SignInButton({ children }) {
  return (
    <ButtonWrapper max={280}>
      <FormButton>{children}</FormButton>
    </ButtonWrapper>
  );
}

const Social = styled.section`
  margin-left: auto;
  margin-right: auto;
`;

const Inputs = styled.section`
  margin: auto;
  max-width: 280px;
  width: 100%;
`;
