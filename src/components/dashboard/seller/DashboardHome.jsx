"use client";

import { FiPackage, FiTrendingUp, FiDollarSign, FiClock } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const DashboardHome = ({ data }) => {
  if (!data) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: data.stats.totalProducts,
      icon: FiPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Total Sales",
      value: data.stats.totalSales,
      icon: FiTrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Total Revenue",
      value: data.stats.totalRevenue,
      icon: FiDollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: 4,
      label: "Pending Orders",
      value: data.stats.pendingOrders,
      icon: FiClock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      processing: "bg-yellow-100 text-yellow-800",
      accepted: "bg-purple-100 text-purple-800",
      pending: "bg-gray-100 text-gray-800",
      available: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s your overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start gap-5">
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
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Monthly Sales</h2>
            <Link
              href="/dashboard/seller/analytics"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
            >
              View All →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#16B896"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
            <Link
              href="/dashboard/seller/my-products"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentProducts.map((product) => (
              <div key={product.id} className="pb-3 border-b last:border-b-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {product.price}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Top Selling Products
          </h2>
          <Link
            href="/dashboard/seller/analytics"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Sales
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {data.topProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.sales}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/seller/manage-orders"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Order
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Buyer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {order.orderNum}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{order.buyer}</td>
                  <td className="py-3 px-4 text-gray-700">{order.product}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
