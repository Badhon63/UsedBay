import { fetchSellerStats, fetchSellerOrders } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const SellerOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const stats = session?.user ? await fetchSellerStats(session.user.id) : {};
  const orders = session?.user ? await fetchSellerOrders(session.user.id) : [];
  const recentOrders = orders.slice(0, 5);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {session?.user?.name} 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Revenue",
            value: `৳${stats?.totalRevenue || 0}`,
            bg: "bg-teal-50",
            border: "border-teal-200",
            text: "text-teal-700",
            icon: "💰",
          },
          {
            label: "Total Orders",
            value: stats?.totalOrders || 0,
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            text: "text-indigo-700",
            icon: "📦",
          },
          {
            label: "Pending Orders",
            value: stats?.pendingOrders || 0,
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-700",
            icon: "⏳",
          },
          {
            label: "Total Products",
            value: stats?.totalProducts || 0,
            bg: "bg-gray-50",
            border: "border-gray-200",
            text: "text-gray-700",
            icon: "🛍️",
          },
        ].map(({ label, value, bg, border, text, icon }) => (
          <div
            key={label}
            className={`${bg} border ${border} rounded-xl p-5 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{label}</p>
              <span className="text-xl">{icon}</span>
            </div>
            <p className={`text-2xl font-bold ${text}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Add Product", href: "/dashboard/seller/add-product", color: "bg-teal-600 hover:bg-teal-700" },
          { label: "My Products", href: "/dashboard/seller/my-products", color: "bg-indigo-600 hover:bg-indigo-700" },
          { label: "Manage Orders", href: "/dashboard/seller/manage-orders", color: "bg-yellow-500 hover:bg-yellow-600" },
          { label: "Analytics", href: "/dashboard/seller/analytics", color: "bg-purple-600 hover:bg-purple-700" },
        ].map(({ label, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`${color} text-white text-center py-3 rounded-xl font-semibold text-sm transition`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/seller/manage-orders"
            className="text-sm text-teal-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400">No orders yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Buyer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {order.buyerInfo?.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-[150px] truncate">
                      {order.productTitle}
                    </td>
                    <td className="py-3 px-4 font-bold text-teal-600">
                      ৳{order.totalAmount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium capitalize ${
                          statusColors[order.orderStatus] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOverviewPage;