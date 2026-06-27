import DashboardHome from "@/components/dashboard/buyer/DashboardHome";

const dummyOrders = [
  {
    _id: "order001",
    buyerInfo: { userId: "user001", name: "Md. Rakib Hasan" },
    productId: "product001",
    productTitle: "Dell Inspiron 15 Laptop",
    orderStatus: "delivered",
  },
  {
    _id: "order002",
    buyerInfo: { userId: "user001", name: "Md. Rakib Hasan" },
    productId: "product002",
    productTitle: "iPhone 12 Pro",
    orderStatus: "delivered",
  },
  {
    _id: "order003",
    buyerInfo: { userId: "user001", name: "Md. Rakib Hasan" },
    productId: "product003",
    productTitle: "Wooden Dining Table",
    orderStatus: "processing",
  },
];

const dummyWishlist = [
  { _id: "wish001", productId: "product004", productTitle: "Designer Jacket" },
  { _id: "wish002", productId: "product005", productTitle: "Samsung TV" },
  { _id: "wish003", productId: "product006", productTitle: "Mountain Bike" },
];

const dummyRecentPurchases = [
  { _id: "product001", title: "Dell Inspiron 15 Laptop" },
  { _id: "product002", title: "iPhone 12 Pro" },
  { _id: "product003", title: "Wooden Dining Table" },
  { _id: "product007", title: "Leather Sofa Set" },
  { _id: "product008", title: "Canon EOS Camera" },
];

const BuyerDashboardPage = async () => {
  const totalOrders = dummyOrders.length;
  const wishlistCount = dummyWishlist.length;
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
