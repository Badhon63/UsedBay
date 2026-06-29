import { fetchPaymentHistory } from "@/lib/fetch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PaymentHistoryPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const payments = session?.user
    ? await fetchPaymentHistory(session.user.id)
    : [];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-600 mt-1">All your past transactions</p>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💳</div>
          <p className="text-gray-400 text-lg">No payment records yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs text-gray-600 max-w-45 truncate">
                      {payment.transactionId}
                    </td>
                    <td className="py-3 px-4 font-bold text-teal-600">
                      ৳{payment.amount}
                    </td>
                    <td className="py-3 px-4 text-gray-600 capitalize">
                      {payment.paymentMethod || "card"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded font-medium ${
                          payment.paymentStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : payment.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(payment.paymentDate).toLocaleDateString(
                        "en-BD",
                      )}
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

export default PaymentHistoryPage;
