import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const { currentUser, setCurrentUser, cart, clearCart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <button onClick={() => navigate("/")} className="text-lg font-bold text-foreground tracking-tight">
          🍽️ FoodOrder
        </button>

        <nav className="flex items-center gap-1">
          {[
            { label: "Restaurants", path: "/" },
            { label: "Orders", path: "/orders" },
            ...(currentUser.role === "admin" ? [{ label: "Payments", path: "/payments" }] : []),
          ].map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {currentUser.name}
            </Badge>
            <button
              onClick={() => {
                setCurrentUser(null);
                clearCart();
                navigate("/");
              }}
              className="p-1.5 rounded-md hover:bg-secondary transition-colors"
              title="Switch user"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
