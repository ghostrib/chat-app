import s from './socialLogin.module.css';
import SocialMediaButton from '../SocialMediaButton/SocialMediaButton';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import googleImage from '../../../../assets/google.png';
import facebookImage from '../../../../assets/facebook.png';


const SocialLogin = () => {
  return (
    <div className={s.social}>
      <p className={s.paragraph}>Sign in using social media</p>
      <div className={s.button__wrapper}>
        <SocialMediaButton brand="google" imageSrc={googleImage} />
      </div>
      <div className={s.button__wrapper}>
        <SocialMediaButton brand="facebook" imageSrc={facebookImage} />
      </div>
      <PrivacyPolicy />
    </div>
  );
};

export default SocialLogin;
