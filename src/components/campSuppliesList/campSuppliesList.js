import CampSuppliesFilter from "../common/campSuppliesFilter";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCart, useCartActions } from "../../provider/provider";
import { addToCart } from "../../utils/addToCart";
import styles from "./campSuppliesList.module.css";
import { useTheme } from "../../provider/themeMode";
import { products } from "../../data";
const slicePricucts = products.campSupplies.slice(0, 6);
const CampSuppliesList = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const dispatch = useCartActions();
  const [filteredProducts, setFilteredProducts] = useState(slicePricucts);
  const theme = useTheme();
  useEffect(() => {
    setFilteredProducts(slicePricucts);
  }, []);
  const addToCartHandlr = (e, product) => {
    e.stopPropagation();
    toast.success(`${product.name} Add To Cart `);
    dispatch({
      type: "Add_to_Cart",
      payload: {
        ...product,
        selectRadio: product.colors[0],
      },
    });
  };

  return (
    <section className={styles.products} id={styles[theme]}>
      <div className={styles.productControlTitle}>
        <h2 className={styles.titleProduct}>Camp Supplies</h2>
        <CampSuppliesFilter
          styles={styles}
          slicePricucts={slicePricucts}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
      <article className={styles.productControl}>
        <div className={styles.controlP}>
          {filteredProducts.length
            ? filteredProducts.map((product) => (
                <section
                  onClick={() =>
                    navigate(`/products/campSupplies/${product.id}`)
                  }
                  className={styles.product}
                  key={product.id}
                >
                  <div className={styles.productsImg}>
                    <img src={product.image} />
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
                    {addToCart(cart, product) ? (
                      <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        1
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
            : ""}
          <section
            className={styles.moreProduct}
            onClick={() => navigate("/campSupplies")}
          >
            <h2>more product </h2>
          </section>
        </div>
      </article>
    </section>
  );
};
export default CampSuppliesList;
