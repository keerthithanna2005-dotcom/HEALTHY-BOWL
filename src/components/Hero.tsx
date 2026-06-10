import { ArrowRight, Utensils, Award, Leaf, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BASE_HERO_BOWL_IMG } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-emerald-50/40 via-white to-orange-50/20 overflow-hidden flex items-center">
      
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Banner Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-emerald-100/60 border border-emerald-200/50 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide w-fit mx-auto lg:mx-0 shadow-sm"
            >
              <Leaf className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>100% Fresh Daily • Nutrient Packed Superfoods</span>
            </motion.div>

            {/* Main Premium Typography Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight leading-none"
              >
                Fresh, Healthy Bowls <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600">
                  Served Wherever You Are
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                Bringing wholesome, chef-crafted, colorful nutrition directly to your streets. We combine organic bases, premium healthy proteins, crisp seasonal vegetables, and outstanding hand-whipped house select dressing into high-energy masterpieces.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0"
            >
              <button
                onClick={() => onNavigate('menu')}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <span>Order Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => onNavigate('booking')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-white hover:bg-emerald-50 text-gray-800 hover:text-emerald-900 font-bold transition-all border border-gray-200 hover:border-emerald-200 shadow-sm hover:shadow cursor-pointer text-base"
              >
                <span>Book Catering</span>
              </button>
            </motion.div>

            {/* Fast Benefit Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-50 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Build Your Own</h4>
                  <p className="text-xs text-gray-500">Fully customizable</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Chef Curated</h4>
                  <p className="text-xs text-gray-500">Exceptional taste</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Eco Friendly</h4>
                  <p className="text-xs text-gray-500">100% Compostable</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Graphics Columns with Generated Premium Food Image */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background glowing frame decoration */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-emerald-100 to-orange-100 rounded-full filter blur-2xl opacity-40 scale-95" />

            {/* Primary Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full border-8 border-white shadow-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={BASE_HERO_BOWL_IMG} 
                alt="Beautiful Healthy Bowl loaded with fresh avocado and quinoa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Glass Flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            </motion.div>

            {/* Interactive Float Badges 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute top-8 -right-4 sm:-right-8 bg-white border border-emerald-50 px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3 pointer-events-none"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                4.9
              </div>
              <div className="text-left">
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                </div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">Customer Favorite</p>
                <p className="text-[9px] text-gray-500 font-mono leading-none">2,500+ Local Reviews</p>
              </div>
            </motion.div>

            {/* Interactive Float Badges 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-8 -left-4 sm:-left-8 bg-white border border-orange-50 px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3 pointer-events-none"
            >
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Utensils className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-gray-900 leading-tight">Fresh on Wheels</h5>
                <p className="text-[10px] text-emerald-600 font-semibold leading-none">Saves Time • Nourishes Well</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
