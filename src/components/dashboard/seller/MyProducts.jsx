"use client";

import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AlertDialog, Button } from "@heroui/react";
import { DeleteProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";

const MyProducts = ({ products }) => {
  const router = useRouter();
  const handleDelete = async (productId) => {
    const res = await DeleteProduct(productId);
    router.refresh();
  };

  if (!products.length) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">No products listed yet</p>
          <Link
            href="/dashboard/seller/add-product"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Add your first product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
        <p className="text-gray-600 mt-1">Manage your product listings</p>
      </div>

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
                      >
                        <FiEdit className="w-5 h-5" />
                      </Link>

                      <AlertDialog>
                        <AlertDialog.Trigger>
                          <button className="text-red-600 hover:text-red-700 cursor-pointer">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-96">
                              <AlertDialog.CloseTrigger />
                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                  Delete permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                <p>
                                  This will permanently delete{" "}
                                  <strong>{product.title}</strong>.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleDelete(product._id)}
                                  variant="danger"
                                >
                                  Delete
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
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

export default MyProducts;
