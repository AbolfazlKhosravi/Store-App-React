import { useAuth, useAuthActions } from "../../../provider/AuthProvider";
import user from "../../../image/user.jpg";
import styles from "../profile.module.css";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
const EditInformation = () => {
  const userData = useAuth();
  const setUserData = useAuthActions();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    name: userData.name ? userData.name : "",
    email: userData.email ? userData.email : "",
    password: userData.password ? userData.password : "",
    address: userData.address ? userData.address : "",
  });
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    toast.success("Edited successfully");
    setUserData({
      ...userData,
      name: values.name,
      email: values.email,
      address: values.address,
      password: values.password,
    });
  };

  return (
    <section className={styles.information}>
      <h1>EDIT INFOEMATION</h1>
      <div className={styles.selectImg}>
        <div className={styles.userImgControl}>
          <img src={user} alt="user" className={styles.userImg} />
        </div>
        <input type="file" id="img" hidden  />
        <label htmlFor="img">select an image</label>
      </div>

      <div className={styles.userData}>
        <h2>CHANGE INFORMATION</h2>
        <form onSubmit={submitForm}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={values.name}
              onChange={changeHandler}
              name="name"
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="text"
              value={values.email}
              onChange={changeHandler}
              name="email"
            />
          </div>
          <div>
            <label>password</label>
            <input
              type={show ? "text" : "password"}
              value={values.password}
              onChange={changeHandler}
              name="password"
            />
            {show ? (
              <FiEye onClick={() => setShow(false)} className="eye" />
            ) : (
              <FiEyeOff onClick={() => setShow(true)} className="eye" />
            )}
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={values.address}
              onChange={changeHandler}
              name="address"
            />
          </div>
          <button type="submit" className={styles.Edite}>
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditInformation;
