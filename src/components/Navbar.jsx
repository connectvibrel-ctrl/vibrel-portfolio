import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NAV_PATHS = ['/', '/services', '/work', '/contact'];
const NAV_LABELS = ['Home', 'Services', 'Work', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [isDragMode, setIsDragMode]   = useState(false);
  const [dragActivePath, setDragActivePath] = useState(null);
  const hoverTimer = useRef(null);
  const navigate   = useNavigate();

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Body scroll-lock when menu is open ──
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow    = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow    = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow    = '';
      document.body.style.touchAction = '';
    };
  }, [menuOpen]);

  // ── Haptic feedback on option switch ──
  useEffect(() => {
    if (dragActivePath && navigator?.vibrate) {
      navigator.vibrate(25);
    }
  }, [dragActivePath]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ── Y-axis proximity detection (allows scrubbing blank space) ──
  const getPathFromY = useCallback((y) => {
    const links = document.querySelectorAll('[data-path]');
    let closestPath = null;
    let minDist = Infinity;
    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const dist = Math.abs(y - (rect.top + rect.height / 2));
      if (dist < 80 && dist < minDist) {
        minDist = dist;
        closestPath = link.dataset.path;
      }
    });
    return closestPath;
  }, []);

  // ── Touch gesture handlers ──
  const handleTouchStart = useCallback((e) => {
    const { clientY } = e.touches[0];
    hoverTimer.current = setTimeout(() => {
      setIsDragMode(true);
      setDragActivePath(getPathFromY(clientY));
    }, 500);
  }, [getPathFromY]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragMode) return;
    if (e.cancelable) e.preventDefault();
    setDragActivePath(getPathFromY(e.touches[0].clientY));
  }, [isDragMode, getPathFromY]);

  const handleTouchEnd = useCallback((e) => {
    clearTimeout(hoverTimer.current);
    if (isDragMode) {
      if (dragActivePath) {
        navigate(dragActivePath);
        closeMenu();
      }
      setIsDragMode(false);
      setDragActivePath(null);
      if (e.cancelable) e.preventDefault();
    }
  }, [isDragMode, dragActivePath, navigate, closeMenu]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-is-open' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand-logo hover-target" onClick={closeMenu} aria-label="Vibrel Home">
            VIBREL<span className="brand-dot">.</span>
          </Link>

          <div className="nav-desktop">
            {NAV_PATHS.slice(0, 4).map((path, i) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                end={path === '/'}
              >
                {NAV_LABELS[i]}
              </NavLink>
            ))}
            <Link to="/contact" className="nav-cta hover-target">Start Project</Link>
          </div>

          <button
            className={`menu-toggle hover-target${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="line line-1" />
            <span className="line line-2" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fs-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="fs-menu__inner">
          <nav className="fs-menu__links" aria-label="Mobile navigation">
            {NAV_PATHS.map((path, i) => (
              <NavLink
                key={path}
                to={path}
                data-path={path}
                end={path === '/'}
                onClick={(e) => {
                  if (isDragMode) { e.preventDefault(); return; }
                  closeMenu();
                }}
                className={({ isActive }) =>
                  `fs-link${(isActive && !isDragMode) ? ' active' : ''}${dragActivePath === path ? ' drag-hover' : ''}`
                }
                style={{ '--i': i }}
              >
                <span className="fs-link__dot" aria-hidden="true" />
                {NAV_LABELS[i]}
              </NavLink>
            ))}
          </nav>
          <div className="fs-menu__footer">
            <a
              href="https://wa.me/918882636063?text=Hi!%20Can%20we%20connect%20to%20discuss%20a%20potential%20website%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target"
            >
              WhatsApp
            </a>
            <a href="mailto:connect.vibrel@gmail.com" className="hover-target">
              connect.vibrel@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
