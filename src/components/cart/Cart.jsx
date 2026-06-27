"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions";

const Cart = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setLoading(false);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Removed from cart");
  };

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let item of cart) {
      const orderData = {
        buyerInfo: { userId: user.id, name: user.name, email: user.email },
        sellerInfo: item.sellerInfo,
        productId: item._id,
        productTitle: item.title,
        totalAmount: item.price * item.quantity,
      };

      await createOrder(orderData);
      toast.success("product ordered successfully");
    }

    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4 text-lg">Your cart is empty</p>
          <Link
            href="/products"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-1">{cart.length} item(s) in cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {item.title}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        ৳{item.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center border border-gray-300 rounded-md w-fit">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 font-semibold">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-4 pb-4 border-b">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>৳{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>৳0</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>৳0</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 cursor-pointer mb-3"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-teal-600 hover:text-teal-700 font-medium text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
