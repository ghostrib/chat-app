import { useState, useEffect } from 'react';
import s from './socialMediaButton.module.scss';
import { providers } from '../../../../firebase';
import services from '../../../../services';

const { loginWith } = services;

const SocialMediaButton = ({ brand, imageSrc }) => {
  const [ provider, setProvider ] = useState('');
  const [ brandName, setBrandName ] = useState('');

  useEffect(() => {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    setBrandName(brandName);
    setProvider(providers[brand]);
  }, [ brand ]);

  return (
    <button
      className={`${s[brand]} ${s.button}`}
      onClick={() => loginWith(provider)}

      type="button"
    >
      <span className={s.icon__wrapper}>
        <img className={s.icon} src={imageSrc} alt={`${brand} logo`} />
      </span>
      <span className={s.button__text}>
        <strong>Sign in with {brandName}</strong>
      </span>
    </button>
  );
};

export default SocialMediaButton;
