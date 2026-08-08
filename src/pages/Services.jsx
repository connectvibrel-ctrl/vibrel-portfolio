import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './PageStyles.css';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTION_SERVICES = [
  {
    num: '01',
    title: 'Brand Ad & Commercial Filming',
    desc: 'High-concept scriptwriting, cinematic direction, lighting design, and broadcast camera production tailored for TV and digital advertising.',
    deliverables: ['16:9 Cinema Masters', 'Vertical Cutdowns', 'Color Graded Stills', 'Voiceover & Score']
  },
  {
    num: '02',
    title: 'Live Event Coverage & Aftermovies',
    desc: 'Multi-camera team coverage for summits, festivals, product launches, and galas with rapid 24-48 hour highlight turnaround.',
    deliverables: ['Full Length Recaps', 'Social Highlight Reels', 'Keynote Cutdowns', 'Drone Aerial Footage']
  },
  {
    num: '03',
    title: 'High-Volume Social Reels & Shorts',
    desc: 'Bespoke vertical video shoot packages built specifically to drive organic engagement, virality, and brand authority across Instagram & TikTok.',
    deliverables: ['Monthly Content Buckets', 'Custom Sound Design', 'Fast-Cut Motion Captions', 'Hook Testing']
  },
  {
    num: '04',
    title: 'Corporate & Founder Story Films',
    desc: 'Documentary-style brand films capturing founder journeys, company culture, factory tours, and investor presentation video assets.',
    deliverables: ['Narrative Brand Film', 'Executive Interviews', 'B-Roll Library', 'Subtitled Masters']
  }
];

const WORKFLOW_STEPS = [
  {
    step: 'PHASE 01',
    name: 'Pre-Production',
    details: 'Concept ideation, scriptwriting, storyboarding, location scouting, talent casting, moodboards, and shot list planning.'
  },
  {
    step: 'PHASE 02',
    name: 'Production & Filming',
    details: 'On-set directing, DP operation with Arri/Sony cinema line cameras, anamorphic lenses, wireless audio, and lighting setups.'
  },
  {
    step: 'PHASE 03',
    name: 'Post-Production',
    details: 'DaVinci Resolve color grading, sound design & audio mixing, motion graphics, VFX, title design, and final multi-format export.'
  }
];

const Services = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-hero-title', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.serv-card', {
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out'
      });
      gsap.from('.workflow-step', {
        scrollTrigger: { trigger: '.workflow-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="services-page">
      <SEO
        title="Production Capabilities & Workflow | Vibrel"
        description="Comprehensive media production services — brand ads, commercial filming, live event coverage, reels production, and DaVinci post-production."
        path="/services"
      />

      {/* Hero Header */}
      <section className="services-hero">
        <div className="container">
          <p className="overline">Capabilities &amp; Cinema Standard</p>
          <h1 className="services-hero-title">
            Crafting Vision into <em>Impact</em>
          </h1>
          <p className="services-hero-desc">
            We handle everything from initial concept and scriptwriting to full-scale cinema production and high-end post-production color grading.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="services-list-section">
        <div className="container">
          <div className="services-grid">
            {PRODUCTION_SERVICES.map((serv, index) => (
              <div key={index} className="serv-card glass-card">
                <span className="serv-num">{serv.num}</span>
                <h3 className="serv-title">{serv.title}</h3>
                <p className="serv-desc">{serv.desc}</p>
                <div className="serv-deliverables">
                  <span className="serv-deliv-lbl">Deliverables:</span>
                  <div className="serv-deliv-chips">
                    {serv.deliverables.map((item, idx) => (
                      <span key={idx} className="serv-chip">✓ {item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Production Workflow */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header text-center">
            <p className="overline">Our 3-Stage Pipeline</p>
            <h2 className="section-title">The Production <em>Workflow</em></h2>
          </div>

          <div className="workflow-grid">
            {WORKFLOW_STEPS.map((wf, idx) => (
              <div key={idx} className="workflow-step glass-card">
                <span className="workflow-phase">{wf.step}</span>
                <h3 className="workflow-name">{wf.name}</h3>
                <p className="workflow-details">{wf.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Services;
