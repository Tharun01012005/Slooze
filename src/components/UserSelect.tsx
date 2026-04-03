import { useState, FormEvent, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { USERS } from "@/data/mock";
import { Sun, Moon } from "lucide-react";

export default function UserSelect() {
  const { setCurrentUser } = useApp();
  const [userId, setUserId] = useState(USERS[0].id);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password !== "sample") {
      setError("Invalid password. Hint: it's 'sample'");
      return;
    }
    setError("");
    const selectedUser = USERS.find((u) => u.id === userId);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">🍽️ FoodOrder</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 bg-card p-6 rounded-lg border border-border shadow-sm">
          {error && <div className="text-destructive text-sm font-medium p-2 bg-destructive/10 rounded">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select User</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role} - {u.country})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
