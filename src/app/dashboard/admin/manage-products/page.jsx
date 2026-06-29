"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const url = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${url}/api/admin/products`)
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (productId) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${url}/api/products/${productId}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const handleStatusChange = async (productId, status) => {
    await fetch(`${url}/api/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setProducts((prev) => prev.map((p) => p._id === productId ? { ...p, status } : p));
  };

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <p className="text-gray-600 mt-1">Review and moderate all product listings</p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading products...</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Seller</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">No products found.</td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.images?.[0] && (
                              <Image src={product.images[0]} alt={product.title} fill unoptimized className="object-cover" />
                            )}
                          </div>
                          <span className="font-medium text-gray-900 truncate max-w-[150px]">{product.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{product.sellerInfo?.name}</td>
                      <td className="py-3 px-4 font-bold text-teal-600">৳{product.price}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          product.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          {product.status === "available" ? (
                            <button
                              onClick={() => handleStatusChange(product._id, "unavailable")}
                              className="text-xs px-3 py-1.5 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 font-medium transition"
                            >
                              Reject
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(product._id, "available")}
                              className="text-xs px-3 py-1.5 rounded bg-green-100 text-green-700 hover:bg-green-200 font-medium transition"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-xs px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 font-medium transition"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProductsPage;