import styles from "./footer.module.css"
import App from "../../asits/images/App.png";
import { FaTwitter,FaFacebookF,FaInstagram,FaTiktok,FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../provider/themeMode";
const Footer = () => {
    const theme=useTheme()
    return ( 
           <footer className={styles.footer} id={styles[theme]}>
            <div className={styles.footerHeader}>
                <p className={styles.textFooter}>Life is a journey. Make the best of it</p>  
                <div className={`${styles.brand} ${styles.bfooter}`}><span>navigation</span></div>
                <NavLink to="/about-us" className={(a)=>a.isActive?"":styles.aboutUs}>about us</NavLink>
            </div>
            <div className={styles.Contactus}>
                 <div className={styles.getApp}>
                    <p>GET OUR APP</p>
                    <a href="# "><img src={App} alt=""/></a>
                 </div>
                <div className={styles.icons}>
                   <a href="# "><FaTwitter className={styles.icon}/></a>
                   <a href="# "><FaFacebookF className={styles.icon}/></a>
                   <a href="# "><FaInstagram className={styles.icon}/></a>
                   <a href="# "><FaTiktok className={styles.icon}/></a>
                   <a href="# "><FaYoutube className={styles.icon}/></a> 
                </div>
                <p className={styles.verson}>KHA 1.0.0</p>
            </div>
        </footer>
     );
}

export default Footer;