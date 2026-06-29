"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSession } from "@/lib/auth-client";
import { createPaymentIntent, confirmPayment } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "16px",
      color: "#374151",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

// ---- Inner form (uses Stripe hooks) ----
const PaymentForm = ({ product, form }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) return;
    if (!session?.user) return router.push("/login");

    setLoading(true);
    setError("");

    try {
      // 1. Create payment intent on server
      const intentData = await createPaymentIntent(product.price);
      if (!intentData?.clientSecret) throw new Error("Could not initialize payment.");

      // 2. Confirm card payment via Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        intentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: session.user.name, email: session.user.email },
          },
        }
      );

      if (stripeError) throw new Error(stripeError.message);

      if (paymentIntent.status === "succeeded") {
        // 3. Save order + payment in DB
        const result = await confirmPayment({
          transactionId: paymentIntent.id,
          buyerInfo: {
            userId: session.user.id,
            name: session.user.name,
            email: session.user.email,
            phone: form.phone,
          },
          sellerInfo: product.sellerInfo,
          productId: product._id,
          productTitle: product.title,
          deliveryInfo: {
            address: form.address,
            city: form.city,
            phone: form.phone,
          },
          totalAmount: product.price,
        });

        if (result?.success) {
          router.push(
            `/payment/success?tran_id=${paymentIntent.id}&amount=${product.price}&product=${encodeURIComponent(product.title)}`
          );
        }
      }
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg px-3 py-3">
          <CardElement options={CARD_STYLE} />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Test card: 4242 4242 4242 4242 | Any future date | Any CVC
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !stripe}
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-60"
      >
        {loading ? "Processing payment..." : `Pay ৳${product.price}`}
      </button>
      <p className="text-xs text-gray-400 text-center">Secured by Stripe</p>
    </div>
  );
};

// ---- Outer component wraps with Elements ----
const CheckoutClient = ({ product }) => {
  const [form, setForm] = useState({ address: "", city: "", phone: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (!product)
    return <div className="p-8 text-center text-gray-400">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="relative h-48 w-full rounded-lg mb-4 overflow-hidden bg-gray-100">
            <Image
              src={product.images?.[0]}
              alt={product.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{product.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Seller: {product.sellerInfo?.name}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {product.condition}
            </span>
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-teal-600">৳{product.price}</span>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="border rounded-xl p-5 bg-white shadow-sm space-y-5">
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="space-y-3">
              {[
                { label: "Full Address", name: "address", placeholder: "House, Road, Area" },
                { label: "City", name: "city", placeholder: "Dhaka, Chittagong..." },
                { label: "Phone Number", name: "phone", placeholder: "01XXXXXXXXX" },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm product={product} form={form} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;