import PropTypes from 'prop-types';
import s from './modal.module.scss';

import LoginForm from './Forms/Login/Login';
import Signup from './Forms/Signup/Signup';
import Options from './Forms/Options/Options';
import ResetPassword from './Forms/ResetPassword/ResetPassword';

const Modal = ({ forms, app }) => {
  const { isModalVisible, isLoginForm, isSignupForm, isOptionsPage, isResetPage } = forms;

  const className = isModalVisible ? s.visible : s.hidden;

  const showLogin = isModalVisible && isLoginForm;
  const showSignup = isModalVisible && isSignupForm;
  const showOptions = isModalVisible && isOptionsPage;
  const showReset = isModalVisible && isResetPage;

  return (
    <div className={className}>
      {showLogin ? (
        <LoginForm app={app} />
      ) : showSignup ? (
        <Signup app={app} />
      ) : showOptions ? (
        <Options app={app} />
      ) : showReset ? (
        <ResetPassword app={app} />
      ) : null}
    </div>
  );
};

Modal.propTypes = {
  forms: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default Modal;
