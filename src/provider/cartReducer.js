const cartReducer=(state,action)=>{
    switch (action.type) {
        case "Add_to_Cart":{ 
            const index=state.cart.findIndex(t=>parseInt(t.id)===parseInt(action.payload.id));
            if(index>=0){
                const product={...state.cart[index]}
                product.quantity++;
                const products=[...state.cart] ;
                products[index]=product;
                return {...state,cart:products,total:state.total+parseFloat(action.payload.offPrice)}
            }else{
              const updateCart=[...state.cart,{...action.payload,quantity:1}];
              return {...state,cart:updateCart,total:state.total+parseFloat(action.payload.offPrice)};
            }}
        case "DECREMENT_Cart":{
             const index=state.cart.findIndex(t=>t.id ===action.payload.id);
             const product={...state.cart[index]};
             if(product.quantity===1){
                const updateCart=state.cart.filter(item=>item.id!==action.payload.id);
                return {...state,cart:updateCart,total:state.total-parseFloat(action.payload.offPrice)}
             }
             product.quantity--;
             const products=[...state.cart];
             products[index]=product;
             return {...state,cart:products,total:state.total-parseFloat(action.payload.offPrice)}
        }    
        default:
            return state
    }
}
export default cartReducer;