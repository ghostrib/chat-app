import s from './wrapper.module.css';

const Wrapper = ({ children }) => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {children}
      </div>
    </section>
  );
};


export default Wrapper;
