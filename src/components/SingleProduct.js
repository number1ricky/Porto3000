import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import mainLogo from "../images/mainLogo.png"
import "./SingleProduct.css"

const SingleProduct = ({products, setProducts, currentUser, token}) => { 
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    let { id } = useParams();
    id = parseInt(id)

    const retrieveProduct = async () => {
        let singleProduct;
        if (products.length === 0){
            try {
                const response = await axios.get(`/api/products/${id}`);
                singleProduct = response.data;              
            } catch (error) {
                
            }
        } else {
            singleProduct = products.find(product => product.id === Number(id))
        }
        setProduct(singleProduct)
    }
    useEffect(retrieveProduct, [])

    const handleDestroyProduct = async (token, productId) => {
        console.log("in HandleDestoryProducts")
        axios.delete("/api/products/:id", {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            navigate("/products")
            const remainingProducts = products.filter((product) => productId !== product.id)
            setProducts(remainingProducts)
        })
    }

    return ( 
        <>   
        { product ? 
        <div key={product.id}>
            <div className="productsNav">
                <NavLink to="/products">All Products</NavLink> |
                <NavLink to="/products?type=wine">Wines</NavLink> |
                <NavLink to="/products?type=cheese">Cheeses</NavLink> |
                <NavLink to="/products?type=wine%20and%20cheese">Pairings</NavLink>
            </div>
            <div className="productContainer">
                <div className="productCard">
                    <div className="singleCardContent">    
                        <div className="innerCard">
                            <div className="productContainer">
                                <div className="imgContainer">
                                    <img src={product.imgURL} className="productImage" alt="product"/>
                                </div>
                            </div>
                        </div>
                        <div className="cardDetails">
                            <div className="productNameContainer">
                                <h2>{product.name}</h2>
                            </div>
                            <div className="productPrice">
                                <b>${product.price}</b>
                            </div>
                            <div className="productDescription">
                                <i>{product.description}</i>
                            </div>
                                <div className="singleProdButtonContainer">
                                    <NavLink to="/products" className="productsButton returnToAllProducts">Return to All Products</NavLink>
                                    {
                                        currentUser.isAdmin ?
                                        <>
                                        { <button className="productsButton adminButton" onClick={() => handleDestroyProduct(token, product.id)}>Delete</button>}
                                        </>
                                        : null
                                    }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null
    
        }    
        <div className="sealContainer">
            <img src={mainLogo} className="portoSeal" alt="porto quality seal"/>
            <div className="sealDescription">
                <p>Each product is backed by the Porto 3000 seal of quality assurance. From the care of our crops and livestock to the finest details on our packaging, the entire process is monitored to ensure the finest product is produced.</p>
                <p>We go the extra mile because we love you 3000. </p>
            </div>
        </div>
        </>
    )
}

export default SingleProduct;