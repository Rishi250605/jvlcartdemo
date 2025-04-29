import React from 'react';
import './AboutUs.css';
import { Heart, ShieldCheck, Truck } from 'lucide-react';

function AboutUs() {
  return (
    <div className="aboutMain">
      <div className="aboutHero">
        <div className="aboutHeroContent">
          <h1>Welcome to Yashoda Dairies</h1>
          <p>Where tradition meets quality in every product we create</p>
        </div>
      </div>

      <div className="aboutContainer">
        <div className="valueSection">
          <div className="valueCard">
            <Heart className="valueIcon" />
            <h3>Natural & Pure</h3>
            <p>100% natural ingredients sourced from our own farms</p>
          </div>
          <div className="valueCard">
            <ShieldCheck className="valueIcon" />
            <h3>Quality First</h3>
            <p>Rigorous quality control at every step</p>
          </div>
          <div className="valueCard">
            <Truck className="valueIcon" />
            <h3>Farm Fresh</h3>
            <p>Direct from farm to your doorstep</p>
          </div>
        </div>

        <div className="journeySection">
          <div className="journeyImage">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80"
              alt="Our Dairy Farm"
            />
          </div>
          <div className="journeyContent">
            <h2>Our Journey</h2>
            <p>In 1986, a couple took over their family's dairy business in a village, committed to providing high-quality dairy products at economical prices using traditional methods. Four decades later, their daughter-in-law, Mrs. Gayathiri Devi, a management and HR postgraduate, envisioned expanding their reach. With her husband's support, she founded Yashodha Dairies and built the brand "YASO", meaning "SUCCESS" in Pali. Dedicated to quality, Yashodha Dairies ensures the finest dairy products for all ages, maintaining high service standards.</p>
          </div>
        </div>

        <div className="promiseSection">

          <div className="promiseImage">
            <img
              src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&q=80"
              alt="Our Promise"
            />
          </div>
          <div className="promiseContent">
            <h2>Our Promise</h2>
            <p>At Yashoda Dairies, we promise to deliver only the finest quality dairy products to your doorstep. Our commitment to maintaining traditional methods while embracing modern technology ensures that every product meets the highest standards of quality and taste. We believe in transparency, sustainability, and creating value for our customers through every product we offer.</p>
          </div>
        </div>

        <div className="vennSection">
          <div className="vennDiagram">
            <div className="vennCircle vision">
              <h3>Our Vision</h3>
              <p>​"Our vision is to be the leading provider of dairy products, enriching lives by offering uncompromising quality, affordability, and unparalleled service. "</p>
            </div>
            <div className="vennCircle mission">
              <h3>Our Mission</h3>
              <p>Our mission is to provide high-quality dairy products to people of all backgrounds, ensuring affordability without compromising on taste or nutritional value."</p>
            </div>
            <div className="vennCircle values">
              <h3>Our Values</h3>
              <p>We are committed to quality, affordability, and exceptional service, ensuring everyone has access to nutritious dairy products.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;