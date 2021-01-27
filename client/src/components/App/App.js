import React, { Component } from 'react';
import Container from '../Grid/Grid';
import Header from '../Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import SideBar from '../SideBar/Sidebar';
import TextInput from '../TextInput/TextInput';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

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
      isSignedIn: null,
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
    this.toggleModal = this.toggleModal.bind(this);
    this.initClient = this.initClient.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signOutWithGoogle = this.signOutWithGoogle.bind(this);
  }

  initClient() {
    window.gapi.auth2
      .init({ client_id: process.env.REACT_APP_GAPI_CLIENT_ID })
      .then((googleAuth) => {
        const isSignedIn = googleAuth.isSignedIn.get();

        this.setState({ isSignedIn, showButton: true, googleAuth });

        if (isSignedIn) {
          this.getUserProfile();
        }

        googleAuth.isSignedIn.listen((isSignedIn) => {
          this.setState({ isSignedIn });
          isSignedIn
            ? this.getUserProfile()
            : this.removeUserProfile();
        });
      });
  }

  getUserProfile() {
    const { googleAuth } = this.state;
    const user = googleAuth.currentUser.get().getBasicProfile();
    const username = user.getName();
    const imageUrl = user.getImageUrl();
    const newUser = { name: username, image: imageUrl };
    const { usersOnline } = this.state;
    this.setState({
      username,
      imageUrl,
      visible: false,
      usersOnline: [...usersOnline, newUser],
    });
  }

  removeUserProfile() {
    const { usersOnline } = this.state;
    const currentOnline = usersOnline.filter((user) => {
      return (
        user.image !== this.state.imageUrl &&
        user.name !== this.state.username
      );
    });
    this.setState({ usersOnline: currentOnline });
  }

  signInWithGoogle(e) {
    e.preventDefault();
    const { googleAuth } = this.state;
    const isSignedIn = googleAuth.isSignedIn.get();
    if (!isSignedIn) {
      googleAuth.signIn({ prompt: 'select_account' });
    }
  }

  signOutWithGoogle() {
    this.removeUserProfile();
    this.state.googleAuth.signOut();
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible });
  }

  componentDidMount() {
    window.gapi.load('auth2', this.initClient);
  }

  render() {
    return (
      <>
        <Container>
          <>
            <Header
              toggleModal={this.toggleModal}
              isSignedIn={this.state.isSignedIn}
              username={this.state.username}
              imageUrl={this.state.imageUrl}
              signOutWithGoogle={this.signOutWithGoogle}
            />
            <SideBar usersOnline={this.state.usersOnline} />
            <ChatBox />
            <TextInput />
            <Footer />
          </>
        </Container>
        <Modal
          toggleModal={this.toggleModal}
          visible={this.state.visible}
          signInWithGoogle={this.signInWithGoogle}
        />
      </>
    );
  }
}

export default App;
