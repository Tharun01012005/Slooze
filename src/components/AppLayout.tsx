import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();

  if (!currentUser) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
    </div>
  );
}
