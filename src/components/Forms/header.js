import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

const CloseButton = styled.button`
  -webkit-filter: drop-shadow(4px 4px 4px black);
  background: transparent;
  border: none;
  color: whitesmoke;
  cursor: pointer;
  filter: drop-shadow(4px 4px 4px black);
  font-size: 2rem;
  /* top: calc(var(--banner-height) / 4); */
  line-height: 72px;
  outline: none;
  position: absolute;
  right: 3.5rem;
  top: 0;
`;

const Title = styled.h4`
  -webkit-filter: drop-shadow(4px 4px 4px black);
  color: whitesmoke;
  filter: drop-shadow(4px 4px 4px black);
  font-family: 'Amatic SC';
  font-size: var(--banner-font-size);
  line-height: 72px;
  text-align: center;
`;

const Outline = styled.span`
  border-radius: 4px;
  height: 1.5rem;
  /* box-shadow: 0 0 0 2px whitesmoke; */
  outline: 1px solid white;
  outline-offset: 2px;
  position: absolute;
  right: 3.3rem;
  top: 1.65rem;
  visibility: ${(props) => (props.isFocused ? 'visibile' : 'hidden')};
  width: 1.5rem;
`;

const Header = styled.header`
  background: var(--header-bg);
  grid-area: header;
  min-height: var(--bannerHeight);
  min-width: 300px;

  position: relative;
  /* padding: calc((var(--banner-height) - var(--banner-font-size)) / 2) 0; */
  /* height: var(--banner-height); */
  width: 100%;
`;

export default function FormHeader({ ...props }) {
  const { toggleModal } = props.app;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Header>
      <Title>{props.page.toUpperCase()}</Title>

      <Outline isFocused={isFocused} />
      <CloseButton
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={toggleModal}
      >
        &times;
      </CloseButton>
    </Header>
  );
}
