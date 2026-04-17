import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== CONSTANTS =====
const WA_MSG = encodeURIComponent("Hi, I'd like a free consultation");
const WA_LINK = "https://wa.me/919575056250?text=" + WA_MSG;

// ===== GLOBAL CSS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

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
    
    --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  html, body { 
    scroll-behavior: smooth; 
    overflow-x: hidden; 
    width: 100%; 
    max-width: 100vw; 
    margin: 0; 
    padding: 0; 
  }
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background: var(--bg); 
    color: var(--text); 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 { color: var(--dark); font-weight: 800; letter-spacing: -0.03em; line-height: 1.2; }
  a { text-decoration: none; color: inherit; transition: var(--transition); }
  button, select, input, textarea { font-family: inherit; outline: none; }

  /* ---- Utilities ---- */
  .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
  
  /* ---- Animations ---- */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
  @keyframes shimmer { 100% { left: 200%; } }
  @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); } 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); } }

  /* ---- Google Translate Override ---- */
  #google_translate_element, .skiptranslate, .goog-te-banner-frame { display: none !important; }
  body { top: 0 !important; }
  .goog-tooltip, .goog-tooltip:hover { display: none !important; }
  .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }

  /* ---- Announce Bar ---- */
  .announce-bar { 
    background: linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a); 
    background-size: 200% auto;
    color: white; text-align: center; padding: 10px 24px; font-size: 13px; font-weight: 600; 
    letter-spacing: 0.05em; text-transform: uppercase;
    display: flex; justify-content: center; align-items: center; gap: 12px;
  }
  .announce-bar a { 
    color: #fde047; text-decoration: none; display: inline-flex; align-items: center;
    background: rgba(255,255,255,0.1); padding: 2px 10px; border-radius: 100px;
  }
  .announce-bar a:hover { background: rgba(255,255,255,0.2); transform: translateX(2px); }

  /* ---- Navbar ---- */
  .navbar-container { position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(226, 232, 240, 0.6); }
  .navbar { display: flex; justify-content: space-between; align-items: center; min-height: 120px; max-width: 1400px; margin: 0 auto; padding: 12px 32px; position: relative; }
  .navbar-brand { display: flex; align-items: center; gap: 24px; transition: var(--transition); z-index: 1001; }
  .navbar-logo { height: 90px !important; width: auto !important; object-fit: contain; transform: scale(1.25); transform-origin: left center; }
  .navbar-title { font-size: 24px; font-weight: 900; color: var(--dark); line-height: 1.1; letter-spacing: -0.5px; margin-bottom: 2px; }
  .navbar-sub { font-size: 12px; color: var(--brand); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
  
  .mobile-menu-btn { display: none; background: transparent; border: none; font-size: 28px; color: var(--dark); cursor: pointer; z-index: 1001; }
  .navbar-links { display: flex; align-items: center; gap: 12px; transition: var(--transition); }
  .nav-link { padding: 10px 16px; border-radius: 100px; font-weight: 600; font-size: 15px; color: var(--muted); transition: var(--transition); }
  .nav-link:hover { color: var(--dark); background: var(--bg); }
  .nav-link.cta { background: var(--dark); color: white; padding: 12px 24px; margin-left: 8px; box-shadow: 0 4px 12px rgba(15,23,42,0.15); }
  .nav-link.cta:hover { background: var(--brand); transform: translateY(-2px); color: white; }

  /* Custom Translate Button */
  .lang-toggle {
    display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%;
    background: var(--surface); border: 1px solid var(--border); cursor: pointer; margin-right: 8px; transition: var(--transition); 
  }
  .lang-toggle:hover { border-color: var(--brand); background: var(--brand-light); transform: rotate(10deg); }
  .lang-hi { color: var(--dark); font-weight: 800; font-size: 15px; }
  .lang-divider { color: var(--muted); margin: 0 4px; font-size: 12px; font-weight: 300; }
  .lang-en { color: var(--brand); font-weight: 800; font-size: 15px; }

  /* ---- Buttons ---- */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-weight: 700; font-size: 16px; cursor: pointer; transition: var(--transition); border: none; text-align: center; }
  .btn-primary { background: var(--brand); color: white; box-shadow: 0 8px 20px -6px rgba(37,99,235,0.4); }
  .btn-primary:hover { background: var(--brand-hover); transform: translateY(-3px); box-shadow: 0 12px 25px -6px rgba(37,99,235,0.5); }
  .btn-outline { background: transparent; color: var(--dark); border: 2px solid #cbd5e1; }
  .btn-outline:hover { border-color: var(--dark); background: var(--dark); color: white; transform: translateY(-3px); }

  /* ---- Section Structure ---- */
  .section { padding: 100px 0; position: relative; }
  .section-header { text-align: center; max-width: 700px; margin: 0 auto 56px; }
  .section-tag { display: inline-block; padding: 6px 16px; background: var(--brand-light); color: var(--brand); border-radius: 100px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
  .section-title { font-size: 42px; margin-bottom: 16px; }
  .section-sub { color: var(--muted); font-size: 18px; line-height: 1.6; font-weight: 500; }

  /* ---- Cards Grid ---- */
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; align-items: stretch; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px; align-items: stretch; }
  .card { background: var(--surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-soft); border: 1px solid var(--border); padding: 40px; transition: var(--transition); display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden; }
  .card:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); border-color: #cbd5e1; }

  /* ---- Hero ---- */
  .hero { padding: 80px 0 100px; background-color: var(--surface); background-image: radial-gradient(circle at 15% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 50%); position: relative; overflow: hidden; }
  .hero-inner { display: flex; align-items: center; justify-content: space-between; gap: 60px; }
  .hero-text { flex: 1; max-width: 640px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--border); padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 32px; box-shadow: var(--shadow-soft); }
  .hero-badge-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 0 4px var(--accent-light); }
  .hero h1 { font-size: 64px; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.04em; }
  .hero h1 span { color: var(--brand); }
  .hero p { font-size: 20px; line-height: 1.6; color: var(--muted); margin-bottom: 40px; font-weight: 500; }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .hero-visual { flex: 1; max-width: 500px; position: relative; }
  
  .trust-card { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border: 1px solid white; border-radius: var(--radius-lg); padding: 40px; box-shadow: var(--shadow-md); animation: float 8s ease-in-out infinite; position: relative; }
  .trust-card h3 { font-size: 22px; margin-bottom: 24px; }
  .stat-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .stat-item:last-child { border-bottom: none; padding-bottom: 0; }
  .stat-icon { width: 52px; height: 52px; background: var(--brand-light); color: var(--brand); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .stat-text { font-size: 16px; font-weight: 700; color: var(--dark); }
  .stat-sub { font-size: 13px; color: var(--muted); font-weight: 500; }

  /* ---- EMI Banner ---- */
  .emi-banner { background: linear-gradient(90deg, #0f172a, #1e293b); color: white; padding: 32px 0; border-bottom: 4px solid #f59e0b; position: relative; overflow: hidden; }
  .emi-banner::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); animation: shimmer 3s infinite; transform: skewX(-20deg); }
  .emi-inner { display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; text-align: center; position: relative; z-index: 2; }
  .emi-badge { background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fcd34d; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: inline-block; }
  .emi-highlight { color: #f59e0b; font-size: 48px; font-weight: 900; line-height: 1; text-shadow: 0 4px 20px rgba(245,158,11,0.3); }
  .emi-text { text-align: left; max-width: 400px; }
  .emi-text h3 { color: white; font-size: 22px; margin-bottom: 6px; }
  .emi-text p { color: #cbd5e1; font-size: 15px; margin: 0; line-height: 1.6; }
  .emi-btn { background: #f59e0b; color: #0f172a; padding: 16px 32px; border-radius: 100px; font-weight: 800; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: var(--transition); box-shadow: 0 8px 20px -6px rgba(245,158,11,0.6); animation: pulseGlow 2s infinite; }
  .emi-btn:hover { background: #fbbf24; transform: translateY(-3px); }

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
  .leader-card { text-align: center; padding: 40px 32px; }
  .leader-avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block; border: 4px solid var(--brand-light); }
  .leader-name { font-size: 22px; margin-bottom: 6px; }
  .leader-role { font-size: 13px; font-weight: 800; color: var(--brand); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
  .leader-bio { font-size: 15px; color: var(--muted); line-height: 1.7; flex-grow: 1; }

  /* ---- CURATED PLANS ---- */
  .curated-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; text-align: left; }
  .curated-header .section-title { margin-bottom: 8px; }
  .curated-nav { display: none; gap: 12px; }
  @media(min-width: 768px) { .curated-nav { display: flex; } }
  .curated-nav-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; transition: var(--transition); color: var(--muted); }
  .curated-nav-btn:hover { background: var(--bg); color: var(--dark); }
  
  .curated-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; padding-top: 16px; }
  .cp-card { background: var(--bg); border-radius: 24px; padding: 32px; display: flex; flex-direction: column; position: relative; transition: var(--transition); border: 2px solid transparent; }
  .cp-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--border); }
  
  /* Highlighted Card (Super Star Flexi) */
  .cp-card.highlight { background: white; border: 2px solid var(--brand); transform: translateY(-12px); box-shadow: var(--shadow-md); z-index: 1; }
  .cp-card.highlight:hover { transform: translateY(-18px); box-shadow: var(--shadow-lg); }
  .cp-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--brand); color: white; font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; box-shadow: 0 4px 10px rgba(37,99,235,0.3); }
  
  .cp-icon-wrap { width: 56px; height: 56px; background: var(--brand-light); color: var(--brand); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 24px; }
  .cp-title { font-size: 22px; margin-bottom: 12px; font-weight: 800; color: var(--dark); }
  .cp-desc { font-size: 15px; color: var(--muted); line-height: 1.6; flex-grow: 1; margin-bottom: 24px; }
  .cp-features { list-style: none; margin-bottom: 32px; }
  .cp-features li { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 14px; }
  .cp-features li i { color: #059669; font-size: 16px; }
  
  .cp-btn { width: 100%; padding: 14px; border-radius: 100px; font-weight: 700; font-size: 15px; text-align: center; border: 2px solid var(--brand); transition: var(--transition); display: block; }
  .cp-btn-outline { color: var(--brand); background: transparent; }
  .cp-btn-outline:hover { background: var(--brand-light); }
  .cp-btn-solid { color: white; background: var(--brand); }
  .cp-btn-solid:hover { background: var(--brand-hover); border-color: var(--brand-hover); }

  /* ---- Standard Plans Grid ---- */
  .plans-bg { background: linear-gradient(180deg, var(--bg) 0%, white 100%); }
  .plan-card { padding: 32px; }
  .plan-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--border); transition: var(--transition); }
  .plan-card:hover::before { background: var(--brand); }
  .plan-number { font-size: 56px; font-weight: 900; color: transparent; -webkit-text-stroke: 1px #cbd5e1; margin-bottom: 16px; line-height: 1; transition: var(--transition); }
  .plan-card:hover .plan-number { -webkit-text-stroke: 1px var(--brand); color: rgba(37,99,235,0.05); transform: scale(1.05) translateX(4px); }
  .plan-title { font-size: 22px; margin-bottom: 12px; }
  .plan-desc { font-size: 15px; color: var(--muted); line-height: 1.6; flex-grow: 1; margin-bottom: 32px; }
  .btn-text { display: inline-flex; align-items: center; gap: 8px; color: var(--brand); font-weight: 700; font-size: 15px; transition: var(--transition); margin-top: auto; }
  .btn-text:hover { color: var(--brand-hover); gap: 12px; }

  /* ---- Premium Estimator ---- */
  .estimator-wrap { max-width: 900px; margin: auto; }
  .estimator-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 48px; box-shadow: var(--shadow-md); }
  .estimator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px; }
  .est-label { font-size: 13px; font-weight: 800; color: var(--dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; display: block; }
  .est-select { width: 100%; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 16px; font-weight: 600; color: var(--dark); background: var(--bg); transition: var(--transition); }
  .est-select:focus { border-color: var(--brand); background: var(--surface); box-shadow: 0 0 0 4px var(--brand-light); }
  
  .sum-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .sum-btn { flex: 1 1 calc(33.33% - 8px); padding: 12px 6px; border: 1px solid var(--border); background: var(--bg); border-radius: 8px; font-size: 14px; font-weight: 700; color: var(--muted); cursor: pointer; transition: var(--transition); }
  .sum-btn.active { background: var(--dark); border-color: var(--dark); color: white; }
  .sum-btn:hover:not(.active) { border-color: var(--brand); color: var(--brand); background: var(--surface); }

  .est-btn { width: 100%; padding: 18px; background: var(--brand); color: white; font-weight: 800; font-size: 18px; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm); }
  .est-btn:hover { background: var(--brand-hover); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  
  .est-result { margin-top: 32px; padding: 32px; background: var(--brand-light); border-radius: var(--radius-md); border: 1px solid #bfdbfe; animation: slideUp .4s ease; text-align: center; }
  .est-result-label { font-size: 13px; font-weight: 800; color: var(--brand); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .est-range { font-size: 48px; font-weight: 900; color: var(--dark); margin-bottom: 12px; }
  .est-caveat { font-size: 14px; color: var(--text); margin-bottom: 24px; line-height: 1.6; }

  /* ---- Testimonials ---- */
  .testi-stars { color: #fbbf24; font-size: 18px; letter-spacing: 2px; margin-bottom: 16px; }
  .testi-quote { font-size: 16px; color: var(--text); line-height: 1.7; flex-grow: 1; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }
  .testi-avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--brand-light); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: var(--brand); flex-shrink: 0; }
  .testi-name { font-size: 16px; font-weight: 800; color: var(--dark); }
  .testi-meta { font-size: 13px; color: var(--muted); margin-top: 2px; font-weight: 500; }

  /* ---- FAQ Accordion ---- */
  .faq-bg { background: var(--surface); border-top: 1px solid var(--border); }
  .faq-list { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 16px; }
  .faq-item { background: white; border-radius: 16px; border: 1px solid var(--border); transition: var(--transition); overflow: hidden; box-shadow: var(--shadow-sm); }
  .faq-item:hover { border-color: #cbd5e1; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; cursor: pointer; font-weight: 700; font-size: 18px; color: var(--dark); gap: 24px; user-select: none; }
  .faq-chevron { font-size: 16px; color: var(--muted); transition: transform 0.4s; flex-shrink: 0; background: var(--bg); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
  .faq-item.open { border-color: var(--brand); box-shadow: var(--shadow-md); }
  .faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--brand-light); color: var(--brand); }
  .faq-a { padding: 0 32px 28px; font-size: 16px; color: var(--muted); line-height: 1.7; border-top: 1px solid var(--border); margin-top: 4px; padding-top: 24px; }

  /* ---- Plan Detail Page ---- */
  .plan-detail { max-width: 900px; margin: 60px auto 100px; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: 60px; border: 1px solid var(--border); }
  .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 40px; padding: 8px 16px; background: var(--bg); border-radius: 100px; }
  .back-link:hover { color: var(--dark); background: #e2e8f0; transform: translateX(-4px); }
  .plan-detail h2 { font-size: 48px; margin-bottom: 24px; }
  .plan-detail > p { font-size: 20px; color: var(--muted); line-height: 1.7; margin-bottom: 48px; font-weight: 500; }
  
  .age-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 60px; }
  .age-card { background: var(--bg); border-radius: 16px; padding: 24px; border: 1px solid var(--border); }
  .age-label { font-size: 12px; font-weight: 800; color: var(--muted); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.1em; }
  .age-value { font-size: 24px; font-weight: 900; color: var(--brand); }
  
  .feature-list { list-style: none; margin: 0 0 48px 0; display: grid; gap: 20px; }
  .feature-list li { display: flex; align-items: flex-start; gap: 16px; background: var(--bg); padding: 24px; border-radius: 16px; font-size: 16px; color: var(--text); line-height: 1.6; }
  .feature-check { color: white; font-size: 14px; font-weight: 900; background: var(--accent); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .feature-list b { color: var(--dark); font-weight: 800; display: block; margin-bottom: 4px; font-size: 17px; }

  /* ---- Resources & Contact ---- */
  .resource-card { flex-direction: row; align-items: center; gap: 24px; padding: 32px; }
  .resource-icon { font-size: 32px; background: var(--brand-light); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 16px; color: var(--brand); flex-shrink: 0; }
  .contact-card { text-align: center; justify-content: center; align-items: center; padding: 48px 32px; }
  .contact-icon { font-size: 32px; background: var(--brand-light); width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 24px; margin-bottom: 24px; color: var(--brand); }
  .contact-label { font-size: 13px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .contact-value { font-size: 20px; font-weight: 800; color: var(--dark); }
  .contact-value.email-text { white-space: normal !important; word-break: break-all !important; overflow-wrap: break-word !important; font-size: 16px; line-height: 1.4; width: 100%; }

  /* ---- Consultation Form ---- */
  .form-wrapper { background: white; padding: 48px; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); max-width: 600px; margin: auto; }
  .form-field { width: 100%; padding: 18px 20px; margin-bottom: 20px; background: var(--bg); border: 1px solid var(--border); border-radius: 12px; font-size: 16px; color: var(--dark); transition: var(--transition); }
  .form-field:focus { background: white; border-color: var(--brand); box-shadow: 0 0 0 4px var(--brand-light); }
  .form-submit { width: 100%; padding: 18px; background: var(--brand); color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; transition: var(--transition); }
  .form-submit:hover:not(:disabled) { background: var(--brand-hover); transform: translateY(-2px); box-shadow: var(--shadow-md); }

  /* ---- Fixed Action Buttons ---- */
  /* ---- Fixed Action Buttons ---- */
  .fixed-actions { position: fixed; bottom: 24px; left: 24px; z-index: 9999; display: flex; align-items: flex-end; }
  .action-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 28px; border-radius: 100px; font-weight: 700; font-size: 16px; color: white; border: none; cursor: pointer; box-shadow: var(--shadow-lg); transition: var(--transition); text-decoration: none; }
  .action-btn:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2); }
  .btn-call { background: var(--dark); }

  /* ---- HEALTH CONCIERGE WIDGET ---- */
  .concierge-wrapper { position: fixed; bottom: 24px; right: 24px; z-index: 10000; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
  .concierge-toggle { width: 68px; height: 68px; border-radius: 50%; background: #10b981; color: white; border: none; font-size: 28px; cursor: pointer; box-shadow: var(--shadow-lg); transition: var(--transition); display: flex; align-items: center; justify-content: center; position: relative; }
  .concierge-toggle:hover { transform: scale(1.05) translateY(-4px); background: #059669; }
  .concierge-toggle .status-dot { position: absolute; bottom: 4px; right: 4px; width: 14px; height: 14px; background: #34d399; border: 2px solid white; border-radius: 50%; }
  
  .concierge-window { width: 340px; background: white; border-radius: 28px; box-shadow: 0 12px 40px rgba(0,0,0,0.15); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: bottom right; opacity: 0; transform: scale(0.9) translateY(20px); pointer-events: none; position: absolute; bottom: 90px; right: 0; }
  .concierge-window.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
  
  .cw-body { padding: 24px; }
  .cw-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .cw-avatar { width: 52px; height: 52px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; position: relative; }
  .cw-avatar .status-dot { position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #10b981; border: 2px solid white; border-radius: 50%; }
  .cw-title { font-size: 18px; font-weight: 800; color: var(--dark); line-height: 1.2; }
  .cw-sub { font-size: 13px; color: var(--muted); margin-top: 2px; }
  
  .cw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
  .cw-action { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 18px 8px; border-radius: 20px; color: var(--muted); transition: var(--transition); cursor: pointer; text-decoration: none; }
  .cw-action:hover { background: var(--bg); }
  .cw-action.active { background: var(--accent-light); color: #059669; }
  .cw-action i { font-size: 24px; margin-bottom: 10px; color: #94a3b8; }
  .cw-action.active i { color: #059669; }
  .cw-action span { font-size: 13px; font-weight: 700; }
  
  .cw-btn { width: 100%; background: #10b981; color: white; border: none; padding: 16px; border-radius: 100px; font-weight: 700; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: var(--transition); text-decoration: none;}
  .cw-btn:hover { background: #059669; }

  /* ---- Footer ---- */
  .footer { background: var(--dark); color: #cbd5e1; padding: 100px 0 120px; } /* Increased bottom padding to prevent buttons overlapping footer */
  .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 80px; }
  .footer-brand h3 { font-size: 32px; color: white; margin-bottom: 16px; }
  .footer-brand p { font-size: 16px; line-height: 1.7; color: #94a3b8; }
  .footer-links { display: flex; flex-direction: column; gap: 16px; }
  .footer-link { font-size: 16px; color: #cbd5e1; transition: var(--transition); }
  .footer-link:hover { color: white; transform: translateX(4px); }
  .footer-title { color: white; font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; font-size: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; color: #64748b; }

  /* ---- Mobile Adjustments ---- */
  @media (max-width: 992px) {
    .hero-inner { flex-direction: column; text-align: center; }
    .hero-text { max-width: 100%; }
    .hero-actions { justify-content: center; }
    .hero h1 { font-size: 48px; }
    .trust-card { display: none; }
    .footer-inner { grid-template-columns: 1fr; gap: 48px; }
    .emi-text { text-align: center; max-width: 100%; }
  }

  @media (max-width: 768px) {
    .mobile-menu-btn { display: block; }
    .navbar-links { position: absolute; top: 100%; left: 0; width: 100%; background: white; padding: 24px; flex-direction: column; box-shadow: var(--shadow-md); border-top: 1px solid var(--border); display: none; }
    .navbar-links.open { display: flex !important; }
    .nav-link.cta { margin-left: 0; text-align: center; width: 100%; }
    .lang-toggle { margin: 0 auto 16px; }

    .navbar { min-height: 90px; }
    .navbar-logo { height: 60px !important; transform: scale(1.1); }
    .navbar-title { font-size: 18px; }
    .section { padding: 60px 0; }
    .section-title { font-size: 32px; }
    .plan-detail { padding: 32px 24px; margin: 24px auto 60px; }
    .plan-detail h2 { font-size: 36px; }
    .form-wrapper { padding: 32px 24px; }
    
/* ---- Permanent Mobile Floating Fix (Both on Left) ---- */
    .concierge-wrapper { bottom: 16px; right: auto; left: 16px; align-items: flex-start; }
    .concierge-toggle { width: 54px; height: 54px; font-size: 22px; }
    .concierge-window { right: auto; left: 0; bottom: 70px; width: calc(100vw - 32px); transform-origin: bottom left; }
    
    .fixed-actions { bottom: 16px; left: 80px; padding: 0; width: auto; }
    .action-btn { padding: 12px 20px; font-size: 14px; border-radius: 100px; white-space: nowrap; }
    
    .curated-header { flex-direction: column; text-align: center; }
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
    document.cookie = "googtrans=/en/en; path=/";
    document.cookie = "googtrans=/en/en; domain=" + domain + "; path=/";
    document.cookie = "googtrans=/en/en; domain=." + domain + "; path=/";
  } else {
    document.cookie = "googtrans=/en/hi; path=/";
    document.cookie = "googtrans=/en/hi; domain=" + domain + "; path=/";
    document.cookie = "googtrans=/en/hi; domain=." + domain + "; path=/";
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
      <a href={"#/consultation"}>Book Now →</a>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: "Home", path: "" },
    { label: "Plans", path: "plans" },
    { label: "Resources", path: "resources" },
    { label: "Contact", path: "contact" },
  ];
  return (
    <div className="navbar-container">
      <nav className="container navbar">
        <a href="#/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" className="navbar-logo" alt="My Bima Mitra" onError={(e) => e.target.style.display='none'} />
          <div>
            <div className="navbar-title">My Bima Mitra</div>
            <div className="navbar-sub">Star Health Advisory</div>
          </div>
        </a>
        
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <div id="google_translate_element"></div>
          <button className="lang-toggle" onClick={toggleLanguage} title="Translate">
            <span className="lang-hi">अ</span>
            <span className="lang-divider">|</span>
            <span className="lang-en">A</span>
          </button>
          {links.map(({ label, path }) => (
            <a key={path} href={"#/" + path} className="nav-link" onClick={() => setIsOpen(false)}>{label}</a>
          ))}
          <a href="#/consultation" className="nav-link cta" onClick={() => setIsOpen(false)}>Free Consultation</a>
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
            
            {/* Floating Gold Badge for EMI on the Hero image area */}
            <div style={{ position: "absolute", bottom: "-24px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "white", padding: "12px 24px", borderRadius: "100px", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap", boxShadow: "0 10px 25px -5px rgba(245,158,11,0.5)", display: "flex", alignItems: "center", gap: "8px", animation: "float 4s ease-in-out infinite reverse" }}>
              <i className="fa-solid fa-bolt"></i> ₹0 Upfront EMI Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmiBanner() {
  return (
    <div className="emi-banner">
      <div className="container emi-inner">
        <div>
          <div className="emi-badge">Special Offer</div>
          <div className="emi-highlight">₹0 Upfront</div>
        </div>
        <div className="emi-text">
          <h3>Buy Now, Pay Monthly in Easy EMIs</h3>
          <p>Secure your family's health today without paying the full annual premium upfront. Instant policy issuance with monthly payments.</p>
        </div>
        <a href="#/consultation" className="emi-btn">
          Check EMI Eligibility <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}

function WhyChooseUs() {
  const reasons = [
    { icon: "🤝", title: "Personalised Advice", desc: "We understand your family's needs and budget — not just sell a policy." },
    { icon: "⚡", title: "Claim Support", desc: "We guide you step-by-step through cashless and reimbursement claims so you're never alone." },
    { icon: "🏥", title: "14,000+ Hospitals", desc: "Access to one of India's largest cashless hospital networks across every major city." },
    { icon: "📋", title: "Plan Comparison", desc: "We compare plans across sum insured, waiting periods, and benefits to find your best fit." },
    { icon: "🔄", title: "Renewal Reminders", desc: "Never miss a renewal — we proactively remind and assist you every year." },
    { icon: "👪", title: "All Plan Types", desc: "Individual, family floater, senior citizen, and corporate group plans — all under one roof." },
  ];
  return (
    <section className="why-bg">
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag" style={{background: "rgba(255,255,255,0.1)", color: "white"}}>Why Us</span>
          <h2 className="section-title">Why Choose My Bima Mitra?</h2>
          <p className="section-sub">We're not just selling a policy. We're your long-term health insurance partner.</p>
        </div>
        <div className="grid-3">
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
function CashlessProcess() {
  const steps = [
    { 
      num: "1", 
      icon: "fa-hospital-user", 
      title: "Visit Network Hospital", 
      desc: "Walk into any of our 15,000+ PAN-India cashless network hospitals. Show your valid ID proof (Aadhar/PAN) and current Star Health policy number at the TPA desk." 
    },
    { 
      num: "2", 
      icon: "fa-file-signature", 
      title: "Pre-Auth Request", 
      desc: "The hospital's TPA will instantly send out the pre-auth request for you. We ensure rapid approvals so you get a stress-free admission and can get ready for treatment." 
    },
    { 
      num: "3", 
      icon: "fa-headset", 
      title: "Priority Claim Support", 
      desc: "If any problem occurs, call our direct helpline at +91 95750 56250. We will personally help you provide missing documents and ease your claim process immediately." 
    }
  ];

  return (
    <section className="section claim-section">
      <div className="container reveal">
        <div className="section-header">
          <span className="section-tag" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--accent)" }}>Stress-Free Admissions</span>
          <h2 className="section-title">3-Step Cashless Claim</h2>
          <p className="section-sub">Focus entirely on your family's recovery. Here is exactly how we ensure your hospital admission is completely hassle-free.</p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div key={i} className="process-card">
              <div className="process-num">{s.num}</div>
              <div className="process-icon"><i className={`fa-solid ${s.icon}`}></i></div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Leadership() {
  const leaders = [
    { name: "ManishPal Singh Sisodiya", role: "Chief Executive Officer", bio: "18+ years of leadership in health insurance advisory, helping thousands of families get the right Star Health coverage.", img: "/ceo.jpg" },
    { name: "Kiran Singh Sisodiya", role: "Director – Operations & Client Support", bio: "Overseeing policy servicing, renewals, and client advisory to ensure a seamless insurance experience end to end.", img: "/director.jpg" },
  ];
  return (
    <section style={{background: "white"}}>
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag">Leadership</span>
          <h2 className="section-title">Meet Our Experts</h2>
          <p className="section-sub">Trusted professionals dedicated to your family's health security and financial protection.</p>
        </div>
        <div className="grid-2" style={{maxWidth: 900, margin: "auto"}}>
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

function CuratedPlans() {
  return (
    <section className="section" style={{background: "white", paddingBottom: "120px"}}>
      <div className="container reveal">
        <div className="curated-header">
          <div>
            <h2 className="section-title">Curated Health Plans</h2>
            <p className="section-sub">We've hand-picked the best Star Health products for every life stage.</p>
          </div>
          <div className="curated-nav">
            <button className="curated-nav-btn"><i className="fa-solid fa-chevron-left"></i></button>
            <button className="curated-nav-btn"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
        
        <div className="curated-grid">
          
          {/* Plan 1: Star Health Assure */}
          <div className="cp-card">
            <div className="cp-icon-wrap">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <h3 className="cp-title">Star Health Assure</h3>
            <p className="cp-desc">A comprehensive, premium indemnity health insurance product offering unmatched features and modern treatments.</p>
            <ul className="cp-features">
              <li><i className="fa-solid fa-circle-check"></i> Unlimited Restoration</li>
              <li><i className="fa-solid fa-circle-check"></i> In-built Maternity Cover</li>
              <li><i className="fa-solid fa-circle-check"></i> Consumables Covered</li>
            </ul>
            <a href="#/star-health-assure" className="cp-btn cp-btn-outline">View Plan Details</a>
          </div>

          {/* Plan 2 (Highlighted): Super Star Flexi */}
          <div className="cp-card highlight">
            <div className="cp-badge">Most Popular</div>
            <div className="cp-icon-wrap">
              <i className="fa-solid fa-star"></i>
            </div>
            <h3 className="cp-title">Super Star Flexi</h3>
            <p className="cp-desc">The ultimate future-proof health insurance. This revolutionary plan adapts to your life stage and needs.</p>
            <ul className="cp-features">
              <li><i className="fa-solid fa-circle-check"></i> Freeze Your Age</li>
              <li><i className="fa-solid fa-circle-check"></i> Premium Return</li>
              <li><i className="fa-solid fa-circle-check"></i> Limitless Loyalty Bonus</li>
            </ul>
            <a href="#/super-star-flexi" className="cp-btn cp-btn-solid">View Plan Details</a>
          </div>

          {/* Plan 3: Star Women Care */}
          <div className="cp-card">
            <div className="cp-icon-wrap">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>
            <h3 className="cp-title">Star Women Care</h3>
            <p className="cp-desc">An exclusively crafted policy for women and mothers. Enjoy industry-leading maternity and newborn benefits.</p>
            <ul className="cp-features">
              <li><i className="fa-solid fa-circle-check"></i> 1-Year Maternity Waiting Period</li>
              <li><i className="fa-solid fa-circle-check"></i> Day 1 Newborn Cover</li>
              <li><i className="fa-solid fa-circle-check"></i> No Pre-Policy Medicals</li>
            </ul>
            <a href="#/women-care" className="cp-btn cp-btn-outline">View Plan Details</a>
          </div>

        </div>
      </div>
    </section>
  );
}

function HomeHealthCare() {
  const appFeatures = [
    { icon: "fa-virus", title: "Comprehensive Coverage", desc: "Coverage for fever, flu, gastritis & infectious diseases right at home." },
    { icon: "fa-house-medical-circle-check", title: "Zero Out-of-Pocket", desc: "Expert home care provided at no additional cost to eligible policyholders." },
    { icon: "fa-shield-virus", title: "Infection Prevention", desc: "Prevent hospital-acquired infections by recovering safely in familiar surroundings." },
    { icon: "fa-clock", title: "Dedicated Timings", desc: "Specialised professional medical care available daily from 8 AM to 8 PM." }
  ];

  const services = ["Doctor Home Visits", "Skilled Nursing Care", "IV Fluids & Medication", "Physiotherapy Support", "Medical Equipment"];
  const idealFor = ["Elderly Patients", "Post-Hospital Recovery", "Mild to Moderate Illness", "Mobility Challenges"];

  return (
    <section className="section" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)" }}>
      <div className="container reveal">
        <div className="section-header">
          <span className="section-tag" style={{ background: "var(--brand)", color: "white" }}>Premium Service</span>
          <h2 className="section-title">Star Health Home Care</h2>
          <p className="section-sub">Expert, personalised hospital-like care right in the comfort of your home. No hospital visit needed.</p>
        </div>

        <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginBottom: "40px" }}>
          {appFeatures.map((f, i) => (
            <div key={i} style={{ background: "white", padding: "32px", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ width: "56px", height: "56px", background: "var(--brand-light)", color: "var(--brand)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px" }}>
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px", color: "var(--dark)" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "40px" }}>
          <div style={{ background: "white", padding: "40px", borderRadius: "24px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <i className="fa-solid fa-user-doctor" style={{color: "var(--brand)"}}></i> Services Included
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {services.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", color: "var(--text)" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#10b981", fontSize: "18px" }}></i> {s}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "white", padding: "40px", borderRadius: "24px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <i className="fa-solid fa-bed-pulse" style={{color: "#f59e0b"}}></i> Ideal For
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {idealFor.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", color: "var(--text)" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "#f59e0b", fontSize: "18px" }}></i> {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "var(--dark)", borderRadius: "24px", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", backgroundImage: "radial-gradient(circle at top right, rgba(37, 99, 235, 0.3), transparent 50%)" }}>
          <div>
            <h3 style={{ color: "white", fontSize: "24px", marginBottom: "8px" }}>Star Health Helpline</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>8 AM - 8 PM | Hindi language support available</p>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="tel:04469006900" style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "14px 24px", borderRadius: "100px", fontWeight: "700", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}><i className="fa-solid fa-phone"></i> 044 6900 6900</a>
            <a href="tel:7676905905" style={{ background: "var(--brand)", color: "white", padding: "14px 24px", borderRadius: "100px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}><i className="fa-solid fa-phone"></i> 7676 905 905</a>
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
          <h2 className="section-title">All Insurance Plans</h2>
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

function PremiumEstimator() {
  const [members, setMembers] = useState("1");
  const [age, setAge] = useState("18-35");
  const [sum, setSum] = useState("5");
  const [result, setResult] = useState(null);

  const BASE_ANNUAL_PREMIUM = {
    "1":   { "18-35": [6000, 8500],   "36-45": [8000, 11000],   "46-55": [12000, 17000], "56-65": [18000, 25000], "65+": [28000, 38000] },
    "2":   { "18-35": [9000, 12500],  "36-45": [11500, 16000],  "46-55": [17000, 24000], "56-65": [28000, 38000], "65+": [42000, 58000] },
    "3-4": { "18-35": [13000, 17500], "36-45": [16000, 22000], "46-55": [22000, 31000], "56-65": [34000, 46000], "65+": [50000, 68000] },
    "5+":  { "18-35": [17000, 23000], "36-45": [21000, 28000], "46-55": [28000, 39000], "56-65": [42000, 58000], "65+": [62000, 85000] },
  };

  const SUM_MULTIPLIER = { 
    "5": 1.0, 
    "7.5": 1.15, 
    "10": 1.25, 
    "15": 1.40, 
    "20": 1.55, 
    "25": 1.70, 
    "50": 2.0, 
    "100": 2.4, 
    "unlimited": 2.8 
  };
  
  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  const estimate = () => {
    const [min, max] = BASE_ANNUAL_PREMIUM[members][age];
    const m = SUM_MULTIPLIER[sum] || 1;
    setResult({
      min: Math.round((min * m) / 100) * 100,
      max: Math.round((max * m) / 100) * 100,
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
    <section style={{ background: "white" }}>
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag">Calculator</span>
          <h2 className="section-title">Premium Estimator</h2>
          <p className="section-sub">Get a quick ballpark figure before requesting a precise quote from our advisor.</p>
        </div>
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
            <button className="est-btn" onClick={estimate}>Calculate Premium →</button>
            {result && (
              <div className="est-result">
                <div className="est-result-label">Estimated Annual Premium</div>
                <div className="est-range">{fmt(result.min)} – {fmt(result.max)}</div>
                <p className="est-caveat">This is a ballpark estimate. Actual premium depends on medical history, location, and specific plan selected.</p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{background: "#25D366", boxShadow: "none"}}>💬 Discuss on WhatsApp</a>
                  <a href="#/consultation" className="btn btn-outline" style={{background: "white"}}>Get Exact Quote</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Rajesh Sharma", city: "Raipur", initial: "R", stars: 5, quote: "ManishPal Sir helped us choose the right family floater plan within our budget. When my father was hospitalized, the cashless process was completely smooth. Couldn't have asked for better guidance." },
    { name: "Sunita Verma", city: "Bhilai", initial: "S", stars: 5, quote: "I was worried about getting insurance for my 68-year-old mother. The team at My Bima Mitra explained everything patiently and found a plan that covers her pre-existing conditions after the waiting period." },
    { name: "Anil Patel", city: "Durg", initial: "A", stars: 5, quote: "I've renewed my policy through Bima Mitra for 4 years now. They always remind me before renewal and helped me increase my sum insured when my family grew. Truly trustworthy." },
  ];
  return (
    <section>
      <div className="container section reveal">
        <div className="section-header">
          <span className="section-tag">Reviews</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-sub">Real experiences from families we've helped across Chhattisgarh & beyond.</p>
        </div>
        <div className="grid-3">
          {reviews.map((r, i) => (
            <div key={i} className="card">
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

function SuperStarFlexi() { 
  return <PlanDetail 
    title="Super Star Flexi" 
    description="The ultimate future-proof health insurance. This revolutionary plan adapts to your life stage, allowing you to lock in your entry age, accumulate limitless bonuses, and even get your premium returned." 
    ages={[
      { label: "Adult Entry Age", value: "18 to 100 Yrs" }, 
      { label: "Child Entry Age", value: "91 Days - 25 Yrs" }
    ]} 
    features={[
      "<b>Freeze Your Age:</b> Your premiums are locked at your entry age until you make your first claim.", 
      "<b>Premium Return:</b> Get your 1st-year base premium fully returned if you have no IPD claim for 5 years.", 
      "<b>Limitless Loyalty Bonus & NCB:</b> Earn a 100% boost to your Sum Insured every year (Limitless), plus a 50% No Claim Bonus annually up to 100%.", 
      "<b>Quick Shield:</b> Covers Pre-Existing Diseases (PED) such as diabetes, hypertension, hyperlipidemia, asthma, and coronary artery disease with PTCA done prior to 1 year.", 
      "<b>Stay Fit Benefit:</b> 7 sessions per week in empaneled fitness centres (gym and fitness studios)."
    ]} 
    ctaLabel="Request Flexi Quote" 
  />; 
}

function StarHealthAssure() { 
  return <PlanDetail 
    title="Star Health Assure" 
    description="A comprehensive, premium indemnity health insurance product covering extensive hospitalization expenses, modern treatments, and unmatched automatic restoration features." 
    ages={[
      { label: "Adult Entry Age", value: "18 to 75 Yrs" }, 
      { label: "Dependent Children", value: "16 Days to 25 Yrs" }
    ]} 
    features={[
      "<b>Automatic Restoration of Sum Insured:</b> Automatic Restoration of Sum Insured for an unlimited number of times in a policy year.", 
      "<b>Consumables Covered:</b> Non-Medical items like gloves, masks, and food charges are covered up to SI.", 
      "<b>In-built Maternity & Fetal Care:</b> In Utero Fetal Surgery, Maternity expenses, and Assisted Reproduction Treatment.", 
      "<b>Home & AYUSH Care:</b> Home care treatment and traditional AYUSH treatments covered up to Sum Insured."
    ]} 
    ctaLabel="Request Assure Quote" 
  />; 
}

function WomenCare() { 
  return <PlanDetail 
    title="Star Women Care" 
    description="An exclusively crafted policy for women and mothers. Enjoy industry-leading maternity benefits, instant newborn coverage, and preventive health features." 
    ages={[
      { label: "Individual (Females)", value: "18 to 75 Yrs" }, 
      { label: "Floater (Min 1 Female)", value: "18 to 75 Yrs" }, 
      { label: "Dependent Child", value: "91 Days - 25 Yrs" }
    ]} 
    features={[
      "<b>Accelerated Maternity Cover:</b> Maternity & delivery expenses covered with just a <b>1-Year (12 months) waiting period</b> (for SI ₹15L and above).", 
      "<b>Day 1 Newborn Cover:</b> Newborn baby is covered from Day 1 without any prior medical check-up (if pre-scans are submitted).", 
      "<b>Comprehensive Female Care:</b> Covers voluntary sterilization expenses and routine preventive health check-ups.", 
      "<b>No Pre-Policy Medicals:</b> Hassle-free issuance with no pre-policy medical check-up required."
    ]} 
    ctaLabel="Get Women Care Quote" 
  />; 
}

function CancerCare() { 
  return <PlanDetail 
    title="Star Cancer Care Platinum" 
    description="A highly specialized health insurance policy providing critical indemnity coverage for persons previously diagnosed with Cancer (any stage)." 
    ages={[
      { label: "Patient Entry Age", value: "5 Mths to 65 Yrs" }, 
      { label: "Sum Insured Options", value: "₹5L, ₹7.5L, ₹10L" }
    ]} 
    features={[
      "<b>Pre-Diagnosed Acceptance:</b> Designed specifically for individuals who have already been diagnosed with Cancer.", 
      "<b>Dual Protection:</b> Provides strong indemnity coverage for BOTH cancer and non-cancer medical hospitalizations.", 
      "<b>Optional Lump-Sum:</b> Lump-sum cover available as an optional section for immediate financial relief.", 
      "<b>Pan-India Cashless:</b> Access to Star Health's massive cashless treatment network across India."
    ]} 
    ctaLabel="Get Cancer Care Details" 
  />; 
}

function CardiacCare() { 
  return <PlanDetail 
    title="Star Cardiac Care Platinum" 
    description="Dedicated insurance for individuals who have undergone a Cardiac ailment, surgical intervention, or procedure in the past." 
    ages={[
      { label: "Patient Entry Age", value: "7 to 70 Yrs" }, 
      { label: "Sum Insured Options", value: "Up to ₹15 Lakhs" }
    ]} 
    features={[
      "<b>No Pre-Medical Screening:</b> No pre-acceptance medical tests required (simply submit past medical records).", 
      "<b>Cardiac & Beyond:</b> Provides vital coverage for pre-existing cardiac conditions as well as Non-Cardiac treatments.", 
      "<b>Accident Coverage:</b> Fully covers accident-related hospitalizations alongside medical illnesses.", 
      "<b>Flexible Options:</b> Choose from Sum Insured options of ₹5L, ₹7.5L, ₹10L, and ₹15 Lakhs."
    ]} 
    ctaLabel="Get Cardiac Care Details" 
  />; 
}

function Overseas() { 
  return <PlanDetail 
    title="Star Travel Protect" 
    description="Complete medical and emergency protection for international travel, ensuring you and your family are safe from transit emergencies anywhere in the world." 
    ages={[
      { label: "Standard Age Limit", value: "6 Mths to 75 Yrs" }, 
      { label: "Senior Citizens", value: "Subject to Loading" }
    ]} 
    features={[
      "<b>Global Medical Cover:</b> Payment of expenses following any Medical Emergency during your international stay.", 
      "<b>Transit Emergencies:</b> Protection against Flight Delay, Missed Connections, and Trip Cancellation.", 
      "<b>Baggage & Passport:</b> Compensation for Loss of Passport and Loss or Delay of Checked-in Baggage.", 
      "<b>Dental & Evacuation:</b> Covers dental emergencies following an accident and emergency medical evacuation."
    ]} 
    ctaLabel="Get Travel Quote" 
  />; 
}

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
          <h2 className="section-title">Client FAQs</h2>
          <p className="section-sub">Quick answers to important policy and claim questions</p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`faq-chevron`}>▼</span>
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
    { icon: "📱", title: "Star App (Android)", link: "https://play.google.com/store/apps/details?id=com.star.customer_app" },
    { icon: "🍏", title: "Star App (iOS)", link: "https://apps.apple.com/in/app/star-health/id1477621177" },
  ];
  return (
    <div className="container section reveal">
      <div className="section-header">
        <span className="section-tag">Links</span>
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
        <span className="section-tag">Let's Connect</span>
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
        <span className="section-tag">Reach Out</span>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-sub">We are here to help you secure the best health coverage.</p>
      </div>
      <div className="grid-3">
        <a href="tel:+919575056250" className="card contact-card">
          <span className="contact-icon">📞</span>
          <div className="contact-label">Call Us</div>
          <div className="contact-value">+91 95750 56250</div>
        </a>
        <a href="mailto:manish.starhealth.in@gmail.com" className="card contact-card">
          <span className="contact-icon">✉️</span>
          <div className="contact-label">Email Us</div>
          <div className="contact-value email-text">manish.starhealth.in@gmail.com</div>
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

function HealthConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="concierge-wrapper">
      
      {/* Floating Window */}
      <div className={`concierge-window ${isOpen ? 'open' : ''}`}>
        <div className="cw-body">
          <div className="cw-header">
            <div className="cw-avatar">
              <i className="fa-solid fa-headset"></i>
              <div className="status-dot"></div>
            </div>
            <div>
              <div className="cw-title">Health Concierge</div>
              <div className="cw-sub">Online & Ready to Help</div>
            </div>
          </div>
          
          <div className="cw-grid">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cw-action">
              <i className="fa-brands fa-whatsapp" style={{color: '#25D366'}}></i>
              <span>WhatsApp</span>
            </a>
            <a href="tel:+919575056250" className="cw-action">
              <i className="fa-solid fa-phone-volume"></i>
              <span>Call Support</span>
            </a>
            <a href="#/resources" onClick={() => setIsOpen(false)} className="cw-action">
              <i className="fa-solid fa-folder-open"></i>
              <span>Resources</span>
            </a>
            <div className="cw-action active">
              <i className="fa-solid fa-user-tie"></i>
              <span>Concierge</span>
            </div>
          </div>
          
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cw-btn">
            Start Chat <i className="fa-solid fa-paper-plane" style={{ marginLeft: "4px" }}></i>
          </a>
        </div>
      </div>

      {/* Toggle Button */}
      <button className="concierge-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-headset"></i>}
        {!isOpen && <div className="status-dot"></div>}
      </button>
      
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
              {links.map(({ label, path }) => <a key={path} href={"#/" + path} className="footer-link">{label}</a>)}
            </div>
          </div>
          <div>
            <div className="footer-title">Contact</div>
            <div className="footer-links">
              <a href="tel:+919575056250" className="footer-link">📞 +91 95750 56250</a>
              <a href="mailto:manish.starhealth.in@gmail.com" className="footer-link">✉️ Email Support</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-link" style={{color: '#4ade80', fontWeight: '600'}}>💬 WhatsApp Chat</a>
            </div>
          </div>
          
          {/* RESTORED SEO FOOTER LINKS */}
          <div>
            <div className="footer-title">Areas Served</div>
            <div className="footer-links">
              <a href="#/star-health-insurance-agent-bhopal" className="footer-link">Agent in Bhopal</a>
              <a href="#/star-health-insurance-agent-indore" className="footer-link">Agent in Indore</a>
              <a href="#/star-health-insurance-agent-raipur" className="footer-link">Agent in Raipur</a>
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

// ===== RESTORED SEO LANDING PAGE COMPONENT =====
function SEOLandingPage({ city, title, description }) {
  return (
    <>
      <section className="hero" style={{ padding: "120px 0 60px", textAlign: "center" }}>
        <div className="container reveal">
          <div className="section-tag">Local Expert</div>
          <h1 style={{ fontSize: "48px", margin: "0 auto 24px", maxWidth: "800px" }}>{title}</h1>
          <p className="section-sub" style={{ maxWidth: "800px", margin: "0 auto 40px" }}>
            {description}
          </p>
          <a href="#/consultation" className="btn btn-primary">Get Free Consultation in {city}</a>
        </div>
      </section>

      <WhyChooseUs />
      <PremiumEstimator />
      <Contact />
    </>
  );
}

// ===== MAIN APP =====
export default function App() {
  const route = useRoute();
  
  const Page = { 
    "": () => <><Hero /><EmiBanner /><WhyChooseUs /><Leadership /><CuratedPlans /><HomeHealthCare /><PremiumEstimator /><Testimonials /><FAQ /></>, 
    plans: Plans, 
    resources: Resources, 
    consultation: Consultation, 
    contact: Contact, 
    "super-star-flexi": SuperStarFlexi, 
    "star-health-assure": StarHealthAssure, 
    "women-care": WomenCare, 
    "cancer-care": CancerCare,
    "cardiac-care": CardiacCare,
    "overseas": Overseas,
    
    // --- RESTORED HIDDEN SEO PAGES ---
    "star-health-insurance-agent-bhopal": () => <SEOLandingPage 
        city="Bhopal" 
        title="Authorized Star Health Insurance Agent in Bhopal" 
        description="Looking for the best Star Health insurance plans in Bhopal? ManishPal Singh Sisodiya offers expert guidance, instant policy issuance, and end-to-end cashless claim support across top hospitals in Bhopal." 
    />,
    "star-health-insurance-agent-raipur": () => <SEOLandingPage 
        city="Raipur" 
        title="Expert Star Health Insurance Advisor in Raipur" 
        description="Protect your family with customized Star Health insurance in Raipur. Get free quotes, premium estimations, and local claim assistance from an advisor with 18+ years of experience." 
    />,
    "star-health-insurance-agent-indore": () => <SEOLandingPage 
        city="Indore" 
        title="Top Star Health Insurance Agent in Indore" 
        description="Secure your medical future with the right Star Health policy in Indore. We provide personalized plan comparisons, quick renewals, and dedicated support for cashless treatments." 
    />
 "": () => <><Hero /><EmiBanner /><WhyChooseUs /><CashlessProcess /><Leadership /><CuratedPlans /><HomeHealthCare /><PremiumEstimator /><Testimonials /><FAQ /></>,
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <a href="tel:+919575056250" className="action-btn btn-call">
          📞 Call Now
        </a>
      </div>
      
      <HealthConcierge />

      <Footer />
    </>
    /* ---- 3-Step Claim Timeline ---- */
  .claim-section { background: linear-gradient(180deg, white 0%, var(--bg) 100%); }
  .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; position: relative; margin-top: 40px; }
  .process-card { background: white; border: 1px solid var(--border); border-radius: 24px; padding: 48px 32px 40px; position: relative; text-align: center; box-shadow: var(--shadow-soft); transition: var(--transition); z-index: 2; }
  .process-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); border-color: var(--brand); }
  .process-num { position: absolute; top: -24px; left: 50%; transform: translateX(-50%); width: 48px; height: 48px; background: var(--dark); color: white; font-weight: 900; font-size: 18px; border-radius: 50%; border: 4px solid var(--bg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(15,23,42,0.2); transition: var(--transition); }
  .process-card:hover .process-num { background: var(--brand); border-color: var(--brand-light); }
  .process-icon { width: 72px; height: 72px; background: var(--brand-light); color: var(--brand); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 24px; transition: var(--transition); }
  .process-card:hover .process-icon { transform: scale(1.1) rotate(-5deg); background: var(--brand); color: white; }
  .process-title { font-size: 20px; margin-bottom: 16px; color: var(--dark); }
  .process-desc { font-size: 15px; color: var(--muted); line-height: 1.7; }
  
  /* Connecting Line for Desktop */
  @media (min-width: 992px) {
    .process-grid::before { content: ''; position: absolute; top: 24px; left: 10%; right: 10%; height: 2px; background: var(--border); z-index: 1; }
  }
  );
}
