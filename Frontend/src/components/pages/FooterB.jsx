import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../style/style.css'; // import file CSS untuk styling

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const footer = footerRef.current;
  
    if (footer) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight;
      const footerPosition = footer.offsetTop + footer.offsetHeight;
  
      if (scrollHeight - footerPosition <= windowHeight && scrollPosition >= scrollHeight) {
        footer.classList.add('pop-up');
      } else {
        footer.classList.remove('pop-up');
      }
    }
  };
  

  return (
    <footer ref={footerRef} className="footer">
      <div className="social-media">
        <a href="https://www.facebook.com"><FaFacebook /></a>
        <a href="https://www.twitter.com"><FaTwitter /></a>
        <a href="https://www.instagram.com"><FaInstagram /></a>
      </div>
      <p>&copy; {new Date().getFullYear()} Zoepy. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
