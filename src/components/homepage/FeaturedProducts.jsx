"use client";

import ProductCard from "../products/ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      _id: "product001",
      title: "Used Dell Inspiron 15 Laptop",
      category: "Electronics",
      condition: "Good",
      price: 35000,
      images: ["https://picsum.photos/300/200?random=1"],
      description:
        "Dell Inspiron 15, Core i5 10th Gen, 8GB RAM, 512GB SSD. Used for 2 years.",
      sellerInfo: {
        name: "Nusrat Jahan",
      },
    },
    {
      _id: "product002",
      title: "Wooden Dining Table",
      category: "Furniture",
      condition: "Like New",
      price: 15000,
      images: ["https://picsum.photos/300/200?random=2"],
      description:
        "Beautiful wooden dining table, 6 seater, excellent condition.",
      sellerInfo: {
        name: "Ahmed Khan",
      },
    },
    {
      _id: "product003",
      title: "Honda City 2015",
      category: "Vehicles",
      condition: "Good",
      price: 800000,
      images: ["https://picsum.photos/300/200?random=3"],
      description:
        "Honda City 2015, well maintained, single owner, no accidents.",
      sellerInfo: {
        name: "Fatima Begum",
      },
    },
    {
      _id: "product004",
      title: "Designer Winter Jacket",
      category: "Fashion",
      condition: "Like New",
      price: 4500,
      images: ["https://picsum.photos/300/200?random=4"],
      description: "Brand new designer winter jacket, only worn once.",
      sellerInfo: {
        name: "Sophia Ahmed",
      },
    },
    {
      _id: "product005",
      title: "iPhone 12 Pro",
      category: "Mobile Phones",
      condition: "Good",
      price: 45000,
      images: ["https://picsum.photos/300/200?random=5"],
      description:
        "iPhone 12 Pro, 256GB, all accessories included, screen protector applied.",
      sellerInfo: {
        name: "Karim Hassan",
      },
    },
    {
      _id: "product006",
      title: "Vintage Book Collection",
      category: "Books",
      condition: "Good",
      price: 2000,
      images: ["https://picsum.photos/300/200?random=6"],
      description:
        "Collection of 10 vintage English novels in great condition.",
      sellerInfo: {
        name: "Rifat Islam",
      },
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">Check out our latest listings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
