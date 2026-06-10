import React, { useState } from 'react';
import { Eye, X, ArrowLeft, ArrowRight, Expand, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const activeIndex = GALLERY_ITEMS.findIndex(item => item.id === lightboxId);
  const activeImage = GALLERY_ITEMS[activeIndex];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === -1) return;
    const nextIdx = (activeIndex + 1) % GALLERY_ITEMS.length;
    setLightboxId(GALLERY_ITEMS[nextIdx].id);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === -1) return;
    const prevIdx = (activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxId(GALLERY_ITEMS[prevIdx].id);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center space-x-1">
            <Camera className="h-3.5 w-3.5 text-emerald-500" />
            <span>Wanderlust & Bowls</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Moments on the Road & Fresh Servings
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base sm:text-lg leading-relaxed">
            Take an inside look at our organic kitchen prep, active community festival long-lines, custom styled private party setups, and smiling diners.
          </p>
        </div>

        {/* Masonry / Responsive Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 group cursor-pointer bg-slate-50"
              onClick={() => setLightboxId(item.id)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay Shield with Action Icons */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white z-10">
                
                {/* Expand Pill Badge top right */}
                <span className="self-end bg-white/20 backdrop-blur-md rounded-full p-2.5 hover:bg-white/30 transition-all text-white border border-white/10">
                  <Expand className="h-4 w-4" />
                </span>

                {/* Info Text in bottom metadata line */}
                <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1.5 text-amber-300 text-[10px] uppercase font-mono tracking-widest font-extrabold">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Healthy Bowl Story</span>
                  </div>
                  <h4 className="text-base font-extrabold tracking-tight leading-tight">
                    {item.alt}
                  </h4>
                  <p className="text-[11px] text-slate-200 leading-snug font-medium">
                    {item.caption}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* HIGH QUALITY LIGHTBOX OVERLAY PORTAL */}
        <AnimatePresence>
          {lightboxId && activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxId(null)}
            >
              {/* Close Button top corner */}
              <button
                onClick={() => setLightboxId(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white shadow-lg transition-all border border-white/10 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Left Slider Trigger button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/10 cursor-pointer hidden sm:block"
                aria-label="Previous Slide image"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              {/* Image content layout centered box */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-4xl w-full flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()} // Stop modal dismiss
              >
                <div className="bg-slate-900 rounded-3xl overflow-hidden p-3 border border-slate-800 shadow-2xl w-full">
                  
                  {/* Photo frame */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center">
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Captions description below */}
                  <div className="p-6 text-white text-left space-y-2">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded inline-block uppercase font-mono border border-emerald-900/60">
                      Candid Capture {activeIndex + 1} of {GALLERY_ITEMS.length}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                      {activeImage.alt}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {activeImage.caption}
                    </p>
                  </div>

                </div>

                {/* Mobile slider triggers shown below image box */}
                <div className="flex sm:hidden justify-center items-center gap-6 mt-6">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/10 text-white border border-white/10"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/10 text-white border border-white/10"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              {/* Right Slider Trigger button */}
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/10 cursor-pointer hidden sm:block"
                aria-label="Next Slide image"
              >
                <ArrowRight className="h-6 w-6" />
              </button>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
