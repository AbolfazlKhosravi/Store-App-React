import AboutUs from "./pages/aboutUs/AboutUs";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/checkout/checkOut";
import Hoom from "./pages/Home/Hoom";
import Login from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/profilePage";
import SignUp from "./pages/signUp/SignUpPage";
import ShoeProduct from "./pages/product/shoeProduct";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import ShoesPage from "./pages/shoes/shoesPage";
import CampSuppliesProduct from "./pages/product/campSuppliesProduct";
import CampSuppliesPage from "./pages/CampSupplies/campSuppliesPage";
const routes=[
  {path:"/" ,element:<Hoom/>},
  {path:"/home" ,element:<Hoom/>},
  {path:"/cart" ,element:<Cart/>},
  {path:"/about-us" ,element:<AboutUs/>},
  {path:"/check-out" ,element:<CheckOut/>},
  {path:"/sign-up" ,element:<SignUp/>},
  {path:"/login" ,element:<Login/>},
  {path:"/profile/*" ,element:<ProfilePage/>},
  {path:"/products/shoes/:id" ,element:<ShoeProduct/>},
  {path:"/products/campSupplies/:id" ,element:<CampSuppliesProduct/>},
  {path:"/shoes" ,element:<ShoesPage/>},
  {path:"/shoe" ,element:<ShoesPage/>},
  {path:"/campSupplies" ,element:<CampSuppliesPage/>},
  {path:"*", element:<NotFoundPage/>},
]
export default routes;