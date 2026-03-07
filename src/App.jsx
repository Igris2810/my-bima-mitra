import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== CONSTANTS =====
const WA_MSG = encodeURIComponent("Hi, I'd like a free consultation");
const WA_LINK = `https://wa.me/918319600171?text=${WA_MSG}`;

// ===== GLOBAL CSS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0B3D91;
    --blue: #1c5fd4;
    --sky: #e8f0fd;
    --bg: #f7f9fc;
    --text: #1a2540;
    --muted: #6b7a9a;
    --white: #ffffff;
    --radius: 16px;
    --shadow: 0 8px 32px rgba(11,61,145,0.09);
    --shadow-lg: 0 20px 60px rgba(11,61,145,0.15);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
  a { text-decoration: none; color: inherit; }
  button { font-family: 'DM Sans', sans-serif; }

  /* ---- Announce Bar ---- */
  .announce-bar { background: linear-gradient(90deg, var(--navy), var(--blue)); color: white; text-align: center; padding: 9px 20px; font-size: 13px; font-weight: 500; }
  .announce-bar a { color: #fde68a; font-weight: 700; margin-left: 8px; }
  .announce-bar a:hover { text-decoration: underline; }

  /* ---- Navbar ---- */
  .navbar { display: flex; justify-content: space-between; align-items: center; padding: 0 60px; height: 78px; background: var(--white); box-shadow: 0 2px 20px rgba(11,61,145,0.07); position: sticky; top: 0; z-index: 100; }
  .navbar-brand { display: flex; align-items: center; gap: 14px; }
  .navbar-logo { height: 50px; border-radius: 8px; }
  .navbar-title { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 800; color: var(--navy); line-height: 1.1; }
  .navbar-sub { font-size: 11px; color: var(--blue); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .navbar-links { display: flex; gap: 4px; align-items: center; }
  .nav-link { padding: 8px 15px; border-radius: 8px; font-weight: 500; font-size: 14px; color: var(--text); transition: all .2s; }
  .nav-link:hover { background: var(--sky); color: var(--navy); }
  .nav-link.cta { background: var(--navy); color: white; padding: 9px 20px; font-weight: 600; }
  .nav-link.cta:hover { background: var(--blue); }

  /* ---- Hero ---- */
  .hero { background: linear-gradient(135deg, #0a2f72 0%, #0B3D91 45%, #1c5fd4 100%); color: white; padding: 100px 60px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -120px; right: -80px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
  .hero::after { content: ''; position: absolute; bottom: -90px; left: -50px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
  .hero-inner { max-width: 1160px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 60px; position: relative; z-index: 1; }
  .hero-text { max-width: 540px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.13); border: 1px solid rgba(255,255,255,0.22); padding: 6px 14px; border-radius: 100px; font-size: 13px; font-weight: 500; margin-bottom: 24px; }
  .hero-badge-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; flex-shrink: 0; }
  .hero h1 { font-size: 50px; line-height: 1.15; margin-bottom: 20px; font-weight: 800; }
  .hero p { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.85); margin-bottom: 36px; }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary { padding: 14px 28px; background: white; color: var(--navy); font-weight: 700; font-size: 15px; border: none; border-radius: 10px; cursor: pointer; transition: all .2s; box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(0,0,0,0.22); }
  .btn-outline { padding: 14px 28px; background: transparent; color: white; font-weight: 600; font-size: 15px; border: 2px solid rgba(255,255,255,0.45); border-radius: 10px; cursor: pointer; transition: all .2s; }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.1); }
  .hero-card { background: white; color: var(--text); border-radius: 20px; padding: 30px 28px; min-width: 300px; box-shadow: 0 24px 64px rgba(0,0,0,0.22); flex-shrink: 0; }
  .hero-card h3 { font-size: 17px; color: var(--navy); margin-bottom: 18px; }
  .stat-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f0f2f8; }
  .stat-item:last-child { border-bottom: none; }
  .stat-icon { width: 36px; height: 36px; background: var(--sky); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .stat-text { font-size: 14px; font-weight: 500; }

  /* ---- Section ---- */
  .section { max-width: 1160px; margin: auto; padding: 88px 24px; }
  .section-title { font-size: 36px; color: var(--navy); margin-bottom: 10px; text-align: center; }
  .section-sub { text-align: center; color: var(--muted); font-size: 16px; margin-bottom: 52px; line-height: 1.6; }

  /* ---- Card ---- */
  .card { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 30px; transition: transform .25s, box-shadow .25s; border: 1px solid #eef1f8; }
  .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

  /* ---- Why Choose Us ---- */
  .why-bg { background: linear-gradient(135deg, #0a2f72 0%, #0B3D91 60%, #1648b8 100%); }
  .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 20px; }
  .why-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.16); border-radius: var(--radius); padding: 26px 22px; color: white; transition: background .2s, transform .2s; }
  .why-card:hover { background: rgba(255,255,255,0.16); transform: translateY(-4px); }
  .why-icon { font-size: 32px; margin-bottom: 14px; }
  .why-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; font-family: 'DM Sans', sans-serif; }
  .why-desc { font-size: 13.5px; color: rgba(255,255,255,0.78); line-height: 1.65; }
  .why-section-title { font-size: 36px; color: white; margin-bottom: 10px; text-align: center; }
  .why-section-sub { text-align: center; color: rgba(255,255,255,0.72); font-size: 16px; margin-bottom: 52px; }

  /* ---- Leadership ---- */
  .leadership-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; max-width: 760px; margin: auto; }
  .leader-card { text-align: center; }
  .leader-avatar { width: 108px; height: 108px; border-radius: 50%; object-fit: cover; margin: 0 auto 16px; display: block; border: 4px solid var(--sky); }
  .leader-name { font-size: 20px; color: var(--navy); margin-bottom: 4px; }
  .leader-role { font-size: 12px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
  .leader-bio { font-size: 14px; color: var(--muted); line-height: 1.65; }

  /* ---- Plans ---- */
  .plans-bg { background: var(--sky); }
  .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 22px; }
  .plan-card { display: flex; flex-direction: column; }
  .plan-number { font-size: 38px; font-weight: 800; color: #d9e4f7; font-family: 'Playfair Display', serif; margin-bottom: 8px; }
  .plan-title { font-size: 18px; color: var(--navy); margin-bottom: 10px; }
  .plan-desc { font-size: 14px; color: var(--muted); line-height: 1.65; flex: 1; margin-bottom: 22px; }
  .btn-blue { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 600; font-size: 14px; border: none; border-radius: 8px; cursor: pointer; transition: opacity .2s, transform .2s; align-self: flex-start; }
  .btn-blue:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ---- Testimonials ---- */
  .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
  .testi-card { display: flex; flex-direction: column; gap: 14px; }
  .testi-stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
  .testi-quote { font-size: 15px; color: var(--text); line-height: 1.72; flex: 1; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 12px; margin-top: 6px; padding-top: 14px; border-top: 1px solid #f0f2f8; }
  .testi-avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--sky); display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; font-weight: 700; color: var(--navy); }
  .testi-name { font-size: 14px; font-weight: 700; color: var(--navy); }
  .testi-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .testi-plan { display: inline-block; background: var(--sky); color: var(--blue); font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 100px; margin-top: 4px; }
  .testi-note { display: inline-block; background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px; padding: 10px 18px; font-size: 13px; color: #92610a; margin-top: 28px; }

  /* ---- Premium Estimator ---- */
  .estimator-wrap { max-width: 820px; margin: auto; }
  .estimator-card { background: white; border: 1.5px solid #dde3f0; border-radius: 20px; padding: 38px; box-shadow: var(--shadow); }
  .estimator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 18px; margin-bottom: 24px; }
  .est-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 7px; }
  .est-select { width: 100%; padding: 11px 13px; border: 1.5px solid #dde3f0; border-radius: 10px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: var(--text); background: white; outline: none; transition: border-color .2s; cursor: pointer; }
  .est-select:focus { border-color: var(--blue); }
  .est-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 700; font-size: 16px; border: none; border-radius: 10px; cursor: pointer; transition: opacity .2s, transform .2s; }
  .est-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .est-result { margin-top: 26px; padding: 26px; background: var(--sky); border-radius: 14px; border: 1.5px solid #c5d8f8; animation: fadeIn .4s ease; }
  .est-result-label { font-size: 12px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
  .est-range { font-size: 32px; font-weight: 800; color: var(--navy); font-family: 'Playfair Display', serif; margin-bottom: 6px; }
  .est-caveat { font-size: 13px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; }
  .est-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .est-cta-wa { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; background: #25D366; color: white; font-weight: 700; font-size: 14px; border-radius: 9px; transition: opacity .2s; }
  .est-cta-wa:hover { opacity: 0.88; }
  .est-cta-form { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; background: var(--navy); color: white; font-weight: 700; font-size: 14px; border-radius: 9px; transition: opacity .2s; }
  .est-cta-form:hover { opacity: 0.88; }

  /* ---- FAQ ---- */
  .faq-bg { background: var(--sky); }
  .faq-list { max-width: 760px; margin: auto; display: flex; flex-direction: column; gap: 12px; }
  .faq-item { background: white; border-radius: 12px; border: 1px solid #dde3f0; overflow: hidden; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; cursor: pointer; font-weight: 600; font-size: 15px; color: var(--text); gap: 16px; user-select: none; transition: background .2s; }
  .faq-q:hover { background: #f8faff; }
  .faq-chevron { font-size: 18px; color: var(--blue); transition: transform .25s; flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-a { padding: 14px 22px 18px; font-size: 14.5px; color: var(--muted); line-height: 1.78; border-top: 1px solid #eef1f8; }

  /* ---- CTA Banner ---- */
  .cta-banner { background: linear-gradient(135deg, #0B3D91, #1c5fd4); color: white; text-align: center; padding: 72px 24px; }
  .cta-banner h2 { font-size: 36px; margin-bottom: 14px; }
  .cta-banner p { font-size: 16px; color: rgba(255,255,255,0.82); margin-bottom: 32px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.7; }
  .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* ---- Resources ---- */
  .resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
  .resource-card { display: flex; align-items: center; gap: 16px; padding: 20px 22px; }
  .resource-icon { font-size: 26px; flex-shrink: 0; }
  .resource-name { font-size: 15px; font-weight: 600; flex: 1; }
  .resource-arrow { color: var(--blue); font-weight: 700; font-size: 17px; }

  /* ---- Consultation ---- */
  .form-wrapper { max-width: 480px; margin: auto; }
  .form-field { width: 100%; padding: 13px 16px; border: 1.5px solid #dde3f0; border-radius: 10px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: var(--text); background: white; margin-bottom: 13px; outline: none; transition: border-color .2s; }
  .form-field:focus { border-color: var(--blue); }
  .form-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 700; font-size: 16px; border: none; border-radius: 10px; cursor: pointer; transition: opacity .2s, transform .2s; margin-top: 4px; }
  .form-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .success-box { text-align: center; padding: 48px 32px; background: white; border-radius: 20px; box-shadow: var(--shadow); max-width: 400px; margin: auto; }
  .success-icon { font-size: 52px; margin-bottom: 16px; }
  .success-box h3 { color: var(--navy); margin-bottom: 10px; font-size: 24px; }
  .success-box p { color: var(--muted); line-height: 1.6; }

  /* ---- Contact ---- */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 760px; margin: auto; }
  .contact-card { display: flex; align-items: center; gap: 16px; padding: 26px; }
  .contact-icon { font-size: 30px; }
  .contact-label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .contact-value { font-size: 15px; font-weight: 600; color: var(--navy); }

  /* ---- Plan Detail ---- */
  .plan-detail { max-width: 760px; }
  .plan-detail h2 { font-size: 38px; color: var(--navy); margin-bottom: 16px; }
  .plan-detail p { font-size: 16px; color: var(--muted); line-height: 1.78; margin-bottom: 28px; }
  .feature-list { list-style: none; margin-bottom: 36px; }
  .feature-list li { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #eef1f8; font-size: 15px; }
  .feature-check { color: var(--blue); font-size: 17px; font-weight: 700; flex-shrink: 0; }
  .back-link { color: var(--blue); font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 24px; }
  .back-link:hover { text-decoration: underline; }

  /* ---- WhatsApp Widget ---- */
  .wa-widget { position: fixed; bottom: 24px; right: 24px; z-index: 200; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
  .wa-bubble { background: white; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.18); padding: 20px; width: 290px; animation: slideUp .3s ease; }
  .wa-bubble-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .wa-bubble-avatar { width: 42px; height: 42px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .wa-bubble-name { font-size: 15px; font-weight: 700; color: var(--text); }
  .wa-bubble-status { font-size: 12px; color: #25D366; font-weight: 500; }
  .wa-bubble-msg { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
  .wa-bubble-btn { width: 100%; padding: 11px; background: #25D366; color: white; font-weight: 700; font-size: 14px; border: none; border-radius: 9px; cursor: pointer; transition: opacity .2s; }
  .wa-bubble-btn:hover { opacity: 0.88; }
  .wa-main-btn { width: 56px; height: 56px; border-radius: 50%; background: #25D366; color: white; font-size: 26px; border: none; cursor: pointer; box-shadow: 0 6px 20px rgba(37,211,102,0.45); transition: transform .2s; display: flex; align-items: center; justify-content: center; }
  .wa-main-btn:hover { transform: scale(1.08); }
  @keyframes wa-pulse { 0%,100% { box-shadow: 0 6px 20px rgba(37,211,102,0.45); } 50% { box-shadow: 0 6px 28px rgba(37,211,102,0.75); } }
  .wa-pulse { animation: wa-pulse 2s infinite; }

  /* ---- Call Float ---- */
  .call-float { position: fixed; bottom: 90px; right: 24px; z-index: 200; background: var(--navy); color: white; padding: 12px 18px; border-radius: 100px; font-weight: 700; font-size: 14px; box-shadow: 0 6px 20px rgba(11,61,145,0.4); transition: transform .2s; display: flex; align-items: center; gap: 6px; }
  .call-float:hover { transform: translateY(-2px); }

  /* ---- Footer ---- */
  .footer { background: #0e1b3d; color: rgba(255,255,255,0.65); padding: 52px 60px 28px; }
  .footer-inner { max-width: 1160px; margin: auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 36px; }
  .footer-brand h3 { font-size: 22px; color: white; margin-bottom: 6px; }
  .footer-brand p { font-size: 13.5px; line-height: 1.65; }
  .footer-links { display: flex; flex-direction: column; gap: 9px; }
  .footer-link { font-size: 14px; transition: color .2s; }
  .footer-link:hover { color: white; }
  .footer-bottom { max-width: 1160px; margin: auto; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 12.5px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }

  /* ---- Animations ---- */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* ---- Mobile ---- */
  @media (max-width: 900px) {
    .navbar { padding: 0 20px; }
    .navbar-links { display: none; }
    .hero { padding: 60px 22px; }
    .hero h1 { font-size: 34px; }
    .hero-inner { flex-direction: column; }
    .hero-card { width: 100%; min-width: unset; }
    .footer { padding: 40px 22px 24px; }
    .footer-inner { flex-direction: column; gap: 28px; }
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

// ===== ANNOUNCE BAR =====
function AnnounceBar() {
  return (
    <div className="announce-bar">
      🛡️ Authorized Star Health Insurance Advisor — Free consultation for new clients
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
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" className="navbar-logo" alt="My Bima Mitra" />
        <div>
          <div className="navbar-title">My Bima Mitra</div>
          <div className="navbar-sub">Star Health Insurance Advisory</div>
        </div>
      </div>
      <div className="navbar-links">
        {links.map(({ label, path }) => (
          <a key={path} href={`#/${path}`} className="nav-link">{label}</a>
        ))}
        <a href="#/consultation" className="nav-link cta">Free Consultation</a>
      </div>
    </nav>
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
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Authorized Star Health Advisor
          </div>
          <h1>Expert Health Insurance Advisory & Guidance</h1>
          <p>
            Led by <strong>ManishPal Singh Sisodiya (CEO)</strong>, with 18+ years of experience
            guiding families and individuals toward the right Star Health insurance protection.
          </p>
          <div className="hero-actions">
            <a href="#/consultation"><button className="btn-primary">Talk to an Expert →</button></a>
            <a href="#/plans"><button className="btn-outline">Explore Plans</button></a>
          </div>
        </div>
        <div className="hero-card">
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
      <div className="section">
        <h2 className="why-section-title">Why Choose My Bima Mitra?</h2>
        <p className="why-section-sub">We're not just selling a policy. We're your long-term health insurance partner.</p>
        <div className="why-grid">
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
    <section style={{ background: "white" }}>
      <div className="section">
        <h2 className="section-title">Our Leadership</h2>
        <p className="section-sub">Trusted professionals dedicated to your health security</p>
        <div className="leadership-grid">
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
    { title: "Family Floater Plans", link: "#/consultation", desc: "A single policy covering your entire family with shared sum insured and complete peace of mind." },
    { title: "Senior Citizen Plans", link: "#/consultation", desc: "Specialized health insurance designed with the unique needs of parents and senior citizens in mind." },
  ];
  return (
    <section className="plans-bg">
      <div className="section">
        <h2 className="section-title">Featured Health Insurance Plans</h2>
        <p className="section-sub">Choose coverage that fits your life and budget</p>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={i} className="card plan-card">
              <div className="plan-number">0{i + 1}</div>
              <h3 className="plan-title">{plan.title}</h3>
              <p className="plan-desc">{plan.desc}</p>
              <a href={plan.link}><button className="btn-blue">View Details →</button></a>
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
const SUM_MULTIPLIER = { "3": 0.8, "5": 1.0, "10": 1.45, "15": 1.85, "20": 2.2 };
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

  return (
    <section style={{ background: "white" }}>
      <div className="section">
        <h2 className="section-title">Premium Estimator</h2>
        <p className="section-sub">Get a quick ballpark — then let our advisor find your exact best plan</p>
        <div className="estimator-wrap">
          <div className="estimator-card">
            <div className="estimator-grid">
              <div>
                <div className="est-label">Members to Cover</div>
                <select className="est-select" value={members} onChange={e => { setMembers(e.target.value); setResult(null); }}>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-4">3–4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
              <div>
                <div className="est-label">Oldest Member Age</div>
                <select className="est-select" value={age} onChange={e => { setAge(e.target.value); setResult(null); }}>
                  <option value="18-35">18–35 years</option>
                  <option value="36-45">36–45 years</option>
                  <option value="46-55">46–55 years</option>
                  <option value="56-65">56–65 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>
              <div>
                <div className="est-label">Sum Insured</div>
                <select className="est-select" value={sum} onChange={e => { setSum(e.target.value); setResult(null); }}>
                  <option value="3">₹3 Lakhs</option>
                  <option value="5">₹5 Lakhs</option>
                  <option value="10">₹10 Lakhs</option>
                  <option value="15">₹15 Lakhs</option>
                  <option value="20">₹20 Lakhs</option>
                </select>
              </div>
            </div>
            <button className="est-btn" onClick={estimate}>Estimate My Premium →</button>
            {result && (
              <div className="est-result">
                <div className="est-result-label">Estimated Annual Premium</div>
                <div className="est-range">{fmt(result.min)} – {fmt(result.max)}</div>
                <p className="est-caveat">Ballpark estimate based on typical Star Health premiums. Actual amount depends on health history, city, and plan. Talk to our advisor for an exact quote.</p>
                <div className="est-cta-row">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="est-cta-wa">💬 Discuss on WhatsApp</a>
                  <a href="#/consultation" className="est-cta-form">📋 Get Exact Quote</a>
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
// ⚠️ Replace these with real client quotes before going live!
function Testimonials() {
  const reviews = [
    { name: "Rajesh Sharma", city: "Raipur", plan: "Family Floater", initial: "R", stars: 5, quote: "ManishPal Sir helped us choose the right family floater plan within our budget. When my father was hospitalized, the cashless process was completely smooth. Couldn't have asked for better guidance." },
    { name: "Sunita Verma", city: "Bhilai", plan: "Senior Citizen Plan", initial: "S", stars: 5, quote: "I was worried about getting insurance for my 68-year-old mother. The team at My Bima Mitra explained everything patiently and found a plan that covers her pre-existing conditions after the waiting period." },
    { name: "Anil Patel", city: "Durg", plan: "Star Health Assure", initial: "A", stars: 5, quote: "I've renewed my policy through Bima Mitra for 4 years now. They always remind me before renewal and helped me increase my sum insured when my family grew. Truly trustworthy." },
    { name: "Priya Joshi", city: "Bilaspur", plan: "Super Star Flexi", initial: "P", stars: 5, quote: "Filing a claim used to feel scary. But Kiran Ma'am walked me through every step of the reimbursement process. Got my money back within 2 weeks. Excellent service!" },
    { name: "Deepak Sinha", city: "Korba", plan: "Family Floater", initial: "D", stars: 5, quote: "As a small business owner, I got group health coverage for my 12 employees through My Bima Mitra. The pricing was competitive and after-sale support is excellent." },
    { name: "Meena Gupta", city: "Raipur", plan: "Senior Citizen Plan", initial: "M", stars: 5, quote: "My husband had a bypass surgery and the entire hospitalization was cashless. My Bima Mitra team was available on call throughout the process. Lifesavers literally!" },
  ];
  return (
    <section className="plans-bg">
      <div className="section">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-sub">Real experiences from families we've helped across Chhattisgarh & beyond</p>
        <div className="testi-grid">
          {reviews.map((r, i) => (
            <div key={i} className="card testi-card">
              <div className="testi-stars">{"★".repeat(r.stars)}</div>
              <p className="testi-quote">"{r.quote}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{r.initial}</div>
                <div>
                  <div className="testi-name">{r.name}</div>
                  <div className="testi-meta">{r.city}</div>
                  <span className="testi-plan">{r.plan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <span className="testi-note">⚠️ Replace these with real client testimonials before going live for best results.</span>
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
      a: "When admitted to a network hospital, visit the insurance desk and show your Star Health policy card or policy number along with a valid ID. The hospital sends a pre-authorization request to Star Health. Once approved (usually within 30–60 minutes for planned procedures), treatment costs are settled directly between the hospital and Star Health. You only pay for non-covered expenses. Our team is available to guide you through the entire process."
    },
    {
      q: "What is the difference between Cashless and Reimbursement claims?",
      a: "In a Cashless claim, you get treated at a Star Health network hospital and the insurer pays the hospital directly — you don't need to arrange money upfront. In a Reimbursement claim, you get treated at a non-network hospital, pay the bills yourself, then submit all documents to Star Health for reimbursement. Cashless is faster and more convenient. We always recommend choosing a network hospital when possible."
    },
    {
      q: "What is the waiting period in health insurance?",
      a: "A waiting period is a duration after policy purchase during which specific claims cannot be made. Most Star Health plans have: an initial waiting period of 30 days (no claims except accidents), a pre-existing disease (PED) waiting period of 1–3 years, and a specific illness waiting period of 1–2 years for conditions like hernia, cataract, or knee replacement. After these periods, all conditions are fully covered. We help you understand every waiting period before you buy."
    },
    {
      q: "Can I port my existing health insurance policy to Star Health?",
      a: "Yes! Portability allows you to switch from your current insurer to Star Health without losing the waiting period credit you've already served. You must apply at least 45 days before your current policy's renewal date. Benefits include continuation of PED waiting period credit, no fresh waiting period for the same sum insured, and potentially better benefits. Contact us and we'll handle the entire porting process for you."
    },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-bg">
      <div className="section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-sub">Answers to what our clients ask most often</p>
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

// ===== CTA BANNER =====
function CTABanner() {
  return (
    <section className="cta-banner">
      <h2>Not Sure Which Plan Is Right for You?</h2>
      <p>Our advisor will review your family's needs and recommend the best Star Health plan — completely free, no obligation.</p>
      <div className="cta-actions">
        <a href="#/consultation"><button className="btn-primary">Get Free Consultation →</button></a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"><button className="btn-outline">💬 Chat on WhatsApp</button></a>
      </div>
    </section>
  );
}

// ===== PLAN DETAIL =====
function PlanDetail({ title, description, features, ctaLabel = "Request Consultation" }) {
  return (
    <div className="section plan-detail">
      <a href="#/plans" className="back-link">← Back to Plans</a>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}><span className="feature-check">✓</span> {f}</li>
        ))}
      </ul>
      <a href="#/consultation"><button className="btn-blue" style={{ padding: "13px 26px", fontSize: 15 }}>{ctaLabel} →</button></a>
    </div>
  );
}

function SuperStarFlexi() {
  return <PlanDetail
    title="Super Star Flexi"
    description="A flexible modern health insurance plan offering customizable coverage options and extensive hospital network access — designed to adapt as your needs grow."
    features={["Flexible coverage slabs to match your budget", "Cashless treatment at 14,000+ network hospitals", "Restoration of sum insured after a claim", "Pre and post hospitalization expenses covered", "No-claim bonus for claim-free years", "Day care procedures covered"]}
    ctaLabel="Request Plan Consultation"
  />;
}

function StarHealthAssure() {
  return <PlanDetail
    title="Star Health Assure"
    description="Comprehensive health insurance protection designed for long-term medical security and reliable hospital coverage across India."
    features={["High sum insured options available", "Extensive hospital and daycare coverage", "Reliable claim support guidance", "Maternity and newborn benefits", "Annual health check-up included", "AYUSH treatment coverage"]}
    ctaLabel="Check Eligibility"
  />;
}

// ===== RESOURCES =====
function Resources() {
  const resources = [
    { icon: "📋", title: "Claim Form", link: "#", external: false },
    { icon: "🔐", title: "Pre Authorization Form", link: "#", external: false },
    { icon: "🔄", title: "Policy Renewal", link: "https://www.starhealth.in/renewal", external: true },
    { icon: "💳", title: "EMI Renewal", link: "https://www.starhealth.in", external: true },
    { icon: "📱", title: "Star Health Mobile App", link: "https://play.google.com/store/apps/details?id=in.starhealth", external: true },
  ];
  return (
    <div className="section">
      <h2 className="section-title">Claims & Policy Resources</h2>
      <p className="section-sub">Quick access to forms and tools you need</p>
      <div className="resources-grid">
        {resources.map((r, i) => (
          <a key={i} href={r.link} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined}>
            <div className="card resource-card">
              <span className="resource-icon">{r.icon}</span>
              <span className="resource-name">{r.title}</span>
              <span className="resource-arrow">→</span>
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
    emailjs.send("service_prwxv5e", "template_lnnkfoo",
      { from_name: formData.name, phone: formData.phone, city: formData.city, message: formData.message },
      "6LcmS8gSIq2vvPppX"
    ).then(() => { setSubmitted(true); setLoading(false); }).catch(() => setLoading(false));
  };
  return (
    <div className="section">
      <h2 className="section-title">Request Expert Consultation</h2>
      <p className="section-sub">Fill in your details and our advisor will reach out within 24 hours — completely free</p>
      {submitted ? (
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h3>Request Received!</h3>
          <p>Thank you. Our advisor will contact you within 24 hours to help you find the right plan.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-wrapper">
          {[{ name: "name", placeholder: "Full Name", type: "text" }, { name: "phone", placeholder: "Phone Number", type: "tel" }, { name: "city", placeholder: "City", type: "text" }].map(({ name, placeholder, type }) => (
            <input key={name} name={name} type={type} placeholder={placeholder} value={formData[name]} onChange={handleChange} required className="form-field" />
          ))}
          <textarea name="message" placeholder="Tell us about your insurance requirement (optional)" value={formData.message} onChange={handleChange} rows={4} className="form-field" style={{ resize: "vertical" }} />
          <button type="submit" className="form-submit" disabled={loading}>{loading ? "Sending…" : "Request Consultation →"}</button>
        </form>
      )}
    </div>
  );
}

// ===== CONTACT =====
function Contact() {
  return (
    <div className="section">
      <h2 className="section-title">Contact Advisor</h2>
      <p className="section-sub">Reach us directly — we're always happy to help</p>
      <div className="contact-grid">
        <a href="tel:+918319600171"><div className="card contact-card"><span className="contact-icon">📞</span><div><div className="contact-label">Phone</div><div className="contact-value">+91 83196 00171</div></div></div></a>
        <a href="mailto:manish.starhealth.in@gmail.com"><div className="card contact-card"><span className="contact-icon">✉️</span><div><div className="contact-label">Email</div><div className="contact-value">manish.starhealth.in@gmail.com</div></div></div></a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"><div className="card contact-card"><span className="contact-icon">💬</span><div><div className="contact-label">WhatsApp</div><div className="contact-value">Chat with us now</div></div></div></a>
      </div>
    </div>
  );
}

// ===== WHATSAPP WIDGET =====
function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="wa-widget">
      {open && (
        <div className="wa-bubble">
          <div className="wa-bubble-header">
            <div className="wa-bubble-avatar">🛡️</div>
            <div>
              <div className="wa-bubble-name">My Bima Mitra</div>
              <div className="wa-bubble-status">● Online now</div>
            </div>
          </div>
          <p className="wa-bubble-msg">Hi there! 👋 Looking for health insurance guidance? We'll help you find the right Star Health plan for your family — for free.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
            <button className="wa-bubble-btn">Start Chat on WhatsApp →</button>
          </a>
        </div>
      )}
      <button className="wa-main-btn wa-pulse" onClick={() => setOpen(o => !o)} aria-label="WhatsApp Chat">
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

// ===== FOOTER =====
function Footer() {
  const links = [
    { label: "Home", path: "" }, { label: "Plans", path: "plans" },
    { label: "Resources", path: "resources" }, { label: "Consultation", path: "consultation" },
    { label: "Contact", path: "contact" },
  ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>My Bima Mitra</h3>
          <p>Star Health Insurance Advisory</p>
          <p style={{ marginTop: 8 }}>Authorized advisor with 18+ years of trust</p>
          <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>IRDAI Reg. No: [Add Your License No.]</p>
        </div>
        <div className="footer-links">
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Navigation</p>
          {links.map(({ label, path }) => (
            <a key={path} href={`#/${path}`} className="footer-link">{label}</a>
          ))}
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Contact</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>📞 +91 83196 00171</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>✉️ manish.starhealth.in@gmail.com</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "#4ade80" }}>💬 Chat on WhatsApp</a>
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
      <CTABanner />
    </>
  );
}

// ===== ROUTES =====
const ROUTES = {
  "": Home,
  plans: Plans,
  resources: Resources,
  consultation: Consultation,
  contact: Contact,
  "super-star-flexi": SuperStarFlexi,
  "star-health-assure": StarHealthAssure,
};

export default function App() {
  const route = useRoute();
  const Page = ROUTES[route] ?? Home;
  return (
    <>
      <style>{CSS}</style>
      <AnnounceBar />
      <Navbar />
      <main><Page /></main>
      <WhatsAppWidget />
      <a href="tel:+918319600171" className="call-float">📞 Call Now</a>
      <Footer />
    </>
  );
}
