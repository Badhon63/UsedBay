"use client";

import Loading from "@/app/loading";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0d9488", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminAnalyticsPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    Promise.all([
      fetch(`${url}/api/admin/orders`).then((r) => r.json()),
      fetch(`${url}/api/admin/users`).then((r) => r.json()),
      fetch(`${url}/api/admin/products`).then((r) => r.json()),
    ])
      .then(([o, u, p]) => {
        setOrders(o);
        setUsers(u);
        setProducts(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Monthly orders chart data
  const monthly = {};
  orders.forEach((o) => {
    if (o.createdAt) {
      const month = new Date(o.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + 1;
    }
  });
  const monthlyData = Object.entries(monthly).map(([month, count]) => ({
    month,
    count,
  }));

  // Category performance
  const categories = {};
  products.forEach((p) => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  const categoryData = Object.entries(categories).map(([name, value]) => ({
    name,
    value,
  }));

  // User roles
  const roles = { buyer: 0, seller: 0, admin: 0 };
  users.forEach((u) => {
    if (roles[u.role] !== undefined) roles[u.role]++;
  });
  const roleData = Object.entries(roles).map(([name, value]) => ({
    name,
    value,
  }));

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      color: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
      label: "Total Products",
      value: products.length,
      color: "text-teal-700 bg-teal-50 border-teal-200",
    },
    {
      label: "Total Orders",
      value: orders.length,
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
    {
      label: "Total Revenue",
      value: `৳${orders.reduce((s, o) => s + (o.totalAmount || 0), 0)}`,
      color: "text-green-700 bg-green-50 border-green-200",
    },
  ];

  if (loading) return <div className="mx-auto">{Loading()}</div>;

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600 mt-1">Overall business insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className={`border rounded-xl p-5 shadow-sm ${color}`}
          >
            <p className="text-sm font-medium opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Monthly Orders Line Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Orders
        </h2>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center py-10 text-gray-400">No order data yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Performance Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Categories
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Role Pie */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            User Distribution
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {roleData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
