import styled from 'styled-components';

const DividerWrapper = styled.div`
  /* grid-area: divider; */
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: row;
    height: 1px;
    padding: 0 24px 1rem 24px;
    width: 100%;
    min-width: 112px;
  }
`;

const DividerLine = styled.div`
  background: hsla(0, 0%, 50%, 0.4);
  height: inherit;
  margin: 1rem 0;
  width: 3px;

  @media (max-width: 768px) {
    height: 3px;
    margin: 0;
    width: 100%;
  }
`;

const DividerText = styled.div`
  color: #494949;
  font-family: 'Lato';
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export default function Divider() {
  return (
    <DividerWrapper>
      <DividerLine />
      <DividerText>Or</DividerText>
      <DividerLine />
    </DividerWrapper>
  );
}
