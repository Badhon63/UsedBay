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

export const fetchAllProductsPage = async (
  page = 1,
  search = "",
  sort = "newest",
) => {
  const res = await fetch(
    `${url}/api/all-products?page=${page}&search=${search}&sort=${sort}`,
  );
  return res.json();
};

export const fetchBuyerOrders = async (buyerId) => {
  const res = await fetch(`${url}/api/orders?buyerId=${buyerId}`);
  return res.json();
};

export const fetchSellerOrders = async (sellerId) => {
  const res = await fetch(`${url}/api/orders?sellerId=${sellerId}`);
  return res.json();
};
