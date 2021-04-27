import styled from 'styled-components/macro';

export const MaxWidthWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ max }) => `${max}px`};
  width: 100%;
`;
