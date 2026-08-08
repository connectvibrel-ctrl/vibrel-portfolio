import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './PageStyles.css';
import './Work.css';

const Work = () => {
  return (
    <div className="work-dev-page">
      <SEO
        title="Portfolio Archive — In Development | Vibrel Studio"
        description="Vibrel Media Production archive and full portfolio showcase is currently in development process."
        path="/work"
      />

      <div className="work-dev-card glass-card text-center">
        <span className="work-dev-badge">STUDIO ARCHIVE</span>
        <h1 className="work-dev-title">
          In <em>Development</em> Process
        </h1>
        <p className="work-dev-desc">
          Our complete media production showcase, client case studies, and 4K cinema reel library are currently under active curation.
        </p>

        <div className="work-dev-actions">
          <Link to="/" className="btn-accent hover-target">
            ← Return to Home Showcase
          </Link>
          <Link to="/contact" className="btn-ghost hover-target">
            Book Production Shoot
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
