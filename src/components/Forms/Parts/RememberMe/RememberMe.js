import s from './rememberMe.module.css';

const RememberMe = () => {
  return (
    <div className={s.remember__me}>
      <input className={s.checkbox} type="checkbox" id="checkbox" />
      <label className={s.remember__me__label} htmlFor="checkbox">
        Stay logged in
      </label>
    </div>
  );
};

export default RememberMe;
