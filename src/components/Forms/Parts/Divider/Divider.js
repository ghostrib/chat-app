import s from './divider.module.css';

const Divider = () => {
  return (
    <div className={s.divider}>
      <div className={s.divider__top}></div>
      <div className={s.divider__text}>Or</div>
      <div className={s.divider__bottom}></div>
    </div>
  );
};

export default Divider;
