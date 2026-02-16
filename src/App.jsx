import { useState } from "react";
import emailjs from "@emailjs/browser";

const navLink={margin:"0 14px",textDecoration:"none",color:"#0b3d91",fontWeight:600}
const btnPrimary={padding:"12px 22px",background:"#0b5ed7",color:"white",border:0,borderRadius:8,fontWeight:700,cursor:"pointer"}
const container={maxWidth:1000,margin:"auto",padding:"60px 20px",textAlign:"center"}

function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 40px",background:"white",boxShadow:"0 6px 20px rgba(0,0,0,0.08)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <img src="/logo.jpeg" width="40"/>
        <b style={{fontSize:20}}>My Bima Mitra</b>
      </div>
      <div>
        <a href="#/" style={navLink}>Home</a>
        <a href="#/plans" style={navLink}>Plans</a>
        <a href="#/consultation" style={navLink}>Free Consultation</a>
        <a href="#/contact" style={navLink}>Contact</a>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <div style={{background:"linear-gradient(135deg,#0b5ed7,#2d9cdb)",color:"white",padding:"100px 20px"}}>
      <h1 style={{fontSize:44,marginBottom:10}}>Star Health Insurance Advisor</h1>
      <p style={{fontSize:18,opacity:.95}}>Protect your family with India’s most trusted health insurance</p>
      <br/>
      <a href="#/consultation"><button style={{...btnPrimary,background:"white",color:"#0b5ed7"}}>Get Free Consultation</button></a>
    </div>
  )
}

function Home(){
  return (
    <div>
      <Hero/>
      <div style={{display:"flex",justifyContent:"center",gap:40,padding:30,background:"#f4f7fb",fontWeight:600}}>
        <div>✔ Authorized Star Health Advisor</div>
        <div>✔ 14,000+ Cashless Hospitals</div>
        <div>✔ Lifetime Claim Support</div>
      </div>
    </div>
  );
}

function Card({title,text}){
  return(
    <div style={{background:"white",padding:25,borderRadius:14,boxShadow:"0 10px 25px rgba(0,0,0,0.08)"}}>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#/consultation"><button style={{...btnPrimary,width:"100%"}}>Get Quote</button></a>
    </div>
  )
}

function Plans(){
  return (
    <div style={container}>
      <h1>Star Health Plans</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:25,marginTop:30}}>
        <Card title="Family Floater" text="Coverage for entire family in one policy."/>
        <Card title="Senior Citizen" text="Special plans for parents & elders."/>
        <Card title="Super Top‑Up" text="Increase coverage at low premium."/>
        <Card title="Critical Illness" text="Lump sum payout on diagnosis."/>
      </div>
    </div>
  );
}

function Consultation(){
  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=(e)=>{
    e.preventDefault();
    emailjs.send("service_prwxv5e","template_lnnkfoo",{
      from_name: formData.name,
      phone: formData.phone,
      city: formData.city,
      message: formData.message
    },"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));
  };

  return (
    <div style={container}>
      <h1>Free Consultation</h1>
      {submitted ? <h3>Thank you! We will contact you soon.</h3> : (
        <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8,border:"1px solid #ccc"}}/>
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8,border:"1px solid #ccc"}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8,border:"1px solid #ccc"}}/>
          <textarea name="message" placeholder="Requirement" onChange={handleChange} style={{width:"100%",padding:14,margin:8,borderRadius:8,border:"1px solid #ccc"}}></textarea>
          <button style={{...btnPrimary,width:"100%"}}>Submit</button>
        </form>
      )}
    </div>
  );
}

function Contact(){
  return (
    <div style={container}>
      <h1>Contact</h1>
      <p style={{fontSize:18}}>📞 <a href="tel:+918319600171">Call / WhatsApp: 8319600171</a></p>
      <p style={{fontSize:18}}>✉️ <a href="mailto:manish.starhealth.in@gmail.com">manish.starhealth.in@gmail.com</a></p>
    </div>
  );
}

export default function App(){
  const route = window.location.hash.replace("#/","");
  let Page = Home;
  if(route==="plans") Page=Plans;
  if(route==="consultation") Page=Consultation;
  if(route==="contact") Page=Contact;

  return (
    <div style={{background:"#f4f7fb",minHeight:"100vh"}}>
      <Navbar/>
      <Page/>
    </div>
  );
}
