import DashboardHome from "@/components/dashboard/seller/DashboardHome";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchSellerDashboard } from "@/lib/fetch";

const DashboardHomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sellerId = session?.user?.id;

  const dashboardData = sellerId ? await fetchSellerDashboard(sellerId) : null;

  return (
    <div>
      <DashboardHome data={dashboardData} />
    </div>
  );
};

export default DashboardHomePage;
