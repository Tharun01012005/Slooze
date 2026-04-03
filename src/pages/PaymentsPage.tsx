import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CreditCard, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { PaymentMethod } from "@/data/types";

export default function PaymentsPage() {
  const { paymentMethods, addPaymentMethod, removePaymentMethod, can } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newLast4, setNewLast4] = useState("");

  if (!can("modifyPayment")) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Only Admins can manage payment methods</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    const pm: PaymentMethod = {
      id: `p-${Date.now()}`,
      type: "card",
      label: newLabel.trim(),
      last4: newLast4.trim() || undefined,
    };
    addPaymentMethod(pm);
    toast.success("Payment method added");
    setNewLabel("");
    setNewLast4("");
    setShowAdd(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Payment Methods</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-card space-y-3">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label (e.g. Visa, UPI)"
            className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={newLast4}
            onChange={(e) => setNewLast4(e.target.value)}
            placeholder="Last 4 digits (optional)"
            maxLength={4}
            className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      )}

      <div className="space-y-3">
        {paymentMethods.map((pm) => (
          <div
            key={pm.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg bg-card"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{pm.label}</p>
                {pm.last4 && (
                  <p className="text-xs text-muted-foreground">•••• {pm.last4}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                removePaymentMethod(pm.id);
                toast.success("Payment method removed");
              }}
              className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </button>
          </div>
        ))}
        {paymentMethods.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No payment methods</p>
        )}
      </div>
    </div>
  );
}
