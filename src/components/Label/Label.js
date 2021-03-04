import s from './label.module.scss';

const Label = ({ id, text, focused, children }) => {
  const className = focused ? s.focused : s.blur;

  return (
    <label className={s.label} htmlFor={id}>
      <div className={s.text} >
        <div className={className}>
          {text}
        </div>
        <div className={s.message}>
          {children}
        </div>
      </div>
    </label>
  );
};

export default Label;
