import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import {
  getLeads,
  updateLeadStatus,
  deleteLead,
  addLead,
  exportLeadsCSV
} from '../utils/leadStorage';
import './AdminPortal.css';

const DEFAULT_PIN = 'vibrel2026';

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Selected lead for detail modal
  const [activeLeadModal, setActiveLeadModal] = useState(null);
  
  // Manual lead creation modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Media Production',
    service: 'Brand Commercial / Ad Filming',
    budget: '₹50k - ₹1.5L',
    details: ''
  });

  useEffect(() => {
    // Check if session is already authenticated
    const authSession = sessionStorage.getItem('vibrel_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    setLeads(getLeads());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vibrel_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('vibrel_admin_auth', 'true');
    setPinError(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vibrel_admin_auth');
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updated = deleteLead(id);
      setLeads(updated);
      if (activeLeadModal?.id === id) setActiveLeadModal(null);
    }
  };

  const handleAddManualLead = (e) => {
    e.preventDefault();
    addLead(newLeadForm);
    setLeads(getLeads());
    setShowAddModal(false);
    setNewLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      category: 'Media Production',
      service: 'Brand Commercial / Ad Filming',
      budget: '₹50k - ₹1.5L',
      details: ''
    });
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || lead.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const mediaLeads = leads.filter((l) => l.category === 'Media Production').length;
  const webLeads = leads.filter((l) => l.category === 'Web Development').length;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <SEO title="Admin Lead Portal Login | Vibrel Studio" path="/admin" />
        <div className="login-card glass-card">
          <div className="login-logo">
            VIBREL<span className="brand-dot">.</span>
            <span className="login-badge">STUDIO ADMIN</span>
          </div>
          <h1 className="login-title">Lead Portal Authentication</h1>
          <p className="login-desc">Enter studio passkey to access client inquiries &amp; booking pipeline.</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="Enter passcode (default: vibrel2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="login-input"
            />
            {pinError && <p className="login-error">Incorrect passcode. Try `vibrel2026`.</p>}

            <button type="submit" className="btn-accent login-btn">
              Unlock Lead Dashboard
            </button>
            <button type="button" onClick={handleQuickDemoLogin} className="btn-ghost demo-login-btn">
              Quick Demo Unlock →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-page">
      <SEO title="Admin Lead Console | Vibrel" path="/admin" />

      <div className="container">
        {/* Header Bar */}
        <header className="admin-header">
          <div>
            <span className="admin-badge">MANAGEMENT CONSOLE</span>
            <h1 className="admin-title">Client Lead Pipeline</h1>
          </div>
          <div className="admin-header-actions">
            <button onClick={() => setShowAddModal(true)} className="btn-accent action-btn">
              + Add Lead
            </button>
            <button onClick={exportLeadsCSV} className="btn-ghost action-btn">
              📥 Export CSV
            </button>
            <button onClick={handleLogout} className="btn-ghost action-btn logout-btn">
              Lock Portal
            </button>
          </div>
        </header>

        {/* Dashboard Metrics */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card glass-card">
            <span className="stat-card-title">Total Inquiries</span>
            <span className="stat-card-val">{totalLeads}</span>
            <span className="stat-card-sub">All Received Leads</span>
          </div>
          <div className="admin-stat-card glass-card highlight-card">
            <span className="stat-card-title">New Inquiries</span>
            <span className="stat-card-val">{newLeads}</span>
            <span className="stat-card-sub">Requires Follow-up</span>
          </div>
          <div className="admin-stat-card glass-card">
            <span className="stat-card-title">Media Production</span>
            <span className="stat-card-val">{mediaLeads}</span>
            <span className="stat-card-sub">Shoots &amp; Ads</span>
          </div>
          <div className="admin-stat-card glass-card">
            <span className="stat-card-title">Web Studio</span>
            <span className="stat-card-val">{webLeads}</span>
            <span className="stat-card-sub">Web &amp; SEO Projects</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="admin-controls-bar glass-card">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by client name, company, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="filter-group">
            <span className="filter-lbl">Status:</span>
            {['All', 'New', 'Contacted', 'Booked', 'Archived'].map((st) => (
              <button
                key={st}
                className={`filter-pill ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-lbl">Division:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="admin-select"
            >
              <option value="All">All Divisions</option>
              <option value="Media Production">Media Production</option>
              <option value="Web Development">Web Studio</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="admin-table-wrap glass-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date / ID</th>
                <th>Client Name &amp; Company</th>
                <th>Division &amp; Service</th>
                <th>Budget Tier</th>
                <th>Contact Info</th>
                <th>Status</th>
                <th>Workable Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center empty-table-msg">
                    No leads found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                  const whatsappMsg = `Hi ${lead.name}, thank you for contacting Vibrel regarding your ${lead.service} inquiry! When would be a good time to connect?`;
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                  return (
                    <tr key={lead.id}>
                      <td>
                        <span className="table-date">{lead.createdAt}</span>
                        <span className="table-id">{lead.id}</span>
                      </td>
                      <td>
                        <div className="client-name">{lead.name}</div>
                        <div className="client-company">{lead.company}</div>
                      </td>
                      <td>
                        <span className={`cat-tag ${lead.category === 'Media Production' ? 'media' : 'web'}`}>
                          {lead.category}
                        </span>
                        <div className="service-name">{lead.service}</div>
                      </td>
                      <td>
                        <span className="budget-tag">{lead.budget}</span>
                      </td>
                      <td>
                        <div className="contact-line">📧 {lead.email}</div>
                        <div className="contact-line">📞 {lead.phone}</div>
                      </td>
                      <td>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`status-select status-${lead.status.toLowerCase()}`}
                        >
                          <option value="New">🟢 New</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="Booked">🔵 Booked</option>
                          <option value="Archived">⚪ Archived</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          {cleanPhone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-btn-small wa-btn"
                              title="Chat on WhatsApp"
                            >
                              💬 WA
                            </a>
                          )}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}?subject=Vibrel%20Inquiry%20—%20${encodeURIComponent(lead.service)}`}
                              className="action-btn-small email-btn"
                              title="Send Email"
                            >
                              ✉ Email
                            </a>
                          )}
                          <button
                            onClick={() => setActiveLeadModal(lead)}
                            className="action-btn-small view-btn"
                            title="View Full Brief"
                          >
                            👁 View
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="action-btn-small delete-btn"
                            title="Delete Lead"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Brief Modal */}
      {activeLeadModal && (
        <div className="admin-modal-backdrop" onClick={() => setActiveLeadModal(null)}>
          <div className="admin-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setActiveLeadModal(null)}>✕</button>
            <span className="admin-badge">FULL INQUIRE BRIEF</span>
            <h2 className="modal-lead-title">{activeLeadModal.name} — {activeLeadModal.company}</h2>
            
            <div className="modal-grid">
              <div><strong>Division:</strong> {activeLeadModal.category}</div>
              <div><strong>Service:</strong> {activeLeadModal.service}</div>
              <div><strong>Budget Tier:</strong> {activeLeadModal.budget}</div>
              <div><strong>Submitted:</strong> {activeLeadModal.createdAt}</div>
              <div><strong>Email:</strong> {activeLeadModal.email}</div>
              <div><strong>Phone:</strong> {activeLeadModal.phone}</div>
            </div>

            <div className="modal-brief-section">
              <h4 className="modal-brief-heading">Project Brief / Client Message:</h4>
              <p className="modal-brief-text">{activeLeadModal.details || 'No detailed message provided.'}</p>
            </div>

            <div className="modal-actions">
              <a
                href={`https://wa.me/${activeLeadModal.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Launch WhatsApp Chat →
              </a>
              <button onClick={() => setActiveLeadModal(null)} className="btn-ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            <h2 className="modal-lead-title">Add Manual Client Lead</h2>

            <form onSubmit={handleAddManualLead} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Brand</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Division</label>
                  <select
                    className="form-input"
                    value={newLeadForm.category}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, category: e.target.value })}
                  >
                    <option value="Media Production">Media Production</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget Tier</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Brief</label>
                <textarea
                  rows="3"
                  className="form-input"
                  value={newLeadForm.details}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, details: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-accent">Save Lead</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
