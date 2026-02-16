import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      .catch(() => alert("Error sending lead. Please try again."));
  };

  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" className="h-10" />
          <h1 className="text-2xl font-bold text-blue-700">My Bima Mitra</h1>
        </div>
        <Button asChild>
          <a href="https://wa.me/918319600171" target="_blank">WhatsApp</a>
        </Button>
      </div>

      {/* HERO */}
      <section className="text-center py-20 bg-blue-50 px-6">
        <img src="/logo.jpeg" className="h-28 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Star Health Insurance Advisor
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          Everyday, Everytime There For You. Get the best Star Health Insurance plans with expert guidance and full claim support across India.
        </p>
        <Button size="lg" asChild>
          <a href="#contact">Get Free Star Health Quote</a>
        </Button>
      </section>

      {/* STAR HEALTH PLANS */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Star Health Insurance Plans</h3>
        <Card>
          <CardContent className="p-8">
            <h4 className="text-2xl font-semibold mb-4">Comprehensive Health Coverage</h4>
            <p>
              Family Floater • Individual Plans • Senior Citizen Plans • Super Top‑Up • Critical Illness • 14000+ Cashless Hospitals
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="bg-blue-50 py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Get Free Star Health Quote</h3>

          {submitted ? (
            <p className="text-center text-green-600 font-semibold">Lead sent successfully! We will contact you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Full Name" onChange={handleChange} required />
              <Input name="phone" placeholder="Phone Number" onChange={handleChange} required />
              <Input name="city" placeholder="City" onChange={handleChange} required />
              <Textarea name="message" placeholder="Age, Members & Coverage Needed" onChange={handleChange} />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-gray-900 text-white">
        <p>Call / WhatsApp: 8319600171</p>
        <p>Email Leads: manish.starhealth.in@gmail.com</p>
        <p className="text-sm mt-2">Serving All Cities in India</p>
      </footer>
    </div>
  );
}
