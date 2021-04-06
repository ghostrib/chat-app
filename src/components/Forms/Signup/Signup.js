import InputField from '../Parts/InputField/InputField';
import Header from '../Parts/Header/Header';
import Footer from '../Parts/Footer/Footer';
import Wrapper from '../Parts/Wrapper/Wrapper';

const SignupForm = () => {
  return (
    <Wrapper>
      <Header headerText="SIGNUP" />
      <InputField type="email" />
    </Wrapper>
  );
};
