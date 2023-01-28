// import "loginform.css";
import bg from "../../image/login.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import LoginUser from "../../services/loginService";
import {
  FaLinkedin,
  FaGooglePlusSquare,
  FaFacebookSquare,
} from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth, useAuthActions } from "../../provider/AuthProvider";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./loginform.module.css";
import { useTheme } from "../../provider/themeMode";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().required("email is requared").email("invaled is false"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short "),
});

const LoginForm = () => {
  const setAuth = useAuthActions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [show, setShow] = useState(false);
  const auth = useAuth();
  const theme = useTheme();
  useEffect(() => {
    if (auth) navigate(redirect);
  }, [auth, redirect]);
  console.log(redirect);
  const onSubmit = (values) => {
    LoginUser(values)
      .then((res) => {
        setAuth(res.data);
        toast.success(`you login`);
        navigate(redirect);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };
  const style = { color: "#444", fontSize: "2em", margin: " 1rem" };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className={styles.controlSignUpPage} id={styles[theme]}>
      <section className={styles.bgcSaignUp}>
        <img src={bg} alt="bg1" />
      </section>
      <section className={styles.formSignUp}>
        <FiHome className={styles.Home} onClick={() => navigate("/")} />
        <section className={styles.formControl}>
          <div>
            <h2>Login Account</h2>
            <div>
              <FaFacebookSquare style={style} />
              <FaGooglePlusSquare style={style} />
              <FaLinkedin style={style} />
            </div>
            <p className={styles.textLogin}>
              or use your email for registration
            </p>
          </div>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputControl}>
              {formik.errors.email && formik.touched.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
              <input
                type="email"
                placeholder="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
            </div>
            <div className={styles.inputControl}>
              {formik.errors.password && formik.touched.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              {show ? (
                <FiEye onClick={() => setShow(false)} className={styles.eye} />
              ) : (
                <FiEyeOff
                  onClick={() => setShow(true)}
                  className={styles.eye}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid}
              className={styles.btnSign}
            >
              Login UP
            </button>
          </form>
        </section>
        <div
          className={styles.loginSign}
          onClick={() => navigate(`/sign-up?redirect=${redirect}`)}
        >
          <p>Not Signup yet?</p>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
