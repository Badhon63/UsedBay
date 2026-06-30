import ManageOrders from "@/components/dashboard/seller/ManageOrders";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchSellerOrders } from "@/lib/fetch";

const ManageOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sellerId = session?.user?.id;

  const orders = sellerId ? await fetchSellerOrders(sellerId) : [];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ManageOrders orders={orders} />
    </div>
  );
};

export default ManageOrdersPage;
