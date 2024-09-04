import{ useContext } from 'react'
import './Cart.css'
import deleteimg from '/assets/delete.png'
import logo from "/assets/logo.png";
import { CartContext } from "../../App";
import { Link } from "react-router-dom";
function Cart(){
    const {cart, totalPrice } = useContext(CartContext)
    const {  removeFromCart } = useContext(CartContext);
     const handleRemove = (id) => {
      removeFromCart(id);
    }; 
    const pathnames = location.pathname.split("/").filter((x) => x); 
    return (
    <div id="cartpage">
      <div id="cartheader">
      <img src={logo} />
        <h1>Cart</h1>
        <div className="link">
          <label>
            <Link to="/" className="lab1">Home</Link>
          </label>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <label key={to} style={{ display: "flex", alignItems: "center" }} >
                <span style={{ margin: "0 10px",fontWeight:"bold" }}>
                  &gt;
                </span>
                <Link to={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              </label>
            );
          })}
        </div>
      </div>
      
       <div id="cart" >
      <div id="cartproducts">
        <div id="top">
        <h4>Product</h4>
        <h4>Price</h4>
        <h4>Quantity</h4>
        <h4>Subtotal</h4>
        </div>
        {cart.map((item) => (
        <div className="cartdetails" key={item.id}>
          <div className="productname">
          <img src={item.image} className='imgcart'/>
          <label className="label">
            {item.title} </label>
          </div>
         <div className="price"> 
          <label className='label'>Rs. {item.price}</label>
          </div>
         
        <div className="quantity">
          <label >{item.quantity}</label>
        </div>  
        <div className="cost">
        <label >Rs. {item.subtotal?.toFixed(2)}</label>
        <img src={deleteimg} id="del" onClick={() => handleRemove(item.id)}/>
        </div>
          
        </div>
      ))}
     </div>
    
     <div id="carttotal" >
      
      <h2>Cart Totals</h2>
      {cart.map((item) => (  
      <div key={item.id} id="subtotal" >
        <h4>Subtotal</h4>
        <label>Rs. {item.subtotal?.toFixed(2)}</label>
      </div>))}
      <div id="total"  >
        <h4>Total</h4>
    
      <label id="Total">RS. {totalPrice.toFixed(2)}</label>
     
      </div>
      <button id='checkout'>Check Out</button>
     </div>
      </div>
    
    
    </div>)
}
export default Cart