import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Account.css";

const Account = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [allOrdersActive, setAllOrdersActive] = useState(false)
  const [orders, setOrders] = useState([])
  const [allUsersActive, setAllUsersActive] = useState(false)
  const [users, setUsers] = useState([])
  
  useEffect(() => {
     
    axios.get(`/api/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setAddress(res.data.address);
        setIsAdmin(res.data.isAdmin)
      })
      .catch(error => console.error(error));
  }, []);

  const getAllOrdersHandler = async () => {
    axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      const orders = res.data;
      setOrders(orders);
      setAllOrdersActive(!allOrdersActive)   
    })
  }

  const getAllUsersHandler = async () => {
    axios.get("/api/users", {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => { 
      const users = res.data;
      setUsers(users)
      setAllUsersActive(!allUsersActive)  
    })
  };

  const deleteUserHandler = async (userId) => {
    axios.delete(`/api/users/:id`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      const remainingUsers = users.filter((user) => userId !== user.id)
      setUsers(remainingUsers)
    })
  }
  return ( 
    <>
      <div className="account-container">
        <h3>Personal Information</h3>
        <div className="accountdiv">
          <label className="account-label"> First Name:</label> 
          <p className="account-info">{firstname}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label">Last Name:</label>
          <p className="account-info">{lastname}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Email:</label>
          <p className="account-info">{email}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Username:</label>
          <p className="account-info">{username}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Address:</label>
          <p className="account-info">{address}</p>
        </div>
      </div>
      {
        isAdmin ?
          <>
            <div className="adminButtons">
              <button className={allOrdersActive ? "selectedView" : "adminAbility"} onClick={getAllOrdersHandler}>
                  View all Orders
              </button>
              <Link to="/products">
                <button className="adminAbility"> View / Delete Products</button>
              </Link> 
              <Link to="/newproduct">
                <button className="adminAbility"> Create new product</button> 
              </Link>
              <button className={allUsersActive ? "selectedView" : "adminAbility"} onClick={getAllUsersHandler}> 
                View all users 
              </button>
            </div>
            <div className="allUsers"></div>
          </>
        :
          null
        }
        {
          isAdmin && allOrdersActive ? 
          <>
            {
              <div className="adminAllView">
              {orders.map((order) => {
                return (
                  <div className="individualOrders adminView" key={order.id}>
                    <div><b>Order Id: </b> {order.id}</div>
                    <div><b>User Id: </b> {order.userId}</div>
                    <div><b>Order Status: </b> {order.status}</div>
                    <div><b>Order Products: </b> {order.products} </div>
                    <div><b>Date Placed: </b> {order.datePlaced}</div> 
                  </div>
                )
              })}
              </div>
            }
          </>
          : null
        }
        {
          isAdmin && allUsersActive ? 
          <>
            {
              <div className="adminAllView">
                {users.map((user) => {
                  return (
                    <div className="adminView" key={user.id}>
                      <div className="userInformation">
                        <div><b>Username:</b><br/> {user.username} </div>
                        <div><b>Name: </b><br/> {user.firstname} {user.lastname}</div>
                        <div><b>Email: </b><br/> {user.email}</div>
                        <div><b>Adminstrator? </b><br/> {user.isAdmin ? "Yes" : "No"}</div>
                      </div>
                      <div className="alterUser">
                        <img className="userImages" src={user.imgURL} alt="user"/>
                        <button className="alterButtons" onClick={() => deleteUserHandler(user.id)}> Delete User</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </>
          : null
        }
    </>
    )
}

export default Account; 