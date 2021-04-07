import s from './reset.module.scss';
import services from '../../../../services';
import firebase from '../../../../firebase';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { validateEmail } from '../../../../utils/validate';
import { debounce } from '../../../../utils/debounce';
import { useState, useRef, useEffect } from 'react';

// const Header = ({ app }) => {
//   const { toggleModal } = app;
//   return (
//     <header className={s.header}>
//       <h4 className={s.title}>OPTIONS</h4>
//       <span onClick={toggleModal} className={s.close}>
//         &times;
//       </span>
//     </header>
//   );
// };

// const signOut = async () => {
//   await services.setOnlineStatus(false);
//   await firebase.auth().signOut();
//   await toggleModal();
// };

const sendEmail = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return;
  }
  catch (error) {
    return error;
  }
};

const ResetPassword = ({ app }) => {
  const { toggleModal } = app;
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ email, setEmail ] = useState('');
  const [ result, setResult ] = useState('');
  const [ isError, setIsError ] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await sendEmail(email);
    if (response) {
      setResult('We were unable to locate your account. Please double check your email is spelled correctly');
      setIsError(true);
    }
    else {
      setResult('Please check your email for a link to reset your password');
      setIsError(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setResult('');
    setIsError(false);
    handleValidation(e);
  };

  const handleValidation = (e) => {
    validateEmail(e.target.value) ? setIsDisabled(false) : setIsDisabled(true);
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <form className={s.form} onSubmit={handleSubmit}>
          <Header toggleModal={toggleModal} headerText="Reset Password" />
          <p className={s.paragraph}>Enter the email address associated with your account below</p>

          <div className={s.wrapper}>
            <input type="email" className={s.input} onChange={handleChange} onBlur={handleValidation}/>
          </div>
          <div className={s.wrapper}>
            <button className={s.button} disabled={isDisabled}>
              Reset
            </button>
          </div>
          <div className={s.wrapper}>
            <p className={isError ? s.error : s.success}>{result}</p>
          </div>
          <Footer />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;

// eslint-disable-next-line no-lone-blocks
{
  /* <ul className={s.options__list}>
<Header app={app} />
<li className={s.options__list__item}>
  <button className={s.button} onClick={signOut}>
Sign OUUUTTT
  </button>
</li>
</ul> */
}
