import Navigation from "../navigation/Navigation";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IconName,FaStoreAlt } from "react-icons/fa";
import { useTheme } from "../../provider/themeMode";
const Header = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const theme = useTheme();
  return (
    <header id={styles[theme]}>
      <section className={styles.headerControl}>
        <article className={styles.article}>
            <FaStoreAlt className={styles.iconWeb} onClick={()=>navigate("/")}/>
          <NavLink
            to="/"
            className={(activ) =>
              activ.isActive ? styles.active : styles.lickControl
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={(activ) =>
              activ.isActive ? styles.active : styles.lickControl
            }
          >
            About us
          </NavLink>
        </article>
        <Navigation setIsShow={setIsShow} isShow={isShow} />
      </section>
      {isShow ? (
        <section className={styles.headerScrol}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about-us">About us</NavLink>
        </section>
      ) : (
        <section className={styles.scrolControl}></section>
      )}
    </header>
  );
};

export default Header;
