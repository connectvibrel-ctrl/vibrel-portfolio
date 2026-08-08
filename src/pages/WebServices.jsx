import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './PageStyles.css';
import './WebServices.css';

gsap.registerPlugin(ScrollTrigger);

const WEB_SERVICES_LIST = [
  {
    number: '01',
    title: 'Bespoke Web Development',
    desc: 'High-performance React & Vite web applications crafted with custom micro-animations, glassmorphism UI, and lightning-fast load speeds.',
    tags: ['React 19', 'Vite', 'Tailwind/Vanilla CSS', 'Custom UI/UX']
  },
  {
    number: '02',
    title: 'Local SEO & Search Dominance',
    desc: 'Outrank competitors in local search networks. Schema markup, high-intent keywords, and geo-targeted optimization for Google Maps & search.',
    tags: ['Local SEO', 'JSON-LD Schema', 'Google Business', 'Core Web Vitals']
  },
  {
    number: '03',
    title: 'High-Converting Sales Machines',
    desc: 'Websites engineered to convert clicks into paying customers. Optimized lead funnels, WhatsApp integration, and seamless booking forms.',
    tags: ['Conversion Rate Opt.', 'Funnel Architecture', 'Lead Capture', 'Analytics']
  },
  {
    number: '04',
    title: 'First-Party Data & Analytics',
    desc: 'Stop depending purely on third-party ad networks. Capture user intent, track user behavior, and build direct customer relationship pipelines.',
    tags: ['First-Party Data', 'Custom Dashboards', 'Audience Growth', 'CRM Integration']
  }
];

const WEB_PORTFOLIO_CASE_STUDIES = [
  {
    title: 'Glow Cafe & Lounge',
    category: 'Restaurant & Hospitality Web App',
    metric: '+300% Direct Table Bookings',
    desc: 'Immersive digital menu, high-conversion reservation flow, and local SEO domination across Delhi NCR.',
  },
  {
    title: 'Matto Artisan Bakery',
    category: 'E-Commerce & Ordering System',
    metric: '2.4s Average Load Speed',
    desc: 'Sleek product showcase, smooth checkout experience, and integrated WhatsApp direct ordering.',
  },
  {
    title: 'Aura Luxury Estates',
    category: 'Real Estate Portfolio & Showcase',
    metric: '4.8x Lead Conversion Rate',
    desc: 'Interactive property tours, video background headers, and high-touch inquiry capture portal.',
  }
];

const WebServices = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.web-hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.web-hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.2 });
      gsap.from('.web-hero-desc', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 });
      
      gsap.from('.web-card', {
        scrollTrigger: { trigger: '.web-grid', start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      gsap.from('.web-case-card', {
        scrollTrigger: { trigger: '.web-case-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="web-services-page">
      <SEO
        title="Web Services & Digital Studio | Vibrel"
        description="Engineering high-performance websites, local SEO dominance, and custom digital experiences that turn visitors into loyal customers."
        path="/web-services"
      />

      {/* Hero Section */}
      <section className="web-hero">
        <div className="hero-watermark" aria-hidden="true">WEB</div>
        <div className="container">
          <p className="web-hero-eyebrow overline">Vibrel Web Studio</p>
          <h1 className="web-hero-title">
            Engineering <em>Digital Dominance</em><br />
            For Ambitious Brands
          </h1>
          <p className="web-hero-desc">
            While production is our core passion, our Web Studio builds high-converting, lightning-fast digital platforms designed to amplify your brand's online presence.
          </p>
          <div className="web-hero-actions">
            <Link to="/contact" className="btn-accent hover-target">Start a Web Project</Link>
            <a
              href="https://wa.me/918882636063?text=Hi!%20I'm%20interested%20in%20discussing%20a%20Web%20Design%20%26%20SEO%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost hover-target"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Core Web Capabilities */}
      <section className="web-services-section">
        <div className="container">
          <div className="section-header">
            <p className="overline">Our Web Capabilities</p>
            <h2 className="section-title">Web Design &amp; Digital Infrastructure</h2>
          </div>

          <div className="web-grid">
            {WEB_SERVICES_LIST.map((serv, index) => (
              <div key={index} className="web-card glass-card">
                <span className="web-card-num">{serv.number}</span>
                <h3 className="web-card-title">{serv.title}</h3>
                <p className="web-card-desc">{serv.desc}</p>
                <div className="web-card-tags">
                  {serv.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="web-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Impact & Case Studies */}
      <section className="web-cases-section">
        <div className="container">
          <div className="section-header">
            <p className="overline">Proven Digital Growth</p>
            <h2 className="section-title">Web Studio <em>Case Studies</em></h2>
          </div>

          <div className="web-case-grid">
            {WEB_PORTFOLIO_CASE_STUDIES.map((item, idx) => (
              <div key={idx} className="web-case-card glass-card">
                <span className="web-case-category">{item.category}</span>
                <h3 className="web-case-title">{item.title}</h3>
                <div className="web-case-metric">{item.metric}</div>
                <p className="web-case-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default WebServices;
