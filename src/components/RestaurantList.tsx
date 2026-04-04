import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { RESTAURANTS } from "@/data/mock";
import { Restaurant, MenuItem } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Plus, Star, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export default function RestaurantList() {
  const { addToCart, can, getVisibleCountry } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibleCountry = getVisibleCountry();
  const restaurants = visibleCountry
    ? RESTAURANTS.filter((r) => r.country === visibleCountry)
    : RESTAURANTS;

  const handleAddItem = (restaurant: Restaurant, item: MenuItem) => {
    if (!can("createOrder")) {
      toast.error("You don't have permission to add items");
      return;
    }
    addToCart({
      menuItem: item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      quantity: 1,
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Restaurants</h2>
        {visibleCountry && (
          <p className="text-sm text-muted-foreground mt-1">
            Showing restaurants in {visibleCountry}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {restaurants.map((r) => {
          const isExpanded = expandedId === r.id;
          return (
            <div key={r.id} className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : r.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-card-foreground">{r.name}</h3>
                    <Badge variant="outline" className="text-xs">{r.cuisine}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      {r.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">{r.country}</span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border">
                  {r.menu.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center flex-1 min-w-0 mr-4">
                        {item.image && (
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4 border border-border">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-card-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">
                          {r.country === "India" ? `₹${item.price}` : `$${item.price}`}
                        </span>
                        {can("createOrder") && (
                          <button
                            onClick={() => handleAddItem(r, item)}
                            className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
