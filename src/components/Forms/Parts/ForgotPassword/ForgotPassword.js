import s from './forgotPassword.module.css';


const ForgotPassword = () => {
  return (
    <div className={s.forgot__password}>
      <button type="button" className={s.forgot__password__button}>Forgot password?</button>
    </div>
  );
};

export default ForgotPassword;
