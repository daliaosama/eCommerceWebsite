import "./ShopPage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import logo from "/assets/logo.png";
function ShopPage() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(16);
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth <= 801) {
        setProductsPerPage(8);
      } else {
        setProductsPerPage(16);
      }
    };
    updateProductsPerPage();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pathnames = location.pathname.split("/").filter((x) => x);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((final) => {
        setProducts(final);
        if (category) {
          const filtered = final.filter(
            (product) => product.category === category
          );
          setProducts(filtered);
        } else {
          setProducts(final);
        }
      });
  }, [category, products]);
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1,
      subtotal: product.price,
    };

    addToCart(productToAdd);
  };

  return (
    <div id="shoppage">
      <div id="shopheader">
        <img src={logo} />
        <h1>Shop</h1>
        <div className="link">
          <label className="lab1">
            <Link to="/">Home</Link>
          </label>
          {pathnames.map((value, index) => {
            const decodedValue = decodeURIComponent(value);
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <label key={to} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                  &gt;
                </span>
                <Link to={to}>
                  {value.charAt(0).toUpperCase() + decodedValue.slice(1)}
                </Link>
              </label>
            );
          })}
        </div>
      </div>
      <div id="products">
        {currentProducts.map((product) => (
          <Link to={`/ProductPage/${product.id}`} key={product.id}>
            <div className="product">
              <img src={product.image} className="image" />

              <div className="Productprice">
                <h5 id="Title">{product.title}</h5>
                <label className="lab1">Rp {product.price?.toFixed(2)}</label>
              </div>

              <div className="hover">
                <Link to="/Cart">
                  <button
                    className="add"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          id="next"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default ShopPage;
