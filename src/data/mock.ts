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
      { id: "m1", name: "Butter Chicken", price: 320, description: "Creamy tomato-based curry with tender chicken", category: "Main", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80" },
      { id: "m2", name: "Paneer Tikka", price: 240, description: "Grilled cottage cheese with spices", category: "Starter", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80" },
      { id: "m3", name: "Biryani", price: 280, description: "Fragrant basmati rice with aromatic spices", category: "Main", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" },
      { id: "m4", name: "Gulab Jamun", price: 120, description: "Deep-fried milk dumplings in sugar syrup", category: "Dessert", image: "https://images.unsplash.com/photo-1599557434318-7e4526dd20a6?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    id: "r2",
    name: "Mumbai Street Bites",
    cuisine: "Street Food",
    country: "India",
    rating: 4.2,
    menu: [
      { id: "m5", name: "Vada Pav", price: 60, description: "Spicy potato fritter in a bun", category: "Snack", image: "https://images.unsplash.com/photo-1596450514735-a1112eee01d0?auto=format&fit=crop&w=400&q=80" },
      { id: "m6", name: "Pav Bhaji", price: 150, description: "Mashed vegetable curry with buttered bread", category: "Main", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80" },
      { id: "m7", name: "Samosa", price: 40, description: "Crispy pastry with spiced potato filling", category: "Snack", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" },
      { id: "m8", name: "Masala Chai", price: 30, description: "Spiced Indian tea", category: "Beverage", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    id: "r3",
    name: "Liberty Burger Co.",
    cuisine: "American",
    country: "America",
    rating: 4.3,
    menu: [
      { id: "m9", name: "Classic Cheeseburger", price: 12, description: "Angus beef with cheddar, lettuce, tomato", category: "Main", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
      { id: "m10", name: "BBQ Bacon Burger", price: 15, description: "Smoky BBQ sauce with crispy bacon", category: "Main", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80" },
      { id: "m11", name: "Loaded Fries", price: 8, description: "Fries topped with cheese and jalapeños", category: "Side", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80" },
      { id: "m12", name: "Milkshake", price: 7, description: "Thick vanilla or chocolate shake", category: "Beverage", image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    id: "r4",
    name: "NYC Pizza House",
    cuisine: "Italian-American",
    country: "America",
    rating: 4.6,
    menu: [
      { id: "m13", name: "Margherita Pizza", price: 14, description: "Fresh mozzarella, basil, tomato sauce", category: "Main", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
      { id: "m14", name: "Pepperoni Pizza", price: 16, description: "Classic pepperoni with melted cheese", category: "Main", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80" },
      { id: "m15", name: "Garlic Knots", price: 6, description: "Soft dough knots with garlic butter", category: "Side", image: "https://images.unsplash.com/photo-15731402476b7-f8fd74997d5c?auto=format&fit=crop&w=400&q=80" },
      { id: "m16", name: "Caesar Salad", price: 10, description: "Romaine, croutons, parmesan, caesar dressing", category: "Starter", image: "https://images.unsplash.com/photo-1512621843614-b38ba613fd2c?auto=format&fit=crop&w=400&q=80" },
    ],
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "p1", type: "card", label: "Visa", last4: "4242" },
  { id: "p2", type: "card", label: "Mastercard", last4: "8888" },
  { id: "p3", type: "upi", label: "UPI - phone@upi" },
];
