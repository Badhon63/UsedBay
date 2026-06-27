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

        <div className="space-y-3">
          {recentPurchases.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <p className="text-gray-900 font-medium">{product.title}</p>
              <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                Purchased
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
