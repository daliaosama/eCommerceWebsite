import { Link, Outlet } from "react-router-dom";
import "./LayoutPage.css";
import customer from "/assets/customer-support.png";
import Group from "/assets/Group.png";
import guarantee from "/assets/guarantee.png";
import Vector from "/assets/Vector.png";
import logo from "/assets/logo.png";
import cart from "/assets/cart.png";
function LayoutPage() {
  return (
    <main>
      <nav>
        <div id="logo">
          <img src={logo} className="Logo"/>
          <h6 id="furniro">Furniro</h6>
        </div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ShopPage">Shop</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
        <Link to="/Cart">
          <img src={cart} />
        </Link>
      </nav>

      <Outlet></Outlet>
      <div id="about">
        <div className="specifications">
          <img src={Group} className="img" />

          <div className="details">
            <h4>High Quality</h4>
            <label htmlFor="">crafted from top materials</label>
          </div>
        </div>
        <div className="specifications">
          <img src={guarantee} className="img" />
          <div className="details">
            <h4>Warranty Protection</h4>
            <label >Over 2 years</label>
          </div>
        </div>
        <div className="specifications">
          <img src={Vector} className="img" />
          <div className="details">
            <h4>Free Shipping</h4>
            <label>Order over 150 $</label>
          </div>
        </div>
        <div className="specifications">
       
          <img src={customer} className="img" />
          <div className="details">
            <h4>24 / 7 Support</h4>
            <label>Dedicated support</label>
          </div>
        </div>
      </div>
      <footer>
        <div id="bottom">
          <div id="aboutfurniro">
            <h2>Furniro.</h2>
            <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
          </div>
          <div id="links">
            <h5>Links</h5>
            <ul id="linksbottom">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ShopPage">Shop</Link>
              </li>
              <li>About</li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div id="help">
            <h5>Help</h5>
            <ul id="Help">
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
          <div id="Newsletter">
            <h5>Newsletter</h5>
            <div id="news">
            <input
              type="email"
              name="mail"
              id="emailsubscribe"
              placeholder="Enter Your Email Address"
            />
            <button id="subscribe">Subscribe</button>
            </div>
            
          </div>
        </div>
        <hr />
        <div id="copyrights">
          <label>2023 furino. All rights reverved</label>
        </div>
      </footer>
    </main>
  );
}
export default LayoutPage;
