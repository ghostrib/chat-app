import s from './options.module.scss';
import services from '../../../services';
import firebase from '../../../firebase';

const Header = ({ app }) => {
  const { toggleModal } = app;
  return (
    <header className={s.header}>
      <h4 className={s.title}>OPTIONS</h4>
      <span onClick={toggleModal} className={s.close}>&times;</span>
    </header>
  );
};

const Options = ({ app }) => {
  const { toggleModal } = app;
  const signOut = async () => {
    await services.setOnlineStatus(false);
    await firebase.auth().signOut();
    await toggleModal();
  };
  return (
    <div className={s.options}>
      <div className={s.overlay}></div>
      <ul className={s.options__list}>
        <Header app={app}/>
        <li className={s.options__list__item}>
          <button className={s.button} onClick={signOut}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};


export default Options;
