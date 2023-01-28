import { NavLink } from "react-router-dom";
import Layout from "../../layout/layout";
import { useAuth } from "../../provider/AuthProvider";
import { useCart } from "../../provider/provider";
import styles from "./checkOut.module.css"
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../provider/themeMode";
const CheckOut = () => {
    const userData=useAuth();
    const cartData=useCart();
    const navigate=useNavigate()
    const theme=useTheme()
    return ( 
        <Layout>
           {cartData.cart.length? 
           <section className={styles.checkoutControl} id={styles[theme]}>
                <section className={styles.checkout}>
                   <div className={styles.checkoutProducts}>
                    {cartData.cart.map(product=>{
                       return <div key={product.id} className={styles.checkoutProduct}>
                            <div>
                            <img src={product.image} alt={product.name}/>
                             <p>{product.name}</p>
                            </div>
                             <p>Price : $ {product.offPrice}</p>
                        </div>
                    })}
                   </div>
                   <div className={styles.checkoutPrice}>
                    <div>TOTAL:</div>
                    <div>$ {cartData.total}</div>
                   </div>
                   <div className={styles.checkoutUserControl}>
                    <div className={styles.checkoutUser}>
                        <div><h3>Name</h3> <div>{userData.name}</div></div>
                        <div><h3>E-mail</h3> <div>{userData.email}</div></div>
                        <div><h3>Address</h3> <div>{userData.address}</div></div>
                    </div>
                    <h2 onClick={()=>navigate("/profile/edit-Information")}>go to Edit</h2>
                   </div>
                    <button className={styles.order}>Order</button>
                </section>
            </section>:<NavLink className={styles.navlink} to="/">GO TO SHOPING</NavLink>}
        </Layout>
     );
}
export default CheckOut;