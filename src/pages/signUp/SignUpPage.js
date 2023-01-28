import SignUpForm from "../../components/signup/SignUpForm";
import "./signUp.css"
import { useTheme } from "../../provider/themeMode";
const SignUp = () => {
   const theme=useTheme()
    return ( 
        <main className="SignUpPage" id={theme}>
           <SignUpForm/>
        </main>
     );
}


export default SignUp;