import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SEO from '../components/SEO';
import './PageStyles.css';
import './Contact.css';

import { addLead } from '../utils/leadStorage';

const Contact = () => {
  const [projectCategory, setProjectCategory] = useState('Media Production');
  const [selectedService, setSelectedService] = useState('Brand Commercial / Ad');
  const [budgetTier, setBudgetTier] = useState('₹50k - ₹1.5L');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.contact-form-wrap', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySwitch = (cat) => {
    setProjectCategory(cat);
    if (cat === 'Media Production') {
      setSelectedService('Brand Commercial / Ad');
      setBudgetTier('₹50k - ₹1.5L');
    } else {
      setSelectedService('Custom Web Application');
      setBudgetTier('₹40k - ₹1L');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead to local storage for Admin Portal
    addLead({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      category: projectCategory,
      service: selectedService,
      budget: budgetTier,
      details: formData.details
    });

    // Build pre-filled WhatsApp message URL
    const messageText = `Hi Vibrel Team!%0A%0AI would like to start a *${projectCategory}* project.%0A*Service:* ${selectedService}%0A*Budget:* ${budgetTier}%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Details:* ${formData.details}`;
    const whatsappUrl = `https://wa.me/918882636063?text=${messageText}`;

    // Open WhatsApp after brief state change
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div ref={rootRef} className="contact-page">
      <SEO
        title="Book a Production / Project | Vibrel"
        description="Book your next brand ad shoot, event coverage, commercial film, or custom web development project with Vibrel."
        path="/contact"
      />

      <section className="contact-hero">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column — Info */}
            <div className="contact-info">
              <p className="overline">Production &amp; Web Studio Booking</p>
              <h1 className="contact-title">
                Let's Bring Your <em>Vision To Life</em>
              </h1>
              <p className="contact-desc">
                Whether you need a full cinema crew for a brand commercial, multi-cam event coverage, high-volume reels, or a bespoke website — we are ready.
              </p>

              <div className="contact-direct-links">
                <div className="contact-link-item">
                  <span className="contact-link-label">Direct WhatsApp</span>
                  <a
                    href="https://wa.me/918882636063?text=Hi!%20I'd%20like%20to%20discuss%20a%20production%20%2F%20web%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-val hover-target"
                  >
                    +91 88826 36063 →
                  </a>
                </div>

                <div className="contact-link-item">
                  <span className="contact-link-label">Direct Email</span>
                  <a href="mailto:connect.vibrel@gmail.com" className="contact-link-val hover-target">
                    connect.vibrel@gmail.com →
                  </a>
                </div>

                <div className="contact-link-item">
                  <span className="contact-link-label">Base Studio</span>
                  <span className="contact-link-val">Delhi NCR, India (Coverage Nationwide)</span>
                </div>
              </div>
            </div>

            {/* Right Column — Booking Form */}
            <div className="contact-form-wrap glass-card">
              {submitted ? (
                <div className="contact-success text-center">
                  <span className="success-icon">✓</span>
                  <h2>Inquiry Prepared!</h2>
                  <p>Redirecting you directly to our WhatsApp booking desk...</p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost" style={{ marginTop: '1.5rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="form-heading">Project Intake Form</h3>

                  {/* Division Toggle */}
                  <div className="form-toggle-group">
                    <button
                      type="button"
                      className={`toggle-btn ${projectCategory === 'Media Production' ? 'active' : ''}`}
                      onClick={() => handleCategorySwitch('Media Production')}
                    >
                      🎬 Media Production (Primary)
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${projectCategory === 'Web Development' ? 'active' : ''}`}
                      onClick={() => handleCategorySwitch('Web Development')}
                    >
                      💻 Web Studio
                    </button>
                  </div>

                  {/* Service Specific Selector */}
                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <select
                      className="form-input"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      {projectCategory === 'Media Production' ? (
                        <>
                          <option value="Brand Commercial / Ad">Brand Commercial / Ad Filming</option>
                          <option value="Live Event Coverage">Live Event Coverage &amp; Aftermovie</option>
                          <option value="Social Reels & Shorts Campaign">High-Volume Reels &amp; Shorts Campaign</option>
                          <option value="Founder Story / Corporate Film">Founder Story / Corporate Brand Film</option>
                          <option value="Full Campaign (Ad + Web)">Full Campaign (Media Shoot + Web Studio)</option>
                        </>
                      ) : (
                        <>
                          <option value="Custom Web Application">Custom React/Vite Web Application</option>
                          <option value="Local SEO & Search Dominance">Local SEO &amp; Search Dominance Package</option>
                          <option value="Restaurant & Hospitality Portal">Restaurant / Cafe Digital Ordering Portal</option>
                          <option value="Brand Website Redesign">Full Brand Website Redesign</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div className="form-group">
                    <label className="form-label">Estimated Budget Tier</label>
                    <div className="budget-chips">
                      {projectCategory === 'Media Production'
                        ? ['₹50k - ₹1.5L', '₹1.5L - ₹3L', '₹3L+ (Cinema Production)'].map((b) => (
                            <button
                              type="button"
                              key={b}
                              className={`budget-chip ${budgetTier === b ? 'active' : ''}`}
                              onClick={() => setBudgetTier(b)}
                            >
                              {b}
                            </button>
                          ))
                        : ['₹30k - ₹60k', '₹60k - ₹1.2L', '₹1.2L+ (Enterprise Web)'].map((b) => (
                            <button
                              type="button"
                              key={b}
                              className={`budget-chip ${budgetTier === b ? 'active' : ''}`}
                              onClick={() => setBudgetTier(b)}
                            >
                              {b}
                            </button>
                          ))}
                    </div>
                  </div>

                  {/* User Input Fields */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company / Brand</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Lumina Apparel"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="rahul@lumina.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Details / Brief</label>
                    <textarea
                      name="details"
                      rows="4"
                      placeholder="Tell us about your shoot locations, timelines, key goals, or ideas..."
                      value={formData.details}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="btn-accent hover-target submit-btn">
                    Submit Inquiry &amp; Open WhatsApp →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
