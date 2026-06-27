"use server";

import { revalidatePath } from "next/cache";

const url = process.env.NEXT_PUBLIC_SERVER_URL;
export const createProduct = async (productData) => {
  const res = await fetch(`${url}/api/products`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const UpdateProduct = async (productId, newData) => {
  const res = await fetch(`${url}/api/products/${productId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newData),
  });
  return res.json();
};

export const DeleteProduct = async (productId) => {
  const res = await fetch(`${url}/api/products/${productId}`, {
    method: "DELETE",
  });
  if (res.deletedCount) {
    revalidatePath("/dashboard/seller/my-products");
  }
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${url}/api/orders`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};
