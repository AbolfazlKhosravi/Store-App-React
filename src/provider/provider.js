import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";
const CartContext = createContext(null);
const CartContextDispath = createContext(null);

let initialCart = {
  cart: [],
  total: 0,
};

initialCart = JSON.parse(localStorage.getItem("cart")) || initialCart;
const Provider = ({ children }) => {
  console.log(initialCart);
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={cart}>
      <CartContextDispath.Provider value={dispatch}>
        {children}
      </CartContextDispath.Provider>
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
export const useCartActions = () => useContext(CartContextDispath);
export default Provider;
