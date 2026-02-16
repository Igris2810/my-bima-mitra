import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function MyBimaMitra() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_prwxv5e",
        "template_lnnkfoo",
        {
          from_name: formData.name,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
        },
        "6LcmS8gSIq2vvPppX"
      )
      .then(() => setSubmitted(true))
      .catch(() => alert("Error sending lead"));
  };

  return (
    <div style={{fontFamily:"Arial", textAlign:"center", padding:"20px"}}>
      <img src="/logo.jpeg" width="200" />

      <h1>Star Health Insurance Advisor</h1>
      <p>Everyday, Everytime There For You</p>

      <h2>Get Free Star Health Quote</h2>

      {submitted ? (
        <h3>Thank you! We will contact you soon.</h3>
      ) : (
        <form onSubmit={handleSubmit} style={{maxWidth:"400px", margin:"auto"}}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required style={{width:"100%", padding:"10px", margin:"5px"}}/>
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{width:"100%", padding:"10px", margin:"5px"}}/>
          <input name="city" placeholder="City" onChange={handleChange} required style={{width:"100%", padding:"10px", margin:"5px"}}/>
          <textarea name="message" placeholder="Age, Members & Coverage Needed" onChange={handleChange} style={{width:"100%", padding:"10px", margin:"5px"}}></textarea>

          <button type="submit" style={{background:"blue", color:"white", padding:"12px", width:"100%"}}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
