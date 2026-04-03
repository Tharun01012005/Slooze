import { useApp } from "@/context/AppContext";
import { USERS } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { User } from "@/data/types";

const roleBadgeClass: Record<string, string> = {
  admin: "bg-primary text-primary-foreground",
  manager: "bg-accent text-accent-foreground",
  member: "bg-secondary text-secondary-foreground",
};

export default function UserSelect() {
  const { setCurrentUser } = useApp();

  const handleSelect = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">🍽️ FoodOrder</h1>
          <p className="text-muted-foreground mt-2">Select your profile to continue</p>
        </div>
        <div className="space-y-3">
          {USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelect(user)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
            >
              <div>
                <p className="font-medium text-card-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.country}</p>
              </div>
              <Badge className={roleBadgeClass[user.role]}>{user.role}</Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
