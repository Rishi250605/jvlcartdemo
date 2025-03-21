import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "./True.css";
import gheeImage from "./assets/yaso_ghee.png";
import butter from "./assets/yaso_butter.png";
import paneer from "./assets/yaso_paneer.png";
import cake from "./assets/yaso_cake.png";

export default function True() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef([]);
  
  const products = [
    {
      name: "Yaso Ghee",
      tagline: "Pure Tradition",
      description: "Premium clarified butter made from the finest milk, perfect for cooking and traditional recipes. Our ghee is prepared using time-honored methods to ensure authentic flavor and aroma.",
      image: gheeImage,
      color: "#f8e3a3",
      features: ["100% Pure", "No Preservatives", "Rich in Nutrients"]
    },
    {
      name: "Yaso Butter",
      tagline: "Farm Fresh",
      description: "Creamy, rich butter made from farm-fresh milk, ideal for everyday cooking and baking. Experience the smooth texture and natural taste that elevates every dish.",
      image: butter,
      color: "#f9efc7",
      features: ["Creamy Texture", "No Additives", "Perfect for Baking"]
    },
    {
      name: "Yaso Paneer",
      tagline: "Soft & Fresh",
      description: "Soft, fresh cottage cheese made from pure milk, perfect for your favorite Indian recipes. Our paneer retains its moisture and has the ideal firmness for all culinary creations.",
      image: paneer,
      color: "#f0f0f0",
      features: ["High Protein", "Soft Texture", "Preservative Free"]
    },
    {
      name: "Yaso Milkghee Cake",
      tagline: "Sweet Indulgence",
      description: "Delicious cake made with our signature ghee, creating a unique flavor and moist texture. Each bite offers a perfect balance of sweetness and richness that's truly unforgettable.",
      image: cake,
      color: "#f5e6d8",
      features: ["Unique Recipe", "Rich Flavor", "Special Occasions"]
    },
    {
      name: "Yaso Palkova",
      tagline: "Traditional Sweet",
      description: "Our classic sweet palkova, made with condensed milk and traditional spices for a rich taste. This beloved dessert carries the essence of heritage and celebration in every serving.",
      image: gheeImage,
      color: "#e8d5b5",
      features: ["Authentic Recipe", "Perfect Sweetness", "Festive Delight"]
    }
  ];

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to next section
  const scrollToNextSection = (index) => {
    if (sectionsRef.current[index + 1]) {
      sectionsRef.current[index + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add sections to ref
  const addToRefs = (el, index) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div className="product-scroll-container">
      {products.map((product, index) => (
        <section 
          key={index}
          ref={(el) => addToRefs(el, index)}
          className={`product-section ${activeSection === index ? 'active' : ''}`}
          style={{ 
            backgroundColor: product.color,
            zIndex: products.length - index
          }}
        >
          <div className="product-content">
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
            </div>
            
            <div className="product-info">
              <span className="product-tagline">{product.tagline}</span>
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              
              <div className="product-features">
                {product.features.map((feature, i) => (
                  <span key={i} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          </div>
          
          {index < products.length - 1 && (
            <button 
              className="scroll-indicator" 
              onClick={() => scrollToNextSection(index)}
              aria-label="Scroll to next product"
            >
              <span>Next Product</span>
              <ChevronDown size={24} />
            </button>
          )}
        </section>
      ))}
      
      <div className="quick-nav">
        {products.map((product, index) => (
          <button 
            key={index}
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>
    </div>
  );
}