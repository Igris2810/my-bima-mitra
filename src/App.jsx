import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== CONSTANTS =====
const WA_MSG = encodeURIComponent("Hi, I'd like a free consultation");
const WA_LINK = `https://wa.me/918319600171?text=${WA_MSG}`;

// ===== GLOBAL CSS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand: #2563eb;       
    --brand-hover: #1d4ed8; 
    --brand-light: #eff6ff;
    --dark: #0f172a;        
    --text: #334155;        
    --muted: #64748b;
    --bg: #f8fafc;          
    --surface: #ffffff;
    --border: #e2e8f0;
    --accent: #10b981;
    --accent-light: #d1fae5;
    
    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 28px;
    
    --shadow-soft: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
    --shadow-md: 0 12px 30px -4px rgba(15, 23, 42, 0.08);
    --shadow-lg: 0 24px 40px -8px rgba(15, 23, 42, 0.12);
    --shadow-glow: 0 0 40px -10px rgba(37, 99, 235, 0.3);
    
    --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  html { scroll-behavior: smooth; }
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background: var(--bg); 
    color: var(--text); 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; 
  }
  
  h1, h2, h3, h4, h5, h6 { 
    color: var(--dark); 
    font-weight: 800; 
    letter-spacing: -0.03em; 
    line-height: 1.2;
  }
  
  a { text-decoration: none; color: inherit; transition: var(--transition); }
  button, select, input, textarea { font-family: inherit; outline: none; }

  /* ---- Utilities ---- */
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
  .text-brand { color: var(--brand); }
  .text-accent { color: var(--accent); }

  /* ---- Animations ---- */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  
  @keyframes float { 
    0%, 100% { transform: translateY(0px); } 
    50% { transform: translateY(-12px); } 
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
    50% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
  }

  /* ---- Google Translate Override ---- */
  #google_translate_element, .skiptranslate, .goog-te-banner-frame { display: none !important; }
  body { top: 0 !important; }
  .goog-tooltip, .goog-tooltip:hover { display: none !important; }
  .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }

  /* ---- Announce Bar ---- */
  .announce-bar { 
    background: linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a); 
    background-size: 200% auto;
    color: white; 
    text-align: center; 
    padding: 10px 24px; 
    font-size: 13px; 
    font-weight: 600; 
    letter-spacing: 0.05em; 
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    animation: gradientMove 5s ease infinite;
  }
  @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  .announce-bar a { 
    color: #fde047; 
    text-decoration: none; 
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255,255,255,0.1);
    padding: 2px 10px;
    border-radius: 100px;
    transition: var(--transition); 
  }
  .announce-bar a:hover { background: rgba(255,255,255,0.2); transform: translateX(2px); }

  /* ---- Navbar ---- */
  .navbar-container { 
    position: sticky; 
    top: 0; 
    z-index: 1000; 
    background: rgba(255, 255, 255, 0.85); 
    backdrop-filter: blur(16px); 
    -webkit-backdrop-filter: blur(16px); 
    border-bottom: 1px solid rgba(226, 232, 240, 0.6); 
  }
  .navbar { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    height: 84px;
  }
  .navbar-brand { display: flex; align-items: center; gap: 16px; }
  .navbar-brand:hover .navbar-logo { transform: scale(1.05); }
  .navbar-logo { height: 56px; width: auto; object-fit: contain; transition: var(--transition); }
  .navbar-title { font-size: 22px; font-weight: 900; color: var(--dark); line-height: 1.1; letter-spacing: -0.5px; }
  .navbar-sub { font-size: 11px; color: var(--brand); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.9; }
  
  .navbar-links { display: flex; align-items: center; gap: 8px; }
  .nav-link { 
    padding: 10px 16px; 
    border-radius: 100px; 
    font-weight: 600; 
    font-size: 15px; 
    color: var(--muted); 
    transition: var(--transition); 
    position: relative;
  }
  .nav-link:hover { color: var(--dark); background: var(--bg); }
  
  .nav-link.cta { 
    background: var(--dark); 
    color: white; 
    padding: 12px 24px; 
    margin-left: 8px; 
    box-shadow: 0 4px 12px rgba(15,23,42,0.15);
  }
  .nav-link.cta:hover { 
    background: var(--brand); 
    transform: translateY(-2px); 
    box-shadow: var(--shadow-glow); 
  }

  .lang-toggle {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--surface); border: 1px solid var(--border);
    cursor: pointer; margin-right: 8px;
    transition: var(--transition); 
  }
  .lang-toggle:hover { border-color: var(--brand); background: var(--brand-light); color: var(--brand); transform: rotate(10deg); }
  .lang-toggle svg { width: 20px; height: 20px; fill: currentColor; }

  /* ---- Buttons ---- */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 16px 32px; border-radius: 100px; font-weight: 700; font-size: 16px;
    cursor: pointer; transition: var(--transition); border: none;
    text-align: center;
  }
  .btn-primary { 
    background: var(--brand); color: white; 
    box-shadow: 0 8px 20px -6px rgba(37,99,235,0.4); 
  }
  .btn-primary:hover { 
    background: var(--brand-hover); transform: translateY(-3px); 
    box-shadow: 0 12px 25px -6px rgba(37,99,235,0.5); 
  }
  .btn-outline { 
    background: transparent; color: var(--dark); 
    border: 2px solid #cbd5e1; 
  }
  .btn-outline:hover { 
    border-color: var(--dark); 
    background: var(--dark); color: white;
    transform: translateY(-3px); 
  }

  /* ---- Hero Section ---- */
  .hero { 
    padding: 80px 0 100px; 
    background-color: var(--surface);
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 50%);
    position: relative;
    overflow: hidden;
  }
  .hero::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }
  
  .hero-inner { 
    display: flex; align-items: center; justify-content: space-between; gap: 60px; 
  }
  .hero-text { flex: 1; max-width: 640px; }
  
  .hero-badge { 
    display: inline-flex; align-items: center; gap: 8px; 
    background: white; border: 1px solid var(--border); 
    padding: 8px 16px; border-radius: 100px; 
    font-size: 13px; font-weight: 700; color: var(--dark); 
    margin-bottom: 32px; box-shadow: var(--shadow-soft); 
  }
  .hero-badge-dot { 
    width: 8px; height: 8px; background: var(--accent); 
    border-radius: 50%; box-shadow: 0 0 0 4px var(--accent-light); 
  }
  
  .hero h1 { 
    font-size: 68px; line-height: 1.05; margin-bottom: 24px; letter-spacing: -0.04em;
  }
  .hero h1 span { 
    background: linear-gradient(135deg, var(--brand), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .hero p { 
    font-size: 20px; line-height: 1.6; color: var(--muted); 
    margin-bottom: 40px; font-weight: 500; 
  }
  
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  
  .hero-visual { 
    flex: 1; max-width: 500px; position: relative;
  }
  
  .trust-card { 
    background: rgba(255,255,255,0.8); 
    backdrop-filter: blur(20px);
    border: 1px solid white; 
    border-radius: var(--radius-lg); 
    padding: 40px; 
    box-shadow: 0 20px 40px -10px rgba(15,23,42,0.1), inset 0 0 0 1px rgba(255,255,255,0.5); 
    position: relative;
    z-index: 2;
    animation: float 8s ease-in-out infinite; 
  }
  .trust-card h3 { font-size: 22px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
  
  .stat-item { 
    display: flex; align-items: center; gap: 16px; padding: 16px 0; 
    border-bottom: 1px solid rgba(226,232,240,0.6); 
  }
  .stat-item:last-child { border-bottom: none; padding-bottom: 0; }
  .stat-icon { 
    width: 52px; height: 52px; background: var(--brand-light); color: var(--brand);
    border-radius: 16px; display: flex; align-items: center; justify-content: center; 
    font-size: 24px; flex-shrink: 0;
  }
  .stat-text { font-size: 16px; font-weight: 700; color: var(--dark); line-height: 1.4; }
  .stat-sub { font-size: 13px; color: var(--muted); font-weight: 500; }

  /* ---- Section Structure ---- */
  .section { padding: 100px 0; position: relative; }
  .section-header { text-align: center; max-width: 700px; margin: 0 auto 64px; }
  .section-tag { 
    display: inline-block; padding: 6px 16px; background: var(--brand-light); color: var(--brand);
    border-radius: 100px; font-size: 13px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.1em; margin-bottom: 16px;
  }
  .section-title { font-size: 42px; margin-bottom: 20px; }
  .section-sub { color: var(--muted); font-size: 18px; line-height: 1.6; font-weight: 500; }

  /* ---- Cards General ---- */
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px; }
  
  .card { 
    background: var(--surface); border-radius: var(--radius-lg); 
    box-shadow: var(--shadow-soft); border: 1px solid var(--border); 
    padding: 40px; transition: var(--transition); 
    display: flex; flex-direction: column; height: 100%;
    position: relative; overflow: hidden;
  }
  .card:hover { 
    transform: translateY(-8px); 
    box-shadow: var(--shadow-md); 
    border-color: #cbd5e1; 
  }

  /* ---- Plans Section ---- */
  .plans-bg { background: linear-gradient(180deg, var(--bg) 0%, white 100%); }
  .plan-card { padding: 32px; }
  .plan-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
    background: var(--border); transition: var(--transition);
  }
  .plan-card:hover::before { background: var(--brand); }
  
  .plan-number { 
    font-size: 56px; font-weight: 900; color: transparent; 
    -webkit-text-stroke: 1px #cbd5e1;
    margin-bottom: 16px; line-height: 1; transition: var(--transition); 
  }
  .plan-card:hover .plan-number { -webkit-text-stroke: 1px var(--brand); color: rgba(37,99,235,0.05); transform: scale(1.05) translateX(4px); }
  
  .plan-title { font-size: 24px; margin-bottom: 12px; }
  .plan-desc { font-size: 15px; color: var(--muted); line-height: 1.6; flex-grow: 1; margin-bottom: 32px; }
  
  .btn-text { 
    display: inline-flex; align-items: center; gap: 8px; color: var(--brand); 
    font-weight: 700; font-size: 15px; transition: var(--transition); 
  }
  .btn-text:hover { color: var(--brand-hover); gap: 12px; }

  /* ---- Plan Detail Page ---- */
  .plan-detail { max-width: 900px; margin: 60px auto 100px; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: 60px; border: 1px solid var(--border); }
  .back-link { 
    display: inline-flex; align-items: center; gap: 8px;
    color: var(--muted); font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 40px; padding: 8px 16px; background: var(--bg); border-radius: 100px;
  }
  .back-link:hover { color: var(--dark); background: #e2e8f0; transform: translateX(-4px); }
  
  .plan-detail h2 { font-size: 48px; margin-bottom: 24px; }
  .plan-detail > p { font-size: 20px; color: var(--muted); line-height: 1.7; margin-bottom: 48px; font-weight: 500; }
  
  .age-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 60px; }
  .age-card { background: var(--bg); border-radius: 16px; padding: 24px; border: 1px solid var(--border); }
  .age-label { font-size: 12px; font-weight: 800; color: var(--muted); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.1em; }
  .age-value { font-size: 24px; font-weight: 900; color: var(--brand); }
  
  .feature-list { list-style: none; margin: 0 0 48px 0; display: grid; gap: 20px; }
  .feature-list li { 
    display: flex; align-items: flex-start; gap: 16px; 
    background: var(--bg); padding: 24px; border-radius: 16px;
    font-size: 16px; color: var(--text); line-height: 1.6;
  }
  .feature-check { 
    color: white; font-size: 14px; font-weight: 900; 
    background: var(--accent); width: 28px; height: 28px; border-radius: 50%; 
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; 
  }
  .feature-list b { color: var(--dark); font-weight: 800; display: block; margin-bottom: 4px; font-size: 17px; }

  /* ---- FAQ Accordion ---- */
  .faq-bg { background: var(--surface); border-top: 1px solid var(--border); }
  .faq-list { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 16px; }
  .faq-item { 
    background: white; border-radius: 16px; border: 1px solid var(--border); 
    transition: var(--transition); overflow: hidden; box-shadow: var(--shadow-soft);
  }
  .faq-item:hover { border-color: #cbd5e1; }
  
  .faq-q { 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 24px 32px; cursor: pointer; font-weight: 700; font-size: 18px; color: var(--dark); gap: 24px; user-select: none; 
  }
  .faq-chevron { 
    font-size: 16px; color: var(--muted); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
    flex-shrink: 0; background: var(--bg); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; 
  }
  
  .faq-item.open { border-color: var(--brand); box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.1); }
  .faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--brand-light); color: var(--brand); }
  
  .faq-a { 
    padding: 0 32px 28px; font-size: 16px; color: var(--muted); line-height: 1.7; 
    border-top: 1px solid var(--border); margin-top: 4px; padding-top: 24px; 
  }

  /* ---- Contact & Resources ---- */
  .contact-card { 
    text-align: center; justify-content: center; align-items: center; 
    padding: 48px 32px; 
  }
  .contact-icon { 
    font-size: 32px; background: var(--brand-light); width: 80px; height: 80px; 
    display: flex; align-items: center; justify-content: center; border-radius: 24px; 
    margin-bottom: 24px; color: var(--brand); 
  }
  .contact-label { font-size: 13px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .contact-value { font-size: 20px; font-weight: 800; color: var(--dark); }
  
  .resource-card { flex-direction: row; align-items: center; gap: 24px; padding: 32px; }
  .resource-icon { font-size: 32px; }

  /* ---- Forms ---- */
  .form-wrapper { background: white; padding: 48px; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); max-width: 600px; margin: auto; }
  .form-field { 
    width: 100%; padding: 18px 20px; margin-bottom: 20px; 
    background: var(--bg); border: 1px solid var(--border); border-radius: 12px; 
    font-size: 16px; color: var(--dark); transition: var(--transition); 
  }
  .form-field:focus { background: white; border-color: var(--brand); box-shadow: 0 0 0 4px var(--brand-light); }
  .form-submit { 
    width: 100%; padding: 18px; background: var(--brand); color: white; 
    border: none; border-radius: 12px; font-size: 18px; font-weight: 700; 
    cursor: pointer; transition: var(--transition); 
  }
  .form-submit:hover:not(:disabled) { background: var(--brand-hover); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,99,235,0.3); }
  .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }

  /* ---- Fixed Action Buttons ---- */
  .fixed-actions { 
    position: fixed; bottom: 24px; left: 0; width: 100%; padding: 0 24px; 
    display: flex; justify-content: space-between; align-items: flex-end; 
    z-index: 9999; pointer-events: none; 
  }
  .action-btn { 
    pointer-events: auto; display: flex; align-items: center; justify-content: center; gap: 10px; 
    padding: 16px 28px; border-radius: 100px; font-weight: 700; font-size: 16px; color: white; 
    border: none; cursor: pointer; box-shadow: var(--shadow-lg); transition: var(--transition); 
  }
  .action-btn:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2); }
  .btn-call { background: var(--dark); }
  .btn-wa-round { 
    width: 68px; height: 68px; padding: 0; border-radius: 50%; 
    background: #25D366; font-size: 34px; 
  }

  /* ---- Footer ---- */
  .footer { background: var(--dark); color: #cbd5e1; padding: 100px 0 40px; }
  .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 80px; }
  .footer-brand h3 { font-size: 32px; color: white; margin-bottom: 16px; }
  .footer-brand p { font-size: 16px; line-height: 1.7; color: #94a3b8; }
  .footer-links { display: flex; flex-direction: column; gap: 16px; }
  .footer-link { font-size: 16px; color: #cbd5e1; transition: var(--transition); }
  .footer-link:hover { color: white; transform: translateX(4px); }
  .footer-title { color: white; font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; }
  .footer-bottom { 
    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; font-size: 14px; 
    display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; color: #64748b;
  }

  /* ---- Mobile Adjustments ---- */
  @media (max-width: 992px) {
    .hero-inner { flex-direction: column; text-align: center; }
    .hero-text { max-width: 100%; }
    .hero-actions { justify-content: center; }
    .hero h1 { font-size: 48px; }
    .trust-card { display: none; } /* Simplify on mobile */
    .footer-inner { grid-template-columns: 1fr; gap: 48px; }
  }

  @media (max-width: 768px) {
    .navbar-links { display: none; }
    .navbar { height: 70px; }
    .navbar-logo { height: 48px; }
    .navbar-title { font-size: 18px; }
    .section { padding: 60px 0; }
    .section-title { font-size: 32px; }
    .plan-detail { padding: 32px 24px; margin: 24px auto 60px; }
    .plan-detail h2 { font-size: 36px; }
    .form-wrapper { padding: 32px 24px; }
    .fixed-actions { padding: 0 16px; bottom: 16px; }
    .action-btn { padding: 14px 20px; font-size: 15px; }
    .btn-wa-round { width: 60px; height: 60px; font-size: 30px; }
  }
\`;

// ===== SVGs & ICONS =====
const TranslateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

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
    document.cookie = \`googtrans=/en/en; domain=\${domain}; path=/\`;
    document.cookie = \`googtrans=/en/en; domain=.\${domain}; path=/\`;
  } else {
    document.cookie = 'googtrans=/en/hi; path=/';
    document.cookie = \`googtrans=/en/hi; domain=\${domain}; path=/\`;
    document.cookie = \`googtrans=/en/hi; domain=.\${domain}; path=/\`;
  }
  window.location.reload();
}

// ===== COMPONENTS =====

function AnnounceBar() {
  return (
    <div className="announce-bar">
      <span>🛡️ Authorized Star Health Advisor</span>
      <span style={{opacity: 0.5}}>|</span>
      <span>Free consultation for new clients</span>
      <a href="#/consultation">Book Now →</a>
    </div>
  );
}

function Navbar() {
  const links = [
    { label: "Home", path: "" },
    { label: "Plans", path: "plans" },
    { label: "Resources", path: "resources" },
    { label: "Contact", path: "contact" },
  ];
  return (
    <div className="navbar-container">
      <nav className="container navbar">
        <a href="#/" className="navbar-brand">
          <img src="/logo.png" className="navbar-logo" alt="My Bima Mitra" onError={(e) => e.target.style.display='none'} />
          <div>
            <div className="navbar-title">My Bima Mitra</div>
            <div className="navbar-sub">Star Health Advisory</div>
          </div>
        </a>
        <div className="navbar-links">
          <div id="google_translate_element"></div>
          <button className="lang-toggle" onClick={toggleLanguage} title="Translate">
            <TranslateIcon />
          </button>
          {links.map(({ label, path }) => (
            <a key={path} href={\`#/\${path}\`} className="nav-link">{label}</a>
          ))}
          <a href="#/consultation" className="nav-link cta">Free Consultation</a>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  const stats = [
    { icon: "🏆", title: "18+ Years", sub: "Insurance Leadership" },
    { icon: "👥", title: "7,000+", sub: "Clients Guided" },
    { icon: "🏥", title: "14,000+", sub: "Network Hospitals" },
  ];
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text reveal">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            India's Leading Health Insurance
          </div>
          <h1>Expert Health Advisory <span>& Guidance</span></h1>
          <p>
            Led by <strong>ManishPal Singh Sisodiya</strong>. Over 18 years of experience
            protecting families with the right Star Health coverage tailored to your needs.
          </p>
          <div className="hero-actions">
            <a href="#/consultation" className="btn btn-primary">Talk to an Expert</a>
            <a href="#/plans" className="btn btn-outline">Explore Plans</a>
          </div>
        </div>
        
        <div className="hero-visual reveal" style={{transitionDelay: "0.2s"}}>
          <div className="trust-card">
            <h3>Experience & Trust</h3>
            {stats.map(({ icon, title, sub }, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon">{icon}</div>
                <div>
                  <div className="stat-text">{title}</div>
                  <div className="stat-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Plans() {
  const plans = [
    { title: "Super Star Flexi", link: "#/super-star-flexi", desc: "Our most powerful plan. Freeze your age, enjoy limitless loyalty bonuses, and get your premium returned." },
    { title: "Star Health Assure", link: "#/star-health-assure", desc: "Comprehensive protection offering strong coverage, unlimited restoration, and modern medical benefits." },
    { title: "Star Women Care", link: "#/women-care", desc: "Exclusively designed for women and mothers. Features an incredibly low 1-year waiting period for maternity." },
    { title: "Cancer Care Platinum", link: "#/cancer-care", desc: "Specialized indemnity coverage specifically designed for persons previously diagnosed with Cancer." },
    { title: "Cardiac Care Platinum", link: "#/cardiac-care", desc: "Dedicated insurance for individuals who have undergone cardiac surgery, with NO pre-acceptance medicals." },
    { title: "Star Travel Protect", link: "#/overseas", desc: "Complete medical and travel emergency protection for your international trips and vacations." },
  ];
  return (
    <section className="plans-bg">
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag">Coverage Options</span>
          <h2 className="section-title">Featured Insurance Plans</h2>
          <p className="section-sub">Choose official Star Health coverage that perfectly fits your life stage, health condition, and budget.</p>
        </div>
        <div className="grid-3">
          {plans.map((plan, i) => (
            <a key={i} href={plan.link} className="card plan-card">
              <div className="plan-number">0{i + 1}</div>
              <h3 className="plan-title">{plan.title}</h3>
              <p className="plan-desc">{plan.desc}</p>
              <div style={{ marginTop: "auto" }}>
                <span className="btn-text">View Plan Details →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanDetail({ title, description, ages, features, ctaLabel = "Request Consultation" }) {
  return (
    <div className="container">
      <div className="plan-detail reveal">
        <a href="#/plans" className="back-link">← Back to Plans</a>
        <h2>{title}</h2>
        <p>{description}</p>
        
        <div className="age-grid">
          {ages.map((age, i) => (
            <div key={i} className="age-card">
              <div className="age-label">{age.label}</div>
              <div className="age-value">{age.value}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "28px", marginBottom: "24px" }}>Key Features & Benefits</h3>
        <ul className="feature-list">
          {features.map((f, i) => (
            <li key={i}>
              <span className="feature-check">✓</span> 
              <span dangerouslySetInnerHTML={{ __html: f }}></span>
            </li>
          ))}
        </ul>
        
        <div style={{ marginTop: "48px", paddingTop: "48px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ marginBottom: "24px" }}>Ready to secure your health?</h3>
          <a href="#/consultation" className="btn btn-primary" style={{ padding: "18px 48px", fontSize: "18px" }}>{ctaLabel}</a>
        </div>
      </div>
    </div>
  );
}

// Plan specific components
function SuperStarFlexi() { return <PlanDetail title="Super Star Flexi" description="The ultimate future-proof health insurance. This revolutionary plan adapts to your life stage, allowing you to lock in your entry age, accumulate limitless bonuses, and even get your premium returned." ages={[{ label: "Adult Entry Age", value: "18+ Years" }, { label: "Child Entry Age", value: "91 Days - 25 Yrs" }]} features={["<b>Freeze Your Age:</b> Your premiums are locked at your entry age until you make your first claim.", "<b>Premium Return:</b> Get your 1st-year base premium fully returned if you have no IPD claim for 5 years.", "<b>Limitless Loyalty Bonus:</b> Earn a 100% boost to your Sum Insured every year, with NO maximum cap.", "<b>Health Booster & NCB:</b> Get a 100% SI boost for every 7 claim-free years, plus a 50% No Claim Bonus annually.", "<b>Flexible Coverage:</b> Cashless treatment at 14,000+ network hospitals with Day Care procedures covered."]} ctaLabel="Request Flexi Quote" />; }
function StarHealthAssure() { return <PlanDetail title="Star Health Assure" description="A comprehensive, premium indemnity health insurance product covering extensive hospitalization expenses, modern treatments, and unmatched automatic restoration features." ages={[{ label: "Adult Entry Age", value: "18 to 75 Years" }, { label: "Child Entry Age", value: "16 Days to 17 Yrs" }]} features={["<b>Unlimited Restoration:</b> Automatic Restoration of Sum Insured for an unlimited number of times.", "<b>Consumables Covered:</b> Non-Medical items like gloves, masks, and food charges are covered up to SI.", "<b>Fetal & Maternity:</b> In Utero Fetal Surgery, Maternity expenses, and Assisted Reproduction Treatment.", "<b>Home & AYUSH Care:</b> Home care treatment and traditional AYUSH treatments covered up to Sum Insured."]} ctaLabel="Request Assure Quote" />; }
function WomenCare() { return <PlanDetail title="Star Women Care" description="An exclusively crafted policy for women and mothers. Enjoy industry-leading maternity benefits, instant newborn coverage, and preventive health features." ages={[{ label: "Individual (Females)", value: "18 to 75 Years" }, { label: "Floater (Min 1 Female)", value: "18 to 75 Years" }, { label: "Dependent Child", value: "91 Days - 25 Yrs" }]} features={["<b>Accelerated Maternity Cover:</b> Maternity & delivery expenses covered with just a <b>1-Year (12 months) waiting period</b> (for SI ₹15L and above).", "<b>Day 1 Newborn Cover:</b> Newborn baby is covered from Day 1 without any prior medical check-up (if pre-scans are submitted).", "<b>Comprehensive Female Care:</b> Covers voluntary sterilization expenses and routine preventive health check-ups.", "<b>No Pre-Policy Medicals:</b> Hassle-free issuance with no pre-policy medical check-up required."]} ctaLabel="Get Women Care Quote" />; }
function CancerCare() { return <PlanDetail title="Star Cancer Care Platinum" description="A highly specialized health insurance policy providing critical indemnity coverage for persons previously diagnosed with Cancer (any stage)." ages={[{ label: "Patient Entry Age", value: "5 Months - 65 Yrs" }, { label: "Sum Insured Options", value: "₹5L, ₹7.5L, ₹10L" }]} features={["<b>Pre-Diagnosed Acceptance:</b> Designed specifically for individuals who have already been diagnosed with Cancer.", "<b>Dual Protection:</b> Provides strong indemnity coverage for BOTH cancer and non-cancer medical hospitalizations.", "<b>Optional Lump-Sum:</b> Lump-sum cover available as an optional section for immediate financial relief.", "<b>Pan-India Cashless:</b> Access to Star Health's massive cashless treatment network across India."]} ctaLabel="Get Cancer Care Details" />; }
function CardiacCare() { return <PlanDetail title="Star Cardiac Care Platinum" description="Dedicated insurance for individuals who have undergone a Cardiac ailment, surgical intervention, or procedure in the past." ages={[{ label: "Patient Entry Age", value: "7 to 70 Years" }, { label: "Sum Insured Options", value: "Up to ₹15 Lakhs" }]} features={["<b>No Pre-Medical Screening:</b> No pre-acceptance medical tests required (simply submit past medical records).", "<b>Cardiac & Beyond:</b> Provides vital coverage for pre-existing cardiac conditions as well as Non-Cardiac treatments.", "<b>Accident Coverage:</b> Fully covers accident-related hospitalizations alongside medical illnesses.", "<b>Flexible Options:</b> Choose from Sum Insured options of ₹5L, ₹7.5L, ₹10L, and ₹15 Lakhs."]} ctaLabel="Get Cardiac Care Details" />; }
function Overseas() { return <PlanDetail title="Star Travel Protect" description="Complete medical and emergency protection for international travel, ensuring you and your family are safe from transit emergencies anywhere in the world." ages={[{ label: "Standard Age Limit", value: "6 Mths - 70 Yrs" }, { label: "Senior Citizens", value: "Subject to Loading" }]} features={["<b>Global Medical Cover:</b> Payment of expenses following any Medical Emergency during your international stay.", "<b>Transit Emergencies:</b> Protection against Flight Delay, Missed Connections, and Trip Cancellation.", "<b>Baggage & Passport:</b> Compensation for Loss of Passport and Loss or Delay of Checked-in Baggage.", "<b>Dental & Evacuation:</b> Covers dental emergencies following an accident and emergency medical evacuation."]} ctaLabel="Get Travel Quote" />; }

function FAQ() {
  const faqs = [
    { q: "How do I file a cashless claim at a Star Health network hospital?", a: "When admitted to a network hospital, visit the insurance desk and show your Star Health policy card or valid ID. The hospital sends a pre-authorization request to Star Health. Once approved, treatment costs are settled directly." },
    { q: "What is the difference between Cashless and Reimbursement claims?", a: "In a Cashless claim, the insurer pays the network hospital directly. In a Reimbursement claim, you get treated at a non-network hospital, pay the bills yourself, then submit all documents to Star Health for reimbursement." },
    { q: "What is the waiting period in health insurance?", a: "Most Star Health plans have: an initial waiting period of 30 days, a pre-existing disease (PED) waiting period of 1–3 years, and a specific illness waiting period of 1–2 years for conditions like hernia or cataract." },
    { q: "Can I port my existing health insurance policy to Star Health?", a: "Yes! Portability allows you to switch from your current insurer to Star Health without losing the waiting period credit you've already served. You must apply at least 45 days before your current policy's renewal date." },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-bg">
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag">Support</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">Quick answers to important policy and claim questions</p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={\`faq-item \${isOpen ? 'open' : ''}\`}>
                <div className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <span className={\`faq-chevron\`}>▼</span>
                </div>
                {isOpen && <div className="faq-a">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Resources() {
  const resources = [
    { icon: "📄", title: "Download Claim Form", link: "https://d28c6jni2fmamz.cloudfront.net/CLAIMFORM_89ec9742bd.pdf" },
    { icon: "🔍", title: "Check Claim Status", link: "https://www.starhealth.in/claims/claim-status" },
    { icon: "🔄", title: "Instant Policy Renewal", link: "https://customer.starhealth.in/customerportal/instant-renewal/" },
    { icon: "💳", title: "EMI Online Registration", link: "https://customer.starhealth.in/customerportal/emi-online-registration" },
  ];
  return (
    <div className="container section reveal">
      <div className="section-header">
        <h2 className="section-title">Client Resources</h2>
        <p className="section-sub">Direct access to official Star Health portals and forms</p>
      </div>
      <div className="grid-2">
        {resources.map((r, i) => (
          <a key={i} href={r.link} target="_blank" rel="noopener noreferrer" className="card resource-card">
            <span className="resource-icon">{r.icon}</span>
            <div>
              <div style={{fontSize: '18px', fontWeight: 800, marginBottom: '4px'}}>{r.title}</div>
              <div style={{fontSize: '14px', color: 'var(--brand)', fontWeight: 600}}>Access Portal →</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

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
    <div className="container section reveal">
      <div className="section-header">
        <h2 className="section-title">Request a Callback</h2>
        <p className="section-sub">Leave your details and our senior advisor will contact you within 24 hours.</p>
      </div>
      
      {submitted ? (
        <div className="card" style={{ maxWidth: 500, margin: "auto", textAlign: "center", padding: "60px 40px" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h3 style={{ fontSize: 28, marginBottom: 16 }}>Request Received</h3>
          <p style={{ color: "var(--muted)", fontSize: "16px" }}>Thank you for reaching out. We will connect with you shortly to discuss your health insurance needs.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-wrapper">
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="form-field" />
          <input name="phone" type="tel" placeholder="Phone Number (10 Digits)" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required className="form-field" />
          <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} required className="form-field" />
          <textarea name="message" placeholder="Tell us about your requirement (optional)" value={formData.message} onChange={handleChange} rows={4} className="form-field" style={{ resize: "vertical" }} />
          <button type="submit" className="form-submit" disabled={loading}>{loading ? "Sending Request..." : "Submit Details"}</button>
        </form>
      )}
    </div>
  );
}

function Contact() {
  return (
    <div className="container section reveal">
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-sub">We are here to help you secure the best health coverage.</p>
      </div>
      <div className="grid-3">
        <a href="tel:+918319600171" className="card contact-card">
          <span className="contact-icon">📞</span>
          <div className="contact-label">Call Us</div>
          <div className="contact-value">+91 83196 00171</div>
        </a>
        <a href="mailto:manish.starhealth.in@gmail.com" className="card contact-card">
          <span className="contact-icon">✉️</span>
          <div className="contact-label">Email Us</div>
          <div className="contact-value" style={{fontSize: "16px", wordBreak: "break-all"}}>manish.starhealth.in@gmail.com</div>
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="card contact-card">
          <span className="contact-icon">💬</span>
          <div className="contact-label">WhatsApp</div>
          <div className="contact-value">Chat with us</div>
        </a>
      </div>
    </div>
  );
}

function Footer() {
  const links = [ { label: "Home", path: "" }, { label: "Explore Plans", path: "plans" }, { label: "Client Resources", path: "resources" }, { label: "Book Consultation", path: "consultation" } ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>My Bima Mitra</h3>
            <p>Authorized Star Health & Allied Insurance Advisory. Protecting families across India with expert guidance and trust.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: '16px' }}>
              <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', color: 'white'}}>IRDAI Registered</span>
              <span style={{background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', color: 'white'}}>18+ Years Exp</span>
            </div>
          </div>
          <div>
            <div className="footer-title">Quick Links</div>
            <div className="footer-links">
              {links.map(({ label, path }) => <a key={path} href={\`#/\${path}\`} className="footer-link">{label}</a>)}
            </div>
          </div>
          <div>
            <div className="footer-title">Contact</div>
            <div className="footer-links">
              <a href="tel:+918319600171" className="footer-link">📞 +91 83196 00171</a>
              <a href="mailto:manish.starhealth.in@gmail.com" className="footer-link">✉️ Email Support</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-link" style={{color: '#4ade80', fontWeight: '600'}}>💬 WhatsApp Chat</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} My Bima Mitra. All rights reserved.</span>
          <span>Designed for optimal health coverage.</span>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  const route = useRoute();
  const Page = { 
    "": () => <><Hero /><Plans /><FAQ /></>, 
    plans: Plans, 
    resources: Resources, 
    consultation: Consultation, 
    contact: Contact, 
    "super-star-flexi": SuperStarFlexi, 
    "star-health-assure": StarHealthAssure, 
    "women-care": WomenCare, 
    "cancer-care": CancerCare,
    "cardiac-care": CardiacCare,
    "overseas": Overseas 
  }[route] ?? (() => <><Hero /><Plans /><FAQ /></>);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); 
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    setTimeout(() => { document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el)); }, 100);
    
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
      
      <main style={{ minHeight: "80vh" }}>
        <Page />
      </main>
      
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
