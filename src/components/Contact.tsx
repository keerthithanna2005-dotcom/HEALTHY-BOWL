import React, { useState } from 'react';
import { Phone, Mail, Clock, Map, Send, FileCheck2, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
}

export default function Contact({ onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const subjects = ['General Question', 'Menu & Dietary Inquiry', 'Career / Job Applications', 'Feedback / High Vibe Suggestion', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please provide a valid email address.';
    if (!formData.message.trim()) errors.message = 'Please include a message details context.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit callback
    onSendMessage(formData);

    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: 'General Question',
      message: ''
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 6000);
  };

  const infoList = [
    {
      icon: Phone,
      title: 'Operating Hotline',
      value: '1-800-555-BOWL',
      sub: 'Mon-Sun • 10 AM - 9 PM EST',
      action: 'tel:18005552695'
    },
    {
      icon: Mail,
      title: 'Email Correspondence',
      value: 'truck@healthybowl.com',
      sub: 'Catering: event@healthybowl.com',
      action: 'mailto:truck@healthybowl.com'
    },
    {
      icon: Clock,
      title: 'Baseline Commutes',
      value: '11:00 AM - 7:30 PM',
      sub: 'Varies on week schedule',
      action: '#location'
    },
    {
      icon: Map,
      title: 'Current Hub Region',
      value: 'Metropolitan Core Radius',
      sub: 'Standard 45-mile service limit',
      action: '#location'
    }
  ];

  const socialLinks = [
    { label: 'Instagram', handle: '@HealthyBowlTruck', url: 'https://instagram.com' },
    { label: 'Facebook', handle: 'HealthyBowlFoodCo', url: 'https://facebook.com' },
    { label: 'TikTok', handle: '@HealthyBowlBites', url: 'https://tiktok.com' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1">
            <span>Get In Touch</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            We Would Love to Hear From You
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-sm sm:text-base leading-relaxed">
            Have general questions about our local ingredients? Want to recommend a food truck parking spot? Send us a direct line and our street crew will check it out.
          </p>
        </div>

        {/* Form Split Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info blocks column left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {infoList.map((info, idx) => (
                <a
                  href={info.action}
                  key={idx}
                  className="p-5.5 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100/80 hover:shadow-lg transition-all duration-300 flex items-start space-x-4 group"
                >
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider leading-none">
                      {info.title}
                    </span>
                    <p className="text-xs sm:text-sm font-black text-gray-900 tracking-tight leading-snug">
                      {info.value}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-none">
                      {info.sub}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social handles container */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                Join our social community
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                We live-post truck locations and discount coupon codes on our social feeds. Follow along:
              </p>

              <div className="space-y-2 pt-2">
                {socialLinks.map((s, idx) => (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    key={idx}
                    className="flex justify-between items-center p-2.5 rounded-lg hover:bg-slate-800 transition-all text-xs font-medium border border-transparent hover:border-slate-800 text-slate-100"
                  >
                    <span>{s.label}</span>
                    <span className="flex items-center space-x-1 font-mono font-bold text-emerald-400">
                      <span>{s.handle}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Contact form column right (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 md:p-10 relative">
            
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <FileCheck2 className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">
                    Message Dispatched Safely!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed font-semibold">
                    Awesome! We logged your message nicely! A friendly street staff representative will reply to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  {/* Topic Select */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono mb-2 flex items-center space-x-1">
                      <HelpCircle className="h-4 w-4 text-emerald-500" />
                      <span>Select Inquiry Topic</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {subjects.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Liam Henderson"
                      className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                        formErrors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-rose-500 font-bold mt-1.5">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. liam.h@gmail.com"
                      className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                        formErrors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-rose-500 font-bold mt-1.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                      Your Message Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe what you want to ask our team..."
                      className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[6rem] font-medium ${
                        formErrors.message ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[10px] text-rose-500 font-bold mt-1.5">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide shadow transition-all cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message Line</span>
                  </button>

                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
