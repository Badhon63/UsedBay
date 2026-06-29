"use client";

import Link from "next/link";
import { FiShoppingBag, FiHeart, FiTrendingUp } from "react-icons/fi";

const DashboardHome = ({ totalOrders, wishlistCount, recentPurchases }) => {
  const stats = [
    {
      id: 1,
      label: "Total Orders",
      value: totalOrders,
      icon: FiShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/dashboard/buyer/orders",
    },
    {
      id: 2,
      label: "Wishlist Count",
      value: wishlistCount,
      icon: FiHeart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      link: "/dashboard/buyer/wishlist",
    },
    {
      id: 3,
      label: "Recent Purchases",
      value: recentPurchases.length,
      icon: FiTrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/dashboard/buyer/orders",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s your overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.id}
              href={stat.link}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Purchases</h2>
          <Link
            href="/dashboard/buyer/orders"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
          >
            View All →
          </Link>
        </div>

        {recentPurchases.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">🛍️</p>
            <p className="text-gray-400">No purchases yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPurchases.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="text-gray-900 font-medium">{item.productTitle || item.title}</p>
                  {item.totalAmount && (
                    <p className="text-sm text-teal-600 font-semibold">৳{item.totalAmount}</p>
                  )}
                </div>
                <span className={`text-xs px-3 py-1 rounded font-medium ${
                  item.orderStatus === "delivered"
                    ? "bg-green-100 text-green-800"
                    : item.orderStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {item.orderStatus ? item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1) : "Purchased"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;