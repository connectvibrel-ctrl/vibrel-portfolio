import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-watermark" aria-hidden="true">VIBREL</div>
      <div className="footer-content">
        <h2 className="footer-cta-title">
          Ready to<br /><em>Produce Impact?</em>
        </h2>
        <div className="footer-buttons">
          <Link to="/contact" className="btn-accent hover-target">
            Book Production Shoot
          </Link>
          <a
            href="https://wa.me/918882636063?text=Hi!%20I%20want%20to%20discuss%20a%20video%20production%20%2F%20event%20coverage%20project%20with%20Vibrel."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hover-target"
          >
            WhatsApp Us Direct
          </a>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Vibrel. Media Production House &amp; Creative Studio.</p>
          <div className="footer-links">
            <a href="https://wa.me/918882636063" target="_blank" rel="noopener noreferrer" className="hover-target">WhatsApp</a>
            <span className="footer-link-sep">✦</span>
            <a href="mailto:connect.vibrel@gmail.com" className="hover-target">Email</a>
            <span className="footer-link-sep">✦</span>
            <Link to="/web-services" className="hover-target">Web Studio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
