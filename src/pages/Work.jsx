import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import './PageStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const showcaseRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(showcaseRef.current, {
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: 'top 95%',
          end: 'bottom bottom',
          scrub: 1,
        },
        rotationX: 10,
        rotationY: -5,
        y: 50,
        transformPerspective: 2000,
        ease: 'none'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="work-page">
      <SEO
        title="Our Work & Portfolio | Vibrel Web Agency"
        description="Browse Vibrel's portfolio of premium web projects. See how we transformed The Drool Company into a full-stack restaurant digital experience — immersive design, local SEO, and conversion-focused architecture."
        path="/work"
        additionalSchema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Vibrel Portfolio',
          description: 'A showcase of premium web projects built by Vibrel for ambitious restaurant and lifestyle brands.',
          url: 'https://vibrel.in/work',
          author: { '@id': 'https://vibrel.in/#organization' },
          hasPart: [{
            '@type': 'CreativeWork',
            name: 'The Drool Company — Restaurant Digital Experience',
            description: 'Full-stack restaurant website with immersive scroll animations, local SEO dominance, and seamless online ordering integration.',
            author: { '@id': 'https://vibrel.in/#organization' },
          }]
        }}
      />
      <div className="container">
        <div className="work-hero">
          <p className="overline" style={{ marginBottom: '1rem' }}>Featured Architecture</p>
          <h1 className="work-hero-title section-title">Selected<br /><em>Work</em></h1>
          <p className="work-desc">
            An interactive showcase of our capabilities. Scroll directly within the devices below to experience "The Drool Company" — a full-stack restaurant digital experience we built from the ground up.
          </p>
        </div>

        <div className="device-showcase-container" ref={showcaseRef}>
          <div className="device-macbook">
            <div className="macbook-screen">
              <iframe sandbox="allow-scripts allow-same-origin" src="/drool-comp/index.html" title="Drool Company Desktop" loading="lazy" />
            </div>
          </div>

          <div className="device-iphone">
            <div className="iphone-notch"></div>
            <iframe sandbox="allow-scripts allow-same-origin" src="/drool-comp/index.html" title="Drool Company Mobile" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
