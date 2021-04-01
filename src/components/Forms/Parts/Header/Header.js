import s from './header.module.css';

const FormHeader = ({ headerText, toggleModal }) => {
  return (
    <header className={s.header}>
      <h4 className={s.title}>{headerText}</h4>
      <button type="button" className={s.close} onClick={toggleModal}>
           &times;
      </button>
    </header>
  );
};

export default FormHeader;
