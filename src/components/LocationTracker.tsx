import React, { useState } from 'react';
import { MapPin, Search, Calendar, Phone, Mail, Clock, ShieldCheck, Navigation, Locate } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEDULE } from '../data';
import { ScheduleDay } from '../types';

export default function LocationTracker() {
  const [zipQuery, setZipQuery] = useState('');
  const [zipResult, setZipResult] = useState<{ checked: boolean; service: boolean; text: string } | null>(null);
  const [activeDay, setActiveDay] = useState<ScheduleDay | null>(
    SCHEDULE.find(s => s.status === 'active') || SCHEDULE[0]
  );

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipQuery.trim()) return;

    // Simulated local delivery check algorithm
    const cleanZip = zipQuery.trim();
    const parsed = parseInt(cleanZip, 10);

    if (isNaN(parsed)) {
      // String search
      setZipResult({
        checked: true,
        service: true,
        text: `Yes! Our food truck is licensed to operate across ${cleanZip} and surrounding corridors! Check our calendar for active times.`
      });
    } else {
      // ZIP numerical search
      if (parsed >= 10001 && parsed <= 10199) {
        setZipResult({
          checked: true,
          service: true,
          text: `Awesome! ZIP ${cleanZip} is inside our baseline 45-mile green service area. We can park right outside your building!`
        });
      } else {
        setZipResult({
          checked: true,
          service: false,
          text: `ZIP ${cleanZip} is slightly outside our default daily food truck commute (standard 45-mile limit). However, we DO support private corporate catering in this area for groups > 50 guests!`
        });
      }
    }
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative details */}
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-emerald-100/30 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full">
            Track The Truck
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Where is the Healthy Bowl Today?
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base sm:text-lg leading-relaxed">
            Our daily coordinates update dynamically. Find us parked under trees or at major office walkways during lunchtime hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Schedule & ZIP Check (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Weekday List Box */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <span>Weekly Transit Schedule</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {SCHEDULE.map((s, idx) => {
                  const isActive = activeDay?.day === s.day;
                  const isCurrentDayReal = s.status === 'active';

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveDay(s)}
                      className={`py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50/70 border border-emerald-100 shadow-sm'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-extrabold ${isActive ? 'text-emerald-950' : 'text-gray-950'}`}>
                            {s.day}
                          </span>
                          {isCurrentDayReal && (
                            <span className="bg-emerald-600 text-white font-black uppercase text-[8px] tracking-wider px-2 py-0.5 rounded-full animate-pulse">
                              Active Today
                            </span>
                          )}
                        </div>
                        <p className={`text-xs ${isActive ? 'text-emerald-800 font-semibold' : 'text-gray-600'}`}>
                          {s.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="text-left sm:text-right font-mono">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">Hours</span>
                          <span className="text-xs font-bold text-gray-700">{s.hours}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Radius Postal Code Verification Form */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 border border-emerald-900">
              <h4 className="text-base font-extrabold flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-amber-300" />
                <span>Check Your Area Boundaries</span>
              </h4>
              <p className="text-emerald-200 text-xs leading-relaxed font-medium">
                We operate across a standard 45-mile custom transit perimeter. Want us to bring the truck to your corporate courtyard or home yard? Verify your neighborhood:
              </p>

              <form onSubmit={handleZipCheck} className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={zipQuery}
                    onChange={(e) => setZipQuery(e.target.value)}
                    placeholder="Enter ZIP code or city name"
                    className="w-full bg-emerald-900/60 border border-emerald-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-300 hover:bg-amber-400 text-emerald-950 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap"
                >
                  Verify
                </button>
              </form>

              <AnimatePresence mode="wait">
                {zipResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-3.5 rounded-xl text-xs font-medium ${
                      zipResult.service 
                        ? 'bg-emerald-900/80 border border-emerald-700/60 text-emerald-100' 
                        : 'bg-orange-950/80 border border-orange-900/60 text-orange-200'
                    }`}
                  >
                    {zipResult.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Simulated Live Radar Mapping HUD & Active Pin details (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-emerald-600 block">
                    LIVE RADAR
                  </span>
                  <p className="text-base font-black text-gray-900 tracking-tight leading-none mt-1">
                    Simulated GPS Tracker
                  </p>
                </div>
                <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono border border-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" />
                  <span>3000 PING ACTIVE</span>
                </div>
              </div>

              {/* Graphical Map HUD Card */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-900">
                
                {/* Radial Grid Map Background */}
                <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] bg-[size:24px_24px] opacity-40" />
                
                {/* Radar sweep animation */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_50%,rgba(16,185,129,0.08)_100%)] rounded-full animate-spin [animation-duration:15s] pointer-events-none" />

                {/* Simulated streets vector paths lines */}
                <svg className="absolute inset-0 w-full h-full text-slate-800" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,100 L 400,100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 120,0 L 120,400" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 0,220 L 400,220" stroke="currentColor" strokeWidth="2" />
                  <path d="M 280,0 L 280,400" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
                  <circle cx="200" cy="200" r="160" stroke="#065f46" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="200" cy="200" r="80" stroke="#065f46" strokeWidth="1" fill="none" opacity="0.4" />
                </svg>

                {/* Truck Active Pulsing Node */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="absolute z-10 w-12 h-12 rounded-full border border-emerald-400 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  style={{ top: '48%', left: '48%' }}
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center font-bold text-[8px] text-white">
                    HB
                  </div>
                </motion.div>

                {/* Surrounding Landmark Pins */}
                <div className="absolute text-slate-400 text-[9px] font-mono select-none pointer-events-none bottom-4 left-4 flex items-center space-x-1 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                  <Locate className="h-3 w-3 text-slate-500 animate-spin" />
                  <span>GPS LOCK: 40.7250, -74.0010</span>
                </div>

                <div className="absolute text-[8px] font-mono text-emerald-400 uppercase tracking-widest top-4 right-4 bg-slate-900/60 border border-slate-800/80 px-2 py-0.5 rounded">
                  Grid Safe Perimeters
                </div>

                <div className="absolute top-1/4 left-1/3 text-[9px] text-slate-500 font-mono">Downtown Towers</div>
                <div className="absolute bottom-1/4 right-1/4 text-[9px] text-slate-500 font-mono">Consort Plaza</div>
              </div>
            </div>

            {/* Landmark specs footer */}
            <div className="mt-6 space-y-4">
              <AnimatePresence mode="wait">
                {activeDay && (
                  <motion.div
                    key={activeDay.day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5"
                  >
                    <span className="text-[10px] font-bold text-orange-600 font-mono uppercase tracking-wider block">
                      Target Landmark
                    </span>
                    <h5 className="text-sm font-bold text-gray-900 leading-tight">
                      {activeDay.location}
                    </h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {activeDay.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fast phone hotline block */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold">
                <a
                  href="tel:18005552695"
                  className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-all text-gray-700"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span>1-800-555-BOWL</span>
                </a>
                <a
                  href="mailto:truck@healthybowl.com"
                  className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-all text-gray-700"
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>truck@healthybowl.com</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
