import DashboardHome from "@/components/dashboard/buyer/DashboardHome";
import { auth } from "@/lib/auth";
import { fetchBuyerOrders, fetchWishlist } from "@/lib/fetch";
import { headers } from "next/headers";

const dummyRecentPurchases = [
  { _id: "product001", title: "Dell Inspiron 15 Laptop" },
  { _id: "product002", title: "iPhone 12 Pro" },
  { _id: "product003", title: "Wooden Dining Table" },
  { _id: "product007", title: "Leather Sofa Set" },
  { _id: "product008", title: "Canon EOS Camera" },
];

const BuyerDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const orders = await fetchBuyerOrders(userId);
  const wishlist = await fetchWishlist(userId);

  const totalOrders = orders.length;
  const wishlistCount = wishlist.length;
  const recentPurchases = dummyRecentPurchases;

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
