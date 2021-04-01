import s from './footer.module.css';


const FormFooter = ({ showSignup }) => {
  return (
    <footer className={s.footer}>
      <p className={s.paragraph}>Don't have an account?</p>
      <button type="button" onClick={showSignup} className={s.signup__button}>
        <strong>Signup</strong>
      </button>
    </footer>
  );
};

export default FormFooter;
