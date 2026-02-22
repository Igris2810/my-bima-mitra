import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== BASIC STYLES =====
const colors={primary:"#0B3D91",accent:"#0b5ed7",bg:"#F4F7FB",dark:"#0e1b3d"}
const section={maxWidth:1200,margin:"auto",padding:"90px 20px"}
const card={background:"white",padding:30,borderRadius:16,boxShadow:"0 10px 25px rgba(0,0,0,0.08)"}

// ===== NAVBAR =====
function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 80px",background:"white",boxShadow:"0 4px 18px rgba(0,0,0,0.08)",position:"sticky",top:0,zIndex:10}}>

      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <img src="/logo.png" style={{height:70}}/>
        <div>
          <div style={{fontSize:26,fontWeight:800,color:colors.primary}}>My Bima Mitra</div>
          <div style={{fontSize:14,color:colors.accent}}>Senior Health Insurance Advisory</div>
        </div>
      </div>

      <div style={{display:"flex",gap:32,fontWeight:600}}>
        <a href="#/">Home</a>
        <a href="#/plans">Plans</a>
        <a href="#/resources">Resources</a>
        <a href="#/consultation">Consultation</a>
        <a href="#/contact">Contact</a>
      </div>

    </div>
  );
}

// ===== HERO =====
function Hero(){

  const stats=[
    "18+ Years Insurance Leadership",
    "7,000+ Clients Guided",
    "14,000+ Network Hospitals",
    "Pan India Advisory"
  ];

  return (

    <section style={{background:"linear-gradient(135deg,#0B3D91,#2d9cdb)",color:"white",padding:"120px 80px"}}>

      <div style={{maxWidth:1200,margin:"auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:60}}>

        <div style={{maxWidth:520}}>

          <h1 style={{fontSize:48,lineHeight:1.2,marginBottom:20}}>
            Expert Health Insurance
            Advisory & Guidance
          </h1>

          <p style={{fontSize:18,marginBottom:30}}>
            Led by Manish Sharma, Senior Sales Manager with 18+ years of experience helping families choose the right Star Health insurance coverage.
          </p>

          <a href="#/consultation">
            <button style={{padding:"16px 32px",borderRadius:10,border:"none",background:"white",color:colors.primary,fontWeight:700,cursor:"pointer"}}>
              Talk to an Expert
            </button>
          </a>

        </div>

        <div style={{background:"white",padding:30,borderRadius:16,color:"#333",width:340,boxShadow:"0 12px 30px rgba(0,0,0,0.15)"}}>

          <h3 style={{marginBottom:20}}>Experience & Trust</h3>

          {stats.map((item,i)=>(
            <div key={i} style={{marginBottom:12}}>✔ {item}</div>
          ))}

        </div>

      </div>

    </section>
  )
}

// ===== ABOUT ADVISOR =====
function Advisor(){
  return (

    <section style={section}>

      <h2 style={{textAlign:"center",fontSize:36,marginBottom:40,color:colors.primary}}>
        Leadership In Health Insurance Advisory
      </h2>

      <div style={{maxWidth:900,margin:"auto",textAlign:"center",fontSize:18,lineHeight:1.7}}>

        <b>Manish Sharma</b><br/>
        Senior Sales Manager – Star Health & Allied Insurance
        <br/><br/>

        With over 18 years of experience in health insurance advisory, Manish Sharma leads a network of advisors and provides expert guidance to families across India.

        <br/><br/>

        His advisory focuses on family health insurance planning, senior citizen coverage, high sum insured policies and claim support assistance.

      </div>

    </section>

  )
}

// ===== FEATURED PLANS =====
function Plans(){

  const plans=[
    {title:"Super Star Flexi",desc:"Flexible coverage health insurance plan with customizable sum insured and enhanced coverage benefits."},
    {title:"Star Health Assure",desc:"Comprehensive protection plan offering strong health coverage and modern medical benefits."},
    {title:"Family Floater Plans",desc:"Single policy covering the entire family with shared sum insured benefits."},
    {title:"Senior Citizen Plans",desc:"Specialized health insurance designed for parents and senior citizens."}
  ];

  return (

    <section style={{...section,background:colors.bg}}>

      <h2 style={{textAlign:"center",fontSize:36,marginBottom:60,color:colors.primary}}>
        Featured Health Insurance Plans
      </h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:30}}>

        {plans.map((plan,i)=>(

          <div key={i} style={card}>

            <h3 style={{marginBottom:12}}>{plan.title}</h3>

            <p style={{marginBottom:20,color:"#555"}}>{plan.desc}</p>

            <a href="#/consultation">
              <button style={{padding:"10px 18px",borderRadius:8,border:"none",background:colors.primary,color:"white",cursor:"pointer"}}>
                Request Details
              </button>
            </a>

          </div>

        ))}

      </div>

    </section>

  )
}

