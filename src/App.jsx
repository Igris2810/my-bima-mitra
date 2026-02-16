import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const colors={primary:"#0B3D91",accent:"#0b5ed7",bg:"#F4F7FB"}
const btn={padding:"14px 28px",background:colors.accent,color:"white",border:0,borderRadius:10,fontWeight:700,cursor:"pointer"}
const section={maxWidth:1100,margin:"auto",padding:"80px 20px",textAlign:"center"}
const card={background:"white",padding:28,borderRadius:16,boxShadow:"0 10px 25px rgba(0,0,0,0.08)"}

function Navbar(){
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"18px 40px",background:"white",boxShadow:"0 6px 20px rgba(0,0,0,0.08)"}}>
      <b style={{color:colors.primary}}>My Bima Mitra</b>
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
    <section style={{background:"linear-gradient(135deg,#0B3D91,#2d9cdb)",color:"white",padding:"120px 20px",textAlign:"center"}}>
      <h1 style={{fontSize:44}}>Health Insurance Made Simple</h1>
      <p>Star Health plans with expert advisor support</p>
      <br/>
      <a href="#/consultation"><button style={{...btn,background:"white",color:colors.primary}}>Get Free Consultation</button></a>
    </section>
  )
}

function Home(){return(<><Hero/></>)}

function Contact(){return(<section style={section}><h2>Contact</h2><p><a href="tel:+918319600171">📞 8319600171</a></p><p><a href="mailto:manish.starhealth.in@gmail.com">✉️ manish.starhealth.in@gmail.com</a></p></section>)}

export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{window.addEventListener("hashchange",()=>setRoute(window.location.hash.replace("#/","")));},[]);
  let Page=Home;if(route==="contact")Page=Contact;
  return(<div style={{fontFamily:"Arial",background:colors.bg}}><Navbar/><Page/></div>)
}
