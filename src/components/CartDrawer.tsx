import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, Sparkles, AlertCircle, FileText, CheckCircle2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: { items: CartItem[]; total: number; pickupName: string; pickupTime: string }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onPlaceOrder
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'receipt'>('cart');
  const [pickupName, setPickupName] = useState('');
  const [pickupTime, setPickupTime] = useState('12:15 PM');
  const [checkoutError, setCheckoutError] = useState('');
  const [printedReceipt, setPrintedReceipt] = useState<{
    id: string;
    items: CartItem[];
    total: number;
    pickupName: string;
    pickupTime: string;
    timestamp: string;
  } | null>(null);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.0825; // 8.25% NY tax rate
  const taxes = subtotal * taxRate;
  const grandTotal = subtotal > 0 ? subtotal + taxes : 0;

  const totalCalories = cart.reduce((c, item) => {
    if (item.isCustom && item.customDetails) {
      return c + (item.customDetails.nutrition.calories * item.quantity);
    }
    return c + (600 * item.quantity); // fallback average
  }, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupName.trim()) {
      setCheckoutError('Please provide a name for the order ticket');
      return;
    }

    const orderId = `HB-TICKET-${Math.floor(Math.random() * 9000) + 1000}`;
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReceipt = {
      id: orderId,
      items: [...cart],
      total: grandTotal,
      pickupName,
      pickupTime,
      timestamp: timestampStr
    };

    setPrintedReceipt(newReceipt);
    onPlaceOrder({
      items: cart,
      total: grandTotal,
      pickupName,
      pickupTime
    });

    setCheckoutStep('receipt');
  };

  const handleResetDrawer = () => {
    onClearCart();
    setCheckoutStep('cart');
    setPickupName('');
    setPrintedReceipt(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 leading-none">Your Order Hub</h3>
                  <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mt-1 block">
                    Healthy Bowl Kitchen Queue
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200 text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dynamic Body Content */}
            <div className="flex-grow overflow-y-auto p-5 space-y-5">
              
              {checkoutStep === 'cart' && (
                /* STEP 1: CART LIST OF FOOD ITEMS */
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-24 text-gray-400 space-y-4">
                      <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm opacity-60">
                        <ShoppingBag className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900">Your basket is completely empty</h4>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                          Jump over to our Specialties deck or custom builder to assemble your fresh meal bowls!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                          Review Items ({cart.length})
                        </span>
                        <button
                          onClick={onClearCart}
                          className="text-[10px] uppercase font-mono font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                        >
                          Clear Queue
                        </button>
                      </div>

                      {/* Items list mapping */}
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl border border-slate-100 bg-white flex justify-between gap-4 group hover:shadow-md transition-shadow relative overflow-hidden"
                          >
                            <div className="space-y-2 flex-grow">
                              <div>
                                <span className="block text-sm font-black text-gray-900 tracking-tight leading-tight">
                                  {item.name}
                                </span>
                                {item.isCustom && item.customDetails ? (
                                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider font-mono">
                                    Custom Build • {item.customDetails.nutrition.calories} kcal
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
                                    Healthy Signature Bowl
                                  </span>
                                )}
                              </div>

                              {/* Custom details list for customized builder items */}
                              {item.isCustom && item.customDetails && (
                                <div className="text-[10px] text-gray-500 leading-relaxed bg-slate-50 rounded-lg p-2.5 space-y-1">
                                  <p><span className="font-semibold text-gray-400">Base:</span> {item.customDetails.base}</p>
                                  <p><span className="font-semibold text-gray-400">Protein:</span> {item.customDetails.protein}</p>
                                  {item.customDetails.veggies.length > 0 && (
                                    <p><span className="font-semibold text-gray-400">Veggies:</span> {item.customDetails.veggies.join(', ')}</p>
                                  )}
                                  <p><span className="font-semibold text-gray-400">Dressing:</span> {item.customDetails.dressing}</p>
                                  {item.customDetails.toppings.length > 0 && (
                                    <p><span className="font-semibold text-gray-400">Toppings:</span> {item.customDetails.toppings.join(', ')}</p>
                                  )}
                                </div>
                              )}

                              {item.notes && (
                                <p className="text-[10px] italic text-slate-500 bg-amber-50 rounded p-2.5 border border-amber-100/50">
                                  <span className="font-bold text-amber-800">Kitchen Note:</span> "{item.notes}"
                                </p>
                              )}

                              {/* Price and quantity controller row */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <span className="text-sm font-mono font-black text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>

                                <div className="flex items-center border border-slate-100 rounded-lg bg-slate-50 scale-90">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 text-gray-500 hover:bg-slate-200 rounded-l-lg"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-3.5 text-xs font-black text-gray-800 font-mono w-5 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 text-gray-500 hover:bg-slate-200 rounded-r-lg"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Detach cross */}
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-gray-400 hover:text-rose-600 p-1 transition-colors self-start"
                              title="Delete item"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Nutrient Metrics Panel overlay */}
                      <div className="bg-emerald-50 rounded-xl p-4.5 space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                          Total Nutritional Estimate
                        </span>
                        <p className="text-xs text-gray-600 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Total meal calories: <strong className="text-emerald-950 font-mono">{totalCalories} kcal</strong></span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'details' && (
                /* STEP 2: PICKUP DETAILS DETAILS FORM */
                <form id="details-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="border-b border-gray-100 pb-3 flex items-center space-x-1.5 text-slate-900 font-bold">
                    <CreditCard className="h-4.5 w-4.5 text-emerald-600" />
                    <span>Provide Pickup Credentials</span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    We accept offline cash, card taps, or digital vouchers directly at our service window. Provide your name to register your ticket:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Your Order Name / Company
                      </label>
                      <input
                        type="text"
                        required
                        value={pickupName}
                        onChange={(e) => {
                          setPickupName(e.target.value);
                          setCheckoutError('');
                        }}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-xs font-semibold text-gray-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-1.5">
                        Target Pickup Window (Sonne Medical Plaza today)
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="11:45 AM">11:45 AM (Lunch Start)</option>
                        <option value="12:15 PM">12:15 PM (Lunch peak)</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:45 PM">1:45 PM</option>
                        <option value="5:30 PM">5:30 PM (Dinner Hour)</option>
                        <option value="6:15 PM">6:15 PM</option>
                      </select>
                    </div>
                  </div>

                  {checkoutError && (
                    <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="h-4 w-4" />
                      <span>{checkoutError}</span>
                    </p>
                  )}

                  <div className="bg-emerald-50 rounded-xl p-4 text-[10px] text-emerald-800 leading-normal border border-emerald-100">
                    Our truck operates a <strong>First-In, First-Served</strong> window. Your slot acts as an automated calendar alert for our chefs to prepare details freshly prior to your arrival!
                  </div>
                </form>
              )}

              {checkoutStep === 'receipt' && printedReceipt && (
                /* STEP 3: KITCHEN THERMAL RECEIPT DISPLAY */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="text-center space-y-1.5">
                    <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Order Received!</h3>
                    <p className="text-xs text-gray-500 font-medium">Please present this voucher tag at our service truck counter.</p>
                  </div>

                  {/* THERMAL TICKET RENDER BOX */}
                  <div className="bg-slate-50 border border-slate-200 shadow-md rounded-2xl p-5 font-mono text-[11px] text-slate-800 space-y-4 max-w-xs mx-auto relative overflow-hidden">
                    
                    {/* Simulated jagged thermal paper edges top/bottom */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%)] bg-[size:6px_6px] bg-repeat-x opacity-40" />

                    {/* Ticket Header centered info */}
                    <div className="text-center space-y-1 border-b border-dashed border-slate-300 pb-3 pt-2">
                      <h4 className="font-black text-sm text-slate-900 tracking-tight">HEALTHY BOWL FOOD CO.</h4>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Sonne Medical Center Block</p>
                      <p className="text-[9px] text-slate-400 font-bold">MON-SUN OPERATORS</p>
                    </div>

                    {/* Metadata lines */}
                    <div className="space-y-1.5 text-left border-b border-dashed border-slate-300 pb-3">
                      <p className="flex justify-between font-bold text-slate-900">
                        <span>TICKET ID:</span>
                        <span>{printedReceipt.id}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>CUSTOMER:</span>
                        <span className="font-extrabold">{printedReceipt.pickupName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>PICKUP SLOT:</span>
                        <span className="font-extrabold text-emerald-800 bg-emerald-50 px-1">{printedReceipt.pickupTime}</span>
                      </p>
                      <p className="flex justify-between text-[9px] text-slate-500">
                        <span>DISPATCHED:</span>
                        <span>TODAY, {printedReceipt.timestamp}</span>
                      </p>
                    </div>

                    {/* Ticket items list */}
                    <div className="space-y-2 border-b border-dashed border-slate-300 pb-3">
                      {printedReceipt.items.map((it, kIdx) => (
                        <div key={kIdx} className="space-y-0.5">
                          <p className="flex justify-between font-bold text-slate-900">
                            <span>{it.quantity}x {it.name}</span>
                            <span>${(it.price * it.quantity).toFixed(2)}</span>
                          </p>
                          {it.isCustom && it.customDetails && (
                            <p className="text-[9px] text-slate-400 pl-3 leading-snug">
                              * {it.customDetails.base} / {it.customDetails.protein} {it.customDetails.veggies.length > 0 && `/ ${it.customDetails.veggies.join(', ')}`}
                            </p>
                          )}
                          {it.notes && (
                            <p className="text-[9px] text-amber-800 italic pl-3 font-semibold bg-amber-50 rounded">
                              Note: "{it.notes}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Financial summary tags */}
                    <div className="space-y-1.5 text-right font-black">
                      <p className="text-slate-900 text-xs flex justify-between">
                        <span>TOTAL AMOUNT:</span>
                        <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded">${printedReceipt.total.toFixed(2)}</span>
                      </p>
                    </div>

                    {/* Mock barcode generator */}
                    <div className="text-center pt-3.5 space-y-1">
                      <div className="text-2xl tracking-[4px] leading-none text-slate-800 select-none pb-1 h-8 flex items-center justify-center font-bold">
                        ||| | ||| |||| | ||| | |||
                      </div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">
                        SHOW WINDOW FOR PICKUP
                      </span>
                    </div>

                  </div>

                  <div className="text-center pt-3">
                    <button
                      onClick={handleResetDrawer}
                      className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs uppercase cursor-pointer"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                      <span>Ready & Reset Cart</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Sticky Order Action Footer (when in CART step) */}
            {subtotal > 0 && (
              <div className="p-5 border-t border-gray-100 bg-slate-50 space-y-4">
                
                {/* Financial breakdown overview */}
                <div className="space-y-2 text-xs font-semibold text-gray-500">
                  <div className="flex justify-between">
                    <span>Menu Subtotal:</span>
                    <span className="text-gray-900 font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.25% NY Delivery):</span>
                    <span className="text-gray-900 font-mono">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black text-gray-900">
                    <span>Grand Total:</span>
                    <span className="text-emerald-700 font-mono">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-50 transition-all cursor-pointer"
                  >
                    <span>Proceed To Checkout Details</span>
                    <CreditCard className="h-4 w-4" />
                  </button>
                )}

                {checkoutStep === 'details' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-gray-700 font-bold text-xs uppercase cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="details-form"
                      className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer"
                    >
                      Create Ticket
                    </button>
                  </div>
                )}

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
