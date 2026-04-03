import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, LogOut, Sun, Moon, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export default function Header() {
  const { currentUser, setCurrentUser, cart, clearCart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  if (!currentUser) return null;

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const links = [
    { label: "Restaurants", path: "/" },
    { label: "Orders", path: "/orders" },
    ...(currentUser.role === "admin" ? [{ label: "Payments", path: "/payments" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center justify-start gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="sm:hidden p-2 -ml-2 rounded-md hover:bg-secondary transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:hidden flex flex-col gap-4">
              <div className="text-lg font-bold text-foreground tracking-tight pb-4 border-b border-border">
                🍽️ FoodOrder
              </div>
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className={`px-3 py-2 text-left text-sm rounded-md transition-colors w-full h-10 ${
                        location.pathname === link.path
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <button onClick={() => navigate("/")} className="sm:hidden text-base font-bold text-foreground tracking-tight absolute left-1/2 -translate-x-1/2">
            🍽️
          </button>
        </div>

        <button onClick={() => navigate("/")} className="hidden sm:block text-lg font-bold text-foreground tracking-tight absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
          🍽️ FoodOrder
        </button>

        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
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

        <div className="flex items-center gap-1 sm:gap-3">
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

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </button>

          <div className="flex items-center pl-1 sm:pl-2">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <Badge variant="outline" className="text-xs">
                {currentUser.name}
              </Badge>
              <Badge className="text-[10px] uppercase font-bold tracking-wider mt-0.5" variant="secondary">
                {currentUser.role}
              </Badge>
            </div>
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
