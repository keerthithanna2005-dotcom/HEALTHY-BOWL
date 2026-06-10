import { BowlPreset, FAQItem, ScheduleDay } from './types';

export const BASE_FOOD_TRUCK_IMG = '/src/assets/images/food_truck_1781080937506.png';
export const BASE_HERO_BOWL_IMG = '/src/assets/images/hero_bowl_1781080924124.png';

export const PRESET_BOWLS: BowlPreset[] = [
  {
    id: 'protein-power',
    name: 'Protein Power Bowl',
    description: 'A high-protein masterpiece designed to fuel your active lifestyle with slow-burning grains and satisfying chargrilled lean cuts.',
    ingredients: ['Grilled Chicken Breast', 'Organic Tri-color Quinoa', 'Steamed Edamame', 'Oven-roasted Sweet Potatoes', 'Fresh Sliced Avocado', 'Spiced Pumpkin Seeds', 'Creamy Cashew Cilantro Dressing'],
    nutrition: { calories: 620, protein: 42, carbs: 54, fat: 22 },
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=82',
    tag: 'Best Seller'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean Sunshine Bowl',
    description: 'Bright, citrusy, and packed with heart-healthy fats and classic European coastal garden veggies on a bed of fresh rucola and couscous.',
    ingredients: ['Baked Greek Falafel', 'Whole Wheat Herb Couscous', 'Organic Wild Rocket', 'Crispy Persian Cucumber', 'Kalamata Olives', 'Vine-ripened Cherry Tomatoes', 'Tangy French Feta Cheese', 'Zesty Lemon-Herb Vinaigrette'],
    nutrition: { calories: 490, protein: 16, carbs: 58, fat: 19 },
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=82',
    tag: 'Heart Healthy'
  },
  {
    id: 'vegan-green',
    name: 'Zen Vegan Green Bowl',
    description: 'A deeply detoxifying, crisp, 100% plant-based nourish bowl loaded with crunchy superfoods and creamy antioxidant-rich additions.',
    ingredients: ['Crispy Organic Tofu Triangles', 'Chilled Brown Jasmine Rice', 'Massaged Curly Kale', 'Raw Shredded Broccoli florets', 'Shredded Red Cabbage', 'Ripe Avocado halves', 'Toasted White Sesame Seeds', 'House-made Ginger Miso Vinaigrette'],
    nutrition: { calories: 450, protein: 18, carbs: 48, fat: 17 },
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=82',
    tag: '100% Vegan'
  },
  {
    id: 'teriyaki-chicken',
    name: 'Glazed Teriyaki Chicken Bowl',
    description: 'Savory and slightly sweet premium teriyaki glaze drizzled over chicken breasts, nutrient-rich steamed broccoli, and fluffy grain layers.',
    ingredients: ['Glazed Chicken Breast Thighs', 'Black Forbidden Rice', 'Steamed Broccoli florets', 'Matchstick Carrots', 'Charred Spring Onions', 'Crispy Shallots', 'Sesame Ginger Glaze drizzle'],
    nutrition: { calories: 580, protein: 38, carbs: 62, fat: 14 },
    price: 13.95,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=82',
    tag: 'Comfort Food'
  },
  {
    id: 'southwest',
    name: 'Fiesta Southwest Bowl',
    description: 'A vibrant smoky bowl stacked with zesty Mexican-inspired street food favorites, topped off with a squeeze of fresh lime juice.',
    ingredients: ['Chipotle Grilled Steak', 'Organic Cilantro Lime Rice', 'Smoked Black Beans', 'Sweet Corn Relish', 'Crisp Romaine Hearts', 'House-made Pico de Gallo', 'Chipotle Lime Crema drizzle'],
    nutrition: { calories: 640, protein: 36, carbs: 58, fat: 26 },
    price: 14.95,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=82',
    tag: 'Spicy Delight'
  }
];

