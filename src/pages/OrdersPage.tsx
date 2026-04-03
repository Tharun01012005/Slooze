import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

export default function OrdersPage() {
  const { orders, cancelOrder, can, currentUser, getVisibleCountry } = useApp();

  const visibleCountry = getVisibleCountry();
  const visibleOrders = visibleCountry
    ? orders.filter((o) => o.country === visibleCountry)
    : orders;

  const handleCancel = (orderId: string) => {
    if (!can("cancelOrder")) {
      toast.error("You don't have permission to cancel orders");
      return;
    }
    cancelOrder(orderId);
    toast.success("Order cancelled");
  };

  if (visibleOrders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Orders</h2>
      <div className="space-y-4">
        {visibleOrders.map((order) => (
          <div key={order.id} className="border border-border rounded-lg bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-mono text-sm text-foreground">{order.id}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  by {order.placedBy} • {order.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    order.status === "placed"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }
                  variant="outline"
                >
                  {order.status}
                </Badge>
                {order.status === "placed" && can("cancelOrder") && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="p-1 rounded hover:bg-destructive/10 transition-colors"
                    title="Cancel order"
                  >
                    <XCircle className="h-4 w-4 text-destructive" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1">
              {order.items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>
                    {item.menuItem.name} × {item.quantity}
                  </span>
                  <span>{order.country === "India" ? "₹" : "$"}{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span>{order.country === "India" ? "₹" : "$"}{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
