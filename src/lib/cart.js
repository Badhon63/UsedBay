export const addToCart = (product, quantity) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};
