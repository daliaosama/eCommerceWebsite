import "./HomePage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [category, setCategory] = useState([]);

  const categoryImages = {
    electronics: '/assets/electronics.webp',
    jewelery: '/assets/jewelery.jpg',
    "men's clothing": '/assets/men.webp',
    "women's clothing": '/assets/women.webp',
  };
  useEffect(() => {
    function callApi() {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((final) => setCategory(final));
    }

    callApi();
  }, []);
  

  return (
    <div id="homepage">
    <div id="home"></div>
     
     
   
    <div id="Categories">
      <h1>Categories</h1>
      <div id="categoriestypes">
        {category.map((category) => (
           <Link to={`/ShopPage/${category}`} key={category}>
          <div  className="category">
            <img src={categoryImages[category]} className="imgcategory"/>
            <h6>{category}</h6>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
    
  );
}
export default HomePage;
