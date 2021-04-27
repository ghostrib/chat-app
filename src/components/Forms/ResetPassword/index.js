import firebase from '../../../firebase';
import { useState } from 'react';

import { SubmitButton } from '../button';
import InputField from '../input';
import Layout from '../Template';
import { MaxWidthWrapper } from '../maxwidth';
import styled from 'styled-components/macro';
import { useInput } from '../../../hooks/useInput';

const sendEmail = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return;
  } catch (error) {
    return error;
  }
};

export default function ResetPassword({ app }) {
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useInput();

  const hooks = { setInput, input };

  const handleSubmit = async (e) => {
    const email = input.email;
    e.preventDefault();
    const response = await sendEmail(email);
    if (response) {
      console.log(response);
      setIsError(true);
      if (response.code === 'auth/invalid-email') {
        setResult(<p>The email you entered is not a valid email address</p>);
      } else if (response.code === 'auth/user-not-found') {
        setResult(
          <>
            <p>We're unable to locate your account. </p>
            <p>Please double check the spelling and try again</p>
          </>
        );
      }
    } else {
      setResult(
        <p>Please check your email for a link to reset your password</p>
      );
      setIsError(false);
    }
  };

  return (
    <Layout app={app} page="Reset Password">
      <Wrapper>
        <StandardMessage>
          Enter the email address associated with your account below
        </StandardMessage>
      </Wrapper>

      <Body>
        <MaxWidthWrapper max={360}>
          <Wrapper>
            <TextInput type="email" hooks={hooks} />
            <MaxWidthWrapper max={240}>
              <ResetButton onClick={handleSubmit}>Reset password</ResetButton>
            </MaxWidthWrapper>
          </Wrapper>
        </MaxWidthWrapper>

        <StatusMessage isError={isError}>{result}</StatusMessage>
      </Body>
    </Layout>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
`;

const Wrapper = styled.div`
  margin: 1rem 0;
  padding: 0.5rem 0;
`;

const StandardMessage = styled.p`
  color: #191919;
  font-size: 14px;
  margin: 1rem 4rem;
  /* padding: 0 0 4rem 0; */
  text-align: center;
  @media (max-width: 768px) {
    text-align: revert;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ErrorMessage = styled(StandardMessage)`
  color: firebrick;
  font-weight: 600;
  margin-top: 32px;
`;
const SuccessMessage = styled(ErrorMessage)`
  color: hsl(120, 100%, 15%);
`;

const ResetButton = styled(SubmitButton)`
  margin: 1.5rem 0 0 0;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem 0;
`;

const TextInput = styled(InputField)`
  @media (max-width: 768px) {
    max-width: 280px;
    margin: auto;
  }
`;

function StatusMessage({ isError, children }) {
  return isError ? (
    <ErrorMessage>{children}</ErrorMessage>
  ) : (
    <SuccessMessage>{children}</SuccessMessage>
  );
}
