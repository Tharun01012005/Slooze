import { useApp } from "@/context/AppContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, placeOrder, can, currentUser, paymentMethods } = useApp();
  const navigate = useNavigate();

  const currency = currentUser?.country === "India" ? "₹" : "$";

  const handleCheckout = () => {
    if (!can("placeOrder")) {
      toast.error("You don't have permission to place orders");
      return;
    }
    if (paymentMethods.length === 0) {
      toast.error("No payment method available");
      return;
    }
    const orderId = placeOrder();
    if (orderId) {
      toast.success(`Order ${orderId} placed successfully!`);
      navigate("/orders");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-primary hover:underline"
        >
          Browse restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.menuItem.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg bg-card"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-card-foreground">{item.menuItem.name}</p>
              <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.menuItem.id, item.quantity - 1)}
                  className="p-1 rounded border border-border hover:bg-secondary transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.menuItem.id, item.quantity + 1)}
                  className="p-1 rounded border border-border hover:bg-secondary transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <span className="text-sm font-semibold w-16 text-right">
                {currency}{item.menuItem.price * item.quantity}
              </span>

              <button
                onClick={() => removeFromCart(item.menuItem.id)}
                className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border border-border rounded-lg bg-card">
        <div className="flex justify-between text-lg font-bold text-foreground">
          <span>Total</span>
          <span>{currency}{cartTotal}</span>
        </div>

        {can("placeOrder") ? (
          <button
            onClick={handleCheckout}
            className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Place Order
          </button>
        ) : (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Only Admins and Managers can place orders. Ask your manager to checkout.
          </p>
        )}
      </div>
    </div>
  );
}
