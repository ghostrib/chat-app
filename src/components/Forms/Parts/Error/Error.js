import s from './error.module.css';


const Error = ({ error }) => {
  return error ? (
    <div className={s.error}>
      <p className={s.error__message}>{error}</p>
    </div>
  ) : null;
};

export default Error;
