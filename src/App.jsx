import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ===== DESIGN SYSTEM =====
const colors={primary:"#0B3D91",accent:"#0b5ed7",bg:"#F4F7FB",dark:"#0e1b3d"}
const btn={padding:"14px 28px",background:colors.accent,color:"white",border:0,borderRadius:12,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 22px rgba(0,0,0,0.18)"}
const section={maxWidth:1150,margin:"auto",padding:"90px 20px",textAlign:"center"}
const card={background:"white",padding:30,borderRadius:18,boxShadow:"0 10px 30px rgba(0,0,0,0.08)"}

// ===== NAVBAR =====
function Navbar(){
  return (
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"20px 80px",
      background:"white",
      boxShadow:"0 4px 18px rgba(0,0,0,0.08)",
      position:"sticky",
      top:0,
      zIndex:10
    }}>

      {/* Logo + Brand */}
      <div style={{display:"flex",alignItems:"center",gap:16}}>

        <img
          src="/logo.png"
          style={{
            height:65,
            objectFit:"contain"
          }}
        />

        <div>
          <div style={{
            fontSize:24,
            fontWeight:800,
            color:"#0B3D91"
          }}>
            My Bima Mitra
          </div>

          <div style={{
            fontSize:13,
            color:"#0b5ed7"
          }}>
            Your Personal Insurance Expert
          </div>
        </div>

      </div>


      {/* Navigation */}
      <div style={{
        display:"flex",
        gap:32,
        fontWeight:600,
        fontSize:15
      }}>
        <a href="#/" style={{textDecoration:"none",color:"#333"}}>Home</a>
        <a href="#/plans" style={{textDecoration:"none",color:"#333"}}>Plans</a>
        <a href="#/consultation" style={{textDecoration:"none",color:"#333"}}>Free Consultation</a>
        <a href="#/contact" style={{textDecoration:"none",color:"#333"}}>Contact</a>
      </div>

    </div>
  );
}



// ===== FLOATING BUTTONS =====
function FloatingButtons(){
  return(
    <>
      <a href="https://wa.me/918319600171" target="_blank">
        <div style={{position:"fixed",bottom:25,right:25,background:"#25D366",color:"white",padding:"14px 18px",borderRadius:50,fontWeight:700,boxShadow:"0 8px 20px rgba(0,0,0,0.3)"}}>WhatsApp</div>
      </a>
      <a href="tel:+918319600171">
        <div style={{position:"fixed",bottom:90,right:25,background:colors.primary,color:"white",padding:"14px 18px",borderRadius:50,fontWeight:700}}>Call</div>
      </a>
    </>
  )
}

// ===== HERO =====
function Hero(){

  const stats = [
    "7,000+ Happy Clients Served",
    "14,000+ Network Hospitals",
    "Lifetime Claim Support",
    "Serving Clients Across India & World Wide"
  ];

  return (
    <section style={{
      background:"linear-gradient(135deg,#0B3D91,#2d9cdb)",
      color:"white",
      padding:"120px 80px"
    }}>

      <div style={{
        maxWidth:1200,
        margin:"auto",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        gap:60
      }}>

        {/* LEFT CONTENT */}
        <div style={{maxWidth:520}}>

          <h1 style={{
            fontSize:48,
            lineHeight:1.2,
            marginBottom:20
          }}>
            Protect Your Family With
            <br/>
            Star Health Insurance
          </h1>

          <p style={{
            fontSize:18,
            marginBottom:30,
            opacity:.95
          }}>
            Personalized Insurance guidance, claim support,
            and the best Star Health plans with
            lifetime advisor support.
          </p>

          <a href="#/consultation">
            <button style={{
              padding:"16px 32px",
              borderRadius:10,
              border:"none",
              background:"white",
              color:"#0B3D91",
              fontWeight:700,
              fontSize:16,
              cursor:"pointer",
              boxShadow:"0 6px 18px rgba(0,0,0,0.2)"
            }}>
              Get Free Consultation
            </button>
          </a>

        </div>


        {/* TRUST BOX */}
        <div style={{
          background:"white",
          padding:30,
          borderRadius:16,
          color:"#333",
          width:340,
          boxShadow:"0 12px 30px rgba(0,0,0,0.15)"
        }}>

          <h3 style={{marginBottom:20}}>
            Why Choose Us
          </h3>

          {stats.map((item,i)=>(
            <div key={i} style={{marginBottom:12}}>
              ✔ {item}
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

// ===== BRAND TRUST =====
function BrandSection(){
  return(
    <section style={section}>
      <h2>Authorized Star Health Advisor</h2>
      <p>Helping families choose the right health insurance plans with expert support and lifetime service.</p>
    </section>
  )
}

// ===== TRUST STRIP =====
function Trust(){
  return(
    <div style={{display:"flex",justifyContent:"center",gap:40,padding:30,background:"white",fontWeight:600}}>
      <div>✔ IRDAI Registered Advisor</div>
      <div>✔ 14,000+ Cashless Hospitals</div>
      <div>✔ Lifetime Claim Support</div>
      <div>✔ Pan India Service</div>
    </div>
  )
}

// ===== WHY ADVISOR =====
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
          <div key={i.t} style={card}><div style={{fontSize:36}}>{i.e}</div><h3>{i.t}</h3><p>{i.d}</p></div>
        ))}
      </div>
    </section>
  )
}

