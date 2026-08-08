const STORAGE_KEY = 'vibrel_leads';

const INITIAL_SAMPLE_LEADS = [
  {
    id: 'lead-101',
    name: 'Ananya Roy',
    company: 'Lumina Noir Fragrances',
    email: 'ananya@luminanoir.com',
    phone: '+919876543210',
    category: 'Media Production',
    service: 'Brand Commercial / Ad Filming',
    budget: '₹1.5L - ₹3L',
    details: 'Need a luxury 4K video shoot for our new perfume launch in Goa.',
    status: 'New',
    createdAt: '2026-08-08 10:15 AM'
  },
  {
    id: 'lead-102',
    name: 'Vikramaditya Sharma',
    company: 'Zenith Mobility Expo',
    email: 'vikram@zenithmobility.in',
    phone: '+919812345678',
    category: 'Media Production',
    service: 'Live Event Coverage & Aftermovie',
    budget: '₹3L+ (Cinema Production)',
    details: 'Looking for 3-day multi-cam summit coverage and aerial drone highlights.',
    status: 'Contacted',
    createdAt: '2026-08-07 04:30 PM'
  },
  {
    id: 'lead-103',
    name: 'Rohan Mehta',
    company: 'Matto Hospitality',
    email: 'rohan@mattocafe.com',
    phone: '+919988776655',
    category: 'Web Development',
    service: 'Restaurant & Hospitality Portal',
    budget: '₹60k - ₹1.2L',
    details: 'Want a high-converting web app with digital menu and table reservation flow.',
    status: 'Booked',
    createdAt: '2026-08-06 02:10 PM'
  }
];

export const getLeads = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
    return INITIAL_SAMPLE_LEADS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_SAMPLE_LEADS;
  }
};

export const addLead = (leadData) => {
  const currentLeads = getLeads();
  const newLead = {
    id: `lead-${Date.now()}`,
    name: leadData.name || 'Anonymous',
    company: leadData.company || 'N/A',
    email: leadData.email || '',
    phone: leadData.phone || '',
    category: leadData.category || 'Media Production',
    service: leadData.service || 'Brand Commercial / Ad',
    budget: leadData.budget || '₹50k - ₹1.5L',
    details: leadData.details || '',
    status: 'New',
    createdAt: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  };

  const updated = [newLead, ...currentLeads];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newLead;
};

export const updateLeadStatus = (id, newStatus) => {
  const currentLeads = getLeads();
  const updated = currentLeads.map((lead) =>
    lead.id === id ? { ...lead, status: newStatus } : lead
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteLead = (id) => {
  const currentLeads = getLeads();
  const updated = currentLeads.filter((lead) => lead.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const exportLeadsCSV = () => {
  const leads = getLeads();
  if (!leads.length) return;

  const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Category', 'Service', 'Budget', 'Status', 'Details'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.createdAt}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.company.replace(/"/g, '""')}"`,
    `"${l.email}"`,
    `"${l.phone}"`,
    `"${l.category}"`,
    `"${l.service.replace(/"/g, '""')}"`,
    `"${l.budget}"`,
    `"${l.status}"`,
    `"${l.details.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Vibrel_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
