import s from './options.module.scss';
import services from '../../../../services';
import firebase from '../../../../firebase';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { validateEmail } from '../../../../utils/validate';
import { useState } from 'react';

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


const ResetPassword = ({ app }) => {
  const { toggleModal } = app;
  const signOut = async () => {
    await services.setOnlineStatus(false);
    await firebase.auth().signOut();
    await toggleModal();
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <form className={s.form}>
          <Header toggleModal={toggleModal} headerText="Settings" />
          <p className={s.paragraph}>Something missing? I don't care</p>
          <div className={s.wrapper}>
            <button className={s.button} onClick={signOut}>Signout</button>
          </div>
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
