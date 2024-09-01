import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPage from './Pages/LayoutPage/LayoutPage';
import HomePage from './Pages/HomePage/HomePage';
import ShopPage from './Pages/ShopPage/ShopPage';
import Contact from './Pages/Contact/Contact';
import ProductPage from './Pages/productPage/ProductPage';
import Cart from './Pages/Cart/Cart';
import{createContext,useState, useMemo } from'react'
export const CartContext  = createContext();
function App() {
  const [cart, setCart] = useState([]);
    
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity,subtotal:item.subtotal+product.subtotal }
            : item
        )
      );
    } else {
      
      setCart([...cart, product]);
    }
    };
    const removeFromCart = (id) => {
      setCart((prevItems) => prevItems.filter(item => item.id !== id));
    };
    const totalPrice = useMemo(() => {
      return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);
  return (
 
<CartContext.Provider value={{cart, addToCart,removeFromCart, totalPrice }}>
 <BrowserRouter>
      <Routes>
      <Route path="/" element={<LayoutPage/>}>
      <Route index element={<HomePage/>} ></Route>
      <Route path="/ShopPage" element={<ShopPage/>} ></Route>
      <Route path="/shopPage/:category" element={<ShopPage />}></Route>
      <Route path="/ProductPage/:id" element={<ProductPage/>}></Route>
      <Route path="/Contact" element={<Contact/>} ></Route>
      <Route path="/Cart" element={<Cart/>} ></Route>
       </Route>
      </Routes>
      
      </BrowserRouter>
 </CartContext.Provider>
      
 
 
  
    
  )
}

export default App
