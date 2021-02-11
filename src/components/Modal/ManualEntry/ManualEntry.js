import React from 'react';
import f from './manual.module.scss';

const ManualEntryForm = () => {
  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <div className={f.manual}>
        <input type="email" name="email" placeholder="Email or Phone" className={f.email} />
        <input type="password" name="password" placeholder="Password" className={f.password} />
        <a href="#" target="_blank" rel="noopener noreferrer" className={f.forgot}>
          Forgot password?
        </a>

        <input type="submit" name="login" value="LOGIN" className={f.login} />

        <span className={f.remember__container}>
          <input type="checkbox" name="remember" id="remember" className={f.remember} />
          <label htmlFor="remember" className={f.remember__label}>
            remember me
          </label>
        </span>
      </div>
    </form>
  );
};

export default ManualEntryForm;
