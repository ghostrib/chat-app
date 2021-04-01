import { useState } from 'react';

import s from './privacyPolicy.module.css';

const PrivacyPolicy = () => {
  const [ showPolicy, setShowPolicy ] = useState(false);
  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  const notice = (showPolicy) => {
    if (showPolicy) {
      return (
        <>
          <br />
          <p>
            Oh you thought I was serious? Ha! Nooo... I don't care... I'm not
            Google or Amazon or any other company who cares about harvesting
            your data. I'm on a $5 dollar per month server.
          </p>
          <br />
          <p>TLDR - I don't collect your data.</p>
        </>
      );
    }
  };

  return (
    <div className={s.privacy}>
      <p className={s.privacy__notice}>
        By continuing you agree to our{' '}
        <button type="button" onClick={togglePolicy} className={s.privacy__button}>
          privacy policy
        </button>
      </p>
      {notice(showPolicy)}
    </div>
  );
};

export default PrivacyPolicy;
