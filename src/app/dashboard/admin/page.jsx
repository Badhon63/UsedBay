import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const url =
  process.env.SERVER_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

const fetchAdminStats = async () => {
  try {
    const [usersRes, productsRes, ordersRes] = await Promise.all([
      fetch(`${url}/api/admin/users`, { cache: "no-store" }),
      fetch(`${url}/api/admin/products`, { cache: "no-store" }),
      fetch(`${url}/api/admin/orders`, { cache: "no-store" }),
    ]);
    const users = await usersRes.json();
    const products = await productsRes.json();
    const orders = await ordersRes.json();
    return { users, products, orders };
  } catch {
    return { users: [], products: [], orders: [] };
  }
};

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { users, products, orders } = await fetchAdminStats();

  const stats = [
    {
      label: "Total Users",
      value: users.length || 0,
      icon: "👥",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      href: "/dashboard/admin/manage-users",
    },
    {
      label: "Total Products",
      value: products.length || 0,
      icon: "📦",
      color: "bg-teal-50 border-teal-200 text-teal-700",
      href: "/dashboard/admin/manage-products",
    },
    {
      label: "Total Orders",
      value: orders.length || 0,
      icon: "🛒",
      color: "bg-purple-50 border-purple-200 text-purple-700",
      href: "/dashboard/admin/manage-orders",
    },
    {
      label: "Total Revenue",
      value: `৳${orders.reduce((s, o) => s + (o.totalAmount || 0), 0)}`,
      icon: "💰",
      color: "bg-green-50 border-green-200 text-green-700",
      href: "/dashboard/admin/analytics",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome, {session?.user?.name} — Platform Summary
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className={`border rounded-xl p-5 shadow-sm ${color} hover:shadow-md transition`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium opacity-80">{label}</p>
              <span className="text-2xl">{icon}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Manage Users",
            href: "/dashboard/admin/manage-users",
            color: "bg-blue-600 hover:bg-blue-700",
          },
          {
            label: "Manage Products",
            href: "/dashboard/admin/manage-products",
            color: "bg-teal-600 hover:bg-teal-700",
          },
          {
            label: "Manage Orders",
            href: "/dashboard/admin/manage-orders",
            color: "bg-purple-600 hover:bg-purple-700",
          },
          {
            label: "Analytics",
            href: "/dashboard/admin/analytics",
            color: "bg-indigo-600 hover:bg-indigo-700",
          },
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

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/admin/manage-orders"
            className="text-sm text-teal-600 hover:underline"
          >
            View all →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Buyer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order.buyerInfo?.name}</td>
                    <td className="py-3 px-4 text-gray-600 truncate max-w-37.5">
                      {order.productTitle}
                    </td>
                    <td className="py-3 px-4 font-bold text-teal-600">
                      ৳{order.totalAmount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 capitalize">
                        {order.orderStatus}
                      </span>
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

export default AdminOverviewPage;
