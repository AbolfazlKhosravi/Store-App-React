import Layout from "../../layout/layout";
import { Link, NavLink, useParams } from "react-router-dom";
import { products } from "../../data";
import styles from "./shoeProduct.module.css";
import {
  FaShopify,
  FaClipboardCheck,
  FaThumbsUp,
  FaCheck,
  FaUserAlt,
} from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { checkInCart } from "../../utils/checkInCart"; 
import { useCart, useCartActions } from "../../provider/provider";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { toast } from "react-hot-toast";
import { useTheme } from "../../provider/themeMode";
import { useAuth } from "../../provider/AuthProvider";
const ShoesProduct = () => {
  const { cart } = useCart();
  const params = useParams();
  const product = products.shoes.find((p) => p.id == params.id);
  const newproduct = checkInCart(cart, product);
  const [selectRadio, setSelectRadio] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const theme = useTheme();
  const dispatch = useCartActions();
  const [comments,setComments]=useState(product.comments)
  const [comment,setComment]=useState({scor:"",text:""});
  const [local,setTolocal]=useState(false)
  const user=useAuth();
  
  const commentHandler =(e)=>{
    setComment({...comment,[e.target.name]:e.target.value})
  }
  const submitHnadler=(e)=>{
   e.preventDefault();
   if(!user){
   return toast.error("please login or sign up")
   }
   setTolocal(true)
   const newCommet={...comment,name:user.name,id:Date.now(),date:new Date().toDateString()}
   setComments([...comments,newCommet])
   setComment({scor:"",text:""})
  }
  const inCrementHandler = () => {
    toast.success(`${product.name} Add To Cart `);
    dispatch({
      type: "Add_to_Cart",
      payload: {
        ...product,
        selectRadio: selectRadio || product.colors[0],
        selectedOption: selectedOption || product.size[0],
      },
    });
  };
  useEffect(()=>{
  const values=  JSON.parse(localStorage.getItem(`comment${product.name}${product.id}`))||product.comments;
  setComments(values)
  },[])
  useEffect(()=>{
    if(local){
      localStorage.setItem(`comment${product.name}${product.id}`,JSON.stringify(comments))
    }
  },[comments])

  return (
    <Layout>
      <section className={styles.product} id={styles[theme]}>
        <div className={styles.productControl}>
          <div className={styles.productImg}>
            <img src={product.image} />
          </div>
          <div className={styles.productDes}>
            <h2>{product.name}</h2>
            <div>
              <span>
                <FaThumbsUp />
              </span>{" "}
              %{product.satisfaction} of buyers like this product
            </div>
            <h4>
              {" "}
              color is :
              {selectRadio ? (
                <span
                  style={{
                    color: selectRadio,
                    fontSize: "1.4rem",
                    marginLeft: ".5rem",
                  }}
                >
                  {" "}
                  {selectRadio}
                </span>
              ) : newproduct ? (
                <span
                  style={{
                    color: newproduct ? newproduct.selectRadio : selectRadio,
                    fontSize: "1.4rem",
                    marginLeft: ".5rem",
                  }}
                >
                  {" "}
                  {newproduct.selectRadio}
                </span>
              ) : (
                <p style={{ marginLeft: ".5rem" }}>no selected</p>
              )}
            </h4>
            <section
              onChange={(e) => setSelectRadio(e.target.value)}
              className={styles.selectColor}
            >
              {product.colors.map((c) => (
                <React.Fragment key={c}>
                  <input
                    disabled={newproduct}
                    type="radio"
                    name="color"
                    id={c}
                    value={c}
                    hidden
                  />
                  <label style={{ backgroundColor: c }} htmlFor={c}>
                    {newproduct
                      ? newproduct.selectRadio == c && <FaCheck />
                      : selectRadio == c && <FaCheck />}
                  </label>
                </React.Fragment>
              ))}
            </section>
            <h4>
              {" "}
              Size is :{" "}
              {selectedOption ? (
                <span className={styles.sizeSelected}>{selectedOption}</span>
              ) : newproduct ? (
                <span className={styles.sizeSelected}>
                  {newproduct.selectedOption}
                </span>
              ) : (
                <p style={{ marginLeft: ".5rem" }}>no selected</p>
              )}
            </h4>
            <div></div>
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={newproduct}
            >
              <option value="">
                {newproduct ? newproduct.selectedOption : " please select"}
              </option>
              {product.size.map((s) => (
                <React.Fragment key={s}>
                  <option value={s}>{s}</option>
                </React.Fragment>
              ))}
            </select>
            <h4 className={styles.PropertyTitle}>Property</h4>
            <div className={styles.Property}>
              {product.Property.map((p) => (
                <div key={p.Property}>
                  <h5>{p.Property}</h5>
                  <p>{p.Description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.addToCart}>
          <h2>Seller</h2>
          <div className={styles.addToCartDes}>
            <div className={styles.satisfaction}>
              <div>
                <FaShopify />
              </div>
              <div>
                <h4>Shopimg</h4>
                <div>
                  <span>% {product.satisfaction}</span> Satisfaction | Function{" "}
                  {product.satisfaction > 90 ? (
                    <span>Excellent</span>
                  ) : product.satisfaction > 82 ? (
                    <span>Good</span>
                  ) : (
                    <span>medium</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>
                <BsFillBagCheckFill />
              </div>
              <h4>{product.description[0].Warranty}</h4>
            </div>
            <div className={styles.support}>
              <div>
                <FaClipboardCheck />
              </div>
              <div>
                <h4>Available in stock</h4>
                <div>{product.description[2].support}</div>
              </div>
            </div>
            <div className={styles.addToCartDesFooter}>
              {product.price > product.offPrice ? (
                <div>
                  <div>
                    <h4>${product.price}</h4>
                    <span>{product.discount}</span>
                  </div>
                  <h4>${product.offPrice}</h4>
                </div>
              ) : (
                <div>
                  <h4>${product.offPrice}</h4>
                </div>
              )}
              {checkInCart(cart, product) ? (
                <div className={styles.goTOCart}>
                  <p>in your cart</p>
                  <p>
                    View <Link to="/cart">Cart</Link>
                  </p>
                </div>
              ) : (
                <button onClick={inCrementHandler}>Add to Cart</button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.productComments} id={styles[theme]}>
        <h2>Comments</h2>
        {comments.map((p) => {
          return (
            <div key={p.id} className={styles.Comment}>
              <div>
                <div>
                  <span>
                    <FaUserAlt />
                  </span>
                  <div>
                    <p className={styles.commentName}>{p.name}</p>
                    <p className={styles.commentDate}>
                      {p.date}
                    </p>
                  </div>
                </div>
                <div className={styles.commentScore} style={{backgroundColor:p.scor>=4?"green":p.scor>=3?"orange":"red"}}  >{p.scor}</div>
              </div>
              <div className={styles.textComment}>{p.text}</div>
            </div>
          );
        })}
        <form onSubmit={submitHnadler} className={styles.SubmitComment}>
          <h3>Submit a comment</h3>
          <textarea placeholder="Enter your comment" value={comment.text} name="text" onChange={commentHandler} />
          <input placeholder="scor" type="number"   maxLength="1"   min="0" max="5" value={comment.scor} name="scor"  onChange={commentHandler}  />
          <button type="submit">Post  comment</button>
        </form>
      </section>
    </Layout>
  );
};

export default ShoesProduct;
