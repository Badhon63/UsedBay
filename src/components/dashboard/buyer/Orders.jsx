"use client";

const Orders = ({ orders }) => {
  const statusColors = {
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4 text-lg">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track your orders</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Seller
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Total
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Date
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {order.productTitle}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {order.sellerInfo?.name || "Unknown Seller"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded font-medium ${
                        statusColors[order.orderStatus]
                      }`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900 font-semibold">
                    ৳{order.totalAmount?.toLocaleString() || "0"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {order.createdAt ? formatDate(order.createdAt) : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium cursor-pointer">
                        View
                      </button>
                      {order.orderStatus === "delivered" && (
                        <button className="text-teal-600 hover:text-teal-700 text-xs font-medium cursor-pointer">
                          Review
                        </button>
                      )}
                    </div>
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

export default Orders;
