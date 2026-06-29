import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-500 mb-8">
          Something went wrong with your payment. Please try again.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition text-center"
          >
            Back to Products
          </Link>
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}