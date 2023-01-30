import { json, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../provider/provider";
import styles from "./navigation.module.css";
import { useAuth } from "../../provider/AuthProvider";
import { FaCartPlus, FaUserAlt, FaRegTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme, useThemeActions } from "../../provider/themeMode";
import { useEffect, useState, useTransition } from "react";
import { FaSearch } from "react-icons/fa";

const Navigation = ({ setIsShow, isShow }) => {
  const Auth = useAuth();
  const { cart } = useCart();
  const theme = useTheme();
  const setTheme = useThemeActions();
  const [inputValue,setInputValue]=useState("");
  const [searchValue,setSerchValue]=useState("")
  const navigate=useNavigate();
 
  useEffect(()=>{
   const value= JSON.parse(localStorage.getItem("valueSerch"))||"";
   setInputValue(value)
  },[])
  useEffect(()=>{
      localStorage.setItem("valueSerch",JSON.stringify(inputValue))
      setSerchValue(inputValue.toLowerCase())
  },[inputValue])

  const handleKlick=(e)=>{
    if(e.code==="Enter"&&searchValue){
    navigate(`/${searchValue}`)
   }
  }
  const numbersCart=()=>{
    return cart.reduce((crr,acu)=>{
       return parseFloat(crr)+parseFloat(acu.quantity)
     },0)
   }
  return (
    <nav id={styles[theme]}>
      <div className={styles.searchControl}>
        <div>
         <input placeholder="serching for ..." type="text"  value={inputValue}  onChange={(e)=>setInputValue(e.target.value)} onKeyDown={handleKlick}  />
         <span className={styles.searchIcone}><FaSearch/></span>
        </div>
      </div>
      <ul>
        <li>
          <div>
            {theme === "light" ? (
              <FiMoon onClick={() => setTheme("dark")} className={styles.moon} />
            ) : (
              <FiSun onClick={() => setTheme("light")} className={styles.sun}/>
            )}
          </div>
        </li>
        <li>
          <div className={styles.cart}>
           {cart.length? <span className={styles.span}>{cart.length?numbersCart():0}</span>:""}
            <NavLink
              to="/cart"
              className={(activ) => (activ.isActive ? styles.active : "")}
            >
              <FaCartPlus style={{ fontSize: "2.5rem" }} className={styles.cartIcone} />
            </NavLink>
          </div>
        </li>
        <li>
          <NavLink
            to={Auth ? "/profile" : "/login"}
            className={(activ) => (activ.isActive ? styles.active : "")}
          >
            {Auth ? <FaUserAlt style={{ fontSize: "2.3rem" }} /> : "Login"}
          </NavLink>
        </li>
        <li>
          <button className={styles.btn} onClick={() => setIsShow(!isShow)}>
            {isShow ? (
              <FaRegTimesCircle className={styles.Circle} />
            ) : (
              <GiHamburgerMenu className={styles.hamburger} />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
