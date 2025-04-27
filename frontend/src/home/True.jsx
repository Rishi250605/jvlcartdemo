import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "./True.css";
import gheeImage from "../assets/yaso_ghee.png";
import butter from "../assets/yaso_butter.png";
import paneer from "../assets/yaso_paneer.png";
import cake from "../assets/yaso_cake.png";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef([]);

  const products = [
    {
      name: "Yaso Ghee",
      tagline: "Pure Tradition",
      description: "Premium clarified butter made from the finest milk, perfect for cooking and traditional recipes. Our ghee is prepared using time-honored methods to ensure authentic flavor and aroma.",
      image: gheeImage,
      color: "#fff7ed",
      features: ["100% Pure", "No Preservatives", "Rich in Nutrients"]
    },
    {
      name: "Yaso Butter",
      tagline: "Farm Fresh",
      description: "Creamy, rich butter made from farm-fresh milk, ideal for everyday cooking and baking. Experience the smooth texture and natural taste that elevates every dish.",
      image: butter,
      color: "#fef3c7",
      features: ["Creamy Texture", "No Additives", "Perfect for Baking"]
    },
    {
      name: "Yaso Paneer",
      tagline: "Soft & Fresh",
      description: "Soft, fresh cottage cheese made from pure milk, perfect for your favorite Indian recipes. Our paneer retains its moisture and has the ideal firmness for all culinary creations.",
      image: paneer,
      color: "#fef9c3",
      features: ["High Protein", "Soft Texture", "Preservative Free"]
    },
    {
      name: "Yaso Milkghee Cake",
      tagline: "Sweet Indulgence",
      description: "Delicious cake made with our signature ghee, creating a unique flavor and moist texture. Each bite offers a perfect balance of sweetness and richness that's truly unforgettable.",
      image: cake,
      color: "#fef3c7",
      features: ["Unique Recipe", "Rich Flavor", "Special Occasions"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        if (sectionTop <= windowHeight * 0.3 && sectionTop > -sectionHeight * 0.7) {
          setActiveSection(index);
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
      if (sectionsRef.current[0]) {
        sectionsRef.current[0].classList.add('active');
      }
    }, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = (index) => {
    if (sectionsRef.current[index + 1]) {
      sectionsRef.current[index + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="product-scroll-container">
      <div className="quick-nav">
        <div className="nav-dots">
          {products.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' })}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {products.map((product, index) => (
        <section
          key={index}
          ref={(el) => sectionsRef.current[index] = el}
          className="product-section"
          style={{ backgroundColor: product.color }}
        >
          <div className="product-content">
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

            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
          </div>

          {index < products.length - 1 && (
            <button
              className="scroll-indicator"
              onClick={() => scrollToNextSection(index)}
              aria-label="View next product"
            >
              <span>Scroll for Next product</span>
              <ChevronDown size={24} />
            </button>
          )}
        </section>
      ))}
    </div>
  );
}