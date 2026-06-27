"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { removeFromWishlist } from "@/lib/actions";
import { addToCart } from "@/lib/cart";
import { FaCartPlus } from "react-icons/fa6";

const Wishlist = ({ items }) => {
  const [wishlist, setWishlist] = useState(items);

  const handleAddToCart = (product) => {
    addToCart(product.product, 1);
    toast.success("Added to cart");
  };

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlist(wishlist.filter((item) => item._id !== wishlistId));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4 text-lg">No items in wishlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-600 mt-1">Your saved products</p>
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
                  Price
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
              {wishlist.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {item.product.title}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {item.product.sellerInfo?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-semibold">
                    ৳{item.product.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                      {item.product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-5">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer text-lg"
                      >
                        <FaCartPlus />
                      </button>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
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

export default Wishlist;
