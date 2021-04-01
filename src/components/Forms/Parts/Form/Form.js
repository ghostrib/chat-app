import s from './form.module.css';


const Form = ({ children, value, handleLogin, setError }) => {
  const { email, password } = value;
  const login = async (e) => {
    e.preventDefault();
    const loginError = await handleLogin(email, password);
    if (loginError) {
      console.log(loginError);
      setError('Your username or password is incorrect');
    }
  };


  return (
    <form className={s.form} onSubmit={login}>
      {children}
    </form>
  );
};


export default Form;
