import Orders from "@/components/dashboard/buyer/Orders";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchBuyerOrders } from "@/lib/fetch";

const OrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const buyerId = session?.user?.id;

  const orders = await fetchBuyerOrders(buyerId);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Orders orders={orders} />
    </div>
  );
};

export default OrdersPage;
