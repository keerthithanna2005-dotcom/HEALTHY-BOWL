import React, { useState } from 'react';
import { Sparkles, Mail, Send, ShieldAlert, CheckCircle2, ChevronRight, Scale, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim() || !/\S+@\S+\.\S+/.test(newsEmail)) return;

    setSubscribed(true);
    setNewsEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-8 border-t border-emerald-950 relative overflow-hidden">
      
      {/* Background Graphic Flare */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand, Nav & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12">
          
          {/* Brand Summary column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('hero')}>
              <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center border border-emerald-400">
                <Sparkles className="h-5.5 w-5.5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight leading-none block">
                  Healthy <span className="text-emerald-400">Bowl</span>
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-500 font-bold leading-none block">
                  Food Truck Co.
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Revolutionizing street food by bringing colorful, clean, organic superfood bowls packed with chef-crafted proteins and garden minerals directly to busy streets.
            </p>

            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Hub Location: New York, NY Corridors
            </p>
          </div>

          {/* Quick Links column (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold mb-4">
                Explore Menu
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li><button onClick={() => onNavigate('menu')} className="hover:text-emerald-400 transition-colors cursor-pointer">Preset Selections</button></li>
                <li><button onClick={() => onNavigate('menu')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center space-x-1"><span className="text-orange-400">★</span><span>Bowl Creator</span></button></li>
                <li><button onClick={() => onNavigate('location')} className="hover:text-emerald-400 transition-colors cursor-pointer">Live Coordinates</button></li>
                <li><button onClick={() => onNavigate('why-choose-us')} className="hover:text-emerald-400 transition-colors cursor-pointer">Trust Metrics</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold mb-4">
                Corporate
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">Our Food Philosophy</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">Catering services</button></li>
                <li><button onClick={() => onNavigate('booking')} className="hover:text-emerald-400 transition-colors cursor-pointer">Event Reserval</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">FAQ Hub</button></li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription form (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
              The Harvest News
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Subscribe to get exclusive weekly coordinates alerts, discount menu coupons, and health tips.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-300 font-semibold"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                  <span>Coupon sent to your inbox!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="Your active email address"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-600 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe newsletter"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </AnimatePresence>

            <p className="text-[10px] text-slate-500">
              Zero spam. Unsubscribe with 1-click anytime.
            </p>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-mono font-semibold">
          
          <div className="text-center sm:text-left">
            <span>© {currentYear} HEALTHY BOWL FOOD TRUCK CO. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex space-x-5">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>

        </div>

      </div>

      {/* PRIVACY POLICY MODAL OVERLAY */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-slate-850"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-base">
                <ShieldAlert className="h-5 w-5 text-emerald-600" />
                <span>Healthy Bowl Privacy Policy</span>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed font-semibold space-y-3">
                <p className="font-bold text-slate-800">Effective Date: June 10, 2026</p>
                
                <p>Welcome to Healthy Bowl Food Truck website! Your privacy is incredibly critical to us. Because we operate interactive features (the Order builder and Event booking), we outline exactly how transactions are handled.</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide">1. Information We Log</h5>
                <p>We do not store or sell your sensitive private billing credentials. Any names, emails, guest counts, addresses or phone lines logged inside of our Catering lead forms are processed solely to design menu estimates and transit schedules.</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide font-mono">2. Cookie Policy</h5>
                <p>We use lightweight browser localStorage caches solely on your machine to host order queues, and booking status boards so they survive browser refreshes. No persistent marketing cross-tracking pixels are executed.</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide">3. Contact Safety</h5>
                <p>If you subscribe to the Harvest Newsletter, your correspondence line is stored securely in encrypted servers, never distributed to third party advertising affiliates.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TERMS & CONDITIONS MODAL OVERLAY */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-slate-850"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-base">
                <Scale className="h-5 w-5 text-emerald-600" />
                <span>Healthy Bowl Terms & Conditions</span>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed font-semibold space-y-3">
                <p className="font-bold text-slate-800">Effective Date: June 10, 2026</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide font-mono">1. Pickup Order Tickets</h5>
                <p>Picking up items constructed on our client menu builder is subjected to truck schedule Commutes. Placing an order on this portal compiles a checkout receipt ticket, but does not execute immediate card processing online. All payments are completed in-person at the food truck window via tap-card, cash, or credit lines.</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide">2. Catering Slot Holds</h5>
                <p>Registering an event proposal does not guarantee slot reservation until a signed deposit invoice is secured in coordinate transactions. Peak weekends (Friday-Sunday) fill up to 3 weeks earlier during summer festivals.</p>
                
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide">3. Nutrition Metrics disclaimer</h5>
                <p>All caloric values, macro listings, and dietary markers are calculated as nutritious estimates based on standard USDA databases. Actual values fluctuate subtly based on weight distributions and raw harvesting seasons.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer"
                >
                  Accept Terms
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
