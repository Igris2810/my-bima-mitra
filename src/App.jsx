import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const btn={padding:"14px 26px",background:"#0b5ed7",color:"white",border:0,borderRadius:8,fontWeight:700,cursor:"pointer"}
const section={maxWidth:1100,margin:"auto",padding:"70px 20px",textAlign:"center"}

function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"18px 40px",background:"white",boxShadow:"0 4px 15px rgba(0,0,0,0.08)"}}>
      <b>My Bima Mitra</b>
      <div>
        <a href="#/" style={{margin:15}}>Home</a>
        <a href="#/plans" style={{margin:15}}>Plans</a>
        <a href="#/consultation" style={{margin:15}}>Free Consultation</a>
        <a href="#/contact" style={{margin:15}}>Contact</a>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section style={{background:"linear-gradient(135deg,#0b5ed7,#2d9cdb)",color:"white",padding:"110px 20px",textAlign:"center"}}>
      <h1 style={{fontSize:44}}>Star Health Insurance Advisor</h1>
      <p style={{fontSize:18}}>Protect your family from medical emergencies</p>
      <br/>
      <a href="#/consultation"><button style={{...btn,background:"white",color:"#0b5ed7"}}>Get Free Consultation</button></a>
    </section>
  )
}

function TrustBar(){
  return (
    <div style={{display:"flex",justifyContent:"center",gap:40,background:"white",padding:30,fontWeight:600}}>
      <div>✔ IRDAI Registered Advisor</div>
      <div>✔ 14,000+ Cashless Hospitals</div>
      <div>✔ Lifetime Claim Support</div>
      <div>✔ Serving All India</div>
    </div>
  )
}

function Problem(){
  return (
    <section style={section}>
      <h2>Health Emergencies Can Cost Lakhs Overnight</h2>
      <p>Medical inflation is rising every year. One hospitalisation can wipe out savings. The right health insurance protects your family from financial stress.</p>
    </section>
  )
}

function WhyAdvisor(){
  return (
    <section style={{...section,background:"#f4f7fb"}}>
      <h2>Why Buy Through An Advisor?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:25,marginTop:30}}>
        {[
          'Claim support during hospitalization',
          'Right plan selection help',
          'Lifetime renewal support',
          'Help for parents & seniors'
        ].map(x=>(
          <div key={x} style={{background:"white",padding:25,borderRadius:12,boxShadow:"0 8px 20px rgba(0,0,0,0.08)"}}>{x}</div>
        ))}
      </div>
    </section>
  )
}

function Plans(){
  return (
    <section style={section}>
      <h2>Popular Star Health Plans</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:25,marginTop:30}}>
        {['Family Floater','Senior Citizen','Super Top‑Up','Critical Illness'].map(p=>(
          <div key={p} style={{background:"white",padding:25,borderRadius:12,boxShadow:"0 8px 25px rgba(0,0,0,0.08)"}}>
            <h3>{p}</h3>
            <p>Comprehensive coverage with cashless hospitals.</p>
            <a href="#/consultation"><button style={{...btn,width:"100%"}}>Get Quote</button></a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process(){
  return (
    <section style={{...section,background:"#f4f7fb"}}>
      <h2>How It Works</h2>
      <p>1️⃣ Contact us → 2️⃣ Compare plans → 3️⃣ Choose best → 4️⃣ Lifetime support</p>
    </section>
  )
}

function Testimonials(){
  return (
    <section style={section}>
      <h2>Happy Clients</h2>
      <p>⭐️⭐️⭐️⭐️⭐️ Cashless claim approved in 4 hours – Bhopal</p>
      <p>⭐️⭐️⭐️⭐️⭐️ Best advisor for parents insurance – Indore</p>
      <p>⭐️⭐️⭐️⭐️⭐️ Smooth purchase and support – Delhi</p>
    </section>
  )
}

function FAQ(){
  return (
    <section style={{...section,background:"#f4f7fb"}}>
      <h2>FAQs</h2>
      <p><b>Which plan is best?</b> Depends on age & family size.</p>
      <p><b>Cashless hospitals?</b> Yes across India.</p>
      <p><b>Can parents be covered?</b> Yes senior plans available.</p>
    </section>
  )
}

function Consultation(){
  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=(e)=>{
    e.preventDefault();
    emailjs.send("service_prwxv5e","template_lnnkfoo",{
      from_name: formData.name, phone: formData.phone, city: formData.city, message: formData.message
    },"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));
  };
  return (
    <section style={section}>
      <h2>Free Consultation</h2>
      {submitted ? <h3>Thank you! We will contact you soon.</h3> : (
        <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <input name="phone" placeholder="Phone" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <textarea name="message" placeholder="Requirement" onChange={handleChange} style={{width:"100%",padding:14,margin:8}}/>
          <button style={{...btn,width:"100%"}}>Submit</button>
        </form>
      )}
    </section>
  );
}

function Home(){
  return (<>
    <Hero/>
    <TrustBar/>
    <Problem/>
    <WhyAdvisor/>
    <Plans/>
    <Process/>
    <Testimonials/>
    <FAQ/>
  </>);
}

function Contact(){
  return (
    <section style={section}>
      <h2>Contact</h2>
      <p><a href="tel:+918319600171">📞 8319600171</a></p>
      <p><a href="mailto:manish.starhealth.in@gmail.com">✉️ manish.starhealth.in@gmail.com</a></p>
    </section>
  )
}

export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{window.addEventListener("hashchange",()=>setRoute(window.location.hash.replace("#/","")));},[]);
  let Page=Home; if(route==="consultation")Page=Consultation; if(route==="contact")Page=Contact; if(route==="plans")Page=Plans;
  return (<div><Navbar/><Page/></div>);
}
