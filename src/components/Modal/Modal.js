import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './Forms/Login/Login';
import Signup from './Signup/Signup';
import Options from './Options/Options';

const Modal = ({ forms, app }) => {
  const { isModalVisible, isLoginForm, isSignupForm, isOptionsPage } = forms;

  const className = isModalVisible ? s.visible : s.hidden;

  const showLogin = isModalVisible && isLoginForm;
  const showSignup = isModalVisible && isSignupForm;
  const showOptions = isModalVisible && isOptionsPage;

  return (
    <div className={className}>
      {showLogin ? (
        <LoginForm app={app} />
      ) : showSignup ? (
        <Signup app={app} />
      ) : showOptions ? (
        <Options app={app} />
      ) : null}
    </div>
  );
};

Modal.propTypes = {
  forms: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default Modal;
