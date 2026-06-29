const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchMyProducts = async (sellerId = null) => {
  let endpoint = `${url}/api/products`;
  if (sellerId) endpoint += `?sellerId=${sellerId}`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchMyProducts error:", error.message);
    return [];
  }
};

export const fetchProductById = async (productId) => {
  try {
    const res = await fetch(`${url}/api/products/${productId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchProductById error:", error.message);
    return null;
  }
};

export const fetchAllProductsPage = async (page = 1, search = "", sort = "newest") => {
  try {
    const res = await fetch(
      `${url}/api/all-products?page=${page}&search=${search}&sort=${sort}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchAllProductsPage error:", error.message);
    return { products: [], total: 0, pages: 0, currentPage: 1 };
  }
};

export const fetchBuyerOrders = async (buyerId) => {
  try {
    const res = await fetch(`${url}/api/orders?buyerId=${buyerId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchBuyerOrders error:", error.message);
    return [];
  }
};

export const fetchSellerOrders = async (sellerId) => {
  try {
    const res = await fetch(`${url}/api/orders?sellerId=${sellerId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchSellerOrders error:", error.message);
    return [];
  }
};

export const fetchWishlist = async (userId) => {
  try {
    const res = await fetch(`${url}/api/wishlist?userId=${userId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchWishlist error:", error.message);
    return [];
  }
};

export const fetchSellerStats = async (sellerId) => {
  try {
    const res = await fetch(`${url}/api/seller/stats?sellerId=${sellerId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchSellerStats error:", error.message);
    return {};
  }
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const res = await fetch(`${url}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus }),
    });
    return res.json();
  } catch (error) {
    console.error("updateOrderStatus error:", error.message);
    return null;
  }
};

export const createPaymentIntent = async (amount) => {
  try {
    const res = await fetch(`${url}/api/payment/create-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    return res.json();
  } catch (error) {
    console.error("createPaymentIntent error:", error.message);
    return null;
  }
};

export const confirmPayment = async (paymentData) => {
  try {
    const res = await fetch(`${url}/api/payment/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  } catch (error) {
    console.error("confirmPayment error:", error.message);
    return null;
  }
};

export const fetchPaymentHistory = async (buyerId) => {
  try {
    const res = await fetch(`${url}/api/payments?buyerId=${buyerId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchPaymentHistory error:", error.message);
    return [];
  }
};