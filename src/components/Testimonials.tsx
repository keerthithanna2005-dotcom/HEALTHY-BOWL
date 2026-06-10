import { useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative details */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <span>Customer Opinions</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            What Our Wholesome Diners Say
          </h2>
          <p className="text-gray-500 font-medium mt-3 text-sm sm:text-base leading-relaxed">
            From quick downtown business lunchers to large venue catering bookings, check out what the neighborhood thinks of Healthy Bowl.
          </p>
        </div>

        {/* Carousel Box Layout */}
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          
          {/* Quote element decoration */}
          <div className="absolute top-8 left-8 text-emerald-100 h-16 w-16 opacity-40 pointer-events-none">
            <Quote className="h-full w-full rotate-180" />
          </div>

          {/* Avatar side */}
          <div className="flex-shrink-0 flex flex-col items-center text-center">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1 border-2 border-emerald-500 bg-white">
              <img
                src={activeReview.avatar}
                alt={activeReview.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              {/* Shield overlay badge */}
              <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border border-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>
            
            <h4 className="text-base font-extrabold text-gray-900 mt-4 leading-tight">{activeReview.name}</h4>
            <p className="text-xs text-emerald-700 font-bold font-mono mt-0.5 uppercase tracking-wide">
              {activeReview.role}
            </p>
          </div>

          {/* Paragraph copy side */}
          <div className="flex-grow flex flex-col justify-between min-h-[10rem]">
            
            <div className="space-y-4">
              {/* Stars rating panel */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: activeReview.rating }).map((_, sIdx) => (
                  <Star key={sIdx} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Highlight paragraph text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeReview.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed italic"
                >
                  "{activeReview.text}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Slider Triggers bottom controls */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-8">
              
              {/* Index indicator */}
              <span className="text-[11px] font-mono font-bold text-gray-400">
                RECOMMENDED SLIDE {activeIdx + 1} OF {TESTIMONIALS.length}
              </span>

              {/* Arrow button pairs */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-2 sm:p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-200 transition-all text-gray-700 cursor-pointer"
                  aria-label="Previous testimonial review"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 sm:p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-200 transition-all text-gray-700 cursor-pointer"
                  aria-label="Next testimonial review"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
