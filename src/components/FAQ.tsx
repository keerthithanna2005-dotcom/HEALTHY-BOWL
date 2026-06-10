import { useState } from 'react';
import { HelpCircle, ChevronRight, MessageSquareCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Frictionless Knowledge</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Common Questions Answered
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base leading-relaxed">
            Everything you need to know about our sourcing, mobile truck scheduling commutes, event lead times, and clean allergen preparation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((f, idx) => {
            const isOpen = expandedId === f.id;

            return (
              <div
                key={f.id}
                className={`border rounded-2xl hover:border-emerald-200/80 transition-all duration-200 overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-emerald-600/20 shadow-md shadow-emerald-50/50' 
                    : 'border-slate-100 shadow-sm'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(f.id)}
                  className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-3.5">
                    <span className="text-xs uppercase font-mono font-bold text-emerald-600 mt-1">
                      0{idx + 1}
                    </span>
                    <span className="text-base font-extrabold text-gray-900 tracking-tight leading-snug">
                      {f.question}
                    </span>
                  </div>

                  <span className={`p-1 rounded-full bg-slate-50 text-gray-500 transition-all ${
                    isOpen ? 'rotate-90 bg-emerald-50 text-emerald-600' : ''
                  }`}>
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </button>

                {/* Sub Content Collapse Container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium border-t border-slate-50 pl-14">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Lead Query prompt below accordion */}
        <div className="mt-14 bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 hidden sm:block">
              <MessageSquareCode className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 tracking-tight">Have a distinct question about food allergy boundaries?</h4>
              <p className="text-xs text-gray-500 font-medium">Or are you interested in our unique festival layout fees?</p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-all text-center whitespace-nowrap"
          >
            Ask Us Directly
          </a>
        </div>

      </div>
    </section>
  );
}
