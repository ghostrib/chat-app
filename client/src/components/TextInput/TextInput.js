import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './textinput.module.scss';

const TextInput = () => {
  return (
    <div className={s.message}>
      <form className={s.message__form}>
        <input
          type="text"
          className={s.message__form__text}
          placeholder="Say hi..."
          name="currentMessage"
        />
      </form>
    </div>
  );
};

export default TextInput;
