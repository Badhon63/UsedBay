const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchMyProducts = async (sellerId = null) => {
  let endpoint = `${url}/api/products`;
  if (sellerId) {
    endpoint += `?sellerId=${sellerId}`;
  }
  const res = await fetch(endpoint);
  return res.json();
};

export const fetchProductById = async (productId) => {
  const res = await fetch(`${url}/api/products/${productId}`);
  return res.json();
};
