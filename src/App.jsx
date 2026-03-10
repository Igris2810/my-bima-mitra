import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ===== CONSTANTS =====
const WA_MSG = encodeURIComponent("Hi, I'd like a free consultation");
const WA_LINK = `https://wa.me/918319600171?text=${WA_MSG}`;

// ===== GLOBAL CSS =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

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
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  h1, h2, h3, h4 { font-family: 'Nunito', sans-serif; }
  a { text-decoration: none; color: inherit; }
  button { font-family: 'DM Sans', sans-serif; }

  /* ---- Animations ---- */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* ---- Announce Bar ---- */
  .announce-bar { background: linear-gradient(90deg, var(--navy), var(--blue)); color: white; text-align: center; padding: 9px 20px; font-size: 13px; font-weight: 500; letter-spacing: 0.3px; }
  .announce-bar a { color: #fde68a; font-weight: 700; margin-left: 8px; transition: var(--transition); }
  .announce-bar a:hover { color: #fff; text-decoration: none; }

  /* ---- Navbar ---- */
  .navbar { display: flex; justify-content: space-between; align-items: center; padding: 0 60px; height: 90px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 2px 20px rgba(11,61,145,0.07); position: sticky; top: 0; z-index: 100; transition: var(--transition); }
  .navbar-brand { display: flex; align-items: center; gap: 14px; transition: var(--transition); }
  .navbar-brand:hover { transform: scale(1.02); }
  .navbar-logo { height: 70px; border-radius: 8px; }
  .navbar-title { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 900; color: var(--navy); line-height: 1.1; }
  .navbar-sub { font-size: 11px; color: var(--blue); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
  .navbar-links { display: flex; gap: 4px; align-items: center; }
  .nav-link { padding: 8px 15px; border-radius: 8px; font-weight: 600; font-size: 14px; color: var(--text); transition: var(--transition); }
  .nav-link:hover { background: var(--sky); color: var(--blue); }
  .nav-link.cta { background: var(--navy); color: white; padding: 10px 22px; font-weight: 700; box-shadow: 0 4px 14px rgba(11,61,145,0.3); }
  .nav-link.cta:hover { background: var(--blue); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(28,95,212,0.4); }

  /* ---- Hero ---- */
  .hero { background: linear-gradient(135deg, #0a2f72 0%, #0B3D91 45%, #1c5fd4 100%); color: white; padding: 100px 60px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -120px; right: -80px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
  .hero::after { content: ''; position: absolute; bottom: -90px; left: -50px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
  .hero-inner { max-width: 1160px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 60px; position: relative; z-index: 1; }
  .hero-text { max-width: 540px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; margin-bottom: 24px; backdrop-filter: blur(4px); }
  .hero-badge-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 10px rgba(74, 222, 128, 0.8); }
  .hero h1 { font-size: 54px; line-height: 1.15; margin-bottom: 20px; font-weight: 900; letter-spacing: -0.5px; }
  .hero p { font-size: 18px; line-height: 1.75; color: rgba(255,255,255,0.9); margin-bottom: 36px; }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary { padding: 16px 32px; background: white; color: var(--navy); font-weight: 800; font-size: 16px; border: none; border-radius: 12px; cursor: pointer; transition: var(--transition); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,0.25); color: var(--blue); }
  .btn-outline { padding: 16px 32px; background: transparent; color: white; font-weight: 700; font-size: 16px; border: 2px solid rgba(255,255,255,0.45); border-radius: 12px; cursor: pointer; transition: var(--transition); }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.15); transform: translateY(-2px); }
  .hero-card { background: white; color: var(--text); border-radius: 24px; padding: 36px 32px; min-width: 320px; box-shadow: 0 24px 64px rgba(0,0,0,0.25); flex-shrink: 0; transform: translateY(0); transition: var(--transition); border: 1px solid rgba(255,255,255,0.5); }
  .hero-card:hover { transform: translateY(-10px); box-shadow: 0 32px 72px rgba(0,0,0,0.3); }
  .hero-card h3 { font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 20px; }
  .stat-item { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f0f2f8; transition: var(--transition); }
  .stat-item:hover { transform: translateX(5px); }
  .stat-item:last-child { border-bottom: none; }
  .stat-icon { width: 40px; height: 40px; background: var(--sky); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; color: var(--blue); }
  .stat-text { font-size: 15px; font-weight: 600; }

  /* ---- Section ---- */
  .section { max-width: 1160px; margin: auto; padding: 100px 24px; }
  .section-title { font-size: 40px; color: var(--navy); margin-bottom: 12px; text-align: center; font-weight: 900; }
  .section-sub { text-align: center; color: var(--muted); font-size: 18px; margin-bottom: 60px; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto; }

  /* ---- Card ---- */
  .card { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 36px; transition: var(--transition); border: 1px solid #eef1f8; }
  .card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); border-color: #dce4f5; }

  /* ---- Why Choose Us ---- */
  .why-bg { background: linear-gradient(135deg, #0a2f72 0%, #0B3D91 60%, #1648b8 100%); position: relative; }
  .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
  .why-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius); padding: 32px 28px; color: white; transition: var(--transition); backdrop-filter: blur(5px); }
  .why-card:hover { background: rgba(255,255,255,0.15); transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
  .why-icon { font-size: 38px; margin-bottom: 18px; }
  .why-title { font-size: 18px; font-weight: 800; margin-bottom: 10px; font-family: 'DM Sans', sans-serif; letter-spacing: 0.2px; }
  .why-desc { font-size: 14.5px; color: rgba(255,255,255,0.85); line-height: 1.7; }
  .why-section-title { font-size: 40px; color: white; margin-bottom: 12px; text-align: center; font-family: 'Nunito', sans-serif; font-weight: 900; }
  .why-section-sub { text-align: center; color: rgba(255,255,255,0.8); font-size: 18px; margin-bottom: 60px; }

  /* ---- Leadership ---- */
  .leadership-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; max-width: 800px; margin: auto; }
  .leader-card { text-align: center; }
  .leader-avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block; border: 5px solid var(--sky); transition: var(--transition); }
  .leader-card:hover .leader-avatar { border-color: var(--blue); transform: scale(1.05); }
  .leader-name { font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
  .leader-role { font-size: 13px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
  .leader-bio { font-size: 15px; color: var(--muted); line-height: 1.7; }

  /* ---- Plans ---- */
  .plans-bg { background: var(--sky); }
  .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px; }
  .plan-card { display: flex; flex-direction: column; position: relative; overflow: hidden; }
  .plan-card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--navy), var(--blue)); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
  .plan-card:hover::before { transform: scaleX(1); }
  .plan-number { font-size: 48px; font-weight: 900; color: #d9e4f7; font-family: 'Nunito', sans-serif; margin-bottom: 10px; line-height: 1; transition: var(--transition); }
  .plan-card:hover .plan-number { color: var(--blue); transform: translateX(5px); }
  .plan-title { font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 12px; }
  .plan-desc { font-size: 15px; color: var(--muted); line-height: 1.7; flex: 1; margin-bottom: 24px; }
  .btn-blue { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 700; font-size: 15px; border: none; border-radius: 10px; cursor: pointer; transition: var(--transition); align-self: flex-start; box-shadow: 0 4px 15px rgba(28,95,212,0.3); }
  .btn-blue:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(28,95,212,0.4); }

  /* ---- Premium Estimator ---- */
  .estimator-wrap { max-width: 860px; margin: auto; }
  .estimator-card { background: white; border: 1.5px solid #dde3f0; border-radius: 24px; padding: 48px; box-shadow: var(--shadow-lg); }
  .estimator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 32px; }
  .est-label { font-size: 13px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; display: block; }
  .est-select { width: 100%; padding: 14px 16px; border: 2px solid #dde3f0; border-radius: 12px; font-size: 16px; font-weight: 600; font-family: 'DM Sans', sans-serif; color: var(--text); background: white; outline: none; transition: var(--transition); cursor: pointer; appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231c5fd4%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 1rem top 50%; background-size: 0.65rem auto; }
  .est-select:focus, .est-select:hover { border-color: var(--blue); }
  
  /* Modern Button Group for Sum Insured */
  .sum-group { display: flex; flex-wrap: wrap; gap: 10px; }
  .sum-btn { flex: 1; padding: 10px; border: 2px solid #dde3f0; background: white; border-radius: 10px; font-size: 14px; font-weight: 700; color: var(--muted); cursor: pointer; transition: var(--transition); text-align: center; }
  .sum-btn.active { background: var(--sky); border-color: var(--blue); color: var(--blue); }
  .sum-btn:hover:not(.active) { border-color: var(--blue); color: var(--navy); }

  .est-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 800; font-size: 18px; border: none; border-radius: 12px; cursor: pointer; transition: var(--transition); box-shadow: 0 8px 24px rgba(28,95,212,0.3); }
  .est-btn:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(28,95,212,0.4); }
  .est-result { margin-top: 32px; padding: 32px; background: var(--sky); border-radius: 16px; border: 2px solid #c5d8f8; animation: fadeIn .5s ease; position: relative; overflow: hidden; }
  .est-result::before { content: "★"; position: absolute; top: -20px; right: -10px; font-size: 100px; color: rgba(28,95,212,0.05); pointer-events: none; }
  .est-result-label { font-size: 14px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .est-range { font-size: 42px; font-weight: 900; color: var(--navy); font-family: 'Nunito', sans-serif; margin-bottom: 12px; letter-spacing: -1px; }
  .est-caveat { font-size: 14px; color: var(--muted); margin-bottom: 24px; line-height: 1.6; font-weight: 500; }
  .est-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
  .est-cta-wa { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #25D366; color: white; font-weight: 700; font-size: 15px; border-radius: 10px; transition: var(--transition); box-shadow: 0 4px 15px rgba(37,211,102,0.3); }
  .est-cta-wa:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.4); }
  .est-cta-form { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--navy); color: white; font-weight: 700; font-size: 15px; border-radius: 10px; transition: var(--transition); box-shadow: 0 4px 15px rgba(11,61,145,0.3); }
  .est-cta-form:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(11,61,145,0.4); }

  /* ---- Testimonials ---- */
  .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; }
  .testi-card { display: flex; flex-direction: column; gap: 16px; padding: 32px; }
  .testi-stars { color: #f59e0b; font-size: 18px; letter-spacing: 2px; }
  .testi-quote { font-size: 16px; color: var(--text); line-height: 1.8; flex: 1; font-style: italic; font-weight: 500; }
  .testi-author { display: flex; align-items: center; gap: 16px; margin-top: 10px; padding-top: 20px; border-top: 1px solid #f0f2f8; }
  .testi-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--sky), #dce4f5); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; font-weight: 800; color: var(--navy); }
  .testi-name { font-size: 16px; font-weight: 800; color: var(--navy); }
  .testi-meta { font-size: 13px; font-weight: 600; color: var(--muted); margin-top: 2px; }
  .testi-plan { display: inline-block; background: var(--sky); color: var(--blue); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 100px; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
  .testi-note { display: inline-block; background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px; padding: 10px 18px; font-size: 13px; color: #92610a; margin-top: 32px; font-weight: 600; }

  /* ---- FAQ ---- */
  .faq-bg { background: var(--sky); }
  .faq-list { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 16px; }
  .faq-item { background: white; border-radius: 16px; border: 1px solid #dde3f0; overflow: hidden; transition: var(--transition); }
  .faq-item:hover { border-color: #c5d8f8; box-shadow: 0 4px 15px rgba(11,61,145,0.05); }
  .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 22px 28px; cursor: pointer; font-weight: 700; font-size: 16px; color: var(--text); gap: 16px; user-select: none; transition: background .2s; }
  .faq-q:hover { background: #f8faff; color: var(--blue); }
  .faq-chevron { font-size: 20px; color: var(--blue); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-a { padding: 0 28px 24px; font-size: 15.5px; color: var(--muted); line-height: 1.8; animation: fadeIn .3s ease; }

  /* ---- CTA Banner ---- */
  .cta-banner { background: linear-gradient(135deg, #0B3D91, #1c5fd4); color: white; text-align: center; padding: 80px 24px; position: relative; overflow: hidden; }
  .cta-banner::before { content: ''; position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
  .cta-banner h2 { font-size: 42px; margin-bottom: 16px; font-weight: 900; }
  .cta-banner p { font-size: 18px; color: rgba(255,255,255,0.9); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.7; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* ---- Resources ---- */
  .resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  .resource-card { display: flex; align-items: center; gap: 20px; padding: 24px 28px; font-weight: 700; }
  .resource-card:hover .resource-arrow { transform: translateX(5px); }
  .resource-icon { font-size: 32px; flex-shrink: 0; }
  .resource-name { font-size: 16px; font-weight: 700; flex: 1; color: var(--navy); }
  .resource-arrow { color: var(--blue); font-weight: 800; font-size: 20px; transition: var(--transition); }

  /* ---- Consultation Form ---- */
  .form-wrapper { max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 24px; box-shadow: var(--shadow-lg); border: 1px solid #eef1f8; }
  .form-field { width: 100%; padding: 16px 20px; border: 2px solid #dde3f0; border-radius: 12px; font-size: 16px; font-family: 'DM Sans', sans-serif; color: var(--text); font-weight: 500; background: #fdfdfe; margin-bottom: 16px; outline: none; transition: var(--transition); }
  .form-field::placeholder { color: #9ba7c0; }
  .form-field:focus { border-color: var(--blue); background: white; box-shadow: 0 0 0 4px rgba(28,95,212,0.1); }
  .form-submit { width: 100%; padding: 18px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 800; font-size: 18px; border: none; border-radius: 12px; cursor: pointer; transition: var(--transition); margin-top: 8px; box-shadow: 0 8px 24px rgba(28,95,212,0.3); }
  .form-submit:hover:not(:disabled) { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(28,95,212,0.4); }
  .form-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }
  .success-box { text-align: center; padding: 56px 40px; background: white; border-radius: 24px; box-shadow: var(--shadow-lg); max-width: 480px; margin: auto; border: 1px solid #eef1f8; }
  .success-icon { font-size: 64px; margin-bottom: 20px; animation: slideUp 0.5s ease; }
  .success-box h3 { color: var(--navy); margin-bottom: 12px; font-size: 28px; font-weight: 900; }
  .success-box p { color: var(--muted); line-height: 1.7; font-size: 16px; }

  /* ---- Contact ---- */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 860px; margin: auto; }
  .contact-card { display: flex; align-items: center; gap: 20px; padding: 32px; border-radius: 20px; }
  .contact-icon { font-size: 36px; background: var(--sky); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }
  .contact-label { font-size: 12px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .contact-value { font-size: 18px; font-weight: 800; color: var(--navy); }

  /* ---- Plan Detail ---- */
  .plan-detail { max-width: 800px; }
  .plan-detail h2 { font-size: 46px; color: var(--navy); margin-bottom: 20px; font-weight: 900; }
  .plan-detail p { font-size: 18px; color: var(--muted); line-height: 1.8; margin-bottom: 36px; }
  .feature-list { list-style: none; margin-bottom: 48px; }
  .feature-list li { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid #eef1f8; font-size: 16px; font-weight: 500; }
  .feature-check { color: var(--blue); font-size: 20px; font-weight: 900; flex-shrink: 0; background: var(--sky); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
  .back-link { color: var(--blue); font-size: 15px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 32px; transition: var(--transition); }
  .back-link:hover { transform: translateX(-4px); }

  /* ---- WhatsApp Widget ---- */
  .wa-widget { position: fixed; bottom: 28px; right: 28px; z-index: 200; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
  .wa-bubble { background: white; border-radius: 20px; box-shadow: 0 12px 50px rgba(0,0,0,0.15); padding: 24px; width: 320px; animation: slideUp .4s cubic-bezier(0.25, 0.8, 0.25, 1); border: 1px solid #eef1f8; }
  .wa-bubble-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f0f2f8; }
  .wa-bubble-avatar { width: 48px; height: 48px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; color: white; }
  .wa-bubble-name { font-size: 16px; font-weight: 800; color: var(--navy); }
  .wa-bubble-status { font-size: 13px; color: #25D366; font-weight: 700; display: flex; align-items: center; gap: 4px; }
  .wa-bubble-status::before { content: ""; width: 8px; height: 8px; background: #25D366; border-radius: 50%; display: inline-block; }
  .wa-bubble-msg { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; font-weight: 500; }
  .wa-bubble-btn { width: 100%; padding: 14px; background: #25D366; color: white; font-weight: 800; font-size: 15px; border: none; border-radius: 12px; cursor: pointer; transition: var(--transition); box-shadow: 0 4px 15px rgba(37,211,102,0.3); }
  .wa-bubble-btn:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.4); }
  .wa-main-btn { width: 64px; height: 64px; border-radius: 50%; background: #25D366; color: white; font-size: 30px; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(37,211,102,0.45); transition: var(--transition); display: flex; align-items: center; justify-content: center; }
  .wa-main-btn:hover { transform: scale(1.1); }
  @keyframes wa-pulse { 0%,100% { box-shadow: 0 8px 24px rgba(37,211,102,0.45); } 50% { box-shadow: 0 8px 36px rgba(37,211,102,0.75); } }
  .wa-pulse { animation: wa-pulse 2s infinite; }

  /* ---- Call Float ---- */
  .call-float { position: fixed; bottom: 108px; right: 28px; z-index: 200; background: var(--navy); color: white; padding: 14px 22px; border-radius: 100px; font-weight: 800; font-size: 15px; box-shadow: 0 8px 24px rgba(11,61,145,0.4); transition: var(--transition); display: flex; align-items: center; gap: 8px; border: 2px solid white; }
  .call-float:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(11,61,145,0.5); background: var(--blue); }

  /* ---- Footer ---- */
  .footer { background: #0e1b3d; color: rgba(255,255,255,0.7); padding: 64px 60px 32px; border-top: 4px solid var(--blue); }
  .footer-inner { max-width: 1160px; margin: auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 48px; flex-wrap: wrap; margin-bottom: 48px; }
  .footer-brand h3 { font-size: 26px; color: white; margin-bottom: 8px; font-weight: 900; }
  .footer-brand p { font-size: 15px; line-height: 1.7; }
  .footer-links { display: flex; flex-direction: column; gap: 12px; }
  .footer-link { font-size: 15px; transition: var(--transition); font-weight: 500; }
  .footer-link:hover { color: white; transform: translateX(4px); }
  .footer-bottom { max-width: 1160px; margin: auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-weight: 500; }

  /* ---- Mobile ---- */
  @media (max-width: 900px) {
    .navbar { padding: 0 20px; height: 80px; }
    .navbar-links { display: none; }
    .navbar-logo { height: 50px; }
    .hero { padding: 60px 22px; }
    .hero h1 { font-size: 38px; }
    .hero-inner { flex-direction: column; }
    .hero-card { width: 100%; min-width: unset; padding: 24px; }
    .section { padding: 70px 20px; }
    .section-title { font-size: 32px; }
    .footer { padding: 48px 24px 24px; }
    .footer-inner { flex-direction: column; gap: 36px; }
    .wa-widget { bottom: 20px; right: 20px; }
    .call-float { bottom: 100px; right: 20px; }
  }
`;

// ===== CUSTOM HOOKS =====
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

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  });
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
        <div className="hero-text reveal">
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
      <div className="section reveal">
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
      <div className="section reveal">
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

  const sums = [
    { value: "3", label: "₹3 L" },
    { value: "5", label: "₹5 L" },
    { value: "10", label: "₹10 L" },
    { value: "15", label: "₹15 L" },
    { value: "20", label: "₹20 L" },
  ];

  return (
    <section style={{ background: "white" }}>
      <div className="section reveal">
        <h2 className="section-title">Premium Estimator</h2>
        <p className="section-sub">Get a quick ballpark — then let our advisor find your exact best plan</p>
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
              <div>
                <label className="est-label">Sum Insured</label>
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
      <div className="section reveal">
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
      <div className="section reveal">
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
      <div className="reveal">
        <h2>Not Sure Which Plan Is Right for You?</h2>
        <p>Our advisor will review your family's needs and recommend the best Star Health plan — completely free, no obligation.</p>
        <div className="cta-actions">
          <a href="#/consultation"><button className="btn-primary">Get Free Consultation →</button></a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"><button className="btn-outline">💬 Chat on WhatsApp</button></a>
        </div>
      </div>
    </section>
  );
}

// ===== PLAN DETAIL =====
function PlanDetail({ title, description, features, ctaLabel = "Request Consultation" }) {
  useScrollReveal();
  return (
    <div className="section plan-detail reveal">
      <a href="#/plans" className="back-link">← Back to Plans</a>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}><span className="feature-check">✓</span> {f}</li>
        ))}
      </ul>
      <a href="#/consultation"><button className="btn-blue" style={{ padding: "16px 32px", fontSize: 16 }}>{ctaLabel} →</button></a>
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
  useScrollReveal();
  const resources = [
    { icon: "📋", title: "Claim Form", link: "#", external: false },
    { icon: "🔐", title: "Pre Authorization Form", link: "#", external: false },
    { icon: "🔄", title: "Policy Renewal", link: "https://www.starhealth.in/renewal", external: true },
    { icon: "💳", title: "EMI Renewal", link: "https://www.starhealth.in", external: true },
    { icon: "📱", title: "Star Health Mobile App", link: "https://play.google.com/store/apps/details?id=in.starhealth", external: true },
  ];
  return (
    <div className="section reveal">
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
  useScrollReveal();
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
    <div className="section reveal">
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
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="form-field" />
          
          {/* Added robust phone number validation */}
          <input 
            name="phone" 
            type="tel" 
            placeholder="Phone Number (10 Digits)" 
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            value={formData.phone} 
            onChange={handleChange} 
            required 
            className="form-field" 
          />
          
          <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} required className="form-field" />
          
          <textarea name="message" placeholder="Tell us about your insurance requirement (optional)" value={formData.message} onChange={handleChange} rows={4} className="form-field" style={{ resize: "vertical" }} />
          <button type="submit" className="form-submit" disabled={loading}>{loading ? "Sending securely…" : "Request Consultation →"}</button>
        </form>
      )}
    </div>
  );
}

// ===== CONTACT =====
function Contact() {
  useScrollReveal();
  return (
    <div className="section reveal">
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
              <div className="wa-bubble-status">Online now</div>
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
          <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>IRDAI Reg. No: [Add Your License No.]</p>
        </div>
        <div className="footer-links">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: 'Nunito', fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Navigation</p>
          {links.map(({ label, path }) => (
            <a key={path} href={`#/${path}`} className="footer-link">{label}</a>
          ))}
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: 'Nunito', fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Contact</p>
          <p style={{ fontSize: 15, marginBottom: 10, fontWeight: 500 }}>📞 +91 83196 00171</p>
          <p style={{ fontSize: 15, marginBottom: 10, fontWeight: 500 }}>✉️ manish.starhealth.in@gmail.com</p>
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
  useScrollReveal();
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
  
  // Re-trigger scroll reveal when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

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