// ===== RESOURCES PAGE =====
function Resources(){

  const resources=[
    {title:"Claim Form",link:"#"},
    {title:"Pre Authorization Form",link:"#"},
    {title:"Policy Renewal",link:"https://www.starhealth.in/renewal"},
    {title:"EMI Renewal",link:"https://www.starhealth.in"},
    {title:"Star Health Mobile App",link:"https://play.google.com/store/apps/details?id=in.starhealth"}
  ];

  return (

    <section style={section}>

      <h2 style={{textAlign:"center",fontSize:36,marginBottom:60,color:colors.primary}}>
        Claims & Policy Resources
      </h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:30}}>

        {resources.map((r,i)=>(

          <div key={i} style={card}>

            <h3 style={{marginBottom:20}}>{r.title}</h3>

            <a href={r.link} target="_blank">
              <button style={{padding:"10px 18px",borderRadius:8,border:"none",background:colors.primary,color:"white"}}>
                Open
              </button>
            </a>

          </div>

        ))}

      </div>

    </section>

  )
}

// ===== CONSULTATION =====
function Consultation(){

  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});

  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();

    emailjs.send(
      "service_prwxv5e",
      "template_lnnkfoo",
      {from_name:formData.name,phone:formData.phone,city:formData.city,message:formData.message},
      "6LcmS8gSIq2vvPppX"
    ).then(()=>setSubmitted(true));
  };

  return (

    <section style={section}>

      <h2 style={{textAlign:"center",marginBottom:40}}>Request Expert Consultation</h2>

      {submitted?
        <h3 style={{textAlign:"center"}}>Thank you. We will contact you soon.</h3>
      :(

        <form onSubmit={handleSubmit} style={{maxWidth:420,margin:"auto"}}>

          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <input name="phone" placeholder="Phone" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>
          <textarea name="message" placeholder="Insurance Requirement" onChange={handleChange} style={{width:"100%",padding:14,margin:8,borderRadius:8}}/>

          <button style={{padding:"14px 24px",background:colors.primary,color:"white",border:"none",borderRadius:8,width:"100%"}}>
            Submit
          </button>

        </form>

      )}

    </section>

  )
}

// ===== CONTACT =====
function Contact(){

  return (

    <section style={section}>

      <h2 style={{textAlign:"center",marginBottom:30}}>Contact Advisor</h2>

      <div style={{textAlign:"center",fontSize:18}}>

        <p><a href="tel:+918319600171">📞 8319600171</a></p>
        <p><a href="mailto:manish.starhealth.in@gmail.com">✉ manish.starhealth.in@gmail.com</a></p>

      </div>

    </section>

  )
}

// ===== FLOAT BUTTONS =====
function FloatingButtons(){
  return(
    <>
      <a href="https://wa.me/918319600171" target="_blank">
        <div style={{position:"fixed",bottom:25,right:25,background:"#25D366",color:"white",padding:"14px 18px",borderRadius:50,fontWeight:700}}>WhatsApp</div>
      </a>
      <a href="tel:+918319600171">
        <div style={{position:"fixed",bottom:90,right:25,background:colors.primary,color:"white",padding:"14px 18px",borderRadius:50,fontWeight:700}}>Call</div>
      </a>
    </>
  )
}

// ===== FOOTER =====
function Footer(){
  return (
    <div style={{background:colors.dark,color:"white",padding:40,textAlign:"center"}}>

      <h3>My Bima Mitra</h3>
      <p>Senior Health Insurance Advisory – Star Health & Allied Insurance</p>
      <p>© 2026 My Bima Mitra</p>

    </div>
  )
}

// ===== HOME PAGE =====
function Home(){
  return(
    <>
      <Hero/>
      <Advisor/>
      <Plans/>
    </>
  )
}

// ===== ROUTER =====
export default function App(){

  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");

  useEffect(()=>{
    window.addEventListener("hashchange",()=>{
      setRoute(window.location.hash.replace("#/",""));
    });
  },[]);

  let Page=Home;

  if(route==="plans")Page=Plans;
  if(route==="resources")Page=Resources;
  if(route==="consultation")Page=Consultation;
  if(route==="contact")Page=Contact;

  return(
    <div style={{fontFamily:"Arial",background:colors.bg}}>
      <Navbar/>
      <Page/>
      <FloatingButtons/>
      <Footer/>
    </div>
  )
}
