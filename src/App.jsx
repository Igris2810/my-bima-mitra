import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function MyBimaMitra() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name:"", phone:"", city:"", message:"" });

  const handleChange = (e)=> setFormData({...formData,[e.target.name]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    emailjs.send("service_prwxv5e","template_lnnkfoo",{
      from_name: formData.name,
      phone: formData.phone,
      city: formData.city,
      message: formData.message
    },"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));
  }

  const sectionStyle={padding:"70px 20px", maxWidth:"900px", margin:"auto"};

  return (
    <div style={{fontFamily:"Arial"}}>

      {/* NAVBAR */}
      <div style={{display:"flex",justifyContent:"space-between",padding:"15px 30px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",position:"sticky",top:0,background:"white"}}>
        <b>My Bima Mitra</b>
        <div>
          <a href="#home" style={{margin:10}}>Home</a>
          <a href="#about" style={{margin:10}}>About</a>
          <a href="#plans" style={{margin:10}}>Plans</a>
          <a href="#testimonials" style={{margin:10}}>Reviews</a>
          <a href="#contact" style={{margin:10}}>Contact</a>
        </div>
      </div>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/918319600171" target="_blank" style={{position:"fixed",bottom:20,right:20,background:"#25D366",color:"white",padding:"14px 18px",borderRadius:50,textDecoration:"none"}}>WhatsApp</a>

      {/* HERO */}
      <section id="home" style={{textAlign:"center",padding:"80px 20px",background:"#f5f7fb"}}>
        <img src="/logo.jpeg" width="180"/>
        <h1>Star Health Insurance Advisor</h1>
        <p>Everyday, Everytime There For You</p>
        <a href="#contact"><button style={{padding:"15px 25px",background:"blue",color:"white",border:0}}>Get Free Quote</button></a>
      </section>

      {/* ABOUT */}
      <section id="about" style={sectionStyle}>
        <h2>About Us</h2>
        <p>We help families across India choose the best Star Health Insurance policies with honest advice, fast service and lifetime claim support.</p>
        <ul>
          <li>✔ Authorized Star Health Advisor</li>
          <li>✔ Free Consultation</li>
          <li>✔ Claim Assistance</li>
        </ul>
      </section>

      {/* PLANS */}
      <section id="plans" style={{...sectionStyle, background:"#f5f7fb"}}>
        <h2>Star Health Plans</h2>
        <div style={{display:"grid",gap:20}}>
          <div>👨‍👩‍👧‍👦 Family Floater Plans</div>
          <div>🧓 Senior Citizen Plans</div>
          <div>💊 Critical Illness Plans</div>
          <div>🏥 14000+ Cashless Hospitals</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={sectionStyle}>
        <h2>Happy Clients</h2>
        <p>⭐️⭐️⭐️⭐️⭐️ "Very helpful and quick service!"</p>
        <p>⭐️⭐️⭐️⭐️⭐️ "Best advisor for Star Health."</p>
        <p>⭐️⭐️⭐️⭐️⭐️ "Smooth claim experience."</p>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" style={{...sectionStyle, textAlign:"center"}}>
        <h2>Get Free Star Health Quote</h2>
        {submitted ? <h3>Thank you! We will contact you soon.</h3> : (
          <form onSubmit={handleSubmit} style={{maxWidth:400,margin:"auto"}}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:10,margin:5}}/>
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{width:"100%",padding:10,margin:5}}/>
            <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:10,margin:5}}/>
            <textarea name="message" placeholder="Age, Members & Coverage Needed" onChange={handleChange} style={{width:"100%",padding:10,margin:5}}></textarea>
            <button style={{background:"blue",color:"white",padding:12,width:"100%"}}>Submit</button>
          </form>
        )}
      </section>

      <footer style={{textAlign:"center",padding:20,background:"#111",color:"white"}}>
        Call / WhatsApp: 8319600171 | manish.starhealth.in@gmail.com
      </footer>

    </div>
  );
}
