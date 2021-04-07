import FormHeader from '../components/Header/Header';
import SocialLogin from '../components/Other';
import Divider from '../components/Divider/Divider';
import StandardLogin from '../components/Email/StandardLogin/StandardLogin';
import FormFooter from '../components/Footer/Footer';

import { useState } from 'react';

import firebase from '../../../../firebase';

import s from './form.module.css';

const Login = ({ app }) => {
  const { toggleModal, showSignup } = app;
  const [ value, setValue ] = useState({ email: '', password: '' });
  const [ error, setError ] = useState('');

  const handleLogin = async (email, password) => {
    console.log('inside handler');
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      app.toggleModal();
    }
    catch (error) {
      setError('The email or password you entered is incorrect');
    }
  };

  const { email, password } = value;
  const login = async e => {
    e.preventDefault();
    const loginError = await handleLogin(email, password);
    if (loginError) {
      console.log(loginError);
      setError('Your username or password is incorrect');
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <form className={s.form} onSubmit={login}>
          {/* <Form value={value} setError={setError} handleLogin={handleLogin}> */}
          <FormHeader headerText="LOGIN" toggleModal={toggleModal} />
          <StandardLogin
            handleLogin={handleLogin}
            error={error}
            setError={setError}
            value={value}
            setValue={setValue}
            app={app}
          />
          <Divider />
          <SocialLogin />
          <FormFooter showSignup={showSignup} />
          {/* </Form> */}
        </form>
      </div>
    </section>
  );
};

export default Login;
