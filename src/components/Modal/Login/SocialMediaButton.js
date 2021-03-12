import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import s from './socialMediaButton.module.scss';
import { providers } from '../../../firebase';
import services from '../../../services';
const { loginWith } = services;

const ButtonLogo = ({ imageSrc, brand }) => {
  return (
    <span className={s.button__anchor}>
      <img className={s.button__logo} src={imageSrc} alt={brand} />
    </span>
  );
};


const ButtonText = ({ brand }) => {
  return (
    <span className={s.text__background}>
      <span className={s.button__text}>Login with {brand}</span>
    </span>
  );
};

const ButtonContainer = ({ brand, children }) => {
  const [ provider, setProvider ] = useState('');

  useEffect(() => {
    setProvider(providers[brand]);
  }, [ brand ]);

  return (
    <button className={`${s.button} ${s[brand]}`} onClick={() => loginWith(provider)}>
      {children}
    </button>
  );
};


const SocialMediaButton = ({ brand, imageSrc }) => {
  return (
    <ButtonContainer brand={brand} >
      <ButtonLogo brand={brand} imageSrc={imageSrc}/>
      <ButtonText brand={brand}/>
    </ButtonContainer>
  );
};


SocialMediaButton.propTypes = {
  brand: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
};


export default SocialMediaButton;
