import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './PageStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const rootRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        y: 80, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.3,
        clearProps: 'opacity,transform',
      });
      gsap.from('.contact-body > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.6,
        clearProps: 'opacity,transform',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Clear error as soon as user starts correcting
    if (status === 'error') { setStatus('idle'); setErrorMsg(''); }
    // Sanitise: strip HTML tags to prevent XSS
    const sanitised = value.replace(/<[^>]*>/g, '');
    setForm(prev => ({ ...prev, [id]: sanitised }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field-specific validation
    if (!form.name.trim()) {
      setErrorMsg('Please enter your full name.'); setStatus('error'); return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg('Please enter a valid email address.'); setStatus('error'); return;
    }
    if (!form.message.trim()) {
      setErrorMsg('Please tell us about your project.'); setStatus('error'); return;
    }
    if (form.message.length > 1000) {
      setErrorMsg('Message must be under 1000 characters.'); setStatus('error'); return;
    }

    setStatus('submitting');

    // Google Apps Script URL — reads FormData via e.parameter
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRvcoZRQtkwzTeynIGR5Pmx-hSWil7chVlfnQ2V_Cv5CiE8JaFV13zlt7Qi5UPsCHa/exec';

    // FormData is required — JSON bodies are silently dropped in no-cors mode
    const payload = new FormData();
    payload.append('name',     form.name.trim());
    payload.append('email',    form.email.trim());
    payload.append('business', form.business.trim() || 'Not provided');
    payload.append('message',  form.message.trim());

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',   // returns opaque response — this is expected
        body:   payload,
      });
      // Try block completely successful (CORS opaque response resolved)
      setStatus('success');
      setForm({ name: '', email: '', business: '', message: '' });
    } catch {
      // Catch block only fires if the browser blocks the connection
      setErrorMsg('Could not send. Please try WhatsApp or email directly.');
      setStatus('error');
    }
  };

  return (
    <div className="contact-page" ref={rootRef}>
      <SEO
        title="Contact Vibrel | Get a Free Web Design Quote in Delhi"
        description="Ready to dominate digitally? Contact Vibrel — Delhi's premium web agency. Reach us on WhatsApp, email connect.vibrel@gmail.com, or call +91 8882636063. Response within 24 hours."
        path="/contact"
        additionalSchema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Vibrel',
          url: 'https://vibrel.in/contact',
          description: 'Get in touch with Vibrel to discuss your web project. Based in Delhi, India.',
          mainEntity: {
            '@type': 'Organization',
            name: 'Vibrel',
            telephone: '+918882636063',
            email: 'connect.vibrel@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
          }
        }}
      />
      <section className="contact-hero" aria-label="Contact hero">
        <div className="container">
          <p className="overline" style={{ marginBottom: '1.5rem' }}>Get In Touch</p>
          <h1 className="contact-title section-title">Let's Build<br /><em>Together</em></h1>
        </div>
      </section>

      <div className="contact-body container">
        {/* Form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="cf-field">
            <label htmlFor="name" className="cf-label overline">Full Name</label>
            <input
              type="text"
              id="name"
              className="cf-input"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
              autoComplete="name"
              required
            />
          </div>
          <div className="cf-field">
            <label htmlFor="email" className="cf-label overline">Email Address</label>
            <input
              type="email"
              id="email"
              className="cf-input"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              maxLength={254}
              autoComplete="email"
              required
            />
          </div>
          <div className="cf-field">
            <label htmlFor="business" className="cf-label overline">Business Name</label>
            <input
              type="text"
              id="business"
              className="cf-input"
              placeholder="Your company"
              value={form.business}
              onChange={handleChange}
              maxLength={150}
              autoComplete="organization"
            />
          </div>
          <div className="cf-field">
            <label htmlFor="message" className="cf-label overline">
              Message <span style={{ opacity: 0.4, fontSize: '0.7em' }}>({form.message.length}/1000)</span>
            </label>
            <textarea
              id="message"
              className="cf-input cf-textarea"
              rows="5"
              placeholder="Tell us about your vision..."
              value={form.message}
              onChange={handleChange}
              maxLength={1000}
              required
            />
          </div>

          {status === 'error' && (
            <p role="alert" style={{ color: '#e07070', fontSize: '0.8rem', marginBottom: '1rem' }}>
              ⚠ {errorMsg || 'Please fill in all required fields with valid information.'}
            </p>
          )}
          {status === 'success' && (
            <p role="status" style={{ color: '#8FA68E', fontSize: '0.9rem', marginBottom: '1rem' }}>
              ✓ Message received. We'll be in touch within 24 hours.
            </p>
          )}

          <button
            type="submit"
            className="btn-accent hover-target cf-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        {/* Info */}
        <div className="contact-info" aria-label="Contact information">
          <div className="ci-item">
            <p className="overline" style={{ marginBottom: '0.75rem' }}>Location</p>
            <p className="ci-value">Delhi, India</p>
          </div>
          <div className="ci-item">
            <p className="overline" style={{ marginBottom: '0.75rem' }}>Inquiries</p>
            <a href="mailto:connect.vibrel@gmail.com" className="ci-link hover-target">connect.vibrel@gmail.com</a>
            <a href="tel:+918882636063" className="ci-link hover-target">+91 8882636063</a>
            <a
              href="https://wa.me/918882636063?text=Hi!%20Can%20we%20connect%20to%20discuss%20a%20potential%20website%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="ci-link ci-whatsapp hover-target"
            >
              Start WhatsApp Chat →
            </a>
          </div>
          <div className="ci-item ci-note">
            <p>Our typical response time is within 24 hours. Let's engineer your digital dominance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
