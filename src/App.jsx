import { useState } from "react";
import emailjs from "@emailjs/browser";

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

function Home(){
  return (
    <div>
      <section style={{background:"linear-gradient(135deg,#0b5ed7,#2d9cdb)",color:"white",padding:"100px 20px",textAlign:"center"}}>
        <h1>Star Health Insurance Advisor</h1>
        <p>Protect your family with India’s most trusted health insurance</p>
        <a href="#/consultation"><button style={{padding:14,background:"white",border:0}}>Free Consultation</button></a>
      </section>

      <div style={{display:"flex",justifyContent:"center",gap:40,background:"white",padding:25}}>
        <div>✔ Authorized Advisor</div>
        <div>✔ 14,000+ Hospitals</div>
        <div>✔ Lifetime Claim Support</div>
      </div>
    </div>
  );
}

function Plans(){
  return (
    <div style={{padding:60,textAlign:"center"}}>
      <h1>Star Health Plans</h1>
      <p>Family Floater • Senior Citizen • Super Top‑Up • Critical Illness</p>
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
    <div style={{padding:60,textAlign:"center"}}>
      <h1>Free Consultation</h1>
      {submitted ? <h3>Thank you! We will contact you soon.</h3> : (
        <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8}}/>
          <textarea name="message" placeholder="Requirement" onChange={handleChange} style={{width:"100%",padding:14,margin:8}}></textarea>
          <button style={{padding:14,width:"100%",background:"#0b5ed7",color:"white"}}>Submit</button>
        </form>
      )}
    </div>
  );
}

function Contact(){
  return (
    <div style={{padding:60,textAlign:"center"}}>
      <h1>Contact</h1>
      <p>Call / WhatsApp: 8319600171</p>
      <p>Email: manish.starhealth.in@gmail.com</p>
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
    <div>
      <Navbar/>
      <Page/>
    </div>
  );
}
