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

  const btn={padding:"14px 28px",background:"#0b5ed7",color:"white",borderRadius:8,border:0,fontWeight:"bold",cursor:"pointer"}
  const section={padding:"80px 20px",maxWidth:"1100px",margin:"auto"}

  return (
    <div style={{fontFamily:"Arial, sans-serif",background:"#f4f7fb"}}>

      {/* NAVBAR */}
      <div style={{display:"flex",justifyContent:"space-between",padding:"18px 40px",background:"white",boxShadow:"0 4px 15px rgba(0,0,0,0.08)",position:"sticky",top:0,zIndex:9}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src="/logo.jpeg" width="40"/>
          <b style={{fontSize:20}}>My Bima Mitra</b>
        </div>
        <div>
          <a href="#plans" style={{margin:15,textDecoration:"none",color:"#333"}}>Plans</a>
          <a href="#about" style={{margin:15,textDecoration:"none",color:"#333"}}>About</a>
          <a href="#contact" style={{margin:15,textDecoration:"none",color:"#333"}}>Contact</a>
        </div>
      </div>

      {/* HERO */}
      <section style={{background:"linear-gradient(135deg,#0b5ed7,#2d9cdb)",color:"white",padding:"100px 20px",textAlign:"center"}}>
        <h1 style={{fontSize:42,marginBottom:10}}>Star Health Insurance Advisor</h1>
        <p style={{fontSize:18,opacity:0.9}}>Protect your family with India’s most trusted health insurance</p>
        <br/>
        <a href="#contact"><button style={btn}>Get Free Consultation</button></a>
      </section>

      {/* TRUST BAR */}
      <div style={{display:"flex",justifyContent:"center",gap:40,background:"white",padding:25,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div>✔ Authorized Advisor</div>
        <div>✔ 14,000+ Hospitals</div>
        <div>✔ Lifetime Claim Support</div>
        <div>✔ Free Consultation</div>
      </div>

      {/* PLANS */}
      <section id="plans" style={section}>
        <h2 style={{textAlign:"center"}}>Popular Star Health Plans</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:25,marginTop:30}}>
          {['Family Floater','Senior Citizen','Super Top‑Up','Critical Illness'].map(p=>(
            <div key={p} style={{background:"white",padding:25,borderRadius:12,boxShadow:"0 8px 25px rgba(0,0,0,0.08)",textAlign:"center"}}>
              <h3>{p}</h3>
              <p>Best coverage with cashless hospital network.</p>
              <a href="#contact"><button style={{...btn,width:"100%"}}>Get Quote</button></a>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{...section,textAlign:"center"}}>
        <h2>Why Choose My Bima Mitra?</h2>
        <p>We simplify health insurance and help you choose the right policy with honest advice and full claim assistance.</p>
      </section>

      {/* TESTIMONIALS */}
      <section style={{background:"#eef3ff",padding:"70px 20px"}}>
        <h2 style={{textAlign:"center"}}>Happy Clients</h2>
        <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginTop:30}}>
          {['Amazing support during claim!','Best insurance advisor.','Highly recommended service.'].map(t=>(
            <div key={t} style={{background:"white",padding:20,width:250,borderRadius:10,boxShadow:"0 6px 18px rgba(0,0,0,0.08)"}}>⭐️⭐️⭐️⭐️⭐️<br/>{t}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{...section,textAlign:"center"}}>
        <h2>Get Free Star Health Quote</h2>
        {submitted ? <h3>Thank you! We will contact you soon.</h3> : (
          <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:6,border:"1px solid #ccc"}}/>
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:6,border:"1px solid #ccc"}}/>
            <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:6,border:"1px solid #ccc"}}/>
            <textarea name="message" placeholder="Age, Members & Coverage Needed" onChange={handleChange} style={{width:"100%",padding:14,margin:8,borderRadius:6,border:"1px solid #ccc"}}></textarea>
            <button style={{...btn,width:"100%"}}>Submit</button>
          </form>
        )}
      </section>

      <footer style={{background:"#0b1e3c",color:"white",padding:25,textAlign:"center"}}>
        Call / WhatsApp: 8319600171 | manish.starhealth.in@gmail.com
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/918319600171" target="_blank" style={{position:"fixed",bottom:20,right:20,background:"#25D366",color:"white",padding:"15px 18px",borderRadius:50,textDecoration:"none"}}>WhatsApp</a>

    </div>
  );
}
