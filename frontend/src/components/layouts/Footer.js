import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import './Footer.css';
import yasoLogo from './yaso_logo.png';

function Footer() {
  return (
    <footer className="footerMain">
      <div className="footerContainer">
        {/* Brand Section */}
        <div className="footerBrand">
          <div className="brandLogo">
            <img src={yasoLogo} alt="Yashodha Logo" />
          </div>
          <p className="brandDescription">
            Bringing quality products to enhance your everyday life with authentic flavors and traditional goodness.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footerSection">
          <h3 className="sectionTitle">Quick Links</h3>
          <ul className="quickLinks">
            <li><a href="/home">Home</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/our-products">Our Products</a></li>
            <li><a href="/shop-here">Shop Here</a></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="footerSection">
          <h3 className="sectionTitle">Get In Touch</h3>
          <form className="contactForm">
            <div className="formField">
              <input 
                type="email" 
                placeholder="Your email" 
                className="formInput"
              />
            </div>
            <div className="formField">
              <textarea 
                placeholder="Your message" 
                rows={3}
                className="formTextarea"
              ></textarea>
            </div>
            <button type="submit" className="submitButton">
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="footerSection">
          <h3 className="sectionTitle">Contact Info</h3>
          <div className="contactInfo">
            <div className="contactItem">
              <MapPin className="contactIcon" />
              <p>123, Yashodha Street, City, Country</p>
            </div>
            <div className="contactItem">
              <Phone className="contactIcon" />
              <p>+91 9876543210</p>
            </div>
            <div className="contactItem">
              <Mail className="contactIcon" />
              <p>contact@yashodha.com</p>
            </div>
          </div>
          
          <div className="socialLinks">
            <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer" className="socialLink whatsapp">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M17.6 6.32C16.12 4.82 14.12 4 12 4C7.72 4 4.24 7.48 4.24 11.76C4.24 13.32 4.64 14.84 5.36 16.16L4.16 20L8.12 18.8C9.36 19.44 10.68 19.8 12 19.8C16.28 19.8 19.76 16.32 19.76 12.04C19.76 9.92 18.96 7.92 17.6 6.32ZM12 18.4C10.8 18.4 9.64 18.08 8.64 17.44L8.4 17.28L6 18L6.72 15.68L6.56 15.44C5.84 14.4 5.48 13.12 5.48 11.8C5.48 8.24 8.4 5.32 11.96 5.32C13.76 5.32 15.4 6 16.64 7.24C17.88 8.48 18.56 10.12 18.56 11.92C18.6 15.48 15.68 18.4 12 18.4ZM15.64 13.4C15.4 13.28 14.28 12.72 14.08 12.64C13.88 12.56 13.72 12.52 13.56 12.76C13.4 13 12.96 13.48 12.84 13.64C12.72 13.8 12.56 13.84 12.32 13.68C11.2 13.12 10.48 12.68 9.76 11.4C9.56 11.04 10.08 11.08 10.56 10.12C10.64 9.96 10.6 9.84 10.52 9.72C10.44 9.6 9.92 8.48 9.72 8C9.52 7.52 9.32 7.6 9.2 7.6C9.08 7.6 8.92 7.6 8.76 7.6C8.6 7.6 8.36 7.68 8.16 7.92C7.96 8.16 7.36 8.72 7.36 9.84C7.36 10.96 8.16 12.04 8.28 12.2C8.4 12.36 9.92 14.68 12.24 15.64C13.68 16.24 14.24 16.28 14.96 16.16C15.4 16.08 16.28 15.6 16.48 15.04C16.68 14.48 16.68 14 16.6 13.88C16.52 13.8 16.36 13.76 16.12 13.64L15.64 13.4Z" fill="currentColor"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="socialLink youtube">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z" fill="currentColor"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="socialLink instagram">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} Yashodha. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;