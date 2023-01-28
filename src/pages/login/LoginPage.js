import "./login.css"
import LoginForm from "../../components/LoginForm/LoginForm";
import { useTheme } from "../../provider/themeMode";
const Login = () => {
   const theme=useTheme()
    return ( 
        <main className="LoginUpPage" id={theme}>
           <LoginForm/>
        </main>
     );
}


export default Login;