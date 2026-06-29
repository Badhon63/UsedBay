"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const SuccessContent = () => {
  const params = useSearchParams();
  const tran_id = params.get("tran_id");
  const amount = params.get("amount");
  const product = params.get("product");
  const date = new Date().toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h1>
        <p className="text-gray-500 text-sm mb-6">Your order has been placed successfully.</p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Product</span>
            <span className="text-sm font-medium text-gray-800 max-w-[60%] text-right">{product}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount Paid</span>
            <span className="text-sm font-bold text-teal-600">৳{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Payment Date</span>
            <span className="text-sm text-gray-700">{date}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">Transaction ID</span>
            <span className="text-xs font-mono text-gray-600 max-w-[60%] text-right break-all">{tran_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Payment Status</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Paid</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/buyer/orders"
            className="bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition text-center"
          >
            View My Orders
          </Link>
          <Link
            href="/dashboard/buyer/payment-history"
            className="border border-teal-600 text-teal-600 py-2.5 rounded-lg font-semibold hover:bg-teal-50 transition text-center"
          >
            Payment History
          </Link>
          <Link
            href="/products"
            className="text-gray-500 text-sm hover:text-gray-700 transition"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}