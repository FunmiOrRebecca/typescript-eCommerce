import './sign-up-form.styles.jsx';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from '../../contexts/user.context';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/userReducer/user-action';
import { SignUpContainer } from './sign-up-form.styles.jsx';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    //const {setCurrentUser} = useContext(UserContext);
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      }
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            // const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
           // setCurrentUser(user);
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
              alert("Email already in use")
            } else
            console.log("user encounterd error", error);
          }
       
    };
    const handleChange = (event) => {
       const {name, value } = event.target;
       setFormFields({...formFields, [name]: value});
    }
    return(
        <SignUpContainer>
                <h2>Already have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={handleSubmit}>
                <FormInput label="displayName" required type="text" onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="email" required type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="password" required type="password" onChange={handleChange} name="password" value={password}/>
                <FormInput label="confirmPassword" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
             

        </SignUpContainer>
    )
}


export default SignUpForm;