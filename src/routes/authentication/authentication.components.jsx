import "./authentication.styles.scss";
import SignInComponent from "../../components/signIn/signIn.component";
import SignUpComponent from "../../components/signUp/signUp.component";
const Authentication = () => {
    return <>
    <div className="authentication-container">
        <SignInComponent />
        <SignUpComponent />
    </div>
    </>
};

export default Authentication;