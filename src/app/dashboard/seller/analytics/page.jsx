import Analytics from "@/components/dashboard/seller/Analytics";
import { fetchSellerStats } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AnalyticsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sellerId = session?.user?.id;

  const stats = sellerId ? await fetchSellerStats(sellerId) : null;

  return (
    <div>
      <Analytics stats={stats} />
    </div>
  );
};

export default AnalyticsPage;
