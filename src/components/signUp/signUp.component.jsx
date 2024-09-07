import "./signUp.styles.scss";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { createAuthWithEmailAndPassword, createUserDocumentation } from "../../utils/firebase/firebase.utils";
import { useState } from "react";
const defaultValues = {
        displayName : '',
        password : '',
        confirmPassword : '',
        email : ''
    };
const SignUpComponent = () => {
    const [formInputs, setFormInputs] = useState(defaultValues);
    const {displayName, password, confirmPassword, email} = formInputs;

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormInputs({...formInputs, [name] : value});
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("working");
        console.log(formInputs);
        if(password !== confirmPassword){
            alert("Password is mismatched!");
        }
        else{
            const res = await createAuthWithEmailAndPassword(email,password);
            const {user} = res;
            await createUserDocumentation(user,{displayName : displayName});
        }
        
        setFormInputs(defaultValues);
    }
    return <>
    <div className="sign-up-container">
        <h2>Don't have an account ? </h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={formSubmitHandler}>
            <FormInput 
                label = "DisplayName"
                type = "text"
                required
                onChange = {handleChange}
                name="displayName"
                value = {displayName}
            />
            <FormInput 
                label = "Email"
                type = "email"
                required
                onChange = {handleChange}
                name="email"
                value = {email}
            />
            <FormInput 
                label = "Password"
                type = "password"
                required
                onChange = {handleChange}
                name="password"
                value = {password}
            />
            <FormInput 
                label = "Confirm Password"
                type = "password"
                required
                onChange = {handleChange}
                name="confirmPassword"
                value = {confirmPassword}
            />

            <Button type="submit">Sign Up</Button>
        </form>
    </div>
        
    </>
};

export default SignUpComponent;