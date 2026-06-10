import { useState } from 'react';
import { Menu as MenuIcon, X, ShoppingCart, Calendar, PhoneCall, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ cart, onOpenCart, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', id: 'menu' },
    { label: 'Our Story', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Track Truck', id: 'location' },
    { label: 'Why Us', id: 'why-choose-us' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
  ];

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick('hero')}>
            <div className="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center mr-3 shadow-md shadow-emerald-100 border border-emerald-400">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight block leading-tight">
                Healthy <span className="text-emerald-600">Bowl</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 block font-bold leading-none">
                Food Truck Co.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Groups */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Nav Right CTA Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Find Truck Hotline */}
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 border-r border-gray-100 pr-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-gray-600">Track: Live Today</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all cursor-pointer border border-transparent hover:border-emerald-100"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Main Action Catering Button */}
            <button
              onClick={() => handleLinkClick('booking')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-100 hover:shadow-lg hover:shadow-emerald-200 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Catering</span>
            </button>
          </div>

          {/* Mobile Right Icons Group */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all cursor-pointer"
              aria-label="View shopping cart on mobile"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartTotalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-emerald-50 bg-white shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="grid grid-cols-2 gap-2 pb-4 border-b border-gray-100">
                <button
                  onClick={() => handleLinkClick('booking')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Catering</span>
                </button>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all border border-emerald-100"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Contact Us</span>
                </button>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full text-left block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2 text-xs text-center text-gray-500 font-medium">
                <div className="flex items-center justify-center space-x-1.5">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>Sonne Medical Plaza today until 7:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
