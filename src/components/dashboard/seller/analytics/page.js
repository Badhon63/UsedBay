import Analytics from "@/components/seller/Analytics";
import { fetchSellerStats } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AnalyticsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const stats = session?.user ? await fetchSellerStats(session.user.id) : {};

  return <Analytics stats={stats} />;
};

export default AnalyticsPage;