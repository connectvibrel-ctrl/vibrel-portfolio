/**
 * SEO.jsx — Universal SEO, GEO & AEO component
 * Manages per-page title, meta, Open Graph, Twitter Card,
 * canonical URL, and injects JSON-LD structured data.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL  = 'https://vibrel.in';
const SITE_NAME = 'Vibrel';
const OG_IMAGE  = `${SITE_URL}/Vibrel.jpeg`;
const TWITTER_HANDLE = '@vibrel';

// ── Organisation / Local Business JSON-LD (shared across all pages) ──
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Vibrel',
  alternateName: 'Vibrel Web Solutions',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE,
  description:
    'Vibrel is a premium web design and digital growth agency based in Delhi, India. We engineer immersive, data-driven digital experiences that drive measurable revenue growth for restaurants, cafes, bars and ambitious organisations.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
    postalCode: '110001',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6139,
    longitude: 77.2090,
  },
  areaServed: [
    { '@type': 'City',    name: 'Delhi' },
    { '@type': 'City',    name: 'Mumbai' },
    { '@type': 'City',    name: 'Bangalore' },
    { '@type': 'City',    name: 'Hyderabad' },
    { '@type': 'Country', name: 'India' },
  ],
  telephone: '+918882636063',
  email: 'connect.vibrel@gmail.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+918882636063',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'IN',
  },
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, UPI',
  openingHours: 'Mo-Sa 10:00-19:00',
  sameAs: [
    'https://wa.me/918882636063',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vibrel Web Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO Optimisation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Premium Web Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'First-Party Data Systems' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interactive Digital Assets' } },
    ],
  },
};

// ── Website schema with SearchAction (AEO: voice/AI search) ──
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Premium web agency engineering digital dominance for ambitious organisations across India.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ── FAQ schema (AEO: featured snippets & AI answer boxes) ──
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Vibrel do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibrel is a premium web design and digital growth agency based in Delhi, India. We specialise in local SEO, atmospheric web design, first-party data systems, and interactive digital experiences that turn clicks into paying customers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Vibrel located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibrel is headquartered in Delhi, India, and serves clients across the country including Mumbai, Bangalore, and Hyderabad.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Vibrel charge for a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibrel offers bespoke premium web solutions tailored to each client\'s goals and scale. Contact us at connect.vibrel@gmail.com or via WhatsApp for a personalised quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does Vibrel work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibrel works with restaurants, cafes, bars, retail brands, and any ambitious organisation that demands a dominant digital presence and measurable growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take Vibrel to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary by scope, but Vibrel typically delivers fully custom websites within 2–4 weeks. Contact us to discuss your specific requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vibrel offer SEO services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Local SEO Optimisation is one of Vibrel\'s core services. We ensure your organisation ranks at the top of local search results through Google Business Profile mastery, geofenced keyword targeting, and reputation management.',
      },
    },
  ],
};

// ── AggregateRating + Review schema (real client testimonials → star ratings in SERPs) ──
const REVIEW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Vibrel',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '2',
    reviewCount: '2',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Shewta Basin',
        jobTitle: 'Manager',
        worksFor: { '@type': 'Organization', name: 'Glow Cafe' },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody:
        'Vibrel transformed our online presence entirely. We saw a 300% increase in direct conversions within the first two months.',
      datePublished: '2025-12-01',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Siddhant Malik',
        jobTitle: 'Owner',
        worksFor: { '@type': 'Organization', name: 'Matto Bakery' },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody:
        'Vibrel built exactly what I needed and made the entire website process effortless. Anytime I reach out with a question or tweak, they are on it immediately!',
      datePublished: '2025-11-15',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

// ── HowTo schema (AEO: "How to get a website from Vibrel" → AI How-To cards) ──
const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Vibrel Builds Your Website',
  description:
    'Vibrel follows a proven 5-step process to engineer premium, conversion-focused websites that dominate local search and turn visitors into paying customers.',
  totalTime: 'P3W',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    value: 'Variable — contact for a personalised quote',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Discovery Call',
      text: 'We start with a free discovery call to understand your business, goals, target audience, and market position. No commitment required.',
      url: `${SITE_URL}/contact`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Strategy & Design',
      text: 'Our team crafts a bespoke design strategy — visual identity, information architecture, and conversion flows — tailored specifically to your brand.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Development',
      text: 'We build your site with lightning-fast, mobile-first code. Every animation, interaction, and page is engineered for both performance and visual impact.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'SEO & Launch',
      text: 'Before going live, we implement full local SEO optimisation — Google Business Profile, schema markup, sitemap, and geo-targeting — then deploy to a global CDN.',
      url: `${SITE_URL}/services`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Ongoing Support',
      text: 'Post-launch, we remain your digital partner. We monitor performance, run updates, and scale your digital presence as your business grows.',
      url: `${SITE_URL}/contact`,
    },
  ],
};

// ── Speakable schema (AEO: voice search — Google Assistant, Alexa, smart speakers) ──
const SPEAKABLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Vibrel — Engineering Digital Dominance',
  url: SITE_URL,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: [
      '.hero-title',
      '.hero-desc',
      '.statement-headline',
      '.footer-cta-title',
    ],
  },
};


const SEO = ({
  title,
  description,
  path = '/',
  additionalSchema = null,
}) => {
  const fullTitle    = title ? `${title} | Vibrel` : 'Vibrel — Engineering Digital Dominance';
  const canonicalURL = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalURL} />

      {/* Geo targeting (GEO) */}
      <meta name="geo.region"   content="IN-DL" />
      <meta name="geo.placename" content="Delhi" />
      <meta name="geo.position" content="28.6139;77.2090" />
      <meta name="ICBM"         content="28.6139, 77.2090" />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalURL} />
      <meta property="og:type"        content="website" />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:image:width"  content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* JSON-LD — Organization + Website (shared) */}
      <script type="application/ld+json">
        {JSON.stringify(ORGANIZATION_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(WEBSITE_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(FAQ_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(REVIEW_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(HOWTO_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(SPEAKABLE_SCHEMA)}
      </script>

      {/* Optional per-page extra schema */}
      {additionalSchema && (
        <script type="application/ld+json">
          {JSON.stringify(additionalSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
