import { Link } from "react-router-dom";
import Layout from "../../layout/layout";
import notFound from "../../image/page-not-found.png";
import styles from "./notFoundPage.module.css";
import { useTheme } from "../../provider/themeMode";
const NotFoundPage = () => {
  const theme=useTheme()
    return ( 
       <Layout>
         <div className={styles.notFoundControl} id={styles[theme]}>
            <div className={styles.notFound}>
             <p>The page you were looking for was not found! </p>
             <Link to="/">go home</Link>
             <img src={notFound} alt="page-not-found"/>
            </div>
        </div>
       </Layout>
     );
}
 
export default NotFoundPage;