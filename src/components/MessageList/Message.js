import SVG from 'react-inlinesvg';
import styled from 'styled-components/macro';

export default function Message({ name, image, message }) {
  return (
    <Container>
      <User>
        <Image>
          <ImageSVG image={image} />
        </Image>
        <Username>{name}</Username>
        <MsgText>{message}</MsgText>
      </User>
    </Container>
  );
}

const Container = styled.li`
  margin: 12px;
  padding: 12px;
  &:hover {
    background: hsla(300, 2%, 11%, 0.04);
    border-radius: 4px;
  }
`;

const User = styled.div`
  align-items: flex-start;
  display: grid;
  font-size: calc(0.65em + 0.5vw);
  gap: 2px calc(0.5em + 0.5vw);
  grid-template-areas:
    'image name'
    'image message';
  grid-template-columns: calc(3em + 0.5vw) auto;
`;

const Image = styled.div`
  grid-area: image;
  height: 100%;
  width: 100%;
`;

const ImageSVG = ({ image }) => {
  return (
    <>
      <SVG
        src={image}
        width={40}
        height={40}
        style={{
          width: 'auto',
          height: 'calc(0.5vw + 2vh + 1em)',
          borderRadius: '100%',
        }}
      />
    </>
  );
};

const Username = styled.div`
  font-weight: 800;
  grid-area: name;
`;

const MsgText = styled.div`
  font-family: lato;
  font-weight: 400;
`;
