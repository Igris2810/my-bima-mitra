import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// DESIGN SYSTEM
const colors={primary:"#0B3D91",accent:"#0b5ed7",bg:"#F4F7FB",dark:"#081f4a"}
const btn={padding:"14px 28px",background:colors.accent,color:"white",border:0,borderRadius:10,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 18px rgba(0,0,0,0.15)"}
const section={maxWidth:1100,margin:"auto",padding:"90px 20px",textAlign:"center"}
const card={background:"white",padding:28,borderRadius:16,boxShadow:"0 10px 25px rgba(0,0,0,0.08)"}

// NAVBAR
function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"18px 40px",background:"white",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",position:"sticky",top:0,zIndex:9}}>
      <b style={{color:colors.primary,fontSize:20}}>My Bima Mitra</b>
      <div style={{fontWeight:600}}>
        <a href="#/" style={{margin:15}}>Home</a>
        <a href="#/plans" style={{margin:15}}>Plans</a>
        <a href="#/consultation" style={{margin:15}}>Free Consultation</a>
        <a href="#/contact" style={{margin:15}}>Contact</a>
      </div>
    </div>
  );
}

// HERO
function Hero(){
  return (
    <section style={{background:"linear-gradient(135deg,#0B3D91,#2d9cdb)",color:"white",padding:"130px 20px"}}>
      <h1 style={{fontSize:48,marginBottom:10}}>Health Insurance Made Simple</h1>
      <p style={{fontSize:20}}>Protect your family with Star Health Insurance + Expert Advisor Support</p>
      <br/>
      <a href="#/consultation"><button style={{...btn,background:"white",color:colors.primary}}>Get Free Consultation</button></a>
    </section>
  )
}

// TRUST STRIP
function Trust(){
  return (
    <div style={{display:"flex",justifyContent:"center",gap:40,padding:30,background:"white",fontWeight:600,flexWrap:"wrap"}}>
      <div>✔ IRDAI Registered Advisor</div>
      <div>✔ 14,000+ Cashless Hospitals</div>
      <div>✔ Lifetime Claim Support</div>
      <div>✔ Serving Clients Across India</div>
    </div>
  )
}

// WHY ADVISOR
function WhyAdvisor(){
  const items=[
    {e:"🛟",t:"Claim Support",d:"We assist during hospitalization & claim filing."},
    {e:"📊",t:"Right Plan Selection",d:"We compare plans & suggest best coverage."},
    {e:"♻️",t:"Lifetime Policy Support",d:"Renewals, upgrades & claim help."},
    {e:"👨‍👩‍👧",t:"Parents & Family Cover",d:"Expert guidance for senior citizen plans."}
  ];
  return (
    <section style={{...section,background:colors.bg}}>
      <h2>Why Choose Advisor Support?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:25,marginTop:30}}>
        {items.map(i=> (
          <div key={i.t} style={card}><div style={{fontSize:36}}>{i.e}</div><h3>{i.t}</h3><p>{i.d}</p></div>
        ))}
      </div>
    </section>
  )
}

// PLANS
function Plans(){
  const plans=[
    {e:"👨‍👩‍👧‍👦",t:"Family Floater"},
    {e:"🧓",t:"Senior Citizen"},
    {e:"⬆️",t:"Super Top‑Up"},
    {e:"❤️",t:"Critical Illness"}
  ];
  return (
    <section style={section}>
      <h2>Popular Star Health Plans</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:25,marginTop:30}}>
        {plans.map(p=>(
          <div key={p.t} style={card}>
            <div style={{fontSize:36}}>{p.e}</div>
            <h3>{p.t}</h3>
            <p>Comprehensive coverage with cashless hospitals.</p>
            <br/>
            <a href="#/consultation"><button style={{...btn,width:"100%"}}>Get Quote</button></a>
          </div>
        ))}
      </div>
    </section>
  )
}

// PROCESS
function Process(){
  return (
    <section style={{...section,background:colors.bg}}>
      <h2>How It Works</h2>
      <p>1️⃣ Contact us → 2️⃣ Compare plans → 3️⃣ Choose best → 4️⃣ Lifetime support</p>
    </section>
  )
}

// TESTIMONIALS
function Testimonials(){
  const t=["Cashless claim approved in 4 hours – Bhopal","Best advisor for parents insurance – Indore","Smooth purchase & support – Delhi"];
  return (
    <section style={section}>
      <h2>Happy Clients</h2>
      <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginTop:30}}>
        {t.map(x=>(<div key={x} style={{...card,width:260}}>⭐️⭐️⭐️⭐️⭐️<br/>{x}</div>))}
      </div>
    </section>
  )
}

// FAQ
function FAQ(){
  return (
    <section style={{...section,background:colors.bg}}>
      <h2>FAQs</h2>
      <p><b>Which plan is best?</b> Depends on age & family size.</p>
      <p><b>Cashless hospitals?</b> Yes across India.</p>
      <p><b>Can parents be covered?</b> Yes senior plans available.</p>
    </section>
  )
}

// FINAL CTA
function FinalCTA(){
  return (
    <section style={{background:colors.dark,color:"white",padding:"90px 20px",textAlign:"center"}}>
      <h2>Get Your Free Star Health Consultation Today</h2>
      <br/>
      <a href="#/consultation"><button style={btn}>Start Now</button></a>
    </section>
  )
}

// CONSULTATION FORM
function Consultation(){
  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=(e)=>{
    e.preventDefault();
    emailjs.send("service_prwxv5e","template_lnnkfoo",{from_name:formData.name,phone:formData.phone,city:formData.city,message:formData.message},"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));
  };
  return (
    <section style={section}>
      <h2>Free Consultation</h2>
      {submitted? <h3>We will contact you soon.</h3>:(
        <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <input name="phone" placeholder="Phone" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <textarea name="message" placeholder="Requirement" onChange={handleChange} style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <button style={{...btn,width:"100%"}}>Submit</button>
        </form>
      )}
    </section>
  )
}

// CONTACT
function Contact(){
  return (
    <section style={section}>
      <h2>Contact</h2>
      <p><a href="tel:+918319600171">📞 8319600171</a></p>
      <p><a href="mailto:manish.starhealth.in@gmail.com">✉️ manish.starhealth.in@gmail.com</a></p>
    </section>
  )
}

// FOOTER
function Footer(){
  return (
    <div style={{background:colors.dark,color:"white",textAlign:"center",padding:25}}>
      © 2026 My Bima Mitra | Star Health Advisor | All India Service
    </div>
  )
}

// HOME PAGE
function Home(){return(<><Hero/><Trust/><WhyAdvisor/><Plans/><Process/><Testimonials/><FAQ/><FinalCTA/></>)}

// ROUTER
export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{window.addEventListener("hashchange",()=>setRoute(window.location.hash.replace("#/","")));},[]);
  let Page=Home;if(route==="consultation")Page=Consultation;if(route==="contact")Page=Contact;if(route==="plans")Page=Plans;
  return(<div style={{fontFamily:"Arial",background:colors.bg}}><Navbar/><Page/><Footer/></div>)
}
