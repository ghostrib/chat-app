import s from './options.module.scss';
import services from '../../../../services';
import firebase from '../../../../firebase';
import Header from '../components/Header/Header';

const Options = ({ app }) => {
  const { toggleModal } = app;

  const signOut = async (e) => {
    await e.preventDefault();
    await services.setOnlineStatus(false);
    await firebase.auth().signOut();
    await toggleModal();
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <form className={s.form} onSubmit={signOut} >
          <Header toggleModal={toggleModal} headerText="Settings" />
          <p className={s.paragraph}>Something missing? I don't care</p>
          <div className={s.wrapper}>
            <button className={s.button}>
              Signout
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Options;
