import ManageOrders from "@/components/seller/ManageOrders";
import { fetchSellerOrders } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManageOrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const orders = session?.user ? await fetchSellerOrders(session.user.id) : [];

  return <ManageOrders orders={orders} />;
};

export default ManageOrdersPage;