export interface BowlPreset {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  price: number;
  image: string;
  tag?: string;
}

export interface CustomBowl {
  base: string;
  protein: string;
  veggies: string[];
  dressing: string;
  toppings: string[];
  price: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface CartItem {
  id: string; // Unique cart item ID (can be preset ID or dynamic for custom bowl)
  name: string;
  price: number;
  quantity: number;
  isCustom: boolean;
  customDetails?: CustomBowl;
  image?: string;
  notes?: string;
}

export interface CateringBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  location: string;
  eventType: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Declined';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ScheduleDay {
  day: string;
  hours: string;
  location: string;
  latLong: [number, number];
  status: 'active' | 'upcoming' | 'closed';
  details: string;
}
