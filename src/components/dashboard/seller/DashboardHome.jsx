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

const DashboardHome = () => {
  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: 24,
      icon: FiPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Total Sales",
      value: 156,
      icon: FiTrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Total Revenue",
      value: "৳425,000",
      icon: FiDollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: 4,
      label: "Pending Orders",
      value: 8,
      icon: FiClock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const chartData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
    { month: "Jul", sales: 3490 },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Dell Inspiron 15 Laptop",
      sales: 45,
      revenue: "৳1,575,000",
    },
    { id: 2, name: "iPhone 12 Pro", sales: 32, revenue: "৳1,440,000" },
    { id: 3, name: "Wooden Dining Table", sales: 28, revenue: "৳420,000" },
    { id: 4, name: "Designer Winter Jacket", sales: 18, revenue: "৳81,000" },
    { id: 5, name: "Honda City 2015", sales: 5, revenue: "৳4,000,000" },
  ];

  const recentOrders = [
    {
      id: 1,
      orderNum: "ORD-001",
      buyer: "Md. Rakib Hasan",
      product: "Dell Inspiron 15",
      status: "delivered",
      amount: "৳35,000",
    },
    {
      id: 2,
      orderNum: "ORD-002",
      buyer: "Fatima Begum",
      product: "iPhone 12 Pro",
      status: "shipped",
      amount: "৳45,000",
    },
    {
      id: 3,
      orderNum: "ORD-003",
      buyer: "Ahmed Khan",
      product: "Wooden Dining Table",
      status: "processing",
      amount: "৳15,000",
    },
    {
      id: 4,
      orderNum: "ORD-004",
      buyer: "Sophia Ahmed",
      product: "Winter Jacket",
      status: "accepted",
      amount: "৳4,500",
    },
    {
      id: 5,
      orderNum: "ORD-005",
      buyer: "Karim Hassan",
      product: "Vintage Books",
      status: "pending",
      amount: "৳2,000",
    },
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Samsung 55 inch TV",
      price: "৳65,000",
      status: "available",
    },
    {
      id: 2,
      name: "Vintage Leather Sofa",
      price: "৳28,000",
      status: "available",
    },
    { id: 3, name: "Mountain Bike", price: "৳18,000", status: "pending" },
    { id: 4, name: "Microwave Oven", price: "৳5,500", status: "available" },
    { id: 5, name: "Office Chair", price: "৳8,000", status: "available" },
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
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
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
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map((product) => (
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
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
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
              {topProducts.map((product) => (
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
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
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
              {recentOrders.map((order) => (
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
