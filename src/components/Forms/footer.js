import styled from 'styled-components/macro';

const FooterWrapper = styled.footer`
  align-items: center;
  background: var(--header-bg);
  /* height: 72px;  */
  bottom: 0;
  display: grid;
  grid-template-rows: auto;
  left: 0;
  min-height: var(--bannerHeight);
  min-width: 280px;
  position: absolute;
  right: 0;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    /* position: absolute; */
  }
`;

const FooterPrompt = styled.p`
  color: whitesmoke;
  font-size: 0.85rem;
  place-self: end center;
`;

const FooterButton = styled.button.attrs((props) => {
  return {
    type: 'button',
  };
})`
  background: transparent;
  border: none;
  color: hsl(211, 80%, 70%);
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  place-self: start center;
  &:hover {
    color: hsl(211, 80%, 60%);
    text-decoration: underline;
  }
  &:focus,
  &:active {
    color: hsl(211, 100%, 80%);
    outline-offset: 4px;
    outline: 1px solid whitesmoke;
    text-decoration: underlin e;
  }
`;

const getPropsData = (props) => {
  const page = props.page;
  let buttonText;
  let callback;
  let prompt;

  if (page === 'login') {
    prompt = "Don't have an account?";
    buttonText = 'Signup';
    callback = props.app.showSignup;
  } else if (page === 'signup') {
    prompt = 'Already have an account?';
    buttonText = 'Login';
    callback = props.app.showLogin;
  }
  return { prompt, buttonText, callback };
};

export default function Footer({ ...props }) {
  const { prompt, buttonText, callback } = getPropsData(props);
  return (
    <FooterWrapper>
      <FooterPrompt>{prompt}</FooterPrompt>
      <FooterButton onClick={callback}>
        <strong>{buttonText}</strong>
      </FooterButton>
    </FooterWrapper>
  );
}
