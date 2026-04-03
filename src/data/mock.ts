import { User, Restaurant, PaymentMethod } from "./types";

export const USERS: User[] = [
  { id: "1", name: "Nick Fury", role: "admin", country: "India" },
  { id: "2", name: "Captain Marvel", role: "manager", country: "India" },
  { id: "3", name: "Captain America", role: "manager", country: "America" },
  { id: "4", name: "Thanos", role: "member", country: "India" },
  { id: "5", name: "Thor", role: "member", country: "India" },
  { id: "6", name: "Travis", role: "member", country: "America" },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Taj Spice Kitchen",
    cuisine: "Indian",
    country: "India",
    rating: 4.5,
    menu: [
      { id: "m1", name: "Butter Chicken", price: 320, description: "Creamy tomato-based curry with tender chicken", category: "Main" },
      { id: "m2", name: "Paneer Tikka", price: 240, description: "Grilled cottage cheese with spices", category: "Starter" },
      { id: "m3", name: "Biryani", price: 280, description: "Fragrant basmati rice with aromatic spices", category: "Main" },
      { id: "m4", name: "Gulab Jamun", price: 120, description: "Deep-fried milk dumplings in sugar syrup", category: "Dessert" },
    ],
  },
  {
    id: "r2",
    name: "Mumbai Street Bites",
    cuisine: "Street Food",
    country: "India",
    rating: 4.2,
    menu: [
      { id: "m5", name: "Vada Pav", price: 60, description: "Spicy potato fritter in a bun", category: "Snack" },
      { id: "m6", name: "Pav Bhaji", price: 150, description: "Mashed vegetable curry with buttered bread", category: "Main" },
      { id: "m7", name: "Samosa", price: 40, description: "Crispy pastry with spiced potato filling", category: "Snack" },
      { id: "m8", name: "Masala Chai", price: 30, description: "Spiced Indian tea", category: "Beverage" },
    ],
  },
  {
    id: "r3",
    name: "Liberty Burger Co.",
    cuisine: "American",
    country: "America",
    rating: 4.3,
    menu: [
      { id: "m9", name: "Classic Cheeseburger", price: 12, description: "Angus beef with cheddar, lettuce, tomato", category: "Main" },
      { id: "m10", name: "BBQ Bacon Burger", price: 15, description: "Smoky BBQ sauce with crispy bacon", category: "Main" },
      { id: "m11", name: "Loaded Fries", price: 8, description: "Fries topped with cheese and jalapeños", category: "Side" },
      { id: "m12", name: "Milkshake", price: 7, description: "Thick vanilla or chocolate shake", category: "Beverage" },
    ],
  },
  {
    id: "r4",
    name: "NYC Pizza House",
    cuisine: "Italian-American",
    country: "America",
    rating: 4.6,
    menu: [
      { id: "m13", name: "Margherita Pizza", price: 14, description: "Fresh mozzarella, basil, tomato sauce", category: "Main" },
      { id: "m14", name: "Pepperoni Pizza", price: 16, description: "Classic pepperoni with melted cheese", category: "Main" },
      { id: "m15", name: "Garlic Knots", price: 6, description: "Soft dough knots with garlic butter", category: "Side" },
      { id: "m16", name: "Caesar Salad", price: 10, description: "Romaine, croutons, parmesan, caesar dressing", category: "Starter" },
    ],
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "p1", type: "card", label: "Visa", last4: "4242" },
  { id: "p2", type: "card", label: "Mastercard", last4: "8888" },
  { id: "p3", type: "upi", label: "UPI - phone@upi" },
];
