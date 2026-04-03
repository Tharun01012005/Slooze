import { useApp } from "@/context/AppContext";
import UserSelect from "@/components/UserSelect";
import RestaurantList from "@/components/RestaurantList";
import Header from "@/components/Header";

const Index = () => {
  const { currentUser } = useApp();

  if (!currentUser) return <UserSelect />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RestaurantList />
    </div>
  );
};

export default Index;
