import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './textinput.module.scss';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    const { currentMessage } = this.state;
    this.props.saveMessage(currentMessage);
    this.setState({ currentMessage: '' });
  }

  updateMessage(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { updateMessage, sendMessage } = this;
    const { currentMessage } = this.state;
    return (
      <div className={s.message}>
        <form className={s.message__form} onSubmit={sendMessage}>
          <input
            onChange={updateMessage}
            type="text"
            className={s.message__form__text}
            placeholder="Say hi..."
            name="currentMessage"
            value={currentMessage}
          />
        </form>
      </div>
    );
  }
}

TextInput.propTypes = {
  saveMessage: PropTypes.func,
};

export default TextInput;
