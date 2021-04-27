import styled from 'styled-components/macro';
import { useState } from 'react';

const PrivacyWrapper = styled.div`
  color: #494949;
  font-size: 0.75em;
  /* margin: 1rem 0; */
  max-width: calc(var(--media-button-width) + 4px);
  padding-top: 0.25rem;
  width: fit-content;
`;

const PrivacyButton = styled.button.attrs(() => ({ type: 'button' }))`
  color: hsl(222, 65%, 34%);
  background: transparent;
  outline: none;
  border: none;
  width: max-content;
  cursor: pointer;
  &:focus {
    outline: solid;
  }
`;

const DangerText = styled.p`
  color: hsl(0deg, 90%, 40%);
  font-family: monospace;
  font-size: 12px;
  font-weight: bold;
`;

export default function PrivacyPolicy() {
  const [showPolicy, setShowPolicy] = useState(false);
  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  return (
    <PrivacyWrapper>
      <p>
        By continuing you agree to our{' '}
        <PrivacyButton onClick={togglePolicy}>privacy policy</PrivacyButton>
      </p>
      <br />

      {showPolicy && <DangerText>All your base are belong to us</DangerText>}
    </PrivacyWrapper>
  );
}
