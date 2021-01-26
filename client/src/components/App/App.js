import React from 'react';
import Container from '../Grid/Grid';
import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';

function App() {
  return (
    <Container>
      <>
        <Header />
        <SideBar />
        <ChatBox />
        <TextInput />
        <Footer />
      </>
    </Container>
  );
}

export default App;
