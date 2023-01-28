import { useAuth, useAuthActions } from "../../../provider/AuthProvider";
import user from "../../../image/user.jpg"
import styles from "../profile.module.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Information = () => {
    const userData=useAuth();
    const setUserData= useAuthActions();
    const navigate=useNavigate()
    const exiteHandler=()=>{
        setUserData(false);
        toast.success("exit")
        navigate("/")
    }
    return ( 
        <section className={styles.information}>
            <h1>INFOEMATION</h1>
            <div className={styles.userImgControl}>
                <img src={user} alt="user" className={styles.userImg}/>
            </div>
            <div className={styles.userData}>
                <h2>ACCOUNT INFORMATION</h2>
                <div>
                    <h4>First Name</h4>
                   <span><p>{userData.name}</p></span>
                </div>
                <div>
                    <h4>E-mail</h4>
                    <span><p>{userData.email}</p></span>
                </div>
            </div>
            <button onClick={exiteHandler}>Exite</button>
        </section>
     );
}
export default Information;