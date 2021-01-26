import React from 'react';
import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <ChatBox />
      <TextInput />
      <Footer />
    </>
  );
}

export default App;