export const CUSTOM_BUILD_OPTIONS = {
  bases: [
    { name: 'Organic Tri-color Quinoa', price: 0, calories: 160, protein: 6, carbs: 28, fat: 2.5 },
    { name: 'Chilled Brown Jasmine Rice', price: 0, calories: 150, protein: 3, carbs: 32, fat: 1.0 },
    { name: 'Organic Wild Rocket & Spinach', price: 0, calories: 25, protein: 2, carbs: 3, fat: 0.2 },
    { name: 'Massaged Curly Kale & Romaine', price: 0, calories: 35, protein: 2, carbs: 4, fat: 0.4 },
    { name: 'Black Forbidden Emperor Rice', price: 0.75, calories: 170, protein: 5, carbs: 34, fat: 1.2 }
  ],
  proteins: [
    { name: 'Grilled Herb Chicken Breast', price: 3.50, calories: 180, protein: 31, carbs: 0, fat: 3.5 },
    { name: 'Crispy Organic Smoked Tofu', price: 2.50, calories: 120, protein: 11, carbs: 2, fat: 6.0 },
    { name: 'Greek Baked Superfood Falafels', price: 2.50, calories: 140, protein: 6, carbs: 14, fat: 7.0 },
    { name: 'Citrus Chipotle Seared Salmon', price: 5.50, calories: 220, protein: 24, carbs: 1, fat: 13.0 },
    { name: 'Slow-Smoked Chipotle Beef Steak', price: 4.95, calories: 210, protein: 26, carbs: 0, fat: 11.0 }
  ],
  veggies: [
    { name: 'Oven-roasted Sweet Potatoes', price: 0.50, calories: 85, protein: 1.5, carbs: 20, fat: 0.1 },
    { name: 'Chilled Steamed Edamame', price: 0.50, calories: 45, protein: 4, carbs: 3.8, fat: 2.0 },
    { name: 'Crispy Persian Cucumber', price: 0.35, calories: 10, protein: 0.3, carbs: 2.2, fat: 0.1 },
    { name: 'Shredded Red Cabbage & Carrots', price: 0.35, calories: 15, protein: 0.4, carbs: 3.2, fat: 0.1 },
    { name: 'Vine-ripened Sweet Tomatoes', price: 0.40, calories: 20, protein: 0.6, carbs: 4.3, fat: 0.1 },
    { name: 'Smoked Garlic Black Beans', price: 0.50, calories: 70, protein: 4.5, carbs: 12.5, fat: 0.3 }
  ],
  dressings: [
    { name: 'Zesty Lemon-Herb Vinaigrette', price: 0, calories: 90, protein: 0, carbs: 1.5, fat: 9.5 },
    { name: 'House Creamy Cilantro-Cashew Drizzle', price: 0, calories: 110, protein: 2, carbs: 3, fat: 10.5 },
    { name: 'Sweet Ginger Sesame Miso Glaze', price: 0, calories: 80, protein: 1, carbs: 8, fat: 5.0 },
    { name: 'House Chipotle Lime Crema', price: 0, calories: 95, protein: 0.5, carbs: 2, fat: 9.5 },
    { name: 'Extra Virgin Greek Olive Oil & Fresh Lime Juice', price: 0, calories: 120, protein: 0, carbs: 0, fat: 14.0 }
  ],
  toppings: [
    { name: 'Fresh Avocados Slipped In', price: 1.50, calories: 120, protein: 1.5, carbs: 6, fat: 11.0 },
    { name: 'Spiced Baked Pumpkin Seeds', price: 0.50, calories: 60, protein: 3, carbs: 2, fat: 5.0 },
    { name: 'Crumbling Fine French Feta', price: 1.00, calories: 75, protein: 4, carbs: 1, fat: 6.0 },
    { name: 'Toasted White Sesame Seeds', price: 0.25, calories: 25, protein: 0.8, carbs: 1, fat: 2.2 },
    { name: 'Organic Pickled Jalapeños', price: 0.40, calories: 10, protein: 0.1, carbs: 1.8, fat: 0.1 },
    { name: 'Crispy Caramelized Asian Shallots', price: 0.50, calories: 45, protein: 0.5, carbs: 5, fat: 2.5 }
  ]
};

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1565123409105-2d527ecc7e47?auto=format&fit=crop&w=800&q=82',
    alt: 'Healthy Bowl Food Truck parked under trees during lunch hour rush',
    caption: 'Our modern food truck in the heart of downtown, serving fresh fuel to a wonderful community.'
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=82',
    alt: 'Freshly diced avocados, sweet tomatoes and quinoa ingredients set up neatly',
    caption: 'Slicing and dicing our ingredients fresh every single morning before we roll out.'
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=82',
    alt: 'Premium corporate event catering wooden tables setup with beautiful bowls',
    caption: 'Corporate event catering table setup with customizable single bowl buffet settings.'
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=82',
    alt: 'A group of friends laughing and dining outdoors sharing food bowls',
    caption: 'Sharing healthy meals and high vibes at the community street market.'
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=82',
    alt: 'Healthy Bowl Food Truck serving customized bowls at a summer music festival',
    caption: 'Festival goers keeping their energy high and clean during the summer music gala.'
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=82',
    alt: 'Close-up camera focus on citrus limes and hand drizzling golden vinaigrette dressing',
    caption: 'The art of drizzle: every bowl is perfected with chef-driven homemade dressing.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Truck & Location',
    question: 'Where can I find the Healthy Bowl Food Truck today?',
    answer: 'We post our real-time GPS location coordinates and our weekly schedule right here on our website. You can also follow our Instagram stories where we live-update any weather delays or location changes.'
  },
  {
    id: 'faq-2',
    category: 'Catering',
    question: 'Do you offer catering services for events and corporate functions?',
    answer: 'Absolutely! Corporate catering and private event bookings are a major specialty of ours. We offer full-service food truck setup at your venue, modular buffet tables, or pre-ordered individually packaged meal prep drop-offs. Use our interactive booking tool down below to secure a date!'
  },
  {
    id: 'faq-3',
    category: 'Dietary',
    question: 'Are there gluten-free, dairy-free, and vegan-friendly options?',
    answer: 'Yes! Almost our entire menu is naturally gluten-free and dairy-free or can be prepared so. All our grains are wheat-free, and we have multiple premium vegan selections (such as Greek Baked Falafels and Crispy Smoked Tofu), along with entirely vegan-friendly, non-dairy baseline dressings. Feel free to use the custom bowl builder to curate your exact matching meal.'
  },
  {
    id: 'faq-4',
    category: 'Catering Travel',
    question: 'How far do you travel for private catering and festivals?',
    answer: 'Our standard operating service radius extends up to 45 miles from our kitchen hub. For large community festivals, weddings, or corporate events, we are willing to travel further. Please contact us through our catering form to describe your dimensions!'
  },
  {
    id: 'faq-5',
    category: 'Ordering',
    question: 'How do I place a quick pick-up order?',
    answer: 'You can build and add preset bowls (or design your own bowl) using our client cart down below, which simulates a direct ticket to our kitchen! Currently, we accept online pre-ordering for instant pickup at the truck on active days.'
  }
];

