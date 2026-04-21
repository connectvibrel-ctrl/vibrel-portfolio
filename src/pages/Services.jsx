import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './PageStyles.css';

gsap.registerPlugin(ScrollTrigger);

// ── Static data outside component ──
const SERVICES = [
  {
    num: '01',
    title: 'Local SEO Optimization',
    desc: "We ensure your organisation ranks #1 when high-intent prospects search for your expertise. Our specialised search strategies drive qualified leads directly to your pipeline.",
    items: ['Google Business Profile Mastery', 'Geofenced Keyword Targeting', 'Reputation Management'],
  },
  {
    num: '02',
    title: 'Atmospheric Web Design',
    desc: 'Your digital presence must command the same authority as your operations. We design premium, interactive platforms that make visitors resonate with your value before they even engage.',
    items: ['Immersive Scroll Animations', 'High-Fidelity Media Rendering', 'Custom Brand Identity'],
  },
  {
    num: '03',
    title: 'First-Party Data Systems',
    desc: "Stop relying on external platforms. We build robust systems that keep transactions and engagements directly on your proprietary ecosystem, giving you full ownership.",
    items: ['Direct Integration Systems', 'Zero-Friction Conversion', 'Retention & Loyalty Engines'],
  },
  {
    num: '04',
    title: 'Interactive Digital Assets',
    desc: 'Static documents limit engagement on mobile. We develop lightning-fast, interactive assets that function seamlessly to increase user value and satisfaction.',
    items: ['App-Like UX/UI', 'Strategic Conversion Logic', 'Real-Time Data Updates'],
  },
];

const Services = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-hero-title', {
        y: 80, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.3,
      });
      gsap.from('.service-row', {
        scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.14, ease: 'power4.out',
      });
      gsap.from('.services-cta', {
        scrollTrigger: { trigger: '.services-cta', start: 'top 90%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page" ref={rootRef}>
      <SEO
        title="Web Design & SEO Services in Delhi | Vibrel"
        description="Explore Vibrel's core services: Local SEO Optimisation, premium atmospheric web design, first-party data systems, and interactive digital assets. Helping Delhi restaurants, cafes and ambitious brands dominate digitally."
        path="/services"
        additionalSchema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Vibrel Web Services',
          url: 'https://vibrel.in/services',
          description: 'Vibrel offers four core digital services to help ambitious organisations dominate their market online.',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Local SEO Optimisation', url: 'https://vibrel.in/services#seo' },
            { '@type': 'ListItem', position: 2, name: 'Atmospheric Web Design', url: 'https://vibrel.in/services#design' },
            { '@type': 'ListItem', position: 3, name: 'First-Party Data Systems', url: 'https://vibrel.in/services#data' },
            { '@type': 'ListItem', position: 4, name: 'Interactive Digital Assets', url: 'https://vibrel.in/services#assets' },
          ],
        }}
      />
      <section className="services-hero" aria-label="Services hero">
        <div className="container">
          <p className="overline" style={{ marginBottom: '1.5rem' }}>What We Do</p>
          <h1 className="services-hero-title section-title">Our<br /><em>Services</em></h1>
        </div>
      </section>

      <section className="services-list container" aria-label="Services list">
        {SERVICES.map((s) => (
          <div className="service-row" key={s.num}>
            <div className="service-row__num overline" aria-hidden="true">{s.num}</div>
            <div className="service-row__body">
              <h2 className="service-row__title">{s.title}</h2>
              <p className="service-row__desc">{s.desc}</p>
              <ul className="service-row__list" aria-label={`${s.title} includes`}>
                {s.items.map((item) => (
                  <li key={item}><span className="service-dash" aria-hidden="true">—</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <div className="services-cta container">
        <Link to="/contact" className="btn-accent hover-target">Start Your Project</Link>
      </div>
    </div>
  );
};

export default Services;
