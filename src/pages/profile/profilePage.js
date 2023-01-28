import { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Layout from "../../layout/layout";
import { useAuth } from "../../provider/AuthProvider";
import EditInformation from "./editInformation/editInformation";
import Information from "./Information/information";
import styles from "./profile.module.css";
import { FaInfoCircle, FaUserEdit } from "react-icons/fa";
import { useTheme } from "../../provider/themeMode";
const ProfilePage = () => {
  const dataUser = useAuth();
  const navigate = useNavigate();
  const userData = useAuth();
  const theme=useTheme()
  console.log(userData);
  if (!userData)
    return (
      <Layout>
        <h1 className={styles.pleaseLogin}>please login</h1>
      </Layout>
    );
  return (
    <Layout>
      <section className={styles.profileControl} id={styles[theme]}>
        <section className={styles.userControl}>
          <section className={styles.profile}>
            <div>
              <NavLink
                to=""
              >
                <FaInfoCircle className={styles.icon} /> INFORMATION
              </NavLink>
            </div>
            <div>
              <NavLink
                to="edit-Information"
              >
                <FaUserEdit className={styles.icon} /> EDIT INFORMATION
              </NavLink>
            </div>
          </section>
          {
            <Routes>
              <Route path="" element={<Information />} />
              <Route path="edit-information" element={<EditInformation />} />
            </Routes>
          }
        </section>
      </section>
    </Layout>
  );
};

export default ProfilePage;
