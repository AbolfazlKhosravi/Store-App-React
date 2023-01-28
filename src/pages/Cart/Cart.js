import { useCart, useCartActions } from "../../provider/provider";
import { useEffect } from "react";
import { FaAngleUp, FaAngleDown, FaTrashAlt } from "react-icons/fa";
import styles from "./Cart.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";
import { BsFillBagCheckFill } from "react-icons/bs";
import emptyCart from "../../image/empty-cart.svg";
import { useTheme } from "../../provider/themeMode";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  const theme=useTheme()
  const incrementHanlder = (item) => {
    dispatch({ type: "Add_to_Cart", payload: item });
  };
  const decrementHandler = (item) => {
    dispatch({ type: "DECREMENT_Cart", payload: item });
  };
  const original = cart.reduce((acu, curr) => {
    return acu + curr.quantity * curr.price;
  }, 0);
  if (!cart.length) {
    return (
      <Layout>
        <div className={styles.emptyCart}>
         <div>
          <img src={emptyCart} alt="em"/>
          <h2>this is no product in the cart</h2>
          <NavLink to="/">Go To Shopung</NavLink></div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <main id={styles[theme]}>
        <section className={styles.container}>
          <section className={styles.controlCart}>
            <section className={styles.cartItemsList}>
              {cart.map((item) => (
                <div  className={styles.itemControl} key={item.id}>
                  <div className={styles.itemDis}>
                    <div onClick={()=>navigate(`/products/shoes/${item.id}`)} className={styles.imgDis}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.textDis}>
                      <h2 style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
                        {item.name}
                      </h2>
                      <div>
                        <div className={styles.ControlColorProducts}>
                          <span
                            className={styles.colorProducts}
                            style={{ backgroundColor: item.selectRadio }}
                          ></span>
                          <p>{item.selectRadio}</p>
                        </div>
                        <div className={styles.ControlWarrantyProducts}><div><BsFillBagCheckFill/></div> <p>{item.description[0].Warranty}</p></div>
                        {item.selectedOption? <p>Size : {item.selectedOption}</p>:""}
                      </div>
                      <div className={styles.ControlPriceProducts}>
                        <p>price : {item.offPrice * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemValueControl}>
                      
                    <button
                      className={styles.btn}
                      onClick={() => decrementHandler(item)}
                    >
                      {item.quantity===1?<div><FaTrashAlt /></div>:<p>-</p>}
                    </button>
                     <span className={styles.quantitly}>{item.quantity}</span>
                    <button
                      className={styles.increment}
                      onClick={() => incrementHanlder(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </section>
            <section className={styles.cartSummery}>
              <div className={styles.cartSummerySecondry}>
                <div className={styles.price}>
                  <h3>original price</h3> <div>$ {original}</div>
                </div>
                <div className={styles.discount}>
                  <h3>Discount</h3> <div>$ {original - total}</div>
                </div>
              </div>
              <div>
                <div className={styles.total}>
                  <h2>net parice</h2> <div>$ {total}</div>
                </div>
                <button
                  className={styles.Continue}
                  onClick={() => navigate("/sign-up?redirect=/check-out")}
                >
                  Continue the order
                </button>
              </div>
            </section>
          </section>
        </section>
        <section className={styles.mobileDesign}>
          <div>
            <h2>Net Price</h2>
            <h3>$ {total}</h3>
          </div>
          <button onClick={() => navigate("/sign-up?redirect=/check-out")}>Go To Checkount</button>
        </section>
      </main>
    </Layout>
  );
};

export default Cart;
