import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import yourImage from './transparent_logo.png';
import Face from '../icons/logos_facebook.png';
import Google from '../icons/devicon_google.png';
import Linked from '../icons/skill-icons_linkedin.png';
import Appel from './appel.jpg';
import GoogleImg from './google.jpg';

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="container">
        <div className="left first">
          <img className='img_footer' src={yourImage} alt="none" />
        </div>
        <div className="left">
          <h2 className='account'>Account</h2>
          <Link to={'/e_profile'} onClick={scrollToTop} style={{ textDecoration: 'unset', color: 'green' }}>
            <p className='my_account'>My Account</p>
          </Link>
          <div className="icons">
            <span><img src={Face} alt="Facebook" /></span>
            <span><img src={Google} alt="Google" /></span>
            <span><img src={Linked} alt="LinkedIn" /></span>
          </div>
        </div>
        <div className="left middel">
          <h2>Quick Link</h2>
          <Link to={'/'} onClick={scrollToTop} style={{ textDecoration: 'unset', color: 'green' }}>
            <p>Home</p>
          </Link>
          <Link to={'/about'} onClick={scrollToTop} style={{ textDecoration: 'unset', color: 'green' }}>
            <p>About Us</p>
          </Link>
          <Link to={'/contact'} onClick={scrollToTop} style={{ textDecoration: 'unset', color: 'green' }}>
            <p>Contact Us</p>
          </Link>
        </div>
        <div className="left">
          <h2>Download App</h2>
          <div className="up_img">
            <img className='img_app_store' src={Appel} alt="App Store" />
          </div>
          <div className="down_img">
            <img className='img_google_play' src={GoogleImg} alt="Google Play" />
          </div>
        </div>
      </div>
    </footer>
  );
}
