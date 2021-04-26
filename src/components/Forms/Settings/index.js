import styled from 'styled-components';
import Layout from '../Template';
import firebase from '../../../firebase';
import { SubmitButton } from '../button';
import { MaxWidthWrapper } from '../maxwidth';

const signout = async (callback) => {
  const id = firebase.auth().currentUser.uid;
  try {
    await firebase.database().ref('users').child(id).update({ online: false });
    await firebase.auth().signOut();
  } catch (error) {
    return error.message;
  } finally {
    callback();
  }
};

export default function Settings({ app }) {
  return (
    <Layout page="settings" app={app}>
      <Body>
        <MaxWidthWrapper max={240}>
          <SubmitButton onClick={() => signout(app.toggleModal)}>
            Sign out
          </SubmitButton>
        </MaxWidthWrapper>
      </Body>
    </Layout>
  );
}

const Signout = styled(SubmitButton)`
  background: darkorange;
  &:hover {
    background: orange;
  }
  &:active,
  &:focus {
    background: orange;
  }
`;

const Body = styled.div`
  padding: 3rem;
`;
