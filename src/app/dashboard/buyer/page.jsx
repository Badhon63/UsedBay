import DashboardHome from "@/components/dashboard/buyer/DashboardHome";
import { auth } from "@/lib/auth";
import { fetchBuyerOrders, fetchWishlist } from "@/lib/fetch";
import { headers } from "next/headers";

const BuyerDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const orders = await fetchBuyerOrders(userId);
  const wishlist = await fetchWishlist(userId);

  const totalOrders = orders.length;
  const wishlistCount = wishlist.length;
  const recentPurchases = orders.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <DashboardHome
        totalOrders={totalOrders}
        wishlistCount={wishlistCount}
        recentPurchases={recentPurchases}
      />
    </div>
  );
};

export default BuyerDashboardPage;