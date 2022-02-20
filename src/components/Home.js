import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"
import header from "../images/WelcomeHeader.png"
import img1 from "../images/handHeldGrapes.png"
import img2 from "../images/vineyardOverview.png"
import featImg1 from "../images/goatCheese.jpg"
import featImg2 from "../images/wineBottle.jpg"
import featImg3 from "../images/Oscypki.jpg"

const Home = () => {
    return <>
      <div className="welcomeContainer">
        <img src={header} className="welcome" alt ="welcome"/>
      </div>
      <div className="componentContainerHome">
        <div className="featuredContainer">
            <img src={img2} className="img2" alt="vineyard"/>
            <img src={img1} className="img1" alt="grapes"/>
            <div><h2><i>Online Reservations Available Soon</i></h2>
            <p>OPEN 10:00 AM- 7:00 PM daily</p>
            <br></br>
            <p>3000 Local Host Dr. </p>
            <p>Sonoma, CA</p>
            <p>(707) 767-8300</p>
            </div>
            
        </div>
        <div className="featuredContainerRight">
            <div className="featured">
                <div className="featContainerParagraph">
                    <div>
                        <p>Welcome to Porto 3000. Our goal is to deliver the finest wines and cheeses to your familia's table. We believe that wine and cheese are a wonderful pairing, but we also believe that it can foster great experiences between new aquaintances and loved ones. The ingredients used to make our products are ethically sourced and USDA organic certified. Additionally, an ideal that we hold near and dear to our hearts is that all of our ingredients must be sourced locally. We love to support our friends and neighbors along their business journies so that we can grow and succeed as a community. May our wine bring you and your family wonderful new memories and we hope to see you soon on the vineyard. </p>
                    </div>
                </div>
                <div className="featHeader">
                    <h1><i>Featured Products</i></h1>
                </div>
                <div className="featProdCards">
                    <div className="featProdL">
                        <NavLink to="/products/1"><img src={featImg2} className="featImgL" alt="porto wine"/></NavLink>
                    </div>
                    <div className="featProdRContainer">
                        <div className="featProdR">
                            <NavLink to="/products/25"><img src={featImg1} className="featImgR" alt="goat cheese"/></NavLink>
                        </div>
                        <div className="featProdR">
                            <NavLink to="/products/36"><img src={featImg3} className="featImgR" alt="Oscypki"/></NavLink> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
}

export default Home;