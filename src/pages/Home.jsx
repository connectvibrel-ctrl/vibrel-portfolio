import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Home.css';
import img1 from '../assets/img_1.png';
import img2 from '../assets/img_2.png';

gsap.registerPlugin(ScrollTrigger);

// ── Static data outside component — no re-creation on re-render ──
const BENTO_CARDS = [
  {
    title: 'Local SEO\nDominance',
    desc: 'Outrank competitors in local searches. We structure your site to dominate high-intent queries and discovery networks.',
    large: true,
  },
  {
    title: 'Digital\nImmersion',
    desc: 'Translate your essence into a digital experience through your own story.',
  },
  {
    title: 'Sales\nMachine',
    desc: 'Stop settling for brochures that just sit there. We build lightning-fast websites that turn clicks into paying customers.',
  },
  {
    title: 'Owning\nthe Data',
    desc: 'Stop relying on third-party platforms. Capture first-party data and drive direct conversions effortlessly.',
  },
];

const TESTIMONIALS = [
  {
    quote: '"Vibrel transformed our online presence entirely. We saw a 300% increase in direct conversions within the first two months."',
    name: 'Shewta Basin',
    role: 'Manager, Glow Cafe',
    img: img1,
  },
  {
    quote: '"Vibrel built exactly what I needed and made the entire website process effortless. Anytime I reach out with a question or tweak, they are on it immediately!"',
    name: 'Siddhant Malik',
    role: 'Owner, Matto Bakery',
    img: img2,
  },
];

// ── Character-split word component for hero animation ──
const SplitWord = ({ word, color, wKey }) => (
  <span style={{ display: 'inline-flex' }}>
    {word.split('').map((char, i) => (
      <span key={`${wKey}-${i}`} style={{ display: 'inline-block', overflow: 'hidden' }}>
        <span className="hero-title-word" style={{ display: 'inline-block', color }}>
          {char}
        </span>
      </span>
    ))}
  </span>
);

