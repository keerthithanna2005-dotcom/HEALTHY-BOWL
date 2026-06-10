import { Heart, Users, Compass, Smile, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BASE_FOOD_TRUCK_IMG } from '../data';

interface AboutUsProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutUs({ onNavigate }: AboutUsProps) {
  const values = [
    {
      icon: Heart,
      title: 'Our Clean Mission',
      description: 'To dismantle the myth that fast or convenient street food has to be highly processed, heavy, or nutrient-dead.',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We partner with local organic farms and seed-coops, keeping local agriculture thriving while feeding our neighborhood.',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: Compass,
      title: 'Active Mobility',
      description: 'Taking the absolute finest grade culinary fuel exactly where active commuters, busy parents, and healthcare staff need it most.',
      color: 'bg-teal-50 text-teal-600',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            Our Journey & Vibe
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Crafting Wholesome Change, One Bowl at a Time
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base sm:text-lg leading-relaxed">
            Founded with a passion for vibrant flavors and sustained daily focus, we became the neighborhood’s favorite green-shutter mobile kitchen.
          </p>
        </div>

        {/* Brand Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Brand Story Column of Left */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-semibold text-orange-600 uppercase font-mono flex items-center space-x-1.5 justify-center lg:justify-start">
                <Sparkles className="h-4 w-4" />
                <span>Established in 2021</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center lg:text-left">
                Redefining Street Dining Since Day One
              </h3>
              <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                Healthy Bowl Food Truck started when our founder, a fitness nutritionist and passionate street food gourmet, got tired of eating nutrient-poor sandwiches and greasy fries during busy workdays. She envisioned a high-contrast vintage truck serving up crisp, colorful bowl presets made to power you up without slowing you down.
              </p>
              <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                Every single morning, our team meets at our kitchen cooperative, washing organic field greens, simmering seasoned black forbidden rice, grilling hand-marinated lemon chicken, and mixing small-batch vinaigrettes. We don’t own a freezer, and we don’t use artificial preservatives.
              </p>
            </div>

            {/* Microstats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center lg:text-left pt-2">
              <div className="border-l-4 border-emerald-500 pl-3">
                <div className="text-2xl font-black text-gray-900 leading-none">5+ Years</div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1 font-semibold">On the Road</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-3">
                <div className="text-2xl font-black text-gray-900 leading-none">100k+</div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1 font-semibold">Bowls Served</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-3 col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-gray-900 leading-none">100%</div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1 font-semibold">Compostable Packaging</div>
              </div>
            </div>

            {/* Call to action button */}
            <div className="flex justify-center lg:justify-start pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-50 cursor-pointer text-sm"
              >
                <span>Read More & Book Co-Events</span>
              </button>
            </div>
          </div>

          {/* Graphic Food Truck Representation Right */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

            <div className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-3 group">
              <div className="aspect-4/3 rounded-xl overflow-hidden relative">
                <img 
                  src={BASE_FOOD_TRUCK_IMG} 
                  alt="Healthy Bowl Food Truck parked under trees serving wholesome meals" 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass overlays info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">The Green Mobile</span>
                    <h4 className="text-white text-lg font-bold leading-tight mt-0.5">Custom Built Eco-Truck</h4>
                  </div>
                </div>
              </div>

              {/* Floating badges on image container */}
              <div className="absolute -top-4 -right-4 bg-emerald-600 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-lg border border-emerald-500 uppercase tracking-widest flex items-center space-x-1.5 animate-bounce">
                <Smile className="h-4 w-4" />
                <span>Happy Diners Only!</span>
              </div>
            </div>

          </div>

        </div>

        {/* Brand Values Cards List */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50/50 hover:bg-white border hover:border-emerald-100 transition-all duration-300 hover:shadow-xl group"
            >
              <div className={`p-3 rounded-xl w-fit ${v.color} group-hover:scale-110 transition-transform duration-300`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-extrabold text-gray-900 mt-5 tracking-tight">{v.title}</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
