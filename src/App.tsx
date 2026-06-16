import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ShoppingBag, Leaf, HelpCircle, Utensils } from 'lucide-react';

// Import Types
import { CartItem, CateringBooking, ContactMessage } from './types';

// Import Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';

import Services from './components/Services';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import LocationTracker from './components/LocationTracker';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CateringBookingForm from './components/CateringBooking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Import Firebase connection utilities & services
import { db, OperationType, handleFirestoreError } from './firebase';
import { collection, getDocs, setDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';

// Baseline seeded bookings for demonstration
const INITIAL_BOOKINGS: CateringBooking[] = [
  {
    id: 'booking-seed-1',
    name: 'Apex Media Corp (Eleanor Vance)',
    email: 'hr@apexmedia.com',
    phone: '(555) 0142-992',
    eventDate: '2026-06-18',
    guestCount: 120,
    location: '101 Innovation Blvd, silicon Valley Plaza',
    eventType: 'Corporate Event',
    notes: 'Please double-check vegetarian counts. Requesting custom chalk layout menu display.',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'booking-seed-2',
    name: 'Emma & David Wedding Lunch',
    email: 'emma.david@weddingbells.org',
    phone: '(555) 0192-384',
    eventDate: '2026-06-27',
    guestCount: 85,
    location: 'Waterfront Conservatory marina pier 4',
    eventType: 'Weddings & Celebrations',
    notes: 'Require gluten-free premium organic bases only (Quinoa and Emperor Forbidden rice).',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('hb_cart_data');
    return local ? JSON.parse(local) : [];
  });

  const [bookings, setBookings] = useState<CateringBooking[]>(() => {
    const local = localStorage.getItem('hb_bookings_data');
    return local ? JSON.parse(local) : INITIAL_BOOKINGS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  // Sync state to local storage on changes
  useEffect(() => {
    localStorage.setItem('hb_cart_data', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hb_bookings_data', JSON.stringify(bookings));
  }, [bookings]);

  // Firestore Synchronous Loading phase
  useEffect(() => {
    async function loadFirebaseData() {
      try {
        const bookingsCol = collection(db, 'bookings');
        const q = query(bookingsCol, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fbBookings: CateringBooking[] = [];
        querySnapshot.forEach((docSnap) => {
          fbBookings.push({
            id: docSnap.id,
            ...docSnap.data()
          } as CateringBooking);
        });

        if (fbBookings.length > 0) {
          setBookings(fbBookings);
        } else {
          // Empty remote database - seed the REMOTE Firestore database for demonstration consistency
          for (const seed of INITIAL_BOOKINGS) {
            await setDoc(doc(db, 'bookings', seed.id), seed);
          }
          setBookings(INITIAL_BOOKINGS);
        }
      } catch (err) {
        console.warn('Could not load bookings from Firebase live database. Keeping default seeded list...', err);
        // Fallback is pre-loaded on state initializers
      }
    }
    loadFirebaseData();
  }, []);

  // Loading Screen simulation to represent premium craft experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll navigator
  const handleScrollNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Cart Add item merger
  const handleAddToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      // Find if item already exists in cart with same details / adjustments
      const matchIdx = prev.findIndex(item => {
        if (item.id === newItem.id) return true;
        // Check if custom specifications are matching exactly
        if (item.isCustom && newItem.isCustom && item.customDetails && newItem.customDetails) {
          const c1 = item.customDetails;
          const c2 = newItem.customDetails;
          return (
            c1.base === c2.base &&
            c1.protein === c2.protein &&
            c1.dressing === c2.dressing &&
            JSON.stringify(c1.veggies.sort()) === JSON.stringify(c2.veggies.sort()) &&
            JSON.stringify(c1.toppings.sort()) === JSON.stringify(c2.toppings.sort())
          );
        }
        return false;
      });

      if (matchIdx > -1) {
        const copy = [...prev];
        copy[matchIdx].quantity += 1;
        return copy;
      }

      return [...prev, { ...newItem, quantity: 1 }];
    });
    
    // Automatically slide-open cart drawer to give direct checkout pathway
    setIsCartOpen(true);
  };

  // Cart update quantities
  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  // Cart delete item row
  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart queue
  const handleClearCart = () => {
    setCart([]);
  };

  // Bookings custom submission push
  const handleSubmitBooking = async (newInput: Omit<CateringBooking, 'id' | 'status' | 'createdAt'>) => {
    const customId = `booking-custom-${Date.now()}`;
    const bObject: CateringBooking = {
      ...newInput,
      id: customId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Update state client-side
    setBookings(prev => [bObject, ...prev]);

    // Save to Firestore with robust safety handling
    try {
      await setDoc(doc(db, 'bookings', customId), bObject);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `bookings/${customId}`);
    }
  };

  // Delete booking row inside client lead monitor
  const handleDeleteBooking = async (id: string) => {
    // Update state client-side
    setBookings(prev => prev.filter(b => b.id !== id));

    // Delete from Firestore live collection
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${id}`);
    }
  };

  // Contact support generic line submission
  const handleSendMessage = async (newMsg: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const customId = `msg-${Date.now()}`;
    const msgObj: ContactMessage = {
      ...newMsg,
      id: customId,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [msgObj, ...prev]);

    // Save to Firestore live messages collection
    try {
      await setDoc(doc(db, 'messages', customId), msgObj);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `messages/${customId}`);
    }
  };

  // Order submission
  const handlePlaceOrder = async (orderDetails: { items: CartItem[]; total: number; pickupName: string; pickupTime: string }) => {
    console.log('Simulated Local Order Dispatched: ', orderDetails);
    
    const customId = `order-ticket-${Date.now()}`;
    const orderDocData = {
      id: customId,
      pickupName: orderDetails.pickupName,
      pickupTime: orderDetails.pickupTime,
      total: orderDetails.total,
      items: orderDetails.items.map(it => ({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        isCustom: it.isCustom,
        notes: it.notes || '',
        customDetails: it.customDetails ? {
          base: it.customDetails.base || '',
          protein: it.customDetails.protein || '',
          veggies: it.customDetails.veggies || [],
          dressing: it.customDetails.dressing || '',
          toppings: it.customDetails.toppings || [],
          price: it.customDetails.price || 0,
          nutrition: it.customDetails.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 }
        } : null
      })),
      createdAt: new Date().toISOString()
    };

    // Save to Firestore live orders collection
    try {
      await setDoc(doc(db, 'orders', customId), orderDocData);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${customId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      {/* 1. App Startup Loading screen */}
      <AnimatePresence>
        {appLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-center items-center text-white"
          >
            <div className="space-y-6 text-center">
              <div className="relative flex h-16 w-16 mx-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                <div className="relative h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Leaf className="h-8 w-8 text-white animate-bounce" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-widest font-mono">Health On Wheels</h1>
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Washing Organic Greens Daily...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive App Elements */}
      {!appLoading && (
        <>
          {/* Sticky Header Navbar */}
          <Navbar
            cart={cart}
            onOpenCart={() => setIsCartOpen(true)}
            onNavigate={handleScrollNavigate}
          />

          {/* Web sections sequential mounting */}
          <main>
            <Hero onNavigate={handleScrollNavigate} />
            <AboutUs onNavigate={handleScrollNavigate} />
            <Services onNavigate={handleScrollNavigate} />
            <Menu onAddToCart={handleAddToCart} />
            <WhyChooseUs />
            <LocationTracker />
            <Gallery />
            <Testimonials />
            <FAQ />
            <CateringBookingForm
              bookings={bookings}
              onSubmitBooking={handleSubmitBooking}
              onDeleteBooking={handleDeleteBooking}
            />
            <Contact onSendMessage={handleSendMessage} />
          </main>

          {/* Sticky Footer */}
          <Footer onNavigate={handleScrollNavigate} />

          {/* Sliding Cart Drawer Side Panel */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
          />
        </>
      )}

    </div>
  );
}
