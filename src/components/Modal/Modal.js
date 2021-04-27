import LoginForm from '../Forms/Login';
import SignupForm from '../Forms/Signup';
import SettingsPage from '../Forms/Settings';
import ResetPassword from '../Forms/ResetPassword';

const Modal = ({ forms, app }) => {
  const {
    isModalVisible,
    isLoginForm,
    isSignupForm,
    isOptionsPage,
    isResetPage,
  } = forms;

  const showLogin = isModalVisible && isLoginForm;
  const showSignup = isModalVisible && isSignupForm;
  const showOptions = isModalVisible && isOptionsPage;
  const showReset = isModalVisible && isResetPage;

  return showLogin ? (
    <LoginForm app={app} />
  ) : showSignup ? (
    <SignupForm app={app} />
  ) : showOptions ? (
    <SettingsPage app={app} />
  ) : showReset ? (
    <ResetPassword app={app} />
  ) : null;
};

export default Modal;
