import { Truck, Briefcase, Sparkles, Heart, Music, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const list = [
    {
      title: 'Food Truck Street Service',
      description: 'Find us at major business plazas, transit hubs, and waterfront corridors during our daily transit schedule. Expect swift, conscious service.',
      perks: ['Zero-friction smartphone pick-ups', 'Weekly rotating gourmet specials', 'Frequent student/healthcare discounts'],
      icon: Truck,
      color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
      badge: 'Daily schedules'
    },
    {
      title: 'Corporate Catering Office Hubs',
      description: 'Satisfy employees, spark meeting focus, and host healthy lunches. We can park our majestic truck on-site or deliver beautifully arranged meal crates.',
      perks: ['Tax-deductible customized billing', 'Group scale dietary options', 'Pre-sorted multi-box packages'],
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white',
      badge: 'Popular selection'
    },
    {
      title: 'Private Events & Birthdays',
      description: 'Wow your family and companions with high-vibe nutrition. Perfect for summer parties, backyard gatherings, and outdoor milestone events.',
      perks: ['Includes personalized custom chalk-menu', 'Fast individual guest custom order assembly', 'No kitchen cleanups required'],
      icon: Sparkles,
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white',
      badge: 'Highly memorable'
    },
    {
      title: 'Weddings & Celebrations',
      description: 'Bring clean elegance and interactive dining to your big day. Let guests build their favorite nutritious bowls as a refreshing meal alternative.',
      perks: ['Full rustic food truck table styling', 'Exclusive premium ingredients (Salmon, Truffle drizzle)', 'Friendly master-chefs of the truck'],
      icon: Heart,
      color: 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white',
      badge: 'Truly romantic'
    },
    {
      title: 'Festivals & Community Carnivals',
      description: 'Proven high-throughput service for high-volume crowds. Keeping crowd vibes nourished, clean, and happy through multi-hour concerts.',
      perks: ['Handles high-volume lines with ease', 'Flexible menu items for speedy handoffs', 'Fully licensed & insured nationwide'],
      icon: Music,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white',
      badge: 'High volume'
    },
    {
      title: 'Modular Subscription Meal Prep',
      description: 'Enjoy chef-driven wellness fuel during packed weeks. Choose pre-portioned single-bowl selections to store neatly in your residential kitchen.',
      perks: ['Microwave-safe compostable containers', 'Extended freshness (lasts up to 5 days cold)', 'Nutritional metrics listed per lid'],
      icon: Package,
      color: 'bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white',
      badge: 'Healthy living'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-100/60 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Wholesome Food Solutions for Every Scene
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base sm:text-lg leading-relaxed">
            Whether you want a quick warm lunch during your office rush or full-scale eco-catering for your wedding ceremony, we make clean eating unforgettable.
          </p>
        </div>

        {/* Services interactive cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div>
                
                {/* Float Badge */}
                <span className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-wider font-extrabold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md">
                  {s.badge}
                </span>

                {/* Service Icon inside themed round container */}
                <div className={`p-4 rounded-xl w-fit ${s.color} transition-all duration-300 mt-1 mb-6 shadow-sm`}>
                  <s.icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-200">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {s.description}
                </p>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2.5 border-t border-slate-50 pt-5">
                  {s.perks.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2 text-xs font-medium text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Service Footer Clickable Redirect Action */}
              <div className="mt-8 pt-4 border-t border-slate-50">
                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-600 transition-all cursor-pointer"
                >
                  <span>Inquire service date</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Highlight Banner / Teaser under services */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white relative shadow-xl overflow-hidden flex flex-col md:flex-row justify-between items-center z-10">
          
          {/* Subtle Abstract Background Circles */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_40%)]" />
          
          <div className="space-y-3 text-center md:text-left md:max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-200 font-bold bg-emerald-800/60 px-3 py-1 rounded-full">
              Corporate special deal
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Feed larger teams, streamline focus
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed font-medium">
              Join active partnerships with firms in downtown business parks. We coordinate single-ticket cater schedules or bulk boxes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('booking')}
            className="mt-6 md:mt-0 flex-shrink-0 inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-white hover:bg-orange-50 text-slate-900 font-bold transition-all shadow-md cursor-pointer text-sm"
          >
            <span>Book A Corporate Luncheon</span>
            <ArrowRight className="h-4 w-4 text-slate-800" />
          </button>
        </div>

      </div>
    </section>
  );
}
