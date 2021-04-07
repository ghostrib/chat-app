import s from './button.module.scss';
import { useState, useEffect } from 'react';
import { providers } from '../../../../../../firebase';
import services from '../../../../../../services';
import googleImage from '../../../../../../assets/google.svg';
import facebookImage from '../../../../../../assets/facebook.svg';
const { loginWith } = services;

const Button = ({ brand }) => {
  const [ provider, setProvider ] = useState('');
  const [ brandName, setBrandName ] = useState('');

  useEffect(() => {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    setBrandName(brandName);
    setProvider(providers[brand]);
  }, [ brand ]);

  const image = brand === 'google' ? googleImage : facebookImage;

  return (
    <button type="button" onClick={() => loginWith(provider)} className={`${s[brand]} ${s.button}`}>
      <span className={s.icon_wrapper}>
        <img className={s.icon} src={image} alt={`${brand} icon`} />
      </span>
      <span className={s.btn_txt}>
        <b>Sign in with {brandName}</b>
      </span>
    </button>
  );
};

export default Button;
