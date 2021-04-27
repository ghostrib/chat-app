import styled from 'styled-components/macro';
import { providers } from '../../firebase';
import services from '../../services';
import googleImage from '../../assets/google.svg';
import facebookImage from '../../assets/facebook.svg';

export default function SocialButton({ provider, ...props }) {
  const Button = provider === 'google' ? Google : Facebook;
  const image = provider === 'google' ? googleImage : facebookImage;
  const company = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Row size={props.size}>
      <Button onClick={() => services.loginWith(providers[provider])}>
        <IconWrapper>
          <Icon src={image} alt={`${provider} icon`} />
        </IconWrapper>
        <ButtonTextWrapper>
          <b>Sign in with {company}</b>
        </ButtonTextWrapper>
      </Button>
    </Row>
  );
}

const IconWrapper = styled.span`
  background: whitesmoke;
  border-radius: var(--radius);

  display: flex;
  height: var(--icon-wrapper-height);
  margin-left: var(--icon-margin-left);
  position: absolute;
  width: var(--icon-wrapper-width);

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices */
    width: 3rem;
    height: 3rem;
    position: unset;
  }
`;

const Icon = styled.img`
  height: 70%;
  margin: auto;
`;

const ButtonTextWrapper = styled.span`
  color: whitesmoke;
  font-family: 'Roboto';
  font-size: calc(var(--height) * 0.35);
  /* transform: translate(2rem, 0); */
  transform: translate(var(--text-width), 0%);

  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices */
    padding-left: 1.5rem;
    font-size: 1.125rem;
  }
  @media (max-width: 768px) {
    /* margin-left: -1rem; */
  }
`;

const SocialMediaButton = styled.button.attrs((props) => {
  return {
    type: 'button',
  };
})`
  /* margin: 2rem 0 0 0; */
  width: 100%;
  /* min-width: var(--min-width); */
  min-width: 280px;
  max-width: var(--max-width);
  max-height: 48px;
  padding: var(--padding) 0;
  border-radius: var(--radius);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices */
  }

  @media (max-width: 768px) {
    /* margin: 1.5rem 0 0 0; */
    padding: calc(var(--padding) - 0.75rem);
    padding-left: 0;
    max-width: calc(var(--max-width) - 3rem);
  }
`;

const Google = styled(SocialMediaButton)`
  --google-active-blue: hsl(217, 89%, 43%);
  --google-blue: hsl(217, 89%, 61%);
  --google-focused-blue: hsl(217, 89%, 34%);
  --google-hover-blue: hsl(217, 89%, 52%);
  --google-outline: hsl(217, 89%, 57%);
  background: var(--google-blue);
  box-shadow: 0 0 0 1px grey;
  position: relative;
  /* var(--google-outline); */
  &:hover {
    background: var(--google-hover-blue);
    box-shadow: 0 0 0 1px var(--google-active-blue);
  }
  &:active {
    background: var(--google-active-blue);
    box-shadow: 0 0 0 1px var(--google-focused-blue);
  }
  &:focus {
    box-shadow: 0 0 0 3px var(--google-focused-blue);
  }
`;

const Facebook = styled(SocialMediaButton)`
  --facebook-active-blue: hsl(221, 44%, 33%);
  --facebook-blue: hsl(221, 44%, 41%);
  --facebook-focused-blue: hsl(222, 44%, 25%);
  --facebook-hover-blue: hsl(221, 44%, 37%);
  --facebook-outline: hsl(221, 44%, 39%);
  background-color: var(--facebook-blue);
  box-shadow: 0 0 0 1px var(--facebook-outline);
  position: relative;
  &:hover {
    background: var(--facebook-hover-blue);
    box-shadow: 0 0 0 1px var(--facebook-active-blue);
  }
  &:active {
    background: var(--facebook-active-blue);
    box-shadow: 0 0 0 1px var(--facebook-focused-blue);
  }
  &:focus {
    box-shadow: 0 0 0 3px var(--facebook-focused-blue);
  }
`;

const Row = styled.div`
  display: block;
  margin-bottom: ${(props) => {
    // console.log(props);
    return `${Math.floor(props.size / 2)}px`;
  }};

  margin-top: ${(props) => {
    // console.log(props);
    return `${Math.floor(props.size / 2)}px`;
  }};
`;