const Home = () => {
  const rootRef = useRef(null);

  const runAnimations = useCallback(() => {
    const ctx = gsap.context(() => {

      /* ── Hero entrance ── */
      gsap.from('.hero-eyebrow', {
        y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4,
      });
      gsap.from('.hero-title-word', {
        y: '110%',
        duration: 1.35,
        ease: 'power4.out',
        stagger: window.innerWidth < 768 ? 0 : 0.08,
        delay: 0.55,
      });
      gsap.from('.hero-desc', {
        y: 30, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 1.1,
      });
      gsap.from('.hero-actions', {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 1.4,
      });

      /* ── Watermark parallax ── */
      gsap.to('.hero-watermark', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: '-25%',
        ease: 'none',
      });

      /* ── Bento reveal ── */
      gsap.from('.bento-card', {
        scrollTrigger: { trigger: '.bento-grid', start: 'top 75%' },
        y: 60, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out',
      });

      /* ── Statement parallax ── */
      gsap.to('.statement-text', {
        scrollTrigger: {
          trigger: '.statement-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: '-12%',
        ease: 'none',
      });

      /* ── Testimonial reveal ── */
      gsap.from('.testimonial-block', {
        scrollTrigger: { trigger: '.testimonials-section', start: 'top 75%' },
        y: 50, opacity: 0, duration: 1.2, stagger: 0.18, ease: 'power4.out',
      });

      /* ── Footer CTA ── */
      gsap.from('.footer-cta-title', {
        scrollTrigger: { trigger: '.site-footer', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1.3, ease: 'power4.out',
      });

    }, rootRef);

    return ctx;
  }, []);

  useEffect(() => {
    const ctx = runAnimations();
    return () => ctx.revert();
  }, [runAnimations]);

  return (
    <div ref={rootRef}>
      <SEO
        title="Premium Web Design Agency Delhi | Engineering Digital Dominance"
        description="Vibrel is Delhi's premium web design and digital growth agency. We engineer immersive, data-driven websites that dominate local SEO, captivate audiences, and convert visitors into loyal customers. Serving restaurants, cafes, bars and ambitious brands across India."
        path="/"
        additionalSchema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://vibrel.in/#webpage',
          url: 'https://vibrel.in/',
          name: 'Vibrel — Engineering Digital Dominance',
          isPartOf: { '@id': 'https://vibrel.in/#website' },
          about: { '@id': 'https://vibrel.in/#organization' },
          description: 'Premium web design and digital growth agency based in Delhi, India.',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [{
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://vibrel.in/'
            }]
          }
        }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero" aria-label="Hero">
        <div className="hero-watermark" aria-hidden="true">VIBREL</div>
        <div className="hero-glow"      aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-eyebrow overline">Vibrel — Web Solutions</p>

          <h1 className="hero-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em' }}>
            <SplitWord word="We"       color="#f0ede8" wKey="w1" />
            <SplitWord word="Engineer" color="#f0ede8" wKey="w2" />
            <SplitWord word="Your"     color="#f0ede8" wKey="w3" />
            <SplitWord word="Vision"   color="#8fa68e" wKey="w4" />
            <SplitWord word="Into"     color="#f0ede8" wKey="w5" />
            <SplitWord word="Reality"  color="#8fa68e" wKey="w6" />
          </h1>

          <p className="hero-desc">
            Premium, data-driven web solutions for ambitious<br />
            organisations that demand digital dominance.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-accent hover-target">Start Your Project</Link>
            <Link to="/work"    className="btn-ghost  hover-target">View Our Work</Link>
          </div>
        </div>
      </section>

      {/* ══════════════ TICKER ══════════════ */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker">
          {['LOCAL SEO DOMINANCE','DIGITAL IMMERSION','OWNING THE DATA','SALES MACHINE',
            'LOCAL SEO DOMINANCE','DIGITAL IMMERSION','OWNING THE DATA','SALES MACHINE'].map((t, i) => (
            <span key={i} className="ticker-item">{t}<span className="ticker-sep">✦</span></span>
          ))}
        </div>
      </div>

      {/* ══════════════ BENTO — Vibrel Difference ══════════════ */}
      <section className="bento-section" aria-labelledby="bento-heading">
        <div className="container">
          <div className="bento-header">
            <h2 className="section-title" id="bento-heading">The Vibrel<br /><em>Difference</em></h2>
          </div>
          <div className="bento-grid">
            {BENTO_CARDS.map((card, i) => (
              <div
                key={i}
                className={`bento-card glass-card hover-target${card.large ? ' bento-large' : ''}`}
              >
                <h3 className="bento-title">
                  {card.title.split('\n').map((line, j) => (
                    <React.Fragment key={j}>{line}{j === 0 && <br />}</React.Fragment>
                  ))}
                </h3>
                <p className="bento-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATEMENT ══════════════ */}
      <section className="statement-section" aria-label="Our Mission">
        <div className="statement-text">
          <p className="overline" style={{ marginBottom: '1.5rem', opacity: 0.7 }}>Our Mission</p>
          <h2 className="statement-headline">
            Turn digital interactions<br />
            into measurable<br />
            <em>expansion.</em>
          </h2>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <p className="overline" id="testimonials-heading" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            Client Success
          </p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-block" key={i}>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <img
                    src={t.img}
                    alt={t.name}
                    width="56"
                    height="56"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER / CTA ══════════════ */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-watermark" aria-hidden="true">VIBREL</div>
        <div className="footer-content">
          <h2 className="footer-cta-title">
            Ready to<br /><em>Dominate?</em>
          </h2>
          <Link to="/contact" className="btn-accent hover-target" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
            Build with Vibrel
          </Link>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Vibrel. Premium Web Solutions.</p>
            <div className="footer-links">
              <a
                href="https://wa.me/918882636063?text=Hi!%20Can%20we%20connect%20to%20discuss%20a%20potential%20website%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-target"
              >
                WhatsApp
              </a>
              <a href="mailto:connect.vibrel@gmail.com" className="hover-target">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
