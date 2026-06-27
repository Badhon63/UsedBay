"use server";
const url = process.env.NEXT_PUBLIC_SERVER_URL;
export const createProduct = async (productData) => {
  const res = await fetch(`${url}/api/products`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
};
