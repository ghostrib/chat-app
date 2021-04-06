import s from './button.module.scss';
const googleImage = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';
const facebookImage = 'https://static.cdnlogo.com/logos/f/84/facebook.svg';

const Button = ({ brand }) => {
  const image = brand === 'google' ? googleImage : facebookImage;
  const text = brand.charAt(0).toUpperCase() + brand.slice(1);
  return (
    <button class={`${s[brand]} ${s.button}`}>
      <span class={s.icon_wrapper}>
        <img class={s.icon} src={image} alt={`${brand} icon`}/>
      </span>
      <span class={s.btn_txt}><b>Sign in with {text}</b></span>
    </button>
  );
};

export default Button;
