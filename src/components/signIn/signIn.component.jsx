import "./signIn.styles.scss";
import { useState } from "react";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { googleSignInStart , emailAndPasswordSignInStart} from "../../store/user/user.action";
import { signInWithGooglePopUp,createUserDocumentation,signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../formInput/formInput.component";
const defaultValues = {
    email : '',
    password : ''
};

const SignInComponent = () => {
    const [formInputs, setFormInputs] = useState(defaultValues);
    const {email, password} = formInputs;
    const dispatch = useDispatch();
    // redux-saga
    // const googlePopUpHandler = () => {
    //     dispatch(googleSignInStart());
    // }

    // google sign-in without saga
    const googlePopUpHandler = async () => {
        const res = await signInWithGooglePopUp();
        const {user} = res;
        createUserDocumentation(user);
    }

    const onChangeHandler = (event) => {
        const {name , value} = event.target;

        setFormInputs({...formInputs, [name] : value});
    }
    // email and password sign in without saga

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            await signInAuthWithEmailAndPassword(email,password);
            
            setFormInputs(defaultValues);
        }
        catch(err){
            if(err.code === 'auth/invalid-credential'){
                alert("invalid crendentials");
            }else{
                alert("some error occurred");
            }
        }
    }



    // email and password signin with saga
    // const onSubmitHandler = async(event) => {
    //     event.preventDefault();
    //     dispatch(emailAndPasswordSignInStart(email,password));
    //     setFormInputs(defaultValues);

    // }

    return <>
        <div className="sign-in-container">
            <h2>Sign In Component</h2>
            <form onSubmit={onSubmitHandler}>
                <FormInput 
                    type="text"
                    label="Email"
                    required
                    value = {email}
                    name="email"
                    onChange = {onChangeHandler}
                />
                <FormInput 
                    type="password"
                    name="password"
                    label="Password"
                    required
                    value={password}
                    onChange = {onChangeHandler}
                />
                <div className="buttons-container">
                    <Button type="submit">Log In</Button>
                    <Button type="submit" buttonType="google" onClick={googlePopUpHandler}>Google Sign In</Button>

                </div>
            </form>
        </div>
    </>
}

export default SignInComponent;