import s from './socialLogin.module.css';

import SocialMediaButton from '../SocialMediaButton/Button';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

const SocialLogin = () => {
  return (
    <div className={s.social}>
      <p className={s.paragraph}>Sign in using social media</p>
      <div className={s.button__wrapper}>
        <SocialMediaButton brand="google" />
      </div>
      <div className={s.button__wrapper}>
        <SocialMediaButton brand="facebook" />
      </div>
      <PrivacyPolicy />
    </div>
  );
};

export default SocialLogin;
