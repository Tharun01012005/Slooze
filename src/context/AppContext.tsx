import React, { createContext, useContext, useState, useCallback } from "react";
import { User, CartItem, Order, PaymentMethod, hasPermission, Country } from "@/data/types";
import { PAYMENT_METHODS } from "@/data/mock";

interface AppState {
  currentUser: User | null;
  cart: CartItem[];
  orders: Order[];
  paymentMethods: PaymentMethod[];
  setCurrentUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartQuantity: (menuItemId: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: () => string | null;
  cancelOrder: (orderId: string) => boolean;
  addPaymentMethod: (pm: PaymentMethod) => void;
  removePaymentMethod: (pmId: string) => void;
  cartTotal: number;
  can: (action: string) => boolean;
  getVisibleCountry: () => Country | null;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([...PAYMENT_METHODS]);

  const can = useCallback(
    (action: string) => (currentUser ? hasPermission(currentUser.role, action) : false),
    [currentUser]
  );

  // Country filtering: admin sees all, others see only their country
  const getVisibleCountry = useCallback(
    (): Country | null => {
      if (!currentUser) return null;
      if (currentUser.role === "admin") return null; // null = all
      return currentUser.country;
    },
    [currentUser]
  );

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.menuItem.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.menuItem.id ? { ...c, quantity: c.quantity + item.quantity } : c
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (menuItemId: string) =>
    setCart((prev) => prev.filter((c) => c.menuItem.id !== menuItemId));

  const updateCartQuantity = (menuItemId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(menuItemId);
    setCart((prev) =>
      prev.map((c) => (c.menuItem.id === menuItemId ? { ...c, quantity: qty } : c))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, c) => sum + c.menuItem.price * c.quantity, 0);

  const placeOrder = (): string | null => {
    if (!can("placeOrder") || cart.length === 0 || !currentUser) return null;
    const id = `ORD-${Date.now()}`;
    const order: Order = {
      id,
      items: [...cart],
      total: cartTotal,
      status: "placed",
      placedBy: currentUser.name,
      country: currentUser.country,
      createdAt: new Date(),
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return id;
  };

  const cancelOrder = (orderId: string): boolean => {
    if (!can("cancelOrder")) return false;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId && o.status === "placed" ? { ...o, status: "cancelled" } : o))
    );
    return true;
  };

  const addPaymentMethod = (pm: PaymentMethod) =>
    setPaymentMethods((prev) => [...prev, pm]);

  const removePaymentMethod = (pmId: string) =>
    setPaymentMethods((prev) => prev.filter((p) => p.id !== pmId));

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        cancelOrder,
        orders,
        paymentMethods,
        addPaymentMethod,
        removePaymentMethod,
        cartTotal,
        can,
        getVisibleCountry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
