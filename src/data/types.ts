export type Role = "admin" | "manager" | "member";
export type Country = "India" | "America";

export interface User {
  id: string;
  name: string;
  role: Role;
  country: Country;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  country: Country;
  rating: number;
  menu: MenuItem[];
}

export interface CartItem {
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "placed" | "cancelled";
  placedBy: string;
  country: Country;
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi";
  label: string;
  last4?: string;
}

// RBAC permissions
export const PERMISSIONS: Record<string, Record<Role, boolean>> = {
  viewRestaurants: { admin: true, manager: true, member: true },
  createOrder: { admin: true, manager: true, member: true },
  placeOrder: { admin: true, manager: true, member: false },
  cancelOrder: { admin: true, manager: true, member: false },
  modifyPayment: { admin: true, manager: false, member: false },
};

export function hasPermission(role: Role, action: string): boolean {
  return PERMISSIONS[action]?.[role] ?? false;
}
