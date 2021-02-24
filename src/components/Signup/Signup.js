/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './signup.module.scss';
// import GoogleButton from '../Modal/Login/GoogleButton';
// import FacebookButton from '../Modal/Login/FacebookButton';
// import TwitterButton from '../Modal/Login/TwitterButton';


const Signup = ({ select }) => {
  const { showLogin, toggleModal } = select;
  return (
    <div className={s.modal}>
      <div className={s.overlay}></div>

      <form className={s.form} onSubmit={e => e.preventDefault()}>

        <header className={s.header}>
          <h4 className={s.title}>SIGN UP

            <span onClick={toggleModal} className={s.close}>&times;</span>
          </h4>
        </header>


        <section className={s.inputs}>
          <input type="text" name="username" placeholder="What should we call you?" id="username" value="" className={s.username} />
          <input type="email" name="email" placeholder="Enter your email address" id="email" value="" className={s.email} />
          <input type="password" name="password" placeholder="Enter a password" id="password" value="" className={s.password} />
          <input type="password" name="confirm" placeholder="Confirm your password" id="confirm" value="" className={s.confirm} />
          <input type="submit" name="register" id="register" value="REGISTER" className={s.register} />
        </section>


        {/* <section className={s.divider}>
          <div className={s.divider__container}>
            <span className={s.divider__container__line}></span>
            <span className={s.divider__container__text}>Or</span>
            <span className={s.divider__container__line}></span>
          </div>
        </section>


        <section className={s.buttons}>
          <GoogleButton />
          <FacebookButton />
          <TwitterButton />
        </section> */}

        {/* <div className={s.spacer}>
          <p>or login with...</p>
        </div>

        <section className={s.buttons}>
          <button className={s.button}>
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google fa-w-16 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          </button>
          <button className={s.button}>
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f fa-w-10 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
          </button>
          <button className={s.button}>
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
          </button>
        </section> */}

        {/* <footer className={s.footer}>
          <p>Already have an account?</p>
          <button className={s.login}>Log in</button>
        </footer> */}


        <footer className={s.footer}>
          <p>Already have an account?</p>
          <a href="#" onClick={showLogin}>Log in</a>
        </footer>

      </form>

    </div>

  );
};


// const Signup = () => {
//   return (
//     <div className={s.isVisible}>
//       {/* <div className={s.overlay}></div> */}
//       <div className={s.modal}>
//         <form className={s.signup}>

// <header className={s.header}>
//   <h4 className={s.title}>SIGN UP</h4>
//   <div className={s.close}>&times;</div>
// </header>


// <section className={s.inputs}>
//   <input type="text" name="username" placeholder="What should we call you?" id="username" value="" className={s.username} />
//   <input type="email" name="email" placeholder="Enter your email address" id="email" value="" className={s.email} />
//   <input type="password" name="password" placeholder="Enter a password" id="password" value="" className={s.password} />
//   <input type="password" name="confirm" placeholder="Confirm your password" id="confirm" value="" className={s.confirm} />
//   <input type="submit" name="register" id="register" value="REGISTER" className={s.register} />
// </section>

// <div className={s.spacer}>
//   <p>or login with...</p>
// </div>

// <section className={s.buttons}>
//   <button className={s.button}>
//     <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google fa-w-16 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
//   </button>
//   <button className={s.button}>
//     <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f fa-w-10 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
//   </button>
//   <button className={s.button}>
//     <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
//   </button>
// </section>

// <footer className={s.footer}>
//   <p>Already have an account?</p>
//   <button className={s.login}>Log in</button>
// </footer>
//         </form>
//       </div>
//     </div>
//   );
// };


export default Signup;


// eslint-disable-next-line no-lone-blocks
{ /* <span className={s.icon}>
<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google fa-w-16 button_icon__1n2QM" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
</span>
<span className={s.brand}>
<span>Login with Google</span>
</span>


              <span className={s.icon}>
              </span>
              <span className={s.brand}>
                <span>Login with Facebook</span>
              </span>


 <span className={s.icon}>
              </span>
              <span className={s.brand}>
                <span>Login with Twitter</span>
              </span>


*/


}
