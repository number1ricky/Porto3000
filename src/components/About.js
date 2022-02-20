import React from "react";
import "./About.css"
import kriselda from "../images/Kriselda.png"
import felix from "../images/Felix.png"
import michelle from "../images/Michelle.jpg"
import ricky from "../images/Ricky.png"
import header from "../images/FoundersHeader.png"
import linkedIn from "../images/LinkedIn.png"
import gitHub from "../images/GitHub.png"




const About = () => {
    return <>
    <div className="componentContainer">
        <div className="aboutHeader">
                <img src={header} className="founderHeader" alt="founder header"/>
                <div className="headerText">
                    <p>From the crisp air and radiant California sun we say hello to a new world. The drinks and products of Porto 3000 are of the finest nature. Ethically sourced from our own vineyards, we strive for excellence in every sip and bite.</p>
                </div>
        </div>
        <div className="aboutContainer">
            <div className="outterContainer">
                <div className="innerContainer">
                    <h2>Kriselda Bonifacio</h2>
                    <img className="developerPhoto" src={kriselda} alt="Kriselda's Headshot" />
                    <div className="aboutText">
                        <p>A software developer by day and a cheese connoisseur by night, Kriselda is always on the search for a flavorful cheese to add to her charcuterie board. Alongside her love for the cheesy greatness, Kriselda's goal is to become fluent in various languages to help foster conversation over a wonderful glass of wine.</p>
                </div>
                    </div>
                    <div className="linkedInContainer">
                        <a href="https://www.linkedin.com/in/kbonifacio/">
                            <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
                        </a>
                        <a href="https://github.com/kbonifacio">
                            <img className="gitHub" src={gitHub} alt="GitHub Profile" />
                        </a>
                    </div>
            </div>
            <div className="outterContainer">
                <div className="innerContainer">
                    <h2>Richard Brown</h2>
                    <img className="developerPhoto rickyPhoto" src={ricky} alt="profile silhouette" />  
                    <div className="aboutText">
                        <p>Richard Brown, or Ricky, loves wine and cheese. He loves wine and cheese so much, he decided to use his newly honed skills in React, Express, Node, Javascript, HTML, CSS, and SQL. Thanks for looking at Porto3k! Please look for more projects or mine in the future and thanks to the others who helped make this project.</p>
                    </div>
                </div>
                    <div className="linkedInContainer">
                        <a href="https://www.linkedin.com/in/number1ricky/">
                            <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
                        </a>
                        <a href="https://github.com/number1ricky">
                            <img className="gitHub" src={gitHub} alt="GitHub Profile" />
                        </a>
                    </div>
            </div>
            <div className="outterContainer">
                <div className="innerContainer">
                    <h2>Felix Cadiz</h2>
                    <img className="developerPhoto felixPhoto" src={felix} alt="profile silhouette" />  
                    <div className="aboutText">
                        <p>Always open to a friendly drink, Felix's adoration for software development and wine—specifically our very own Port wine—began near the San Francisco Bay Area. In parallel to his thirst for knowledge of various tech stacks, musical instruments, and yoyoing, Felix is determined to create the optimal recipie for the perfect grilled cheese.</p>
                    </div>
                    <div className="linkedInContainer">
                        <a href="https://www.linkedin.com/in/felix-cadiz/">
                            <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
                        </a>
                        <a href="https://github.com/Felix-Cadiz">
                            <img className="gitHub" src={gitHub} alt="GitHub Profile" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="outterContainer">
                <div className="innerContainer">
                    <h2>Michelle Malfabon</h2>
                    <img className="developerPhoto michellePhoto" src={michelle} alt="profile silhouette" />
                    <div className="aboutText">
                        <p>Michelle is no stranger to the beautiful Wine Country where her passion for wine and winemaking developed. Her love of red wine (and pizza) grew even more during a trip to Tuscany, Italy. On a day off, you'll most likely find Michelle enjoying a glass or two of our red wine along with our smoked gouda and her homemade baked goods. </p>
                    </div>
                    <div className="linkedInContainer">
                        <a href="https://www.linkedin.com/in/michellemalf/">
                            <img className="linkedIn" src={linkedIn} alt="LinkedIn Profile" />
                        </a>
                        <a href="https://github.com/michellemal">
                            <img className="gitHub" src={gitHub} alt="GitHub Profile" />
                        </a>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    </>
}

export default About; 