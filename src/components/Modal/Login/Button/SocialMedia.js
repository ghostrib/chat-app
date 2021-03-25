import { useState, useEffect } from 'react';
import s from './social.module.scss';
import { providers } from '../../../../firebase';
import services from '../../../../services';
const { loginWith } = services;

const SocialMediaButton = ({ brand, imageSrc }) => {
  const [ provider, setProvider ] = useState('');

  useEffect(() => {
    setProvider(providers[brand]);
  }, [ brand ]);

  return (
    <button className={`${s[brand]} ${s.btn}`} onClick={() => loginWith(provider)}>
      <span className={s.icon__wrapper}>
        <img className={s.icon} src={imageSrc} alt={`${brand} logo`}/>
      </span>
      <span className={s.btn__text}><strong className={s.strong}>Sign in with {brand}</strong></span>
    </button>
  );
};

export default SocialMediaButton;
