import s from './options.module.scss';
import services from '../../../../services';
import firebase from '../../../../firebase';
import Header from '../components/Header/Header';

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
            <button className={s.button} onClick={signOut}>
              Signout
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
