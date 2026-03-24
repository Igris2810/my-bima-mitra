import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== CONSTANTS =====
const WA_MSG = encodeURIComponent("Hi, I'd like a free consultation");
const WA_LINK = `https://wa.me/918319600171?text=${WA_MSG}`;

// ===== GLOBAL CSS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand: #2563eb;       /* Vibrant FinTech Blue */
    --brand-hover: #1d4ed8; 
    --dark: #0f172a;        /* Deep Slate for Headings */
    --text: #334155;        /* Soft Slate for Body Text */
    --muted: #64748b;
    --bg: #f8fafc;          /* Very light cool gray background */
    --surface: #ffffff;
    --border: #e2e8f0;
    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 24px;
    --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
    --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  h1, h2, h3, h4, h5, h6 { color: var(--dark); font-weight: 800; letter-spacing: -0.03em; }
  a { text-decoration: none; color: inherit; }
  button, select, input, textarea { font-family: 'Plus Jakarta Sans', sans-serif; }

  /* ---- Animations ---- */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* ---- Google Translate Widget Override ---- */
  #google_translate_element, .skiptranslate, .goog-te-banner-frame { display: none !important; }
  body { top: 0 !important; }
  .goog-tooltip, .goog-tooltip:hover { display: none !important; }
  .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }

  .lang-toggle {
    display: flex; align-items: center; justify-content: center;
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--surface); border: 1px solid var(--border);
    cursor: pointer; margin-right: 16px;
    transition: var(--transition); box-shadow: var(--shadow-sm); outline: none;
  }
  .lang-toggle:hover { border-color: var(--brand); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .lang-hi { color: var(--dark); font-weight: 800; font-size: 15px; }
  .lang-divider { color: #cbd5e1; margin: 0 4px; font-size: 14px; font-weight: 300; }
  .lang-en { color: #f97316; font-weight: 800; font-size: 15px; }

  /* ---- Top Announce Bar ---- */
  .announce-bar { background: var(--dark); color: white; text-align: center; padding: 10px 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .announce-bar a { color: #facc15; margin-left: 8px; text-decoration: underline; transition: var(--transition); }
  .announce-bar a:hover { color: white; }

  /* ---- Navbar ---- */
  .navbar-container { position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .navbar { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 16px 24px; }
  .navbar-brand { display: flex; align-items: center; gap: 16px; transition: var(--transition); }
  .navbar-brand:hover { opacity: 0.9; }
  .navbar-logo { height: 64px; object-fit: contain; } /* Made Logo Bigger */
  .navbar-title { font-size: 24px; font-weight: 900; color: var(--dark); line-height: 1; margin-bottom: 4px; }
  .navbar-sub { font-size: 11px; color: var(--brand); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  
  .navbar-links { display: flex; align-items: center; gap: 8px; }
  .nav-link { padding: 10px 18px; border-radius: var(--radius-sm); font-weight: 600; font-size: 15px; color: var(--text); transition: var(--transition); }
  .nav-link:hover { background: #f1f5f9; color: var(--dark); }
  .nav-link.cta { background: var(--brand); color: white; box-shadow: var(--shadow-sm); }
  .nav-link.cta:hover { background: var(--brand-hover); color: white; transform: translateY(-1px); box-shadow: var(--shadow-md); }

  /* ---- Hero Section (FinTech Style Grid Background) ---- */
  .hero { 
    padding: 100px 24px 80px; 
    background-color: var(--surface);
    background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
    background-size: 24px 24px;
    border-bottom: 1px solid var(--border);
  }
  .hero-inner { max-width: 1200px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 60px; }
  .hero-text { max-width: 600px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: var(--bg); border: 1px solid var(--border); padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 24px; box-shadow: var(--shadow-sm); }
  .hero-badge-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 0 4px #d1fae5; }
  .hero h1 { font-size: 64px; line-height: 1.1; margin-bottom: 24px; }
  .hero h1 span { color: var(--brand); }
  .hero p { font-size: 20px; line-height: 1.6; color: var(--muted); margin-bottom: 40px; font-weight: 500; }
  
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary { padding: 16px 32px; background: var(--brand); color: white; font-weight: 700; font-size: 16px; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm); }
  .btn-primary:hover { background: var(--brand-hover); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .btn-outline { padding: 16px 32px; background: white; color: var(--dark); font-weight: 700; font-size: 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm); }
  .btn-outline:hover { border-color: var(--muted); background: var(--bg); transform: translateY(-2px); }
  
  .hero-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px; min-width: 380px; box-shadow: var(--shadow-md); flex-shrink: 0; }
  .hero-card h3 { font-size: 20px; margin-bottom: 24px; }
  .stat-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .stat-item:last-child { border-bottom: none; padding-bottom: 0; }
  .stat-icon { width: 48px; height: 48px; background: #eff6ff; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .stat-text { font-size: 16px; font-weight: 700; color: var(--dark); }

  /* ---- Section Structure ---- */
  .section { max-width: 1200px; margin: auto; padding: 100px 24px; }
  .section-title { font-size: 40px; margin-bottom: 16px; text-align: center; }
  .section-sub { text-align: center; color: var(--muted); font-size: 18px; margin-bottom: 64px; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto; font-weight: 500; }

  /* ---- Perfect Symmetrical Cards ---- */
  .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: stretch; }
  .card { display: flex; flex-direction: column; background: var(--surface); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border); padding: 32px; transition: var(--transition); height: 100%; box-sizing: border-box; }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: #cbd5e1; }
  
  /* ---- Why Choose Us ---- */
  .why-bg { background: var(--dark); color: white; }
  .why-bg h2 { color: white; }
  .why-bg .section-sub { color: #94a3b8; }
  .why-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); padding: 32px; transition: var(--transition); display: flex; flex-direction: column; height: 100%; }
  .why-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-4px); }
  .why-icon { font-size: 36px; margin-bottom: 20px; }
  .why-title { font-size: 20px; font-weight: 800; margin-bottom: 12px; color: white; }
  .why-desc { font-size: 15px; color: #cbd5e1; line-height: 1.7; flex-grow: 1; }

  /* ---- Leadership ---- */
  .leader-avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block; border: 4px solid #eff6ff; }
  .leader-name { font-size: 22px; text-align: center; margin-bottom: 6px; }
  .leader-role { font-size: 13px; font-weight: 800; color: var(--brand); text-transform: uppercase; letter-spacing: 0.1em; text-align: center; margin-bottom: 16px; }
  .leader-bio { font-size: 15px; color: var(--muted); line-height: 1.7; text-align: center; flex-grow: 1; }

  /* ---- Plans ---- */
  .plan-number { font-size: 48px; font-weight: 900; color: #f1f5f9; margin-bottom: 16px; line-height: 1; transition: var(--transition); }
  .card:hover .plan-number { color: #e2e8f0; transform: translateX(4px); }
  .plan-title { font-size: 22px; margin-bottom: 12px; }
  .plan-desc { font-size: 15px; color: var(--muted); line-height: 1.7; flex-grow: 1; margin-bottom: 32px; }
  .plan-btn-wrapper { margin-top: auto; } /* Forces button to the bottom symmetrically */
  .btn-text { display: inline-flex; align-items: center; gap: 8px; color: var(--brand); font-weight: 700; font-size: 16px; transition: var(--transition); }
  .btn-text:hover { color: var(--brand-hover); gap: 12px; }

  /* ---- Premium Estimator ---- */
  .estimator-wrap { max-width: 900px; margin: auto; }
  .estimator-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 48px; box-shadow: var(--shadow-md); }
  .estimator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px; }
  .est-label { font-size: 13px; font-weight: 800; color: var(--dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; display: block; }
  
  .est-select { width: 100%; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 16px; font-weight: 600; color: var(--dark); background: var(--bg); outline: none; transition: var(--transition); cursor: pointer; appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230f172a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 16px top 50%; background-size: 12px auto; }
  .est-select:focus, .est-select:hover { border-color: var(--brand); background: var(--surface); box-shadow: 0 0 0 4px #eff6ff; }
  
  .sum-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .sum-btn { flex: 1 1 calc(33.33% - 8px); padding: 12px 6px; border: 1px solid var(--border); background: var(--bg); border-radius: 8px; font-size: 14px; font-weight: 700; color: var(--muted); cursor: pointer; transition: var(--transition); text-align: center; }
  .sum-btn.active { background: var(--dark); border-color: var(--dark); color: white; }
  .sum-btn:hover:not(.active) { border-color: var(--brand); color: var(--brand); background: var(--surface); }

  .est-btn { width: 100%; padding: 18px; background: var(--brand); color: white; font-weight: 800; font-size: 18px; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm); }
  .est-btn:hover { background: var(--brand-hover); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  
  .est-result { margin-top: 32px; padding: 32px; background: #eff6ff; border-radius: var(--radius-md); border: 1px solid #bfdbfe; animation: slideUp .4s ease; text-align: center; }
  .est-result-label { font-size: 13px; font-weight: 800; color: var(--brand); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .est-range { font-size: 48px; font-weight: 900; color: var(--dark); margin-bottom: 12px; letter-spacing: -0.02em; }
  .est-caveat { font-size: 14px; color: var(--text); margin-bottom: 24px; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto; }
  .est-cta-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  
  /* ---- Testimonials ---- */
  .testi-stars { color: #fbbf24; font-size: 18px; letter-spacing: 2px; margin-bottom: 16px; }
  .testi-quote { font-size: 16px; color: var(--text); line-height: 1.7; flex-grow: 1; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }
  .testi-avatar { width: 48px; height: 48px; border-radius: 50%; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: var(--brand); flex-shrink: 0; }
  .testi-name { font-size: 16px; font-weight: 800; color: var(--dark); }
  .testi-meta { font-size: 13px; color: var(--muted); margin-top: 2px; font-weight: 500; }

  /* ---- FAQ ---- */
  .faq-bg { background: var(--surface); }
  .faq-list { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 16px; }
  .faq-item { background: var(--bg); border-radius: var(--radius-sm); border: 1px solid var(--border); transition: var(--transition); }
  .faq-item:hover { border-color: #cbd5e1; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; cursor: pointer; font-weight: 700; font-size: 16px; color: var(--dark); gap: 16px; user-select: none; }
  .faq-chevron { font-size: 18px; color: var(--brand); transition: transform 0.3s; flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-a { padding: 0 24px 20px; font-size: 15px; color: var(--text); line-height: 1.7; animation: slideUp .3s ease; }

  /* ---- Plan Detail Page (Fixed Bullets & Alignment) ---- */
  .plan-detail { max-width: 860px; }
  .plan-detail h2 { font-size: 48px; margin-bottom: 20px; }
  .plan-detail p { font-size: 18px; color: var(--text); line-height: 1.8; margin-bottom: 40px; }
  
  .feature-list { list-style-type: none !important; padding-left: 0 !important; margin: 0 0 48px 0 !important; }
  .feature-list li { display: flex; align-items: flex-start; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border); font-size: 16px; color: var(--dark); font-weight: 500; }
  .feature-check { color: #10b981; font-size: 16px; font-weight: 900; background: #d1fae5; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: -2px; }
  
  .back-link { color: var(--muted); font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px; transition: var(--transition); text-transform: uppercase; letter-spacing: 0.05em; }
  .back-link:hover { color: var(--dark); transform: translateX(-4px); }

  /* ---- Resources ---- */
  .resource-icon { font-size: 28px; background: var(--bg); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); flex-shrink: 0; transition: var(--transition); }
  .card:hover .resource-icon { background: #eff6ff; transform: scale(1.05); }
  .resource-name { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
  .resource-sub { font-size: 14px; color: var(--muted); }
  .resource-text-wrap { flex-grow: 1; }

  /* ---- Contact Form & Grid ---- */
  .form-wrapper { max-width: 500px; margin: auto; background: var(--surface); padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
  .form-field { width: 100%; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 16px; color: var(--dark); background: var(--bg); margin-bottom: 16px; outline: none; transition: var(--transition); }
  .form-field:focus { border-color: var(--brand); background: var(--surface); box-shadow: 0 0 0 4px #eff6ff; }
  .form-submit { width: 100%; padding: 18px; background: var(--dark); color: white; font-weight: 800; font-size: 16px; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); margin-top: 8px; }
  .form-submit:hover:not(:disabled) { background: black; transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  
  .contact-icon { font-size: 32px; background: #eff6ff; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; margin-bottom: 20px; color: var(--brand); }
  .contact-label { font-size: 12px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; text-align: center; }
  .contact-value { font-size: 16px; font-weight: 700; color: var(--dark); text-align: center; overflow-wrap: anywhere; word-break: break-word; }

  /* ---- Fixed Action Buttons (Bulletproof CSS) ---- */
  .fixed-actions { position: fixed; bottom: 24px; left: 0; width: 100%; padding: 0 24px; display: flex; justify-content: space-between; align-items: flex-end; z-index: 9999; pointer-events: none; }
  .action-btn { pointer-events: auto; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 24px; border-radius: 100px; font-weight: 700; font-size: 15px; color: white; border: none; cursor: pointer; box-shadow: var(--shadow-md); transition: var(--transition); text-decoration: none; }
  .action-btn:hover { transform: translateY(-4px) scale(1.02); box-shadow: var(--shadow-lg); }
  .btn-call { background: var(--dark); }
  .btn-wa-round { width: 64px; height: 64px; padding: 0; border-radius: 50%; background: #25D366; font-size: 32px; flex-shrink: 0; }

  /* ---- Footer ---- */
  .footer { background: var(--dark); color: #cbd5e1; padding: 80px 24px 32px; }
  .footer-inner { max-width: 1200px; margin: auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
  .footer-brand h3 { font-size: 28px; color: white; margin-bottom: 12px; }
  .footer-brand p { font-size: 15px; line-height: 1.7; }
  .footer-links { display: flex; flex-direction: column; gap: 12px; }
  .footer-link { font-size: 15px; transition: var(--transition); }
  .footer-link:hover { color: white; transform: translateX(4px); }
  .footer-bottom { max-width: 1200px; margin: auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; }

  /* ---- Mobile Adjustments ---- */
  @media (max-width: 900px) {
    .navbar-container { padding: 0; }
    .navbar { padding: 16px 20px; border-radius: 0; border-left: none; border-right: none; border-top: none; }
    .navbar-links { display: none; }
    .hero { padding: 60px 20px; }
    .hero h1 { font-size: 42px; }
    .hero-inner { flex-direction: column; gap: 40px; text-align: center; }
    .hero-text { margin: auto; }
    .hero-actions { justify-content: center; }
    .hero-card { width: 100%; min-width: unset; padding: 32px 24px; }
    .section { padding: 80px 20px; }
    .section-title { font-size: 32px; }
    .estimator-card { padding: 32px 20px; }
    .footer-inner { grid-template-columns: 1fr; gap: 40px; }
    .fixed-actions { padding: 0 16px; bottom: 16px; }
    .action-btn { padding: 12px 20px; font-size: 14px; }
    .btn-wa-round { width: 56px; height: 56px; font-size: 28px; }
  }
`;

// ===== ROUTER HOOK =====
function useRoute() {
  const get = () => window.location.hash.replace(/^#\/?/, "");
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const h = () => { setRoute(get()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
}

// ===== TRANSLATION LOGIC =====
function toggleLanguage() {
  const isHi = document.cookie.includes('googtrans=/en/hi') || document.cookie.includes('googtrans=/auto/hi');
  const domain = window.location.hostname;
  if (isHi) {
    document.cookie = 'googtrans=/en/en; path=/';
    document.cookie = `googtrans=/en/en; domain=${domain}; path=/`;
    document.cookie = `googtrans=/en/en; domain=.${domain}; path=/`;
  } else {
    document.cookie = 'googtrans=/en/hi; path=/';
    document.cookie = `googtrans=/en/hi; domain=${domain}; path=/`;
    document.cookie = `googtrans=/en/hi; domain=.${domain}; path=/`;
  }
  window.location.reload();
}

// ===== ANNOUNCE BAR =====
function AnnounceBar() {
  return (
    <div className="announce-bar">
      🛡️ Authorized Star Health Advisor — Free consultation for new clients
      <a href="#/consultation">Book Now →</a>
    </div>
  );
}

// ===== NAVBAR =====
function Navbar() {
  const links = [
    { label: "Home", path: "" },
    { label: "Plans", path: "plans" },
    { label: "Resources", path: "resources" },
    { label: "Contact", path: "contact" },
  ];
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/logo.png" className="navbar-logo" alt="My Bima Mitra" />
          <div>
            <div className="navbar-title">My Bima Mitra</div>
            <div className="navbar-sub">Star Health Insurance Advisory</div>
          </div>
        </div>
        <div className="navbar-links">
          <div id="google_translate_element"></div>
          <button className="lang-toggle" onClick={toggleLanguage} title="Translate to Hindi / English">
            <span className="lang-hi">अ</span>
            <span className="lang-divider">|</span>
            <span className="lang-en">A</span>
          </button>
          {links.map(({ label, path }) => (
            <a key={path} href={`#/${path}`} className="nav-link">{label}</a>
          ))}
          <a href="#/consultation" className="nav-link cta">Free Consultation</a>
        </div>
      </nav>
    </div>
  );
}

// ===== HERO =====
function Hero() {
  const stats = [
    { icon: "🏆", text: "18+ Years Insurance Leadership" },
    { icon: "👥", text: "7,000+ Clients Guided" },
    { icon: "🏥", text: "14,000+ Network Hospitals" },
    { icon: "🇮🇳", text: "Pan India Advisory" },
  ];
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text reveal">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            India's Leading Health Insurance
          </div>
          <h1>Expert Star Health Advisory <span>& Guidance</span></h1>
          <p>
            Led by <strong>ManishPal Singh Sisodiya</strong>. Over 18 years of experience
            protecting families and individuals with the right Star Health insurance coverage.
          </p>
          <div className="hero-actions">
            <a href="#/consultation"><button className="btn-primary">Talk to an Expert</button></a>
            <a href="#/plans"><button className="btn-outline">Explore Plans</button></a>
          </div>
        </div>
        <div className="hero-card reveal">
          <h3>Experience & Trust</h3>
          {stats.map(({ icon, text }, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">{icon}</div>
              <div className="stat-text">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== WHY CHOOSE US =====
function WhyChooseUs() {
  const reasons = [
    { icon: "🤝", title: "Personalised Advice", desc: "We understand your family's needs and budget — not just sell a policy." },
    { icon: "⚡", title: "Claim Support", desc: "We guide you step-by-step through cashless and reimbursement claims so you're never alone." },
    { icon: "🏥", title: "14,000+ Hospitals", desc: "Access to one of India's largest cashless hospital networks across every major city." },
    { icon: "📋", title: "Plan Comparison", desc: "We compare plans across sum insured, waiting periods, and benefits to find your best fit." },
    { icon: "🔄", title: "Renewal Reminders", desc: "Never miss a renewal — we proactively remind and assist you every year." },
    { icon: "🧑‍👩‍👧", title: "All Plan Types", desc: "Individual, family floater, senior citizen, and corporate group plans — all under one roof." },
  ];
  return (
    <section className="why-bg">
      <div className="section reveal">
        <h2 className="section-title">Why Choose My Bima Mitra?</h2>
        <p className="section-sub">We're not just selling a policy. We're your long-term health insurance partner.</p>
        <div className="card-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <div className="why-title">{r.title}</div>
              <div className="why-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== LEADERSHIP =====
function Leadership() {
  const leaders = [
    { name: "ManishPal Singh Sisodiya", role: "Chief Executive Officer", bio: "18+ years of leadership in health insurance advisory, helping thousands of families get the right Star Health coverage.", img: "/ceo.jpg" },
    { name: "Kiran Singh Sisodiya", role: "Director – Operations & Client Support", bio: "Overseeing policy servicing, renewals, and client advisory to ensure a seamless insurance experience end to end.", img: "/director.jpg" },
  ];
  return (
    <section>
      <div className="section reveal">
        <h2 className="section-title">Our Leadership</h2>
        <p className="section-sub">Trusted professionals dedicated to your health security</p>
        <div className="card-grid" style={{ maxWidth: 800, margin: "auto" }}>
          {leaders.map((l, i) => (
            <div key={i} className="card leader-card">
              <img src={l.img} alt={l.name} className="leader-avatar" />
              <h3 className="leader-name">{l.name}</h3>
              <div className="leader-role">{l.role}</div>
              <p className="leader-bio">{l.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PLANS =====
function Plans() {
  const plans = [
    { title: "Super Star Flexi", link: "#/super-star-flexi", desc: "Flexible coverage plan with customizable sum insured and enhanced benefits tailored to your lifestyle." },
    { title: "Star Health Assure", link: "#/star-health-assure", desc: "Comprehensive protection offering strong coverage and modern medical benefits for long-term security." },
    { title: "Star Women Care", link: "#/women-care", desc: "Exclusively designed health insurance meeting the unique healthcare needs of women and their families." },
    { title: "Star Travel Protect", link: "#/overseas", desc: "Complete medical and travel emergency protection for your international trips." },
  ];
  return (
    <section>
      <div className="section reveal">
        <h2 className="section-title">Featured Insurance Plans</h2>
        <p className="section-sub">Choose coverage that perfectly fits your life and budget</p>
        <div className="card-grid">
          {plans.map((plan, i) => (
            <div key={i} className="card plan-card">
              <div className="plan-number">0{i + 1}</div>
              <h3 className="plan-title">{plan.title}</h3>
              <p className="plan-desc">{plan.desc}</p>
              <div className="plan-btn-wrapper">
                <a href={plan.link} className="btn-text">View Plan Details →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PREMIUM ESTIMATOR =====
const PREMIUM_TABLE = {
  "1":   { "18-35": [350,600],   "36-45": [550,950],   "46-55": [900,1500],  "56-65": [1400,2400], "65+": [2200,3800] },
  "2":   { "18-35": [600,1000],  "36-45": [950,1600],  "46-55": [1500,2600], "56-65": [2400,4000], "65+": [3600,6000] },
  "3-4": { "18-35": [900,1500],  "36-45": [1400,2400], "46-55": [2200,3600], "56-65": [3400,5600], "65+": [5000,8200] },
  "5+":  { "18-35": [1200,2000], "36-45": [1800,3000], "46-55": [2800,4600], "56-65": [4400,7200], "65+": [6400,10500] },
};
const SUM_MULTIPLIER = { "5": 1.0, "7.5": 1.2, "10": 1.45, "15": 1.85, "20": 2.2, "25": 2.5, "50": 3.5, "100": 5.0, "unlimited": 6.5 };
const fmt = (n) => "₹" + n.toLocaleString("en-IN");

function PremiumEstimator() {
  const [members, setMembers] = useState("1");
  const [age, setAge] = useState("18-35");
  const [sum, setSum] = useState("5");
  const [result, setResult] = useState(null);

  const estimate = () => {
    const [min, max] = PREMIUM_TABLE[members][age];
    const m = SUM_MULTIPLIER[sum] || 1;
    setResult({
      min: Math.round((min * 12 * m) / 100) * 100,
      max: Math.round((max * 12 * m) / 100) * 100,
    });
  };

  const sums = [
    { value: "5", label: "₹5 L" }, { value: "7.5", label: "₹7.5 L" },
    { value: "10", label: "₹10 L" }, { value: "15", label: "₹15 L" },
    { value: "20", label: "₹20 L" }, { value: "25", label: "₹25 L" },
    { value: "50", label: "₹50 L" }, { value: "100", label: "₹1 Cr" },
    { value: "unlimited", label: "Unlimited" },
  ];

  return (
    <section>
      <div className="section reveal">
        <h2 className="section-title">Premium Estimator</h2>
        <p className="section-sub">Get a quick ballpark figure before requesting a precise quote</p>
        <div className="estimator-wrap">
          <div className="estimator-card">
            <div className="estimator-grid">
              <div>
                <label className="est-label">Members to Cover</label>
                <select className="est-select" value={members} onChange={e => { setMembers(e.target.value); setResult(null); }}>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-4">3–4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
              <div>
                <label className="est-label">Oldest Member Age</label>
                <select className="est-select" value={age} onChange={e => { setAge(e.target.value); setResult(null); }}>
                  <option value="18-35">18–35 years</option>
                  <option value="36-45">36–45 years</option>
                  <option value="46-55">46–55 years</option>
                  <option value="56-65">56–65 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="est-label">Sum Insured Requirement</label>
                <div className="sum-group">
                  {sums.map(s => (
                    <button 
                      key={s.value} 
                      className={`sum-btn ${sum === s.value ? 'active' : ''}`}
                      onClick={() => { setSum(s.value); setResult(null); }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="est-btn" onClick={estimate}>Calculate Premium</button>
            {result && (
              <div className="est-result">
                <div className="est-result-label">Estimated Annual Premium</div>
                <div className="est-range">{fmt(result.min)} – {fmt(result.max)}</div>
                <p className="est-caveat">This is a ballpark estimate. Actual premium depends on medical history, location, and specific plan selected.</p>
                <div className="est-cta-row">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{background: '#25D366'}}>💬 Discuss on WhatsApp</a>
                  <a href="#/consultation" className="btn-outline">Get Exact Quote</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== TESTIMONIALS =====
function Testimonials() {
  const reviews = [
    { name: "Rajesh Sharma", city: "Raipur", initial: "R", stars: 5, quote: "ManishPal Sir helped us choose the right family floater plan within our budget. When my father was hospitalized, the cashless process was completely smooth. Couldn't have asked for better guidance." },
    { name: "Sunita Verma", city: "Bhilai", initial: "S", stars: 5, quote: "I was worried about getting insurance for my 68-year-old mother. The team at My Bima Mitra explained everything patiently and found a plan that covers her pre-existing conditions after the waiting period." },
    { name: "Anil Patel", city: "Durg", initial: "A", stars: 5, quote: "I've renewed my policy through Bima Mitra for 4 years now. They always remind me before renewal and helped me increase my sum insured when my family grew. Truly trustworthy." },
  ];
  return (
    <section>
      <div className="section reveal">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-sub">Real experiences from families we've helped across Chhattisgarh & beyond</p>
        <div className="card-grid">
          {reviews.map((r, i) => (
            <div key={i} className="card testi-card">
              <div className="testi-stars">{"★".repeat(r.stars)}</div>
              <p className="testi-quote">"{r.quote}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{r.initial}</div>
                <div>
                  <div className="testi-name">{r.name}</div>
                  <div className="testi-meta">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
function FAQ() {
  const faqs = [
    {
      q: "How do I file a cashless claim at a Star Health network hospital?",
      a: "When admitted to a network hospital, visit the insurance desk and show your Star Health policy card or valid ID. The hospital sends a pre-authorization request to Star Health. Once approved, treatment costs are settled directly."
    },
    {
      q: "What is the difference between Cashless and Reimbursement claims?",
      a: "In a Cashless claim, the insurer pays the network hospital directly. In a Reimbursement claim, you get treated at a non-network hospital, pay the bills yourself, then submit all documents to Star Health for reimbursement."
    },
    {
      q: "What is the waiting period in health insurance?",
      a: "Most Star Health plans have: an initial waiting period of 30 days, a pre-existing disease (PED) waiting period of 1–3 years, and a specific illness waiting period of 1–2 years for conditions like hernia or cataract."
    },
    {
      q: "Can I port my existing health insurance policy to Star Health?",
      a: "Yes! Portability allows you to switch from your current insurer to Star Health without losing the waiting period credit you've already served. You must apply at least 45 days before your current policy's renewal date."
    },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-bg">
      <div className="section reveal">
        <h2 className="section-title">Client FAQs</h2>
        <p className="section-sub">Quick answers to important policy questions</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className={`faq-chevron ${open === i ? "open" : ""}`}>▼</span>
              </div>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PLAN DETAIL =====
function PlanDetail({ title, description, ages, features, ctaLabel = "Request Consultation" }) {
  return (
    <div className="section plan-detail reveal">
      <a href="#/plans" className="back-link">← Back to Plans</a>
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {ages.map((age, i) => (
          <div key={i} className="card" style={{ padding: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.1em" }}>{age.label}</div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--dark)" }}>{age.value}</div>
          </div>
        ))}
      </div>

      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}><span className="feature-check">✓</span> {f}</li>
        ))}
      </ul>
      <a href="#/consultation"><button className="btn-primary">{ctaLabel} →</button></a>
    </div>
  );
}

function SuperStarFlexi() {
  return <PlanDetail
    title="Super Star Flexi"
    description="A flexible modern health insurance plan offering customizable coverage options and extensive hospital network access — designed to adapt as your needs grow."
    ages={[
      { label: "Adult Age Limit", value: "18 to 65 years" },
      { label: "Child Age Limit", value: "16 days to 25 years" }
    ]}
    features={["Flexible coverage slabs to match your budget", "Cashless treatment at 14,000+ network hospitals", "Restoration of sum insured after a claim", "Pre and post hospitalization expenses covered", "No-claim bonus for claim-free years", "Day care procedures covered"]}
    ctaLabel="Request Plan Consultation"
  />;
}

function StarHealthAssure() {
  return <PlanDetail
    title="Star Health Assure"
    description="Comprehensive health insurance protection designed for long-term medical security and reliable hospital coverage across India."
    ages={[
      { label: "Adult Age Limit", value: "18 to 75 years" },
      { label: "Child Age Limit", value: "16 days to 17 years" }
    ]}
    features={["High sum insured options available", "Extensive hospital and daycare coverage", "Reliable claim support guidance", "Maternity and newborn benefits", "Annual health check-up included", "AYUSH treatment coverage"]}
    ctaLabel="Check Eligibility"
  />;
}

function WomenCare() {
  return <PlanDetail
    title="Star Women Care Insurance"
    description="A specialized policy designed for women at every stage of life, offering maternity benefits, newborn cover, and regular hospitalization."
    ages={[
      { label: "Individual (Females)", value: "18 to 75 years" },
      { label: "Floater (Min 1 Female)", value: "Adults 18 to 75 yrs" },
      { label: "Dependent Child", value: "91 days to 25 yrs" }
    ]}
    features={["Maternity and delivery expenses covered", "Newborn baby cover starting from day 1", "No pre-policy medical check-up required", "Automatic restoration of sum insured", "Preventive health check-ups included", "Voluntary sterilization expenses covered"]}
    ctaLabel="Get Women Care Quote"
  />;
}

function Overseas() {
  return <PlanDetail
    title="Star Travel Protect (Overseas)"
    description="Complete medical and emergency protection for international travel, ensuring you and your family are safe anywhere in the world."
    ages={[
      { label: "General Age Limit", value: "6 months to 70 years" },
      { label: "Senior Citizens (70+)", value: "Subject to loading" }
    ]}
    features={["Comprehensive medical coverage up to $500,000", "Cashless hospitalization worldwide", "Coverage for trip delay, cancellation, or interruption", "Compensation for loss of passport or checked baggage", "Emergency dental treatment and medical evacuation", "No pre-medical screening for up to 65 years"]}
    ctaLabel="Get Travel Quote"
  />;
}

// ===== RESOURCES =====
function Resources() {
  const resources = [
    { icon: "📄", title: "Download Claim Form", link: "https://d28c6jni2fmamz.cloudfront.net/CLAIMFORM_89ec9742bd.pdf" },
    { icon: "🔍", title: "Check Claim Status", link: "https://www.starhealth.in/claims/claim-status" },
    { icon: "🔄", title: "Instant Policy Renewal", link: "https://customer.starhealth.in/customerportal/instant-renewal/" },
    { icon: "💳", title: "EMI Online Registration", link: "https://customer.starhealth.in/customerportal/emi-online-registration" },
    { icon: "📱", title: "Star Health App (Android)", link: "https://play.google.com/store/apps/details?id=com.star.customer_app" },
    { icon: "🍏", title: "Star Health App (iOS)", link: "https://apps.apple.com/in/app/star-health/id1477621177" },
  ];
  return (
    <div className="section reveal">
      <h2 className="section-title">Client Resources</h2>
      <p className="section-sub">Quick, direct access to official Star Health portals and forms</p>
      <div className="card-grid">
        {resources.map((r, i) => (
          <a key={i} href={r.link} target="_blank" rel="noopener noreferrer">
            <div className="card" style={{ flexDirection: "row", alignItems: "center", gap: "20px", padding: "24px" }}>
              <span className="resource-icon">{r.icon}</span>
              <div className="resource-text-wrap">
                <div className="resource-name">{r.title}</div>
                <div className="resource-sub">Open portal →</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ===== CONSULTATION =====
function Consultation() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send("service_prwxv5e", "template_lnnkfoo", formData, "6LcmS8gSIq2vvPppX")
      .then(() => { setSubmitted(true); setLoading(false); }).catch(() => setLoading(false));
  };
  return (
    <div className="section reveal">
      <h2 className="section-title">Request Consultation</h2>
      <p className="section-sub">Fill in your details and our advisor will reach out within 24 hours</p>
      {submitted ? (
        <div className="card" style={{ maxWidth: 500, margin: "auto", textAlign: "center", padding: "48px 32px" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h3 style={{ fontSize: 24, marginBottom: 12 }}>Request Received!</h3>
          <p style={{ color: "var(--muted)" }}>Thank you. Our advisor will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-wrapper">
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="form-field" />
          <input name="phone" type="tel" placeholder="Phone Number (10 Digits)" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required className="form-field" />
          <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} required className="form-field" />
          <textarea name="message" placeholder="Tell us about your insurance requirement (optional)" value={formData.message} onChange={handleChange} rows={4} className="form-field" style={{ resize: "vertical" }} />
          <button type="submit" className="form-submit" disabled={loading}>{loading ? "Sending..." : "Submit Request"}</button>
        </form>
      )}
    </div>
  );
}

// ===== CONTACT =====
function Contact() {
  return (
    <div className="section reveal">
      <h2 className="section-title">Contact Advisor</h2>
      <p className="section-sub">Reach us directly — we're always happy to help</p>
      <div className="card-grid" style={{ maxWidth: 1000, margin: "auto" }}>
        <a href="tel:+918319600171">
          <div className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <span className="contact-icon">📞</span>
            <div className="contact-label">Phone</div>
            <div className="contact-value">+91 83196 00171</div>
          </div>
        </a>
        <a href="mailto:manish.starhealth.in@gmail.com">
          <div className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <span className="contact-icon">✉️</span>
            <div className="contact-label">Email</div>
            <div className="contact-value">manish.starhealth.in@gmail.com</div>
          </div>
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
          <div className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <span className="contact-icon">💬</span>
            <div className="contact-label">WhatsApp</div>
            <div className="contact-value">Chat with us now</div>
          </div>
        </a>
      </div>
    </div>
  );
}

// ===== FOOTER =====
function Footer() {
  const links = [ { label: "Home", path: "" }, { label: "Plans", path: "plans" }, { label: "Resources", path: "resources" }, { label: "Consultation", path: "consultation" }, { label: "Contact", path: "contact" } ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>My Bima Mitra</h3>
          <p>Star Health Insurance Advisory</p>
          <p style={{ marginTop: 12 }}>Authorized advisor with 18+ years of trust</p>
          <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>IRDAI Reg. No: [Add Your License No.]</p>
        </div>
        <div className="footer-links">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Navigation</p>
          {links.map(({ label, path }) => <a key={path} href={`#/${path}`} className="footer-link">{label}</a>)}
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Contact</p>
          <p style={{ fontSize: 15, marginBottom: 12, fontWeight: 500 }}>📞 +91 83196 00171</p>
          <p style={{ fontSize: 15, marginBottom: 12, fontWeight: 500 }}>✉️ manish.starhealth.in@gmail.com</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#4ade80", fontWeight: 700 }}>💬 Chat on WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 My Bima Mitra. All rights reserved.</span>
        <span>Authorized Star Health & Allied Insurance Advisor</span>
      </div>
    </footer>
  );
}

// ===== HOME =====
function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Leadership />
      <Plans />
      <PremiumEstimator />
      <Testimonials />
      <FAQ />
    </>
  );
}

// ===== APP & FIXED BUTTONS =====
export default function App() {
  const route = useRoute();
  const Page = { "": Home, plans: Plans, resources: Resources, consultation: Consultation, contact: Contact, "super-star-flexi": SuperStarFlexi, "star-health-assure": StarHealthAssure, "women-care": WomenCare, "overseas": Overseas }[route] ?? Home;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); }, { threshold: 0.1 });
    setTimeout(() => { document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el)); }, 50);
    
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => { new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,hi', autoDisplay: false }, 'google_translate_element'); };
      const script = document.createElement('script'); script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; script.async = true; document.body.appendChild(script);
    }
    return () => observer.disconnect();
  }, [route]);

  return (
    <>
      <style>{CSS}</style>
      <AnnounceBar />
      <Navbar />
      <main><Page /></main>
      
      {/* BULLETPROOF FIXED BOTTOM BUTTONS */}
      <div className="fixed-actions">
        <a href="tel:+918319600171" className="action-btn btn-call">
          📞 Call Now
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="action-btn btn-wa-round" title="Chat on WhatsApp">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>💬</div>
        </a>
      </div>

      <Footer />
    </>
  );
}