// ===== CITY SEO =====
function Cities(){
  const cities=["Bhopal","Indore","Delhi","Mumbai","Pune","Bangalore","Hyderabad"];
  return(
    <section style={section}>
      <h2>Serving Clients Across India</h2>
      <p>{cities.join(" • ")}</p>
    </section>
  )
}

// ===== TESTIMONIALS =====
function Testimonials(){
  const t=["Cashless claim approved in 4 hours – Bhopal","Best advisor for parents insurance – Indore","Smooth purchase – Delhi"]
  return(
    <section style={section}><h2>Trusted By Families Across India</h2>
      <div style={{display:"flex",gap:25,justifyContent:"center",flexWrap:"wrap",marginTop:30}}>
        {t.map(x=>(<div key={x} style={{...card,width:300}}>★★★★★<br/><br/>{x}</div>))}
      </div>
    </section>
  )
}

// ===== PLANS PAGE =====
function Plans(){
  const plans=["Family Floater","Senior Citizen","Super Top-Up","Critical Illness"];
  return(
    <section style={section}><h2>Popular Star Health Plans</h2>
      {plans.map(p=>(<div key={p} style={{...card,margin:15}}>{p}<br/><br/><a href="#/consultation"><button style={btn}>Get Quote</button></a></div>))}
    </section>
  )
}

// ===== CONSULTATION FORM =====
function Consultation(){
  const [submitted,setSubmitted]=useState(false);
  const [formData,setFormData]=useState({name:"",phone:"",city:"",message:""});
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit=(e)=>{
    e.preventDefault();
    emailjs.send("service_prwxv5e","template_lnnkfoo",{from_name:formData.name,phone:formData.phone,city:formData.city,message:formData.message},"6LcmS8gSIq2vvPppX").then(()=>setSubmitted(true));
  };
  return (
    <section style={section}><h2>Free Consultation</h2>
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

// ===== CONTACT =====
function Contact(){
  return(
    <section style={section}>
      <h2>Contact</h2>
      <p><a href="tel:+918319600171">📞 8319600171</a></p>
      <p><a href="mailto:manish.starhealth.in@gmail.com">✉️ Email</a></p>
    </section>
  )
}

// ===== FOOTER =====
function Footer(){
  return(
    <div style={{background:colors.dark,color:"white",padding:40,textAlign:"center"}}>
      <h3>My Bima Mitra</h3>
      <p>Health Insurance Advisor | Star Health</p>
      <p>© 2026 My Bima Mitra</p>
    </div>
  )
}
function PlansSection(){

  const plans = [
    {
      title:"Family Floater",
      desc:"One policy covering the entire family under a single sum insured."
    },
    {
      title:"Senior Citizen Plans",
      desc:"Special health insurance plans designed for parents and senior citizens."
    },
    {
      title:"Super Top-Up Plans",
      desc:"Increase your health coverage at a lower premium with top-up insurance."
    },
    {
      title:"Critical Illness Plans",
      desc:"Financial protection against major illnesses like cancer, stroke, and heart disease."
    }
  ];

  return (
    <section style={{
      padding:"100px 80px",
      background:"#F4F7FB"
    }}>

      <div style={{maxWidth:1200,margin:"auto"}}>

        <h2 style={{
          textAlign:"center",
          fontSize:36,
          marginBottom:60,
          color:"#0B3D91"
        }}>
          Popular Health Insurance Plans
        </h2>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:30
        }}>

          {plans.map((plan,i)=>(
            <div key={i} style={{
              background:"white",
              padding:30,
              borderRadius:16,
              boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
            }}>

              <h3 style={{marginBottom:12}}>
                {plan.title}
              </h3>

              <p style={{
                fontSize:14,
                marginBottom:20,
                color:"#555"
              }}>
                {plan.desc}
              </p>

              <a href="#/consultation">
                <button style={{
                  padding:"10px 18px",
                  borderRadius:8,
                  border:"none",
                  background:"#0B3D91",
                  color:"white",
                  cursor:"pointer"
                }}>
                  Get Quote
                </button>
              </a>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
function Home(){
  return(
    <>
      <Hero/>
      <PlansSection/>
      <BrandSection/>
      <Trust/>
      <WhyAdvisor/>
      <Testimonials/>
      <Cities/>
    </>
  )
}

// ===== ROUTER =====
export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{window.addEventListener("hashchange",()=>setRoute(window.location.hash.replace("#/","")));},[]);
  let Page=Home;if(route==="plans")Page=Plans;if(route==="consultation")Page=Consultation;if(route==="contact")Page=Contact;
  return(<div style={{fontFamily:"Arial",background:colors.bg}}><Navbar/><Page/><FloatingButtons/><Footer/></div>)
}
