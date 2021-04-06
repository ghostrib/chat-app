// import s from './login.module.css';
import FormHeader from '../Parts/Header/Header';
import SocialLogin from '../Parts/SocialLogin/SocialLogin';
import Divider from '../Parts/Divider/Divider';
import StandardLogin from '../Parts/StandardLogin/StandardLogin';
import FormFooter from '../Parts/Footer/Footer';
import Wrapper from '../Parts/Wrapper/Wrapper';
import Form from '../Parts/Form/Form';
import { useState } from 'react';

import firebase from '../../../firebase';

const Login = ({ app }) => {
  const { toggleModal, showSignup } = app;
  const [ value, setValue ] = useState({ email: '', password: '' });
  const [ error, setError ] = useState('');

  const handleLogin = async (email, password) => {
    console.log('inside handler');
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (error) {
      setError('The email or password you entered is incorrect');
    }
  };

  return (
    <Wrapper>
      <Form value={value} setError={setError} handleLogin={handleLogin}>
        <FormHeader headerText="LOGIN" toggleModal={toggleModal} />
        <StandardLogin
          handleLogin={handleLogin}
          error={error}
          setError={setError}
          value={value}
          setValue={setValue}
        />
        <Divider />
        <SocialLogin />
        <FormFooter showSignup={showSignup} />
      </Form>
    </Wrapper>
  );
};

export default Login;
