// Server Component এ relative URL কাজ করে না, তাই
// next.config.js এ /server/* → localhost:5000/* proxy করা হয়েছে

const getUrl = () => {
  // Server side (SSR) — absolute URL লাগে
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  }
  // Client side — proxy route use করি
  return "/server";
};

// ===================== PRODUCTS =====================

export const fetchMyProducts = async (sellerId = null) => {
  let endpoint = `${getUrl()}/api/products`;
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
    const res = await fetch(`${getUrl()}/api/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchProductById error:", error.message);
    return null;
  }
};

export const fetchAllProductsPage = async (
  page = 1,
  search = "",
  sort = "newest"
) => {
  try {
    const res = await fetch(
      `${getUrl()}/api/all-products?page=${page}&search=${encodeURIComponent(search)}&sort=${sort}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchAllProductsPage error:", error.message);
    return { products: [], total: 0, pages: 0, currentPage: 1 };
  }
};

// ===================== ORDERS =====================

export const fetchBuyerOrders = async (buyerId) => {
  try {
    const res = await fetch(`${getUrl()}/api/orders?buyerId=${buyerId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchBuyerOrders error:", error.message);
    return [];
  }
};

export const fetchSellerOrders = async (sellerId) => {
  try {
    const res = await fetch(`${getUrl()}/api/orders?sellerId=${sellerId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchSellerOrders error:", error.message);
    return [];
  }
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const res = await fetch(`${getUrl()}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("updateOrderStatus error:", error.message);
    return null;
  }
};

// ===================== WISHLIST =====================

export const fetchWishlist = async (userId) => {
  try {
    const res = await fetch(`${getUrl()}/api/wishlist?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchWishlist error:", error.message);
    return [];
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const res = await fetch(`${getUrl()}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("addToWishlist error:", error.message);
    return null;
  }
};

export const removeFromWishlist = async (wishlistItemId) => {
  try {
    const res = await fetch(`${getUrl()}/api/wishlist/${wishlistItemId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("removeFromWishlist error:", error.message);
    return null;
  }
};

// ===================== SELLER =====================

export const fetchSellerStats = async (sellerId) => {
  try {
    const res = await fetch(
      `${getUrl()}/api/seller/stats?sellerId=${sellerId}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchSellerStats error:", error.message);
    return {};
  }
};

// ===================== ADMIN =====================

export const fetchAllUsers = async () => {
  try {
    const res = await fetch(`${getUrl()}/api/admin/users`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchAllUsers error:", error.message);
    return [];
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const res = await fetch(`${getUrl()}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("updateUserStatus error:", error.message);
    return null;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${getUrl()}/api/admin/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("deleteUser error:", error.message);
    return null;
  }
};

export const fetchAllOrders = async () => {
  try {
    const res = await fetch(`${getUrl()}/api/admin/orders`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchAllOrders error:", error.message);
    return [];
  }
};

export const fetchAllProductsAdmin = async () => {
  try {
    const res = await fetch(`${getUrl()}/api/admin/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetchAllProductsAdmin error:", error.message);
    return [];
  }
};

// ===================== PAYMENT (SSLCommerz) =====================

export const initPayment = async ({
  amount,
  buyerInfo,
  productId,
  productTitle,
  sellerInfo,
  deliveryInfo,
}) => {
  try {
    const res = await fetch(`${getUrl()}/api/payment/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        buyerInfo,
        productId,
        productTitle,
        sellerInfo,
        deliveryInfo,
      }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json(); // { url: GatewayPageURL }
  } catch (error) {
    console.error("initPayment error:", error.message);
    return null;
  }
};