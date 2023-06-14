import ShoesFilter from "../common/ShoesFilter";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCart, useCartActions } from "../../provider/provider";
import { checkInCart } from "../../utils/checkInCart";
import styles from "./shoesList.module.css";
import { useTheme } from "../../provider/themeMode";
import { products } from "../../data";
const slicePricucts = products.shoes.slice(0, 6);
const ShoesList = () => {
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
        selectedOption: product.size[0],
      },
    });
  };

  return (
    <section className={styles.products} id={styles[theme]}>
      <div className={styles.productControlTitle}>
        <h2 className={styles.titleProduct}>Shoes</h2>
        <ShoesFilter
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
                  onClick={() => navigate(`/products/shoes/${product.id}`)}
                  className={styles.product}
                  key={product.id}
                >
                  <div className={styles.productsImg}>
                    <img src={product.image}  alt={product.image}/>
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
            : ""}
          <section
            className={styles.moreProduct}
            onClick={() => navigate("/shoes")}
          >
            <h2>more product </h2>
          </section>
        </div>
      </article>
    </section>
  );
};
export default ShoesList;
