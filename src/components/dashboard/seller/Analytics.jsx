"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#0d9488", "#6366f1", "#f59e0b", "#ef4444"];

const Analytics = ({ stats }) => {
  const monthlyData = Object.entries(stats?.monthly || {}).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  const pieData = [
    { name: "Pending", value: stats?.pendingOrders || 0 },
    { name: "Completed", value: (stats?.totalOrders || 0) - (stats?.pendingOrders || 0) },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="text-gray-600 mt-1">Your sales performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `৳${stats?.totalRevenue || 0}`, color: "text-teal-600" },
          { label: "Total Orders", value: stats?.totalOrders || 0, color: "text-indigo-600" },
          { label: "Pending Orders", value: stats?.pendingOrders || 0, color: "text-yellow-600" },
          { label: "Total Products", value: stats?.totalProducts || 0, color: "text-gray-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Monthly Revenue Line Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `৳${v}`} />
              <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400 text-center py-10">No sales data yet.</p>
        )}
      </div>

      {/* Bar + Pie side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Month (Bar)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `৳${v}`} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Split</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieData.map((_, i) => (
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

export default Analytics;