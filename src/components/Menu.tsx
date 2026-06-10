import { useState } from 'react';
import { Leaf, Info, Sparkles, Plus, Minus, Check, ArrowRight, ShieldCheck, Dumbbell, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BowlPreset, CartItem, CustomBowl } from '../types';
import { PRESET_BOWLS, CUSTOM_BUILD_OPTIONS } from '../data';

interface MenuProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<'presets' | 'custom'>('presets');
  const [hoveredMacroId, setHoveredMacroId] = useState<string | null>(null);

  // Custom Bowl Builder Active State
  const [customBase, setCustomBase] = useState(CUSTOM_BUILD_OPTIONS.bases[0]);
  const [customProtein, setCustomProtein] = useState(CUSTOM_BUILD_OPTIONS.proteins[0]);
  const [customVeggies, setCustomVeggies] = useState<typeof CUSTOM_BUILD_OPTIONS.veggies>([]);
  const [customDressing, setCustomDressing] = useState(CUSTOM_BUILD_OPTIONS.dressings[0]);
  const [customToppings, setCustomToppings] = useState<typeof CUSTOM_BUILD_OPTIONS.toppings>([]);
  const [customNotes, setCustomNotes] = useState('');
  const [showBuilderSuccess, setShowBuilderSuccess] = useState(false);

  // Preset Bowl Quantities State
  const [presetQuantities, setPresetQuantities] = useState<Record<string, number>>({
    'protein-power': 1,
    'mediterranean': 1,
    'vegan-green': 1,
    'teriyaki-chicken': 1,
    'southwest': 1,
  });

  const handleAdjustQuantity = (id: string, delta: number) => {
    setPresetQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // Toggle Veggie selection in Builder
  const handleToggleVeggie = (veggie: typeof CUSTOM_BUILD_OPTIONS.veggies[0]) => {
    if (customVeggies.some(v => v.name === veggie.name)) {
      setCustomVeggies(prev => prev.filter(v => v.name !== veggie.name));
    } else {
      setCustomVeggies(prev => [...prev, veggie]);
    }
  };

  // Toggle Topping selection in Builder
  const handleToggleTopping = (topping: typeof CUSTOM_BUILD_OPTIONS.toppings[0]) => {
    if (customToppings.some(t => t.name === topping.name)) {
      setCustomToppings(prev => prev.filter(t => t.name !== topping.name));
    } else {
      setCustomToppings(prev => [...prev, topping]);
    }
  };

  // Custom Bowl Price Calculation
  const baselineCustomPrice = 7.50;
  const customTotalPrice = 
    baselineCustomPrice +
    customBase.price +
    customProtein.price +
    customVeggies.reduce((sum, v) => sum + v.price, 0) +
    customDressing.price +
    customToppings.reduce((sum, t) => sum + t.price, 0);

  // Custom Bowl Nutrition Calculation
  const customTotalNutrition = {
    calories: 
      customBase.calories +
      customProtein.calories +
      customVeggies.reduce((sum, v) => sum + v.calories, 0) +
      customDressing.calories +
      customToppings.reduce((sum, t) => sum + t.calories, 0),
    protein: 
      customBase.protein +
      customProtein.protein +
      customVeggies.reduce((sum, v) => sum + v.protein, 0) +
      customDressing.protein +
      customToppings.reduce((sum, t) => sum + t.protein, 0),
    carbs: 
      customBase.carbs +
      customProtein.carbs +
      customVeggies.reduce((sum, v) => sum + v.carbs, 0) +
      customDressing.carbs +
      customToppings.reduce((sum, t) => sum + t.carbs, 0),
    fat: 
      customBase.fat +
      customProtein.fat +
      customVeggies.reduce((sum, v) => sum + v.fat, 0) +
      customDressing.fat +
      customToppings.reduce((sum, t) => sum + t.fat, 0),
  };

  // Submit Preset Bowl to Cart
  const handleAddPresetToCart = (preset: BowlPreset) => {
    const qty = presetQuantities[preset.id] || 1;
    onAddToCart({
      id: preset.id,
      name: preset.name,
      price: preset.price,
      isCustom: false,
      image: preset.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=82',
    });
    // Temporary confirmation visual trigger is done nicely inside Cart drawer, but lets alert high visual feedback.
  };

  // Add Custom Bowl to Cart
  const handleAddCustomToCart = () => {
    const customId = `custom-bowl-${Date.now()}`;
    const customBowlObject: CustomBowl = {
      base: customBase.name,
      protein: customProtein.name,
      veggies: customVeggies.map(v => v.name),
      dressing: customDressing.name,
      toppings: customToppings.map(t => t.name),
      price: customTotalPrice,
      nutrition: customTotalNutrition,
    };

    onAddToCart({
      id: customId,
      name: 'Custom Superfood Nourish-Bowl',
      price: customTotalPrice,
      isCustom: true,
      customDetails: customBowlObject,
      notes: customNotes,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=82'
    });

    // Success feedback and reset
    setShowBuilderSuccess(true);
    setTimeout(() => {
      setShowBuilderSuccess(false);
      // Reset selections to default
      setCustomVeggies([]);
      setCustomToppings([]);
      setCustomNotes('');
    }, 3500);
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-white relative">
      
      {/* Absolute Decorative Greens */}
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-emerald-50/55 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
            <span>Premium Fresh Menu</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Nourishing Fuel Crafted with Love
          </h2>
          <p className="text-gray-500 font-medium mt-3 text-base leading-relaxed">
            Choose from our award-winning signature bowls assembled by experts, or jump into our interactive custom builder to engineer your perfect meal.
          </p>

          {/* Toggle buttons between Presets and Builder */}
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl mt-10 shadow-inner border border-slate-200/50">
            <button
              onClick={() => setSelectedCategory('presets')}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                selectedCategory === 'presets'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-800/10'
                  : 'text-gray-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <span>Our Chef Specialties</span>
            </button>
            <button
              onClick={() => setSelectedCategory('custom')}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                selectedCategory === 'custom'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-800/10'
                  : 'text-gray-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span>Interactive Bowl Builder</span>
            </button>
          </div>
        </div>

        {/* Categories rendering */}
        <AnimatePresence mode="wait">
          {selectedCategory === 'presets' ? (
            
            /* Presets Grid Panel */
            <motion.div
              key="presets"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {PRESET_BOWLS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white border border-slate-100 hover:border-emerald-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  
                  {/* Top Image with Badge */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={preset.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=82'} 
                      alt={preset.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow Shield Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge */}
                    {preset.tag && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-emerald-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                        <span>{preset.tag}</span>
                      </span>
                    )}

                    {/* Price bottom overlay badge */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm shadow border border-slate-800 text-white font-extrabold px-3 py-1.5 rounded-xl text-base">
                      ${preset.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-200">
                        {preset.name}
                      </h3>
                      
                      <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-2">
                        {preset.description}
                      </p>

                      {/* Ingredients section */}
                      <div className="mt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                          What is Inside:
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {preset.ingredients.map((ing, k) => (
                            <span 
                              key={k} 
                              className="text-[10px] font-medium text-gray-600 bg-emerald-50/50 px-2 py-0.5 rounded-md hover:bg-emerald-100/50 transition-colors"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nutrition Metric stats + Adding Action line */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      
                      {/* Interactive Nutrition Pill */}
                      <div 
                        className="relative bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center"
                        onMouseEnter={() => setHoveredMacroId(preset.id)}
                        onMouseLeave={() => setHoveredMacroId(null)}
                      >
                        <div className="flex space-x-3 text-center">
                          <div>
                            <span className="block text-[9px] uppercase font-mono tracking-wider font-bold text-gray-400">Calories</span>
                            <span className="text-xs font-extrabold text-gray-800 flex items-center justify-center space-x-0.5">
                              <Flame className="h-3 w-3 text-orange-500 fill-orange-50" />
                              <span>{preset.nutrition.calories} kcal</span>
                            </span>
                          </div>
                          <div className="border-r border-slate-200 h-6 self-center" />
                          <div>
                            <span className="block text-[9px] uppercase font-mono tracking-wider font-bold text-gray-400">Protein</span>
                            <span className="text-xs font-extrabold text-emerald-700 flex items-center justify-center space-x-0.5">
                              <Dumbbell className="h-3 w-3 text-emerald-500" />
                              <span>{preset.nutrition.protein}g</span>
                            </span>
                          </div>
                        </div>

                        {/* Expand micro summary on hover info block */}
                        <div className="text-[10px] text-gray-500 flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border shadow-sm cursor-help">
                          <Info className="h-3.5 w-3.5 text-slate-400" />
                          <span className="font-semibold font-mono">Macros</span>
                        </div>

                        {/* Floating macros absolute tooltip panel */}
                        <AnimatePresence>
                          {hoveredMacroId === preset.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute z-10 bottom-full mb-2 left-0 right-0 bg-slate-950 p-3.5 rounded-xl text-white text-xs shadow-xl space-y-2"
                            >
                              <p className="font-bold border-b border-slate-800 pb-1 flex items-center justify-between text-emerald-400">
                                <span>Complete Nutrition Breakdown</span>
                                <ShieldCheck className="h-3.5 w-3.5" />
                              </p>
                              <div className="grid grid-cols-4 gap-2 font-mono text-center">
                                <div>
                                  <span className="block text-[9px] text-gray-400">Energy</span>
                                  <span className="font-bold text-xs text-white">{preset.nutrition.calories}k</span>
                                </div>
                                <div>
                                  <span className="block text-[9px] text-gray-400">Protein</span>
                                  <span className="font-bold text-xs text-green-400">{preset.nutrition.protein}g</span>
                                </div>
                                <div>
                                  <span className="block text-[9px] text-gray-400">Carbs</span>
                                  <span className="font-bold text-xs text-orange-400">{preset.nutrition.carbs}g</span>
                                </div>
                                <div>
                                  <span className="block text-[9px] text-gray-400">Fats</span>
                                  <span className="font-bold text-xs text-amber-300">{preset.nutrition.fat}g</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                      {/* Visual Order controls */}
                      <div className="flex items-center space-x-3 mt-4">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-100">
                          <button
                            onClick={() => handleAdjustQuantity(preset.id, -1)}
                            className="px-2.5 py-1.5 hover:bg-slate-200 text-gray-600 rounded-l-xl transition-all font-bold cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3.5 text-xs font-black text-gray-800 font-mono w-6 text-center">
                            {presetQuantities[preset.id] || 1}
                          </span>
                          <button
                            onClick={() => handleAdjustQuantity(preset.id, 1)}
                            className="px-2.5 py-1.5 hover:bg-slate-200 text-gray-600 rounded-r-xl transition-all font-bold cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            const qty = presetQuantities[preset.id] || 1;
                            for (let i = 0; i < qty; i++) {
                              handleAddPresetToCart(preset);
                            }
                          }}
                          className="flex-grow inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-50 border border-transparent cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add {(presetQuantities[preset.id] || 1) > 1 && `${presetQuantities[preset.id]}x`} to Cart</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              ))}

              {/* Build Your Own Invitation Bowl Card in preset deck */}
              <div
                className="bg-emerald-950 rounded-2xl flex flex-col justify-between p-8 text-white relative shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-emerald-900"
              >
                {/* Decorative background visual grids */}
                <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-emerald-900/60 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800 inline-block">
                    Full Sovereignty
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mt-1">
                    Design Your Ideal Bowl
                  </h3>
                  <p className="text-emerald-200/90 text-xs leading-relaxed font-medium">
                    Strict dietary plan? Specific high-protein macros? Multiple allergy constraints? Build a superfood bowl tailored completely to your exact parameters. Selected grains, customizable clean protein options, and endless salad toppings.
                  </p>
                </div>

                <div className="mt-8 space-y-4 pt-5 border-t border-emerald-900">
                  <div className="flex justify-between items-center text-xs font-mono text-emerald-300 font-bold">
                    <span>Base prices starting at</span>
                    <span className="text-white text-base font-black">$7.50</span>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('custom')}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-4 rounded-xl bg-white text-emerald-950 font-extrabold hover:bg-orange-50 transition-all cursor-pointer text-sm shadow"
                  >
                    <span>Launch Studio Builder</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          ) : (
            
            /* INTERACTIVE CUSTOM BOWL BUILDER PANEL */
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 md:p-12 shadow-inner"
            >
              <div className="grid lg:grid-cols-12 gap-10">
                
                {/* Visual Options Selection Column (Left: 7 cols) */}
                <div className="lg:col-span-7 space-y-8 max-h-[80vh] overflow-y-auto pr-2">
                  
                  {/* Step 1: Base */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold leading-none bg-emerald-50 px-2.5 py-1 rounded-md">
                      Step 1 • Choose Grains & Greens Base
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mt-1">
                      Pick your baseline foundation (choose 1)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {CUSTOM_BUILD_OPTIONS.bases.map((base) => {
                        const isSelected = customBase.name === base.name;
                        return (
                          <button
                            key={base.name}
                            onClick={() => setCustomBase(base)}
                            className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white text-gray-700 hover:border-emerald-300 border-gray-100'
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-bold leading-tight">{base.name}</span>
                              <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {base.calories} kcal • {base.protein}g P
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold">
                              {base.price > 0 ? `+$${base.price.toFixed(2)}` : 'Free'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Protein */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-orange-600 font-bold leading-none bg-orange-50 px-2.5 py-1 rounded-md">
                      Step 2 • Choose Wholesome Protein Source
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mt-1">
                      Pick your clean healthy macronutrient (choose 1)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {CUSTOM_BUILD_OPTIONS.proteins.map((p) => {
                        const isSelected = customProtein.name === p.name;
                        return (
                          <button
                            key={p.name}
                            onClick={() => setCustomProtein(p)}
                            className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white text-gray-700 hover:border-emerald-300 border-gray-100'
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-bold leading-tight">{p.name}</span>
                              <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {p.calories} kcal • {p.protein}g P
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold">
                              +${p.price.toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Veggies */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-teal-600 font-bold leading-none bg-teal-50 px-2.5 py-1 rounded-md font-mono">
                      Step 3 • Fold In Fresh Crispy Veggies
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mt-1">
                      Select as many organic toppings as your heart desires (Multi-select)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {CUSTOM_BUILD_OPTIONS.veggies.map((v) => {
                        const isSelected = customVeggies.some(veg => veg.name === v.name);
                        return (
                          <button
                            key={v.name}
                            onClick={() => handleToggleVeggie(v)}
                            className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-400 font-semibold'
                                : 'bg-white text-gray-700 hover:border-emerald-200 border-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 bg-white'
                              }`}>
                                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                <span className="block text-sm leading-tight">{v.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {v.calories} kcal • {v.protein}g P
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-700">
                              +${v.price.toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Dressing */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold leading-none bg-emerald-50 px-2.5 py-1 rounded-md">
                      Step 4 • Select Dressing Drizzle
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mt-1">
                      Choose small-batch handcrafted drizzles (choose 1)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {CUSTOM_BUILD_OPTIONS.dressings.map((d) => {
                        const isSelected = customDressing.name === d.name;
                        return (
                          <button
                            key={d.name}
                            onClick={() => setCustomDressing(d)}
                            className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white text-gray-700 hover:border-emerald-300 border-gray-100'
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-bold leading-tight">{d.name}</span>
                              <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {d.calories} kcal • {d.protein}g P
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold">
                              {d.price > 0 ? `+$${d.price.toFixed(2)}` : 'Free'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 5: Premium Toppings */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-600 font-bold leading-none bg-amber-50 px-2.5 py-1 rounded-md font-mono">
                      Step 5 • Premium Crunch Accents
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mt-1">
                      Add a pinch of crunch or texture layers (Multi-select)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {CUSTOM_BUILD_OPTIONS.toppings.map((t) => {
                        const isSelected = customToppings.some(top => top.name === t.name);
                        return (
                          <button
                            key={t.name}
                            onClick={() => handleToggleTopping(t)}
                            className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-400 font-semibold'
                                : 'bg-white text-gray-700 hover:border-emerald-200 border-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 bg-white'
                              }`}>
                                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                <span className="block text-sm leading-tight">{t.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {t.calories} kcal
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-emerald-700 font-bold">
                              +${t.price.toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 6: Special Instructions */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-2">
                      Special kitchen cooking note
                    </label>
                    <textarea
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="e.g. Please put dressing on the side. No cucumber. Allergies info here..."
                      className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[4rem]"
                    />
                  </div>

                </div>

                {/* Checkout Summary Box Sticky-ish Column (Right: 5 cols) */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl border border-emerald-100/60 p-6 sm:p-8 shadow-md sticky top-28 space-y-6">
                    <h4 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                      <span>Composite Super-Bowl</span>
                      <span className="text-emerald-600 text-xl font-mono">${customTotalPrice.toFixed(2)}</span>
                    </h4>

                    {/* Active Selections Checklist */}
                    <div className="space-y-3.5 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-gray-400 uppercase tracking-wider text-[9px] mt-0.5">Base:</span>
                        <span className="text-gray-800 font-bold text-right pl-4">{customBase.name}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-gray-400 uppercase tracking-wider text-[9px] mt-0.5">Protein:</span>
                        <span className="text-gray-800 font-bold text-right pl-4">{customProtein.name}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-gray-400 uppercase tracking-wider text-[9px] mt-0.5">Salad Veg:</span>
                        <span className="text-gray-800 font-semibold text-right pl-4">
                          {customVeggies.length > 0 
                            ? customVeggies.map(v => v.name).join(', ') 
                            : <span className="text-gray-400 font-light italic">None selected</span>
                          }
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-gray-400 uppercase tracking-wider text-[9px] mt-0.5">Drip Dressing:</span>
                        <span className="text-gray-800 font-bold text-right pl-4">{customDressing.name}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-gray-400 uppercase tracking-wider text-[9px] mt-0.5">Top Accent:</span>
                        <span className="text-gray-800 font-semibold text-right pl-4">
                          {customToppings.length > 0 
                            ? customToppings.map(t => t.name).join(', ') 
                            : <span className="text-gray-400 font-light italic">None selected</span>
                          }
                        </span>
                      </div>
                    </div>

                    {/* Macro calculated matrix */}
                    <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 font-mono flex items-center space-x-1.5">
                        <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-100" />
                        <span>Aggregated Macro Predictions</span>
                      </h5>
                      
                      <div className="grid grid-cols-4 gap-2 font-mono text-center">
                        <div>
                          <span className="block text-[8px] text-emerald-700 font-bold uppercase">Calories</span>
                          <span className="text-xs font-black text-slate-800 block mt-0.5">{customTotalNutrition.calories} kcal</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-emerald-700 font-bold uppercase">Protein</span>
                          <span className="text-xs font-black text-emerald-700 block mt-0.5">{customTotalNutrition.protein}g</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-emerald-700 font-bold uppercase">Carbs</span>
                          <span className="text-xs font-black text-orange-700 block mt-0.5">{customTotalNutrition.carbs}g</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-emerald-700 font-bold uppercase">Fats</span>
                          <span className="text-xs font-black text-amber-700 block mt-0.5">{customTotalNutrition.fat}g</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={handleAddCustomToCart}
                      disabled={showBuilderSuccess}
                      className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-white font-bold transition-all shadow cursor-pointer text-sm uppercase tracking-wide ${
                        showBuilderSuccess 
                          ? 'bg-emerald-700' 
                          : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      {showBuilderSuccess ? (
                        <>
                          <Check className="h-5 w-5 animate-pulse text-amber-300 stroke-[5]" />
                          <span>Custom Bowl Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Add Custom Bowl To Order</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-center text-gray-400 font-medium">
                      Nutrition calculators values are approximations based on USDA guidelines.
                    </p>

                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
