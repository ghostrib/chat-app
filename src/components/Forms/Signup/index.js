import styled from 'styled-components/macro';
import services from '../../../services';
import Input from '../input';
import ErrorList from '../error';

import Layout from '../Template';
import { useValidation } from '../../../hooks/useValidation';
import { useInput } from '../../../hooks/useInput';
import { SubmitButton } from '../button';
import { MaxWidthWrapper } from '../maxwidth';
import { useError } from '../../../hooks/useError';

export default function SignupForm({ app }) {
  const [input, setInput] = useInput();
  const isValid = useValidation(input);
  const errors = useError(input.password);

  const handleRegister = async (e) => {
    e.preventDefault();

    const isReady = Object.values(isValid).every((item) => item === true);
    if (isReady) {
      const { email, password, text } = input;
      let user;
      try {
        user = await services.signupWithEmail(text, email, password);
      } catch (error) {
        console.error(error);
      } finally {
        app.toggleModal();
        if (user) {
          app.setUser(user);
        }
      }
    }
  };

  const hooks = {
    input,
    setInput,
    isValid,
    errors,
  };

  return (
    <>
      <Layout app={app} page="signup">
        <MaxWidthWrapper max={480}>
          <Body onSubmit={handleRegister}>
            <Input
              validate={true}
              hooks={hooks}
              type="email"
              placeholder="Email"
            />
            <Input
              validate={true}
              hooks={hooks}
              type="text"
              placeholder="Username"
            />
            <Input
              validate={true}
              hooks={hooks}
              type="password"
              placeholder="Password"
            />
            <FixedHeight height={100}>
              <ErrorList length={input.password.length} errors={errors} />
            </FixedHeight>
            <ButtonWrapper max={280}>
              <SubmitButton type="submit">Sign up</SubmitButton>
            </ButtonWrapper>
          </Body>
        </MaxWidthWrapper>
      </Layout>
    </>
  );
}

const Body = styled.form`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 80px 80px 80px 120px;
  margin-top: 1rem;
  /* min-height: 0px; */
  min-width: 280px;
  /* padding-bottom: 9rem; */

  @media (max-width: 768px) {
    width: 65vw;
    margin: auto;
    min-width: 240px;
    margin-top: 2rem;
  }
`;

const ButtonWrapper = styled(MaxWidthWrapper)`
  align-self: flex-end;
`;

const FixedHeight = styled.div`
  height: ${(props) => `${props.height}px`};
`;
