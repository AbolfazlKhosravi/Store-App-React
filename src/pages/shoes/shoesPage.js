import Layout from "../../layout/layout";
import { products } from "../../data";
import styles from "./shoesPage.module.css";
import { useNavigate } from "react-router-dom";
import { checkInCart } from "../../utils/checkInCart"; 
import { toast } from "react-hot-toast";
import { useCart, useCartActions } from "../../provider/provider";
import { FaPlusCircle } from "react-icons/fa";
import ShoesFilter from "../../components/common/ShoesFilter";
import { useState } from "react";
import { useTheme } from "../../provider/themeMode";
const ShoesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [filteredProducts, setFilteredProducts] = useState(products.shoes);
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addToCartHandlr = (e, product) => {
    e.stopPropagation();
    toast.success(`${product.name} Add To Cart `);
    dispatch({
      type: "Add_to_Cart",
      payload: {
        ...product,
        selectRadio: product.colors[0],
        selectedOption: product.size[0],
      },
    });
  };
  return (
    <Layout>
      <main id={styles[theme]}>
        <section className={styles.shoesPage}>
          <div className={styles.filterShowses}>
            <h2>Filter Products</h2>
            <ShoesFilter setFilteredProducts={setFilteredProducts} />
          </div>
          <div className={styles.controlP}>
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <section
                  onClick={() => navigate(`/products/shoes/${product.id}`)}
                  className={styles.product}
                  key={product.id}
                >
                  <div className={styles.productsImg}>
                    <img src={product.image} alt={product.image}/>
                  </div>
                  <div className={styles.productDes}>
                    <p>{product.name}</p>
                    {product.price > product.offPrice ? (
                      <div className={styles.offPrice}>
                        <span>${product.offPrice}</span>
                        <p>${product.price}</p>
                      </div>
                    ) : (
                      <p>$ {product.price}</p>
                    )}
                    {checkInCart(cart, product) ? (
                      <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        {checkInCart(cart, product).quantity}
                      </button>
                    ) : (
                      <button
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={(e) => addToCartHandlr(e, product)}
                      >
                        <FaPlusCircle />
                      </button>
                    )}
                    {product.price > product.offPrice && (
                      <span className={styles.discount}>
                        {product.discount}
                      </span>
                    )}
                  </div>
                </section>
              ))
            ) : (
              <h3>no find any product</h3>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ShoesPage;
