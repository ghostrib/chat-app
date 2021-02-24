/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './login.module.scss';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import TwitterButton from './TwitterButton';


const Login = ({ select }) => {
  const { showSignup, toggleModal } = select;
  return (
    <div className={s.modal}>
      <div className={s.overlay}></div>

      <form className={s.form} onSubmit={e => e.preventDefault()}>

        <header className={s.header}>
          <h4 className={s.title}>
            Chat Login
            <span className={s.close} onClick={toggleModal} >
                &times;
            </span>
          </h4>
        </header>

        <section className={s.inputs}>
          <input type="email" name="email" placeholder="Email or Phone" className={s.email} required={true} />
          <input type="password" name="password" placeholder="Password" className={s.password} required={true} />
          <a href="#" target="_blank" rel="noopener noreferrer" className={s.forgot}>Forgot password?</a>
          <input type="submit" name="login" className={s.login} value="LOGIN" />
          <span className={s.remember}>
            <input type="checkbox" name="remember" id="remember" className={s.remember} />
            <label htmlFor="remember" className={s.remember}>remember me</label>
          </span>
        </section>

        <section className={s.divider}>
          <div className={s.divider__container}>
            <span className={s.divider__container__line}></span>
            <span className={s.divider__container__text}>Or</span>
            <span className={s.divider__container__line}></span>
          </div>
        </section>


        <section className={s.buttons}>
          <GoogleButton />
          <FacebookButton />
          <TwitterButton />
        </section>

        <footer className={s.footer}>
          <p>Dont have an account?</p>
          <a href="#" onClick={showSignup}>Sign up</a>
        </footer>

      </form>

    </div>

  );
};

export default Login;
