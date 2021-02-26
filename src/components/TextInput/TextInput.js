import PropTypes from 'prop-types';
import React from 'react';
import firebase from '../../firebase';
import s from './textinput.module.scss';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    if (!this.props.state.isSignedIn) {
      this.props.select.showLogin();
      return;
    }
    if (this.state.message.length) {
      const db = firebase.database().ref();
      const key = Date.now();

      const { name, image } = this.props.state.user;
      const { message } = this.state;
      const post = { name, image, message, time: key };

      const updates = {};
      updates['/messages/' + key] = post;

      db.update(updates);
      this.setState({ message: '' });
      sessionStorage.setItem('autosave', '');
    }
  }

  updateMessage(e) {
    sessionStorage.setItem('autosave', e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    if (sessionStorage.getItem('autosave')) {
      this.setState({ message: sessionStorage.getItem('autosave') });
    }
  }

  render() {
    const { updateMessage, sendMessage } = this;
    const { message } = this.state;
    return (
      <div className={s.message}>
        <form className={s.message__form} onSubmit={sendMessage}>
          <input
            onChange={updateMessage}
            type="text"
            className={s.message__form__text}
            placeholder="Say hi..."
            name="message"
            value={message}
          />
        </form>
      </div>
    );
  }
}

TextInput.propTypes = {
  state: PropTypes.object.isRequired,
  select: PropTypes.object.isRequired
};

export default TextInput;
