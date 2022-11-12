import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
  } from './button.component.styles';
  
  export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
  };
  
  const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);
  
  const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
  };
  
  export default Button;
  














// import './button.component.styles.jsx';
// import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.component.styles.jsx';

// export const BUTTON_TYPE_CLASSES ={
// base: 'base',
// google: 'google-sign-in',
// inverted: 'inverted'
// }
// const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>({
//     [BUTTON_TYPE_CLASSES.base]: BaseButton,
//     [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
//     [BUTTON_TYPE_CLASSES.inverted]: InvertedButton

// })
//  const Button = ({children, buttonType, isLoading, ...otherProps}) => {
//     const CustomButton = getButton(buttonType);


//     return(
//         <CustomButton disabled={isLoading}{...otherProps}>
//         {isLoading? <ButtonSpinner /> : children}
//         </CustomButton>
//             // <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
     
//     )
// }

// export default Button;