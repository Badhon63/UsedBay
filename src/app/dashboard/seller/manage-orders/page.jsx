import ManageOrders from "@/components/dashboard/seller/ManageOrders";

const dummyOrders = [
  {
    _id: "order001",
    buyerInfo: {
      userId: "user001",
      name: "Md. Rakib Hasan",
      email: "rakib@gmail.com",
    },
    productId: "product001",
    productTitle: "Dell Inspiron 15 Laptop",
    paymentStatus: "paid",
    orderStatus: "pending",
  },
  {
    _id: "order002",
    buyerInfo: {
      userId: "user002",
      name: "Fatima Begum",
      email: "fatima@gmail.com",
    },
    productId: "product002",
    productTitle: "iPhone 12 Pro",
    paymentStatus: "paid",
    orderStatus: "pending",
  },
  {
    _id: "order003",
    buyerInfo: {
      userId: "user003",
      name: "Ahmed Khan",
      email: "ahmed@gmail.com",
    },
    productId: "product003",
    productTitle: "Wooden Dining Table",
    paymentStatus: "paid",
    orderStatus: "accepted",
  },
  {
    _id: "order004",
    buyerInfo: {
      userId: "user004",
      name: "Sophia Ahmed",
      email: "sophia@gmail.com",
    },
    productId: "product004",
    productTitle: "Designer Winter Jacket",
    paymentStatus: "paid",
    orderStatus: "processing",
  },
  {
    _id: "order005",
    buyerInfo: {
      userId: "user005",
      name: "Karim Hassan",
      email: "karim@gmail.com",
    },
    productId: "product005",
    productTitle: "Samsung 55 inch TV",
    paymentStatus: "paid",
    orderStatus: "shipped",
  },
  {
    _id: "order006",
    buyerInfo: { userId: "user006", name: "Rina Das", email: "rina@gmail.com" },
    productId: "product006",
    productTitle: "Mountain Bike",
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
  {
    _id: "order007",
    buyerInfo: {
      userId: "user007",
      name: "Tanvir Rahman",
      email: "tanvir@gmail.com",
    },
    productId: "product007",
    productTitle: "Leather Sofa Set",
    paymentStatus: "paid",
    orderStatus: "pending",
  },
  {
    _id: "order008",
    buyerInfo: {
      userId: "user008",
      name: "Mira Saha",
      email: "mira@gmail.com",
    },
    productId: "product008",
    productTitle: "Canon EOS 5D Mark IV",
    paymentStatus: "paid",
    orderStatus: "processing",
  },
  {
    _id: "order009",
    buyerInfo: {
      userId: "user009",
      name: "Arjun Roy",
      email: "arjun@gmail.com",
    },
    productId: "product009",
    productTitle: "Vintage Book Collection",
    paymentStatus: "paid",
    orderStatus: "shipped",
  },
  {
    _id: "order010",
    buyerInfo: {
      userId: "user010",
      name: "Nadia Islam",
      email: "nadia@gmail.com",
    },
    productId: "product010",
    productTitle: "Used MacBook Pro",
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
];

const ManageOrdersPage = async () => {
  const orders = dummyOrders;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ManageOrders orders={orders} />
    </div>
  );
};

export default ManageOrdersPage;
