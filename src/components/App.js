import React, { useState } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import carticon from '../images/carticon.png';
import navName from '../images/navName.png'
import {
  About,
  Cart,
  Home,
  Login,
  NewProduct,
  Products,
  SingleProduct,
  Register,
  Account
} from "."

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [products, setProducts] = useState([]);
  
  return <> 
    <div className="App">
      <div className='header'>
        <img src={navName} className='mainLogo' alt ="logo"/>
      </div>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/"> Home </NavLink> 
          <NavLink to="/about"> About Us</NavLink> 
          <NavLink to="/products"> Products </NavLink> 
          {
            isLoggedIn?
            <>
                <NavLink to="/account"> Account </NavLink> 
                <NavLink to="/" onClick={() => {
                  setToken("")
                  setIsLoggedIn(false)
                  setCurrentUser(false)
                }}> Logout  </NavLink>
              </>
              :
              <> 
                <NavLink to="/login"> Login </NavLink> 
                <NavLink to="/register"> Register </NavLink> 
              </>
          }
          <NavLink to="/cart"><img src={carticon} alt="icon" className='cartIcon'></img> </NavLink> 
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/cart" element={<Cart />}/>
        {/* <Route path="/cartcheckout" exact element={<CartCheckout currentUser={currentUser} token={token} isLoggedIn={isLoggedIn}/>}/> */}
        <Route path="/login" exact element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/products" exact element={<Products currentUser= {currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" exact element={<SingleProduct currentUser={currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/register" exact element={<Register setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser= {currentUser} token={token} />}/>
        <Route path="/account" exact element={<Account currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        {/* <Route path="/orders/:orderId" exact element={<Cart currentUser={currentUser} />}/> */}
        <Route path="/newproduct" element={<NewProduct />}/>
      </Routes>
    </div>
  </>;
}

export default App;