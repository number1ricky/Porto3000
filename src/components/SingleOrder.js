import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import "./SingleOrder.css"

const SingleOrder = ({orderId}) =>{
const [orderProducts, setOrderProducts] = useState({});
// const orderProducts = setOrderProducts(orderId)

  return (<>
    <div className="productsNav">
    <NavLink to="/products">All Products</NavLink> |
    <NavLink to="/products/wines">Wines</NavLink> |
    <NavLink to="/products/cheeses">Cheeses</NavLink> |
    <NavLink to="/products/productpairs">Pairings</NavLink>
    </div>
    {
                    orderProducts.map((orderProduct)=> {
                        return ( <>
                            <div classname="cart" >
                            <div className="orderProductCardContainerAll">
                            <div className="orderProductCardAll">
                            {orderProduct.id}
                            </div>
                            </div>
                            </div>
                        </>)  
                    })
    }
    </>)
}

export default SingleOrder