export const SCHEDULE: ScheduleDay[] = [
  {
    day: 'Monday',
    hours: '11:00 AM - 2:30 PM',
    location: 'Metropolitan Tech Plaza (Court Street)',
    latLong: [40.7128, -74.0060],
    status: 'upcoming',
    details: 'Serving our high-energy corporate community near Tower A.'
  },
  {
    day: 'Tuesday',
    hours: '11:00 AM - 2:30 PM',
    location: 'University Science Campus & Commons Courtyard',
    latLong: [40.7180, -74.0150],
    status: 'upcoming',
    details: 'Student discount day! Show your active ID card for $1.50 off.'
  },
  {
    day: "Wednesday (Today)",
    hours: "11:00 AM - 7:00 PM",
    location: "Sonne Medical Center Park Row",
    latLong: [40.7250, -74.0010],
    status: "active",
    details: "Extended hours! Find us right outside the main park conservatory entrance."
  },
  {
    day: 'Thursday',
    hours: '11:30 AM - 3:00 PM',
    location: 'Financial Hub Broad St (Commerce Corner)',
    latLong: [40.7060, -74.0090],
    status: 'upcoming',
    details: 'Broad Street lunchtime rush. Fast pass line available in our app!'
  },
  {
    day: 'Friday',
    hours: '11:00 AM - 8:30 PM',
    location: 'Greenwood Waterfront Marina Pier 4',
    latLong: [40.7310, -73.9920],
    status: 'upcoming',
    details: 'Start your weekend right. Live acoustic music starts at sunset near our truck!'
  },
  {
    day: 'Saturday & Sunday',
    hours: '12:00 PM - 9:00 PM',
    location: 'Central Community Harvest Market & Festival',
    latLong: [40.7199, -73.9980],
    status: 'upcoming',
    details: 'Event weekends! Celebrating harvest festivals and artisan craft showcases.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Eleanor Vance',
    role: 'Corporate HR Director, Apex Media',
    text: 'We booked Healthy Bowl for our annual corporate health week, and it was a sensation! The team was professional, the truck looked absolutely beautiful, and my staff couldn\'t stop talking about the ginger miso tofu. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't-2',
    name: 'Marcus Chen',
    role: 'Fitness Coach & Gym Owner',
    text: 'As an athlete, eating fresh micronutrient-rich food on the go is difficult. Healthy Bowl Food Truck is a total lifesaver. Their Protein Power Bowl has a perfect macro breakdown - raw, organic carbs, clean proteins, and outstanding flavor.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't-3',
    name: 'Clarissa Montgomery',
    role: 'Bride',
    text: 'For our wedding lunch, we wanted a relaxed, stylish, and premium street food experience instead of a sit-down dinner. The team configured a Gorgeous custom-made food layout. The guests loved customizing their own bowls. Truly memorable!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
  }
];
