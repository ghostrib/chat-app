import styled from 'styled-components/macro';
import Header from './header';
import Footer from './footer';
import MaxWidthWrapper from './maxwidth';

const OverLay = styled.div`
  background: black;
  height: 100%;
  left: 0;
  opacity: 90%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const Modal = styled.div`
  --bannerHeight: 72px;
  --height: calc((var(--width) / 6) + 0.5rem);
  --icon-gap: calc(var(--height) / 6);
  --icon-margin-left: calc(var(--icon-gap) / 2);
  --icon-wrapper-height: calc(var(--height) - var(--icon-gap));
  --icon-wrapper-width: var(--icon-wrapper-height);
  --max-width: var(--max-button-width);
  --mid-width: var(--media-button-width);
  --min-width: 80px;
  --padding: calc(((var(--width) / 6) + 0.5rem) / 2);
  --radius: 4px;
  --text-width: calc(var(--height) * 1.5);

  --width: clamp(var(--min-width), var(--mid-width), var(--max-width));

  @media (max-width: 768px) {
    --bodyHeight: calc(100vh - (var(--bannerHeight) * 2));
  }

  display: grid;
  height: 100%;
  left: 0;
  margin: auto;
  place-items: center;
  position: absolute;
  top: 0;
  width: 100%;

  z-index: 2;
`;

const Shell = styled.div`
  display: grid;
  height: 100%;
  margin: auto;
  max-width: 768px;
  place-items: center;
  width: 100%;

  @media (max-width: 768px) {
    place-items: stretch;
  }
`;

const Container = styled.div`
  background: #e0e0e0;
  min-height: 600px;
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    min-height: 720px;
  }
`;

export default function Layout({ children, ...props }) {
  return (
    <>
      <OverLay />
      <Modal>
        <Shell>
          <Container>
            <Header {...props} />
            {children}
            <Footer {...props} />
          </Container>
        </Shell>
      </Modal>
    </>
  );
}
