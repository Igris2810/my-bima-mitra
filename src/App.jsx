import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ===== DESIGN TOKENS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0B3D91;
    --blue: #1c5fd4;
    --sky: #e8f0fd;
    --gold: #c9921c;
    --bg: #f7f9fc;
    --text: #1a2540;
    --muted: #6b7a9a;
    --white: #ffffff;
    --radius: 16px;
    --shadow: 0 8px 32px rgba(11,61,145,0.10);
    --shadow-lg: 0 20px 60px rgba(11,61,145,0.15);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 { font-family: 'Playfair Display', serif; }

  a { text-decoration: none; color: inherit; }

  /* ---- Navbar ---- */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
    height: 80px;
    background: var(--white);
    box-shadow: 0 2px 20px rgba(11,61,145,0.07);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-brand { display: flex; align-items: center; gap: 14px; }
  .navbar-logo { height: 52px; border-radius: 8px; }
  .navbar-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800; color: var(--navy); line-height: 1.1; }
  .navbar-sub { font-size: 12px; color: var(--blue); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

  .navbar-links { display: flex; gap: 8px; align-items: center; }
  .nav-link {
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14.5px;
    color: var(--text);
    transition: all .2s;
  }
  .nav-link:hover { background: var(--sky); color: var(--navy); }
  .nav-link.cta {
    background: var(--navy);
    color: white;
    padding: 8px 20px;
  }
  .nav-link.cta:hover { background: var(--blue); }

  /* ---- Hero ---- */
  .hero {
    background: linear-gradient(135deg, #0B3D91 0%, #1648b8 60%, #1c5fd4 100%);
    color: white;
    padding: 100px 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -60px;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero-inner {
    max-width: 1160px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    position: relative;
    z-index: 1;
  }
  .hero-text { max-width: 540px; }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 24px;
    backdrop-filter: blur(4px);
  }
  .hero-badge-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; }
  .hero h1 { font-size: 52px; line-height: 1.15; margin-bottom: 20px; font-weight: 800; }
  .hero p { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.85); margin-bottom: 36px; }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary {
    padding: 14px 28px;
    background: white;
    color: var(--navy);
    font-weight: 700;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all .2s;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
  .btn-outline {
    padding: 14px 28px;
    background: transparent;
    color: white;
    font-weight: 600;
    font-size: 15px;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 10px;
    cursor: pointer;
    transition: all .2s;
  }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.1); }

  .hero-card {
    background: white;
    color: var(--text);
    border-radius: 20px;
    padding: 32px;
    min-width: 300px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .hero-card h3 { font-size: 18px; color: var(--navy); margin-bottom: 20px; }
  .stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f8;
  }
  .stat-item:last-child { border-bottom: none; }
  .stat-icon { width: 36px; height: 36px; background: var(--sky); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .stat-text { font-size: 14px; font-weight: 500; color: var(--text); }

  /* ---- Section wrapper ---- */
  .section { max-width: 1160px; margin: auto; padding: 90px 24px; }
  .section-title { font-size: 38px; color: var(--navy); margin-bottom: 12px; text-align: center; }
  .section-sub { text-align: center; color: var(--muted); font-size: 16px; margin-bottom: 56px; }

  /* ---- Card ---- */
  .card {
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 32px;
    transition: transform .25s, box-shadow .25s;
    border: 1px solid #eef1f8;
  }
  .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

  /* ---- Leadership ---- */
  .leadership-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    max-width: 760px;
    margin: auto;
  }
  .leader-card { text-align: center; }
  .leader-avatar {
    width: 110px; height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 18px;
    display: block;
    border: 4px solid var(--sky);
  }
  .leader-name { font-size: 20px; color: var(--navy); margin-bottom: 4px; }
  .leader-role { font-size: 13px; font-weight: 600; color: var(--blue); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
  .leader-bio { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* ---- Plans ---- */
  .plans-bg { background: var(--sky); }
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
  .plan-card { display: flex; flex-direction: column; }
  .plan-number { font-size: 40px; font-weight: 800; color: #e0e8f8; font-family: 'Playfair Display', serif; margin-bottom: 8px; }
  .plan-title { font-size: 19px; color: var(--navy); margin-bottom: 10px; }
  .plan-desc { font-size: 14px; color: var(--muted); line-height: 1.65; flex: 1; margin-bottom: 24px; }
  .btn-blue {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: white;
    font-weight: 600;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity .2s, transform .2s;
    align-self: flex-start;
  }
  .btn-blue:hover { opacity: 0.9; transform: translateY(-1px); }

  /* ---- Resources ---- */
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
  .resource-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
  }
  .resource-icon { font-size: 28px; flex-shrink: 0; }
  .resource-name { font-size: 15px; font-weight: 600; color: var(--text); flex: 1; }
  .resource-arrow { color: var(--blue); font-size: 18px; font-weight: 600; }

  /* ---- Consultation form ---- */
  .form-wrapper { max-width: 480px; margin: auto; }
  .form-field {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #dde3f0;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background: white;
    margin-bottom: 14px;
    transition: border-color .2s;
    outline: none;
  }
  .form-field:focus { border-color: var(--blue); }
  .form-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: white;
    font-weight: 700;
    font-size: 16px;
    font-family: 'DM Sans', sans-serif;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity .2s, transform .2s;
    margin-top: 4px;
  }
  .form-submit:hover { opacity: 0.9; transform: translateY(-1px); }
  .success-box {
    text-align: center;
    padding: 48px 32px;
    background: white;
    border-radius: 20px;
    box-shadow: var(--shadow);
    max-width: 400px;
    margin: auto;
  }
  .success-icon { font-size: 52px; margin-bottom: 16px; }
  .success-box h3 { color: var(--navy); margin-bottom: 10px; }
  .success-box p { color: var(--muted); }

  /* ---- Contact ---- */
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    max-width: 640px;
    margin: auto;
  }
  .contact-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 28px;
    text-align: left;
  }
  .contact-icon { font-size: 32px; }
  .contact-label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .contact-value { font-size: 16px; font-weight: 600; color: var(--navy); }

  /* ---- Plan detail ---- */
  .plan-detail { max-width: 760px; }
  .plan-detail h2 { font-size: 40px; color: var(--navy); margin-bottom: 16px; }
  .plan-detail p { font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 28px; }
  .feature-list { list-style: none; margin-bottom: 36px; }
  .feature-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #eef1f8;
    font-size: 15px;
  }
  .feature-check { color: var(--blue); font-size: 18px; }

  /* ---- Float buttons ---- */
  .float-btn {
    position: fixed;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 100px;
    font-weight: 700;
    font-size: 14px;
    color: white;
    box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    transition: transform .2s, box-shadow .2s;
    z-index: 50;
  }
  .float-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.25); }
  .float-wa { bottom: 24px; background: #25D366; }
  .float-call { bottom: 82px; background: var(--navy); }

  /* ---- Footer ---- */
  .footer {
    background: var(--text);
    color: rgba(255,255,255,0.7);
    padding: 48px 60px 32px;
  }
  .footer-inner {
    max-width: 1160px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .footer-brand h3 { font-size: 22px; color: white; margin-bottom: 6px; }
  .footer-brand p { font-size: 14px; }
  .footer-links { display: flex; flex-direction: column; gap: 8px; }
  .footer-link { font-size: 14px; transition: color .2s; }
  .footer-link:hover { color: white; }
  .footer-bottom {
    max-width: 1160px;
    margin: auto;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 20px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 768px) {
    .navbar { padding: 0 20px; }
    .navbar-links { display: none; }
    .hero { padding: 60px 24px; }
    .hero h1 { font-size: 34px; }
    .hero-inner { flex-direction: column; }
    .hero-card { width: 100%; min-width: unset; }
    .footer { padding: 40px 24px 24px; }
    .footer-inner { flex-direction: column; }
  }
`;

// ===== ROUTE HELPER =====
const navigate = (path) => { window.location.hash = `/${path}`; };

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
            <a href="#/consultation">
              <button className="btn-primary">Talk to an Expert →</button>
            </a>
            <a href="#/plans">
              <button className="btn-outline">Explore Plans</button>
            </a>
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

// ===== LEADERSHIP =====
function Leadership() {
  const leaders = [
    {
      name: "ManishPal Singh Sisodiya",
      role: "Chief Executive Officer",
      bio: "18+ years of leadership in health insurance advisory, specializing in Star Health & Allied Insurance products and client solutions.",
      img: "/ceo.jpg",
    },
    {
      name: "Kiran Singh Sisodiya",
      role: "Director – Operations & Client Support",
      bio: "Overseeing policy servicing, renewals, and comprehensive client advisory support to ensure seamless coverage experiences.",
      img: "/director.jpg",
    },
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

// ===== PLANS GRID =====
function Plans() {
  const plans = [
    {
      title: "Super Star Flexi",
      link: "#/super-star-flexi",
      desc: "Flexible coverage plan with customizable sum insured and enhanced benefits tailored to your lifestyle.",
    },
    {
      title: "Star Health Assure",
      link: "#/star-health-assure",
      desc: "Comprehensive protection offering strong coverage and modern medical benefits for long-term security.",
    },
    {
      title: "Family Floater Plans",
      link: "#/consultation",
      desc: "A single policy covering your entire family with shared sum insured and complete peace of mind.",
    },
    {
      title: "Senior Citizen Plans",
      link: "#/consultation",
      desc: "Specialized health insurance designed with the unique needs of parents and senior citizens in mind.",
    },
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
              <a href={plan.link}>
                <button className="btn-blue">View Details →</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PLAN DETAIL =====
function PlanDetail({ title, description, features, ctaLabel = "Request Consultation" }) {
  return (
    <div className="section plan-detail">
      <a href="#/plans" style={{ color: "var(--blue)", fontSize: 14, fontWeight: 600, display: "inline-block", marginBottom: 24 }}>
        ← Back to Plans
      </a>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}><span className="feature-check">✓</span> {f}</li>
        ))}
      </ul>
      <a href="#/consultation">
        <button className="btn-blue" style={{ padding: "13px 26px", fontSize: 15 }}>{ctaLabel}</button>
      </a>
    </div>
  );
}

function SuperStarFlexi() {
  return (
    <PlanDetail
      title="Super Star Flexi"
      description="A flexible modern health insurance plan offering customizable coverage options and extensive hospital network access — designed to adapt as your needs grow."
      features={[
        "Flexible coverage slabs to match your budget",
        "Cashless treatment at 14,000+ network hospitals",
        "Restoration of sum insured after claim",
        "Pre and post hospitalization expenses covered",
        "No-claim bonus for claim-free years",
      ]}
      ctaLabel="Request Plan Consultation →"
    />
  );
}

function StarHealthAssure() {
  return (
    <PlanDetail
      title="Star Health Assure"
      description="Comprehensive health insurance protection designed for long-term medical security and reliable hospital coverage across India."
      features={[
        "High sum insured options available",
        "Extensive hospital and daycare coverage",
        "Reliable claim support guidance",
        "Maternity and newborn benefits",
        "Annual health check-up included",
      ]}
      ctaLabel="Check Eligibility →"
    />
  );
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
          <a
            key={i}
            href={r.link}
            target={r.external ? "_blank" : undefined}
            rel={r.external ? "noopener noreferrer" : undefined}
          >
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
    emailjs
      .send(
        "service_prwxv5e",
        "template_lnnkfoo",
        { from_name: formData.name, phone: formData.phone, city: formData.city, message: formData.message },
        "6LcmS8gSIq2vvPppX"
      )
      .then(() => { setSubmitted(true); setLoading(false); })
      .catch(() => setLoading(false));
  };

  return (
    <div className="section">
      <h2 className="section-title">Request Expert Consultation</h2>
      <p className="section-sub">Fill in your details and our advisor will reach out within 24 hours</p>

      {submitted ? (
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h3>Request Received!</h3>
          <p>Thank you. Our advisor will contact you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-wrapper">
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "city", placeholder: "City", type: "text" },
          ].map(({ name, placeholder, type }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
              className="form-field"
            />
          ))}
          <textarea
            name="message"
            placeholder="Tell us about your insurance requirement (optional)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="form-field"
            style={{ resize: "vertical" }}
          />
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? "Sending…" : "Request Consultation →"}
          </button>
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
      <p className="section-sub">Reach us directly — we're happy to help</p>
      <div className="contact-grid">
        <a href="tel:+918319600171">
          <div className="card contact-card">
            <span className="contact-icon">📞</span>
            <div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">+91 83196 00171</div>
            </div>
          </div>
        </a>
        <a href="mailto:manish.starhealth.in@gmail.com">
          <div className="card contact-card">
            <span className="contact-icon">✉️</span>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">manish.starhealth.in@gmail.com</div>
            </div>
          </div>
        </a>
        <a href="https://wa.me/918319600171" target="_blank" rel="noopener noreferrer">
          <div className="card contact-card">
            <span className="contact-icon">💬</span>
            <div>
              <div className="contact-label">WhatsApp</div>
              <div className="contact-value">Chat with us</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

// ===== FLOATING BUTTONS =====
function FloatingButtons() {
  return (
    <>
      <a href="https://wa.me/918319600171" target="_blank" rel="noopener noreferrer" className="float-btn float-wa">
        💬 WhatsApp
      </a>
      <a href="tel:+918319600171" className="float-btn float-call">
        📞 Call Now
      </a>
    </>
  );
}

// ===== FOOTER =====
function Footer() {
  const links = [
    { label: "Home", path: "" },
    { label: "Plans", path: "plans" },
    { label: "Resources", path: "resources" },
    { label: "Consultation", path: "consultation" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>My Bima Mitra</h3>
          <p>Star Health Insurance Advisory</p>
          <p style={{ marginTop: 8, fontSize: 13 }}>Authorized advisor with 18+ years of trust</p>
        </div>
        <div className="footer-links">
          {links.map(({ label, path }) => (
            <a key={path} href={`#/${path}`} className="footer-link">{label}</a>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 14, marginBottom: 8 }}>📞 +91 83196 00171</p>
          <p style={{ fontSize: 14 }}>✉️ manish.starhealth.in@gmail.com</p>
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
      <Leadership />
      <Plans />
    </>
  );
}

// ===== ROUTER =====
function useRoute() {
  const getRoute = () => window.location.hash.replace(/^#\/?/, "");
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handler = () => { setRoute(getRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}

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
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--bg)" }}>
        <Navbar />
        <main>
          <Page />
        </main>
        <FloatingButtons />
        <Footer />
      </div>
    </>
  );
}
