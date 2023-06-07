import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const Layout = ({ children }) => {
  return (
    <>
      <div className="layouy">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
