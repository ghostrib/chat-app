import { useState } from 'react';

import s from './privacyPolicy.module.css';

const PrivacyPolicy = () => {
  const [ showPolicy, setShowPolicy ] = useState(false);
  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  return (
    <div className={s.privacy}>
      <p className={s.privacy__notice}>
        By continuing you agree to our{' '}
        <button type="button" onClick={togglePolicy} className={s.privacy__button}>
          privacy policy
        </button>
      </p>
      <br />

      <p>All your base are belongt to us</p>
    </div>
  );
};

export default PrivacyPolicy;
