import './sign-in-form.styles.jsx';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from '../../utils/firebase';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../store/userReducer/user-action';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    //const {setCurrentUser }= useContext(UserContext);
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart());
        // const {user} = await signInWithGooglePopup();
        // // double setCurrentUser(user);     
        // await createUserDocumentFromAuth(user); 
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
          dispatch(emailSignInStart(email, password));
            // const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            // //setCurrentUser(user);    
            // resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                  alert('Incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('No user associated with this email');
                  break;
                default:
                  console.log(error)
                  
              }
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
      };
    return(
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="text" onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
                 <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}> Google Sign In</Button>
              </ButtonsContainer>
            </form>    
              
        </SignInContainer>

    )
}

export default SignInForm;