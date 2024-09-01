import { useParams ,Link} from "react-router-dom"
import  { useState, useEffect ,useContext} from 'react';
import './ProductPage.css'
import facebook from'/assets/facebook.png'
import close from '/assets/close.png'
import remove from '/assets/remove.png'
import linkedin from'/assets/linkedin.png'
import twitter from'/assets/twitter.png'
import { CartContext} from "../../App";
import { FaStar } from 'react-icons/fa'
function ProductPage(){

  const[cartitems,setCartItems]=useState(false)
  const { addToCart}=useContext(CartContext)
  const {cart, totalPrice } = useContext(CartContext)
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity]= useState(0);
    const [subtotal, setSubtotal] = useState(0); 
  function Increment() {
    setQuantity(quantity + 1);
  }
  function Decrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }
  function handleClick(){ 
    if (quantity > 0) { 
    const products= {
      ...product,
      quantity: quantity,
     subtotal:subtotal
    };
    addToCart(products);
    setCartItems(true);}
  }
  const closeCart = () =>{
    setCartItems(false);
  }
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
          .then(res => res.json())
          .then(data => {setProduct(data)
            setSubtotal(data.price);
          })},[id])
          useEffect(() => {
            if (product) {
              setSubtotal(product.price * quantity);
            }
          }, [quantity, product]);
           
       const reviewsCount =  "5 Customer Review" 
       const {removeFromCart } = useContext(CartContext);
       const handleRemove = (id) => {
        removeFromCart(id);
      }; 
    return (
        <div id="product">
        <div id="headerproduct">
        <label >
            <Link to="/" className="lab3">Home</Link>
          </label>  &gt;
          <label >
            <Link to="/ShopPage" className="lab3">Shop</Link> &gt;
          </label>  |
        <h5 id="title">{product.title}</h5>
        </div>
          <div id="ProductDetails">
            <div id="image">
            <img src={product.image} className="imgproduct"/>
            </div>
         
         <div className="discription">
          <div className="dis">
          <h3>{product.title}</h3>
         <label className="lab">Rs. {product.price}</label>
         <div>
        <label> 
      <FaStar color="gold" size={17} />  
      <FaStar color="gold" size={17} />  
      <FaStar color="gold" size={17} />  
      <FaStar color="gold" size={17} />  
      <FaStar color="gold" size={17} />  </label>|
        <label> {reviewsCount}</label>
      </div>
         <p>{product.description}</p>
         <div id="button">
            <div className="counter">
              <button className="btn" onClick={Decrement}>
                -
              </button>
              <label id="count">{quantity}</label>
              <button className="btn" onClick={Increment}>
                +
              </button>
            </div>
            <button id="addtocart" onClick={handleClick}>Add  to Cart</button>
            </div>
          </div>
        
            <hr />
            <div id="info">
              <div id="category">
              <div id="cat">
              <label >Category</label>
              <label >:</label>
              </div>
              <label > {product.category}</label>
              </div>
              <div id="tags">
                <div id="tag">
                  <label >Tags</label>
                  <label >:</label>
                </div>
                <label >Home,shop</label>
              </div>
              <div id="social">
                <div id="share">
                <label>Share</label>
                <label >:</label>
                </div>
                
                <div id="socialmedia">
                <img src={facebook}/>
                <img src={linkedin}/>
                <img src={twitter} />
                </div>
               
              </div>
            </div>
         </div>
        
        
        </div>
        <hr />
        <div id="Description">
          <h3>Description</h3>  
          <p>{product.description}</p>
         
        </div>
        {cartitems==true&& <div id="cartitems" > 
         
       <div id="shoppingcart">
      
        <div id="shop">
        <img src={close} id="close" onClick={closeCart}/>
        <h3>Shopping Cart</h3>
        <hr />
        </div>
        
        <div id="cartWrapper">
        {cart.map((item)=>(
        <div className="cartProducts" key={item.id}>
        <img src={item.image} className='imgcarts'/>
        
        <div className="cartlabels">
        <label>{item.title} </label>
        <div className="cartprice">
        <label >{item.quantity}</label>x
        <label className="Price">Rs. {item.price}</label>
        </div>
       
        </div>
       <img src={remove} id="remove" onClick={() => handleRemove(item.id)}/>
        </div>))}
        </div>
        
       <div id="Subtotal">
        <label>Subtotal</label>
        <label className="Price">Rs. {totalPrice.toFixed(2)}</label>
       </div>
       <hr />
       <div id="bottomcart">
       <Link to="/Cart">
       <button id="btncart">cart</button>
       </Link> 
       </div>
       
       </div>
         
      
          </div>}
        </div>
       
    )
}
export default ProductPage