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
  return (import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const colors={primary:"#0B3D91",accent:"#0b5ed7",bg:"#F4F7FB"}
const btn={padding:"14px 28px",background:colors.accent,color:"white",border:0,borderRadius:10,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 18px rgba(0,0,0,0.15)"}
const section={maxWidth:1100,margin:"auto",padding:"80px 20px",textAlign:"center"}
const card={background:"white",padding:28,borderRadius:16,boxShadow:"0 10px 25px rgba(0,0,0,0.08)"}

const Icon=({emoji})=> <div style={{fontSize:36,marginBottom:10}}>{emoji}</div>

function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"18px 40px",background:"white",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",position:"sticky",top:0,zIndex:9}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <img src="/logo.jpeg" width="42"/>
        <b style={{fontSize:20,color:colors.primary}}>My Bima Mitra</b>
      </div>
      <div style={{fontWeight:600}}>
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
    <section style={{background:"linear-gradient(135deg,#0B3D91,#2d9cdb)",color:"white",padding:"120px 20px",textAlign:"center"}}>
      <h1 style={{fontSize:48,marginBottom:10}}>Health Insurance Made Simple</h1>
      <p style={{fontSize:20,opacity:.95}}>Star Health plans with expert advisor support</p>
      <br/>
      <a href="#/consultation"><button style={{...btn,background:"white",color:colors.primary}}>Get Free Consultation</button></a>
    </section>
  )
}

function TrustBar(){
  return (
    <div style={{display:"flex",justifyContent:"center",gap:40,padding:30,background:"white",fontWeight:600}}>
      <div>✔ IRDAI Advisor</div>
      <div>✔ 14,000+ Hospitals</div>
      <div>✔ Claim Support</div>
      <div>✔ All India Service</div>
    </div>
  )
}

function WhyAdvisor(){
  const items=[
    {e:"🛟",t:"Claim Support",d:"Help during hospitalization"},
    {e:"📊",t:"Right Plan",d:"Compare best options"},
    {e:"♻️",t:"Lifetime Support",d:"Renewals & upgrades"},
    {e:"👨‍👩‍👧",t:"Parents Cover",d:"Senior citizen guidance"}
  ];
  return (
    <section style={{...section,background:colors.bg}}>
      <h2>Why Choose Advisor Support?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:25,marginTop:30}}>
        {items.map(i=> (
          <div key={i.t} style={card}><Icon emoji={i.e}/><h3>{i.t}</h3><p>{i.d}</p></div>
        ))}
      </div>
    </section>
  )
}

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
          <div key={p.t} style={card}><Icon emoji={p.e}/><h3>{p.t}</h3><p>Comprehensive coverage with cashless hospitals.</p><br/><a href="#/consultation"><button style={{...btn,width:"100%"}}>Get Quote</button></a></div>
        ))}
      </div>
    </section>
  )
}

function Testimonials(){
  const t=["Cashless claim approved in 4 hours – Bhopal","Best advisor for parents insurance – Indore","Smooth purchase & support – Delhi"];
  return (
    <section style={{...section,background:colors.bg}}>
      <h2>Happy Clients</h2>
      <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginTop:30}}>
        {t.map(x=>(<div key={x} style={{...card,width:260}}>⭐️⭐️⭐️⭐️⭐️<br/>{x}</div>))}
      </div>
    </section>
  )
}

function Consultation(){
  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=(e)=>{e.preventDefault();emailjs.send("service_prwxv5e","template_lnnkfoo",{from_name:formData.name,phone:formData.phone,city:formData.city,message:formData.message},"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));};
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

function Home(){return(<><Hero/><TrustBar/><WhyAdvisor/><Plans/><Testimonials/></>)}

function Contact(){return(<section style={section}><h2>Contact</h2><p><a href="tel:+918319600171">📞 8319600171</a></p><p><a href="mailto:manish.starhealth.in@gmail.com">✉️ manish.starhealth.in@gmail.com</a></p></section>)}

export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{window.addEventListener("hashchange",()=>setRoute(window.location.hash.replace("#/","")));},[]);
  let Page=Home;if(route==="plans")Page=Plans;if(route==="consultation")Page=Consultation;if(route==="contact")Page=Contact;
 return(<div style={{fontFamily:"Arial",background:colors.bg}}>
}

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
