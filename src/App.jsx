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
    --brand: #2563eb;       
    --brand-hover: #1d4ed8; 
    --dark: #0f172a;        
    --text: #334155;        
    --muted: #64748b;
    --bg: #f8fafc;          
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
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

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

  /* ---- Navbar (Updated for Space and Logo Size) ---- */
  .navbar-container { position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); box-shadow: var(--shadow-sm); }
  .navbar { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; width: 100%; margin: 0 auto; padding: 12px 32px; }
  .navbar-brand { display: flex; align-items: center; gap: 16px; transition: var(--transition); }
  .navbar-brand:hover { opacity: 0.9; }
  .navbar-logo { height: 86px; width: auto; object-fit: contain; } /* Much larger logo */
  .navbar-title { font-size: 26px; font-weight: 900; color: var(--dark); line-height: 1; margin-bottom: 4px; letter-spacing: -0.5px; }
  .navbar-sub { font-size: 12px; color: var(--brand); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
  
  .navbar-links { display: flex; align-items: center; gap: 12px; }
  .nav-link { padding: 10px 20px; border-radius: var(--radius-sm); font-weight: 700; font-size: 15px; color: var(--text); transition: var(--transition); }
  .nav-link:hover { background: #f1f5f9; color: var(--dark); }
  .nav-link.cta { background: var(--brand); color: white; box-shadow: var(--shadow-sm); padding: 12px 24px; margin-left: 8px; }
  .nav-link.cta:hover { background: var(--brand-hover); color: white; transform: translateY(-1px); box-shadow: var(--shadow-md); }

  /* ---- Hero Section ---- */
  .hero { 
    padding: 100px 24px 80px; 
    background-color: var(--surface);
    background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
    background-size: 24px 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .hero::before { content: ''; position: absolute; top: -20%; left: -10%; width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 60%); border-radius: 50%; filter: blur(60px); z-index: 0; pointer-events: none; }
  .hero-inner { max-width: 1200px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 60px; position: relative; z-index: 1; }
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
  
  .hero-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px; min-width: 380px; box-shadow: var(--shadow-md); flex-shrink: 0; animation: float 6s ease-in-out infinite; }
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

  /* ---- Plans ---- */
  .plans-bg { background: var(--bg); }
  .plan-number { font-size: 48px; font-weight: 900; color: #f1f5f9; margin-bottom: 16px; line-height: 1; transition: var(--transition); }
  .card:hover .plan-number { color: #e2e8f0; transform: translateX(4px); }
  .plan-title { font-size: 22px; margin-bottom: 12px; }
  .plan-desc { font-size: 15px; color: var(--muted); line-height: 1.7; flex-grow: 1; margin-bottom: 32px; }
  .plan-btn-wrapper { margin-top: auto; } 
  .btn-text { display: inline-flex; align-items: center; gap: 8px; color: var(--brand); font-weight: 700; font-size: 16px; transition: var(--transition); }
  .btn-text:hover { color: var(--brand-hover); gap: 12px; }

  /* ---- Plan Detail Page ---- */
  .plan-detail { max-width: 900px; margin: auto; padding: 100px 24px; }
  .plan-detail h2 { font-size: 44px; margin-bottom: 20px; line-height: 1.2; }
  .plan-detail p { font-size: 18px; color: var(--muted); line-height: 1.8; margin-bottom: 40px; font-weight: 500; }
  .feature-list { list-style-type: none !important; padding-left: 0 !important; margin: 0 0 48px 0 !important; }
  .feature-list li { display: flex; align-items: flex-start; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border); font-size: 16px; color: var(--dark); font-weight: 600; line-height: 1.6; }
  .feature-check { color: #10b981; font-size: 16px; font-weight: 900; background: #d1fae5; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .back-link { color: var(--muted); font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px; transition: var(--transition); text-transform: uppercase; letter-spacing: 0.05em; }
  .back-link:hover { color: var(--dark); transform: translateX(-4px); }

  /* ---- Contact (Email Fix) ---- */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; max-width: 1000px; margin: auto; align-items: stretch; }
  .contact-card { display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; padding: 40px 24px; border-radius: 24px; background: white; box-shadow: var(--shadow-sm); border: 1px solid var(--border); transition: var(--transition); height: 100%; box-sizing: border-box; }
  .contact-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: #cbd5e1; }
  .contact-icon { font-size: 32px; background: #eff6ff; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; border-radius: 20px; flex-shrink: 0; margin-bottom: 20px; color: var(--brand); }
  .contact-label { font-size: 12px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; text-align: center; }
  .contact-value { font-size: 16px; font-weight: 800; color: var(--dark); text-align: center; }
  .contact-value.email-text { white-space: normal !important; word-wrap: break-word !important; overflow-wrap: break-word !important; word-break: break-all !important; font-size: 15px; line-height: 1.4; width: 100%; }

  /* ---- FinTech FAQ Accordion (Redesigned & Separated) ---- */
  .faq-bg { background: var(--bg); padding-bottom: 120px; }
  .faq-list { max-width: 860px; margin: auto; display: flex; flex-direction: column; gap: 20px; } /* Increased Gap for Separation */
  .faq-item { background: var(--surface); border-radius: var(--radius-md); border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: var(--transition); overflow: hidden; }
  .faq-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: #cbd5e1; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; cursor: pointer; font-weight: 800; font-size: 18px; color: var(--dark); gap: 24px; user-select: none; }
  
  .faq-chevron { font-size: 20px; color: var(--brand); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); flex-shrink: 0; background: #eff6ff; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
  .faq-item.open { border-color: var(--brand); box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.15); }
  .faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--brand); color: white; }
  
  .faq-a { padding: 0 32px 28px; font-size: 16px; color: var(--text); line-height: 1.8; font-weight: 500; border-top: 1px solid var(--border); margin-top: 4px; padding-top: 24px; animation: slideUp .4s ease; }

  /* ---- Fixed Action Buttons ---- */
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

  /* ---- Misc CSS ---- */
  .why-bg { background: var(--dark); color: white; }
  .why-bg h2 { color: white; }
  .why-bg .section-sub { color: #94a3b8; }
  .why-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); padding: 32px; transition: var(--transition); display: flex; flex-direction: column; height: 100%; }
  .why-icon { font-size: 36px; margin-bottom: 20px; }
  .why-title { font-size: 20px; font-weight: 800; margin-bottom: 12px; color: white; }
  .why-desc { font-size: 15px; color: #cbd5e1; line-height: 1.7; flex-grow: 1; }

  /* ---- Mobile Adjustments ---- */
  @media (max-width: 900px) {
    .navbar-container { padding: 0; }
    .navbar { padding: 12px 20px; border-radius: 0; border-left: none; border-right: none; border-top: none; }
    .navbar-links { display: none; }
    .navbar-logo { height: 60px; } /* Slightly scaled for mobile to fit */
    .hero { padding: 60px 20px; }
    .hero h1 { font-size: 42px; }
    .hero-inner { flex-direction: column; gap: 40px; text-align: center; }
    .hero-text { margin: auto; }
    .hero-actions { justify-content: center; }
    .hero-card { width: 100%; min-width: unset; padding: 32px 24px; }
    .section { padding: 80px 20px; }
    .section-title { font-size: 32px; }
    .plan-detail h2 { font-size: 36px; }
    .footer-inner { grid-template-columns: 1fr; gap: 40px; }
    .fixed-actions { padding: 0 16px; bottom: 16px; }
    .action-btn { padding: 12px 20px; font-size: 14px; }
    .btn-wa-round { width: 56px; height: 56px; font-size: 28px; }
    .faq-q { padding: 20px; font-size: 16px; }
    .faq-a { padding: 0 20px 20px; }
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

// ===== PLANS MAIN PAGE =====
function Plans() {
  const plans = [
    { title: "Super Star Flexi", link: "#/super-star-flexi", desc: "Our most powerful plan. Freeze your age, enjoy limitless loyalty bonuses, and get your premium returned." },
    { title: "Star Health Assure", link: "#/star-health-assure", desc: "Comprehensive protection offering strong coverage, unlimited restoration, and modern medical benefits." },
    { title: "Star Women Care", link: "#/women-care", desc: "Exclusively designed for women and mothers. Features an incredibly low 1-year waiting period for maternity." },
    { title: "Star Cancer Care Platinum", link: "#/cancer-care", desc: "Specialized indemnity coverage specifically designed for persons previously diagnosed with Cancer." },
    { title: "Star Cardiac Care Platinum", link: "#/cardiac-care", desc: "Dedicated insurance for individuals who have undergone cardiac surgery, with NO pre-acceptance medicals." },
    { title: "Star Travel Protect", link: "#/overseas", desc: "Complete medical and travel emergency protection for your international trips and vacations." },
  ];
  return (
    <section className="plans-bg">
      <div className="section reveal">
        <h2 className="section-title">Featured Insurance Plans</h2>
        <p className="section-sub">Choose official Star Health coverage that perfectly fits your life, health condition, and budget.</p>
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

// ===== FINTECH PLAN DETAIL COMPONENT =====
function PlanDetail({ title, description, ages, features, ctaLabel = "Request Consultation" }) {
  return (
    <div className="plan-detail reveal">
      <a href="#/plans" className="back-link">← Back to Plans</a>
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {ages.map((age, i) => (
          <div key={i} className="card" style={{ padding: "24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.1em" }}>{age.label}</div>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "var(--brand)" }}>{age.value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Key Features & Benefits</h3>
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}>
            <span className="feature-check">✓</span> 
            <span dangerouslySetInnerHTML={{ __html: f }}></span>
          </li>
        ))}
      </ul>
      <a href="#/consultation"><button className="btn-primary" style={{ padding: "18px 40px", fontSize: "16px" }}>{ctaLabel} →</button></a>
    </div>
  );
}

// ===== INDIVIDUAL PLAN DETAILS =====
function SuperStarFlexi() {
  return <PlanDetail
    title="Super Star Flexi"
    description="The ultimate future-proof health insurance. This revolutionary plan adapts to your life stage, allowing you to lock in your entry age, accumulate limitless bonuses, and even get your premium returned."
    ages={[
      { label: "Adult Entry Age", value: "18+ Years" },
      { label: "Child Entry Age", value: "91 Days - 25 Yrs" }
    ]}
    features={[
      "<b>Freeze Your Age:</b> Your premiums are locked at your entry age until you make your first claim.",
      "<b>Premium Return:</b> Get your 1st-year base premium fully returned if you have no IPD claim for 5 years.",
      "<b>Limitless Loyalty Bonus:</b> Earn a 100% boost to your Sum Insured every year, with NO maximum cap.",
      "<b>Health Booster & NCB:</b> Get a 100% SI boost for every 7 claim-free years, plus a 50% No Claim Bonus annually.",
      "<b>Flexible Coverage:</b> Cashless treatment at 14,000+ network hospitals with Day Care procedures covered."
    ]}
    ctaLabel="Request Flexi Quote"
  />;
}

function StarHealthAssure() {
  return <PlanDetail
    title="Star Health Assure"
    description="A comprehensive, premium indemnity health insurance product covering extensive hospitalization expenses, modern treatments, and unmatched automatic restoration features."
    ages={[
      { label: "Adult Entry Age", value: "18 to 75 Years" },
      { label: "Child Entry Age", value: "16 Days to 17 Yrs" }
    ]}
    features={[
      "<b>Unlimited Restoration:</b> Automatic Restoration of Sum Insured for an unlimited number of times.",
      "<b>Consumables Covered:</b> Non-Medical items like gloves, masks, and food charges are covered up to SI.",
      "<b>Fetal & Maternity:</b> In Utero Fetal Surgery, Maternity expenses, and Assisted Reproduction Treatment.",
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
      { label: "Individual (Females)", value: "18 to 75 Years" },
      { label: "Floater (Min 1 Female)", value: "18 to 75 Years" },
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
      { label: "Patient Entry Age", value: "5 Months - 65 Yrs" },
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
      { label: "Patient Entry Age", value: "7 to 70 Years" },
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
    title="Star Travel Protect (Overseas)"
    description="Complete medical and emergency protection for international travel, ensuring you and your family are safe from transit emergencies anywhere in the world."
    ages={[
      { label: "Standard Age Limit", value: "6 Mths - 70 Yrs" },
      { label: "Senior Citizens (70+)", value: "Subject to Loading" }
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

// ===== FAQ ACCORDION (REDESIGNED) =====
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
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`faq-chevron ${isOpen ? 'open' : ''}`}>▼</span>
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

// ===== RESOURCES =====
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
    <div className="section reveal">
      <h2 className="section-title">Client Resources</h2>
      <p className="section-sub">Quick, direct access to official Star Health portals and forms</p>
      <div className="card-grid">
        {resources.map((r, i) => (
          <a key={i} href={r.link} target="_blank" rel="noopener noreferrer">
            <div className="card" style={{ flexDirection: "row", alignItems: "center", gap: "20px", padding: "24px" }}>
              <span className="resource-icon">{r.icon}</span>
              <div className="resource-text-wrap" style={{flexGrow: 1}}>
                <div className="resource-name" style={{fontSize: '17px', marginBottom: '4px'}}>{r.title}</div>
                <div style={{fontSize: '13px', color: 'var(--brand)', fontWeight: 700}}>Open portal →</div>
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
      <div className="contact-grid">
        <a href="tel:+918319600171">
          <div className="contact-card">
            <span className="contact-icon">📞</span>
            <div className="contact-label">Phone</div>
            <div className="contact-value">+91 83196 00171</div>
          </div>
        </a>
        <a href="mailto:manish.starhealth.in@gmail.com">
          <div className="contact-card">
            <span className="contact-icon">✉️</span>
            <div className="contact-label">Email</div>
            <div className="contact-value email-text">manish.starhealth.in@gmail.com</div>
          </div>
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
          <div className="contact-card">
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
      <Plans />
      <FAQ />
    </>
  );
}

// ===== APP & FIXED BUTTONS =====
export default function App() {
  const route = useRoute();
  const Page = { 
    "": Home, 
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
  }[route] ?? Home;
  
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
