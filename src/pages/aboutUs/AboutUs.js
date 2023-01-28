import { useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";
import styles from "./about.module.css"
import { useTheme } from "../../provider/themeMode";
const AboutUs = () => {
    const navigate=useNavigate();
    const theme=useTheme()
    return ( 
        <Layout>
            <div className={styles.aboutUs} id={styles[theme]}>
                <div className={styles.aboutUsHeader}>
                   <h1>ABOUT SHOPING</h1>
                </div>
                <div className={styles.aboutUsDesControl}>
                   <div className={styles.aboutUsDes}>
                    <section className={styles.aboutUsDesText}>
                        <h2>WHO WE ARE</h2>
                        <p>We're a sales performance agency. We've been helping businesses sell smarter and faster since 2012. We're proud HubSpot Diamondand RollWorks Partners, and we pride ourselves on using the best tools to help our clients succeed. Our team is made up of smart and talented people that are passionate about creating marketing and sales results!</p>
                    </section>
                    <section className={styles.aboutUsDesText}>
                        <h2>WE'RE DIFFERENT THAN THE REST</h2>
                        <p>We're rooted in sales. Our parent company, The Center for Sales Strategy (CSS), has been helping sales organizations turn talent into performance for almost 40 years. Unlike other marketing agencies, we're obsessed with ROI and we have the experience to deliver inbound sales results because we've done it ourselves...
                        We've been where you are. More than a decade ago, when we needed to grow and diversify how we generated new business at CSS, we turned to inbound marketing and found huge success after launching our sales strategy blog. Once we mastered the art of using thought leadership content for lead generation, we launched LeadG2 so we could help businesses do the exact same thing. </p>
                    </section>
                    <section className={styles.aboutUsDesBotton}>
                        <div>
                            <button>contact us</button>
                            <button  onClick={()=>navigate('/login')}>Login</button>
                        </div>
                    </section>
                   </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default AboutUs;