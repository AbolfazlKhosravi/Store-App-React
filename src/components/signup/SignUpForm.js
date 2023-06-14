import bg from "../../image/bg4.png";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FaLinkedin,FaGooglePlusSquare,FaFacebookSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import signUpUser from "../../services/signUpUser";
import { useAuth, useAuthActions } from "../../provider/AuthProvider";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FiEye,FiEyeOff  } from "react-icons/fi";
import styles from "./SignUpForm.module.css";
import { useTheme } from "../../provider/themeMode";
const initialValues={
  name:"",
  email:"",
  password:"",
}
const validationSchema=Yup.object({
  name:Yup.string().min(3,'name is short').required("name is requared"),
  email:Yup.string().required("email is requared").email("invaled is false"),
  password: Yup.string()
  .required('is requared') 
})

const SignUpForm = () => {
  const setAuth= useAuthActions()
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const redirect=searchParams.get("redirect")|| "/";
  const auth=useAuth();
  const [show,setShow]=useState(false);
  const theme = useTheme();
  useEffect(()=>{
    if(auth) navigate(redirect)
  },[auth,redirect,navigate])
  const onSubmit=(values)=>{
    signUpUser(values).then((res)=>{
      setAuth({...res.data,password:values.password})
      toast.success(`${res.data.name}, you have successfully registered)`);
      navigate(redirect)
    }).catch((error)=>{
      if(error.response){
        toast.error(error.response.data.message)
      }
    })
  }
    const style = { color:"#444", fontSize: "2em" ,margin:"1rem"};
    const formik=useFormik({
      initialValues,
      onSubmit,
      validationSchema,
      validateOnMount:true
    })
    return ( 
        <div className={styles.controlSignUpPage} id={styles[theme]}>
        <section className={styles.bgcSaignUp}><img src={bg} alt="bg1"/></section>
        <section className={styles.formSignUp}>
          <FiHome className={styles.Home} onClick={()=>navigate("/")} />
          <section className={styles.formControl}>
           <div>
           <h2>Create Account</h2>
           <div >
              <FaFacebookSquare  style={style}/>
              <FaGooglePlusSquare  style={style}/>
              <FaLinkedin  style={style}/>  
           </div>
           <p>or use your email for registration</p>
           </div>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
           <div className={styles.inputControl}>
           {formik.errors.name&&formik.touched.name&&<span className={styles.error}>{formik.errors.name}</span>}
           <input type="text" placeholder="name" name="name" {...formik.getFieldProps('name')} />
           </div>
           <div className={styles.inputControl}>
             {formik.errors.email&&formik.touched.email&&<span className={styles.error}>{formik.errors.email}</span>}
            <input type="email" placeholder="email" name="email" {...formik.getFieldProps('email')} />
           </div>
           <div className={styles.inputControl}>
             {formik.errors.password&&formik.touched.password&&<span className={styles.error}>{formik.errors.password}</span>}
            <input type={show?"text":"password"} placeholder="password" name="password" {...formik.getFieldProps('password')}/>
            {show?<FiEye onClick={()=>setShow(false)} className={styles.eye}/>:<FiEyeOff onClick={()=>setShow(true)} className={styles.eye}/>}
           </div>
           <button type="submit" disabled={!formik.isValid} className={styles.btnSign} >SIGN UP</button>
          </form>
          </section>
          <div className={styles.loginSign}  onClick={()=>navigate(`/login?redirect=${redirect}`)}>
            <p>Already Login ?</p>   
          </div>
        </section>
         </div>
     );
}

export default SignUpForm;