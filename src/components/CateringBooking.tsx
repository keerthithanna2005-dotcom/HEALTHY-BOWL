import React, { useState } from 'react';
import { Calendar, Users, MapPin, ClipboardList, Send, FileCheck2, ShieldCheck, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CateringBooking } from '../types';

interface CateringBookingProps {
  bookings: CateringBooking[];
  onSubmitBooking: (booking: Omit<CateringBooking, 'id' | 'status' | 'createdAt'>) => void;
  onDeleteBooking?: (id: string) => void;
}

export default function CateringBookingForm({ bookings, onSubmitBooking, onDeleteBooking }: CateringBookingProps) {
  // Form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: 30,
    location: '',
    eventType: 'Corporate Event',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState<Omit<CateringBooking, 'id' | 'status' | 'createdAt'> | null>(null);

  const eventTypes = [
    'Corporate Event',
    'Weddings & Celebrations',
    'Birthday Parties & Socials',
    'Summer Concerts & Festivals',
    'Community Gatherings',
    'Other Special Party'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Remove individual error as user writes
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Validation
    if (!formData.name.trim()) errors.name = 'Please enter your name or company contact.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please provide a valid email.';
    if (!formData.phone.trim()) errors.phone = 'Please enter a contact telephone number.';
    if (!formData.eventDate) errors.eventDate = 'Please select a future calendar date.';
    if (!formData.location.trim()) errors.location = 'Please coordinate a target address or city.';
    if (formData.guestCount < 10) errors.guestCount = 'Our catering packages support guest counts of 10 or more guests.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success dispatch
    onSubmitBooking({
      ...formData,
      guestCount: Number(formData.guestCount)
    });

    setJustSubmitted({
      ...formData,
      guestCount: Number(formData.guestCount)
    });

    setShowSuccess(true);

    // Reset Form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: 30,
      location: '',
      eventType: 'Corporate Event',
      notes: ''
    });

    // Reset success banner after 6 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 8000);
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-white relative">
      
      {/* Decorative Blur BG */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>Secure Event Date</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Host Outstanding Eco-Catering
          </h2>
          <p className="text-gray-500 font-medium mt-3 text-sm sm:text-base leading-relaxed">
            Reserve the Healthy Bowl Food Truck (or a custom organic buffet station) for your next corporate luncheon, wedding assembly, or outdoor festival.
          </p>
        </div>

        {/* Lead Grid Form Side by Side with Dashboard */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Interactive Booking Register Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 md:p-10 relative">
            
            <AnimatePresence mode="wait">
              {showSuccess && justSubmitted ? (
                
                /* Success screen rendering container */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <FileCheck2 className="h-9 w-9 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      Catering Request Submitted!
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-md mx-auto">
                      Fantastic! Your event inquiry is now logged! Our dedicated hospitality coordinator is checking truck availability for <span className="font-extrabold text-emerald-700">{justSubmitted.eventDate}</span>.
                    </p>
                  </div>

                  {/* Summary of what they booked */}
                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-left space-y-2.5 max-w-sm mx-auto text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400 font-mono text-[9px] uppercase">Corporate Lead Name:</span>
                      <span className="text-gray-800">{justSubmitted.name}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400 font-mono text-[9px] uppercase">Event Category:</span>
                      <span className="text-gray-800">{justSubmitted.eventType}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400 font-mono text-[9px] uppercase">Target Location:</span>
                      <span className="text-gray-800">{justSubmitted.location}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400 font-mono text-[9px] uppercase">Estd. Attendees:</span>
                      <span className="text-emerald-700 font-bold">{justSubmitted.guestCount} Guests</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 font-medium">
                    We will dispatch a customized menu draft and price estimation to <span className="underline">{justSubmitted.email}</span> within 2 hours.
                  </p>

                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer transition-all"
                  >
                    Send Another Request
                  </button>
                </motion.div>
                
              ) : (
                
                /* Main Event Booking Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Event Type Grid Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-2 flex items-center space-x-1.5">
                      <ClipboardList className="h-4 w-4 text-emerald-500" />
                      <span>Select Event Classification</span>
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dual Grid: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Contact Name / Organization
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Eleanor Vance / Apex Media"
                        className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                          formErrors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Business Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. director@apex.com"
                        className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                          formErrors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dual Grid: Phone & Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Direct Telephone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. (555) 0192-384"
                        className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                          formErrors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Target Calendar Date
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold ${
                          formErrors.eventDate ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.eventDate && (
                        <p className="text-[10px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.eventDate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Slider: Number of Guests */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                        Approximate Attendee Count
                      </label>
                      <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 font-mono">
                        {formData.guestCount} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      name="guestCount"
                      min="10"
                      max="500"
                      step="5"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold font-mono mt-1">
                      <span>10 guests (minimum block)</span>
                      <span>500+ guests (massive venue)</span>
                    </div>
                  </div>

                  {/* Input: Location Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5 flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-emerald-500" />
                      <span>Event Address / Business Park Coordinates</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. 101 Innovation Blvd, Silicon Alley or Private Backyard, Queens"
                      className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                        formErrors.location ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.location && (
                      <p className="text-[10px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{formErrors.location}</span>
                      </p>
                    )}
                  </div>

                  {/* General Special notes directions */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                      Specific Hospitality Directives & Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="List any special dietary needs, truck parking guidelines, or visual chalk themes you want featured..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[5rem] font-medium"
                    />
                  </div>

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-50 transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Catering Date Proposal</span>
                  </button>

                </form>
              )}
            </AnimatePresence>

          </div>

          {/* Booking Tracking Dashboard (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between self-stretch">
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono tracking-wider block">
                    Lead Monitor
                  </span>
                  <h3 className="text-base font-black text-gray-900 leading-none mt-0.5">
                    Live Booking Status Tracker
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-white px-2.5 py-1 rounded border shadow-xs text-gray-500 font-mono">
                  {bookings.length} Registered
                </span>
              </div>

              {/* Submissions Feed */}
              <div className="space-y-4 max-h-[52vh] overflow-y-auto pr-1">
                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 space-y-2">
                    <ClipboardList className="h-8 w-8 mx-auto opacity-30 text-emerald-600" />
                    <p className="text-xs font-semibold">No active event inquiries found.</p>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const isPending = booking.status === 'Pending';
                    const isConfirmed = booking.status === 'Confirmed';

                    return (
                      <div
                        key={booking.id}
                        className="bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm space-y-3.5 relative overflow-hidden group"
                      >
                        {/* Header metadata row */}
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase text-gray-400 font-mono block">
                              {booking.eventType}
                            </span>
                            <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
                              {booking.name}
                            </h4>
                          </div>

                          {/* Action Delete for Custom Created booking items */}
                          {onDeleteBooking && booking.id.startsWith('booking-custom-') && (
                            <button
                              onClick={() => onDeleteBooking(booking.id)}
                              className="text-gray-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                              title="Delete request"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        {/* Middle scheduling points */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-gray-600 bg-slate-50/70 rounded-lg p-2.5 border border-slate-50 font-mono">
                          <div>
                            <span className="block text-[8px] text-gray-400 uppercase font-bold leading-none mb-1">Target Date</span>
                            <span className="font-extrabold text-slate-800">{booking.eventDate}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-gray-400 uppercase font-bold leading-none mb-1">Attendees</span>
                            <span className="font-extrabold text-slate-800">{booking.guestCount} Guests</span>
                          </div>
                        </div>

                        {/* Footer Status Indicators */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                          <span className="text-[10px] text-gray-400 font-semibold">
                            Logged via Website
                          </span>

                          <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                            isConfirmed 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full block ${isConfirmed ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                            <span>{booking.status}</span>
                          </span>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Micro warning footer */}
            <div className="pt-6 border-t border-slate-200 bg-white/60 p-4 rounded-2xl border mt-6">
              <span className="text-[10px] text-orange-600 font-extrabold uppercase tracking-wide flex items-center space-x-1">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-500" />
                <span>Notice for peak summer schedule</span>
              </span>
              <p className="text-[11px] text-gray-500 leading-snug mt-1 font-medium">
                Our Saturday & Sunday slots fill up very quickly! Inquire at least 3 weeks earlier to secure weekend food truck integrations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
