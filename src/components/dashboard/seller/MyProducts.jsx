"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { fetchMyProducts } from "@/lib/fetch";
import { Spinner } from "@heroui/react";

const MyProducts = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchMyProducts(user?.id);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      getProducts();
    }
  }, [user?.id]);

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      // You'll need to create deleteProduct function
      await deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <Spinner color="current" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
        <p className="text-gray-600 mt-1">Manage your product listings</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">No products listed yet</p>
          <Link
            href="/dashboard/seller/add-product"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Condition
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {product.title}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-semibold">
                      ৳{product.price}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {product.condition}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          href={`/dashboard/seller/edit-product/${product._id}`}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
