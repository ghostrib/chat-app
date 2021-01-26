import React, { Component } from 'react';
import Container from '../Grid/Grid';
import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';

import img1 from '../../assets/babelfish-new.png';
import img2 from '../../assets/chat.png';
import img3 from '../../assets/dino4.png';
import img4 from '../../assets/gator1.png';
import img5 from '../../assets/ghost-pixel-art.png';
import img6 from '../../assets/pacman-ghost2.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      googleAuth: null,
      // dummy messages until we get the backend api setup
      messages: [
        {
          name: 'I_AM_COLOSSUS',
          image: img6,
          message:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque molestias tempore adipisci minima odio nesciunt aut minus possimus dolore vel deserunt nemo, natus expedita. Tenetur excepturi eum error harum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam eos et eius nemo quos quas debitis odio, reiciendis eum vero cum. Odit nisi iure assumenda doloremque eligendi, totam est exercitationem.',
        },
        {
          name: 'The Great and Powerful OZ',
          image: img6,
          message:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia labore, maiores facere cum doloremque dignissimos nihil assumenda architecto fugit impedit magni voluptas aut expedita iusto beatae, dolorum dolor mollitia vitae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur deserunt iusto voluptatibus reprehenderit aliquam? Dolore tenetur repudiandae quibusdam adipisci, itaque ipsam explicabo officiis numquam, maiores odio voluptates eius voluptas. Illum?',
        },
      ],

      // dummy users until we get the backend api setup
      usersOnline: [
        {
          name: 'billy bob backscratch',
          image: img1,
        },
        {
          name: 'Chuck the fabulous',
          image: img2,
        },
        {
          name: 'Raymond peters',
          image: img3,
        },
        {
          name: 'Jason Marshals',
          image: img4,
        },
        {
          name: 'Pauline Chambers',
          image: img5,
        },
      ],
    };
  }

  render() {
    return (
      <>
        <Container>
          <>
            <Header />
            <SideBar usersOnline={this.state.usersOnline} />
            <ChatBox />
            <TextInput />
            <Footer />
          </>
        </Container>
      </>
    );
  }
}

export default App;
