"use client";

import { AlertDialog, Button } from "@heroui/react";

const ManageOrders = ({ orders }) => {
  const handleAccept = async (orderId) => {
    alert("Order accepted");
  };

  const handleReject = async (orderId) => {
    alert("Order rejected");
  };

  const handleStatusChange = async (orderId, newStatus) => {
    alert(`Order status updated to ${newStatus}`);
  };

  const getNextStatus = (currentStatus) => {
    const flow = {
      accepted: "processing",
      processing: "shipped",
      shipped: "delivered",
    };
    return flow[currentStatus];
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        <p className="text-gray-600 mt-1">Handle incoming customer orders</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Buyer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Payment
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
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {order.buyerInfo.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {order.productTitle}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded font-medium ${statusColors[order.orderStatus]}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      {order.orderStatus === "pending" && (
                        <>
                          <AlertDialog>
                            <AlertDialog.Trigger>
                              <Button
                                size="sm"
                                variant="flat"
                                className="bg-green-100 text-green-700"
                              >
                                Accept
                              </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-96">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="success" />
                                    <AlertDialog.Heading>
                                      Accept order?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p>
                                      This order from{" "}
                                      <strong>{order.buyerInfo.name}</strong>{" "}
                                      will be accepted.
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => handleAccept(order._id)}
                                      slot="close"
                                      variant="flat"
                                      className="bg-green-600 text-white"
                                    >
                                      Accept
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>

                          <AlertDialog>
                            <AlertDialog.Trigger>
                              <Button
                                size="sm"
                                variant="flat"
                                className="bg-red-100 text-red-700"
                              >
                                Reject
                              </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-96">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>
                                      Reject order?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p>
                                      This order from{" "}
                                      <strong>{order.buyerInfo.name}</strong>{" "}
                                      will be rejected.
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => handleReject(order._id)}
                                      slot="close"
                                      variant="danger"
                                    >
                                      Reject
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        </>
                      )}

                      {order.orderStatus !== "pending" &&
                        order.orderStatus !== "delivered" && (
                          <AlertDialog>
                            <AlertDialog.Trigger>
                              <Button
                                size="sm"
                                variant="flat"
                                className="bg-blue-100 text-blue-700"
                              >
                                Update
                              </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-96">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="info" />
                                    <AlertDialog.Heading>
                                      Update order status?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p>
                                      Mark order as{" "}
                                      <strong>
                                        {getNextStatus(order.orderStatus)}
                                      </strong>
                                      ?
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleStatusChange(
                                          order._id,
                                          getNextStatus(order.orderStatus),
                                        )
                                      }
                                      slot="close"
                                      variant="flat"
                                      className="bg-blue-600 text-white"
                                    >
                                      Update
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        )}

                      {order.orderStatus === "delivered" && (
                        <span className="text-xs text-gray-500">Completed</span>
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

export default ManageOrders;
