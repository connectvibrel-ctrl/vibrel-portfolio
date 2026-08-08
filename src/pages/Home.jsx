import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import VideoModal from '../components/VideoModal';
import {
  FEATURED_SHOWREEL,
  PRODUCTION_PROJECTS
} from '../data/projectsData';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

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

const AutoplayVideoCard = ({ project, isUnmuted, onAudioToggle, onSelect, registerRef }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isUnmuted;
      if (isUnmuted) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [isUnmuted]);

  const handlePlayAttempt = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoReady = (e) => {
    const video = e.target;
    if (video) {
      video.muted = !isUnmuted;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="prod-work-card glass-card clean-video-card">
      <div className="prod-card-media-wrap clean-video-wrap" onClick={handlePlayAttempt}>
        <video
          ref={(el) => {
            videoRef.current = el;
            registerRef(project.id, el);
          }}
          src={project.videoUrl}
          autoPlay
          loop
          muted={!isUnmuted}
          playsInline
          controls
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          preload="auto"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="clean-video-element"
        />
        {!isPlaying && (
          <div className="video-play-prompt-overlay">
            <button className="play-prompt-btn" type="button" onClick={handlePlayAttempt}>
              ▶ Play Video
            </button>
          </div>
        )}
        <div className="video-controls-overlay">
          <button
            type="button"
            className={`audio-toggle-btn ${isUnmuted ? 'unmuted' : ''}`}
            onClick={(e) => onAudioToggle(e, project.id)}
            aria-label={isUnmuted ? 'Mute audio' : 'Unmute audio'}
          >
            {isUnmuted ? '🔊 Sound On' : '🔇 Mute'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const rootRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [unmutedVideoId, setUnmutedVideoId] = useState(null);
  const videoRefs = useRef({});

  const registerVideoRef = useCallback((id, el) => {
    if (el) {
      videoRefs.current[id] = el;
    }
  }, []);

  const handleAudioToggle = (e, projectId) => {
    e.stopPropagation();
    const nextUnmutedId = unmutedVideoId === projectId ? null : projectId;
    setUnmutedVideoId(nextUnmutedId);

    Object.keys(videoRefs.current).forEach((id) => {
      const videoEl = videoRefs.current[id];
      if (videoEl) {
        if (id === nextUnmutedId) {
          videoEl.muted = false;
          videoEl.play().catch(() => {});
        } else {
          videoEl.muted = true;
        }
      }
    });
  };

  const runAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      /* Hero Entrance */
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-title-word', {
        y: '110%',
        duration: 1.35,
        ease: 'power4.out',
        stagger: window.innerWidth < 768 ? 0 : 0.06,
        delay: 0.45,
      });
      gsap.from('.hero-desc', { y: 30, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 1 });
      gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 1.2 });

      /* Production Works Reveal */
      gsap.from('.prod-work-card', {
        scrollTrigger: { trigger: '.prod-works-grid', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out'
      });

      /* Bento Capabilities Reveal */
      gsap.from('.bento-card', {
        scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out'
      });

      /* Stats Counter Reveal */
      gsap.from('.stat-box', {
        scrollTrigger: { trigger: '.prod-stats-bar', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out'
      });
    }, rootRef);

    return ctx;
  }, []);

  useEffect(() => {
    const ctx = runAnimations();
    const timer = setTimeout(() => {
      Object.values(videoRefs.current).forEach((videoEl) => {
        if (videoEl) {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        }
      });
    }, 150);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [runAnimations]);

  return (
    <div ref={rootRef}>
      <SEO
        title="Vibrel — Premiere Media Production House | Brand Ads, Commercials & Event Coverage"
        description="Vibrel is a cinematic media production house and creative studio based in Delhi NCR, specializing in brand films, commercial ad filming, event coverage, and high-conversion visual storytelling across India."
        path="/"
      />

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="hero" aria-label="Hero">
        <div className="hero-watermark" aria-hidden="true">VIBREL</div>
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-video-bg">
          <video
            src={FEATURED_SHOWREEL.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="hero-bg-media"
          />
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow overline">Vibrel — Cinema &amp; Media Production Studio</p>

          <h1 className="hero-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em' }}>
            <SplitWord word="We" color="#f0ede8" wKey="w1" />
            <SplitWord word="Direct." color="#e6c875" wKey="w2" />
            <SplitWord word="We" color="#f0ede8" wKey="w3" />
            <SplitWord word="Film." color="#e6c875" wKey="w4" />
            <SplitWord word="We" color="#f0ede8" wKey="w5" />
            <SplitWord word="Produce." color="#10b981" wKey="w6" />
          </h1>

          <p className="hero-desc">
            High-impact visual production house for brands, commercial ad campaigns, live event coverage, and cinema storytelling.
          </p>

          <div className="hero-actions">
            <button
              onClick={() => setSelectedVideo(FEATURED_SHOWREEL)}
              className="btn-accent hover-target play-showreel-btn"
            >
              <span className="play-icon">▶</span> Watch 2026 Showreel
            </button>
            <Link to="/contact" className="btn-ghost hover-target">
              Book a Production
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ TICKER ══════════════ */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker">
          <div className="ticker-track">
            {[
              'BRAND AD FILMING', 'LIVE EVENT COVERAGE', 'COMMERCIAL PRODUCTION', 'HIGH-VOLUME REELS', '4K CINEMA GEAR',
              'BRAND AD FILMING', 'LIVE EVENT COVERAGE', 'COMMERCIAL PRODUCTION', 'HIGH-VOLUME REELS', '4K CINEMA GEAR'
            ].map((t, i) => (
              <span key={i} className="ticker-item">
                {t}<span className="ticker-sep">✦</span>
              </span>
            ))}
          </div>
          <div className="ticker-track" aria-hidden="true">
            {[
              'BRAND AD FILMING', 'LIVE EVENT COVERAGE', 'COMMERCIAL PRODUCTION', 'HIGH-VOLUME REELS', '4K CINEMA GEAR',
              'BRAND AD FILMING', 'LIVE EVENT COVERAGE', 'COMMERCIAL PRODUCTION', 'HIGH-VOLUME REELS', '4K CINEMA GEAR'
            ].map((t, i) => (
              <span key={`dup-${i}`} className="ticker-item">
                {t}<span className="ticker-sep">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ LIVE PRODUCTION SHOWCASE ══════════════ */}
      <section className="prod-works-section">
        <div className="container">
          <div className="prod-works-header">
            <div>
              <p className="overline">Featured Work</p>
              <h2 className="section-title">Cinematic <em>Productions</em></h2>
            </div>
            <Link to="/work" className="btn-ghost hover-target view-all-link">
              Explore All Works →
            </Link>
          </div>

          <div className="prod-works-grid">
            {PRODUCTION_PROJECTS.map((project) => (
              <AutoplayVideoCard
                key={project.id}
                project={project}
                isUnmuted={unmutedVideoId === project.id}
                onAudioToggle={handleAudioToggle}
                onSelect={setSelectedVideo}
                registerRef={registerVideoRef}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ IMPACT STATS ══════════════ */}
      <section className="prod-stats-bar">
        <div className="container">
          <div className="stats-grid">
            {FEATURED_SHOWREEL.stats.map((stat, i) => (
              <div key={i} className="stat-box">
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lbl">{stat.label}</span>
              </div>
            ))}
            <div className="stat-box">
              <span className="stat-val">100%</span>
              <span className="stat-lbl">On-Time Master Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CAPABILITIES BENTO ══════════════ */}
      <section className="bento-section" aria-labelledby="bento-heading">
        <div className="container">
          <div className="bento-header text-center">
            <p className="overline">Full-Spectrum Media Studio</p>
            <h2 className="section-title" id="bento-heading">Our Production <em>Capabilities</em></h2>
            <p className="bento-subtitle">End-to-end cinema production pipeline engineered for brand impact, broadcast standards, and high conversion.</p>
          </div>

          <div className="bento-grid">
            {/* Card 01 — Featured Large */}
            <div className="bento-card glass-card bento-card-large">
              <div className="bento-card-top">
                <span className="bento-num">01 / FEATURED</span>
                <span className="bento-badge badge-gold">CINEMA 4K HDR</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-title">Commercial &amp; Brand Ad Filming</h3>
                <p className="bento-desc">
                  From high-concept scriptwriting and director storyboards to broadcast cinema camera setups (Arri / Sony FX Line). We engineer television commercials and digital ad campaigns designed for conversion and brand dominance.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-chip">Arri / Sony Cinema</span>
                <span className="bento-chip">Broadcast Audio</span>
                <span className="bento-chip">16:9 &amp; 9:16 Masters</span>
              </div>
            </div>

            {/* Card 02 — Event Coverage */}
            <div className="bento-card glass-card">
              <div className="bento-card-top">
                <span className="bento-num">02</span>
                <span className="bento-badge">MULTI-CAM</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-title">Live Event Coverage</h3>
                <p className="bento-desc">
                  Multi-camera dynamic shooting for corporate summits, music festivals, luxury product launches, and galas with rapid 24-48h aftermovie turnaround.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-chip">24-48h Delivery</span>
                <span className="bento-chip">Drone Aerials</span>
              </div>
            </div>

            {/* Card 03 — Social Reels */}
            <div className="bento-card glass-card">
              <div className="bento-card-top">
                <span className="bento-num">03</span>
                <span className="bento-badge">VERTICAL VIRALITY</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-title">High-Volume Reels &amp; Shorts</h3>
                <p className="bento-desc">
                  Fast-cut vertical video production optimized for Instagram Reels, YouTube Shorts, and TikTok campaigns with sound design and hook editing.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-chip">Monthly Buckets</span>
                <span className="bento-chip">Sound Design</span>
              </div>
            </div>

            {/* Card 04 — Post-Production */}
            <div className="bento-card glass-card bento-card-wide">
              <div className="bento-card-top">
                <span className="bento-num">04</span>
                <span className="bento-badge badge-emerald">DAVINCI MASTER</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-title">Full Post-Production &amp; Color Grading</h3>
                <p className="bento-desc">
                  DaVinci Resolve Master Color Grading, sound engineering, custom voiceovers, VFX, title animation, and multi-ratio master export.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-chip">Color Grading</span>
                <span className="bento-chip">VFX &amp; Motion</span>
                <span className="bento-chip">Spatial Audio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WEB STUDIO BANNER ══════════════ */}
      <section className="web-banner-section">
        <div className="container">
          <div className="web-banner-card glass-card">
            <div>
              <span className="web-banner-badge">WEB STUDIO DIVISION</span>
              <h3 className="web-banner-title">Need a High-Converting Website for Your Brand?</h3>
              <p className="web-banner-desc">
                We also build lightning-fast, high-performance websites &amp; local SEO systems designed to convert viewers into paying customers.
              </p>
            </div>
            <Link to="/web-services" className="btn-accent hover-target">
              Explore Web Studio →
            </Link>
          </div>
        </div>
      </section>



      {/* Video Lightbox Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        client={selectedVideo?.client}
        deliverables={selectedVideo?.deliverables}
      />
    </div>
  );
};

export default Home;
