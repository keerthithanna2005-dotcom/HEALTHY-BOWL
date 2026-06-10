import { Leaf, Sliders, Zap, ShieldAlert, Award, Smile, Recycle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Leaf,
      title: 'Fresh Daily Ingredients',
      description: 'We do not own freezers or microwave cookers on our truck. All vegetables and greens are sliced fresh every morning at 5:00 AM.',
      metric: 'Zero Freezers',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      icon: Sliders,
      title: 'Customizable Nutrition',
      description: 'Use our customized interactive order portal to fit specific health rules, caloric goals, macro margins, and allergies without friction.',
      metric: '100% Tailored',
      color: 'text-sky-600 bg-sky-50 border-sky-100'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Services',
      description: 'On-the-go schedules require punctuality. Our optimized mobile counter yields precise, fresh lunch handoffs in under 90 seconds.',
      metric: '< 90s Handoff',
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      icon: Recycle,
      title: 'Eco-Friendly Packaging',
      description: 'We love a healthy planet. Every fork, bowl, and vinaigrette lid is made from renewable cornstarch or post-consumer compostable bamboo.',
      metric: '100% Biodegradable',
      color: 'text-teal-600 bg-teal-50 border-teal-100'
    },
    {
      icon: Award,
      title: 'Certified Experience',
      description: 'Our lead food curators hold degrees in nutrition and decades of combined operations in high-end city catering hospitality.',
      metric: 'Expert Curators',
      color: 'text-rose-600 bg-rose-50 border-rose-100'
    },
    {
      icon: Smile,
      title: 'High Vibe Customer Happiness',
      description: 'Whether we park in corporate towers or on wedding lawns, we treat every single visitor like a valued family friend.',
      metric: '99.8% Satisfaction',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    }
  ];

  const stats = [
    { val: '4.9★', label: 'Applet Rating' },
    { val: '100%', label: 'Organic Greens Base' },
    { val: '20k+', label: 'Happy Local Diners' },
    { val: '#1', label: 'Eater Specialty Truck' }
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      
      {/* Background Graphic Blurs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full">
            Why Choose Our Bowls
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Fast Food Can Actually Be Real, Honest Food
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-base sm:text-lg leading-relaxed">
            We operate at the intersect of clean organic macros, street cuisine convenience, and pristine sustainable environmental citizenship.
          </p>
        </div>

        {/* Core Stats Row Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative border border-emerald-950">
          
          {/* Subtle line background details */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1 relative z-10">
              <span className="block text-3xl sm:text-4xl xl:text-5xl font-black text-amber-300 tracking-tight">
                {s.val}
              </span>
              <span className="block text-xs uppercase tracking-wider font-mono text-emerald-100 font-bold">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-50 hover:bg-white hover:border-emerald-100/80 transition-all duration-300 flex flex-col justify-between hover:shadow-xl group"
            >
              <div>
                {/* Header row containing icon and tag */}
                <div className="flex justify-between items-center mb-6">
                  <div className={`p-3 rounded-lg border ${p.color} transition-transform duration-300 group-hover:scale-110`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white text-gray-500 px-2.5 py-1 rounded-md border border-gray-100 shadow-sm uppercase tracking-wider">
                    {p.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-medium">
                  {p.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
