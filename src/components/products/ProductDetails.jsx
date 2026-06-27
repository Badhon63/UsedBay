"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Added to cart");
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist");
  };

  const handleShare = () => {
    toast.success("Link copied");
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative h-96">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              unoptimized
              loading="eager"
              className="object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    mainImage === image ? "border-teal-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index}`}
                    width={80}
                    height={80}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>

          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded font-medium">
                {product.category}
              </span>
            </div>
            <div>
              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded font-medium">
                {product.condition}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-teal-600 mb-2">
              ৳{product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold text-green-600">
                {product.status}
              </span>
            </p>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Seller</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {product.sellerInfo.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              📧 {product.sellerInfo.email}
            </p>
            <p className="text-sm text-gray-600">
              📱 {product.sellerInfo.phone}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 items-center">
              <label className="text-sm font-medium text-gray-900">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  −
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 cursor-pointer"
            >
              Add to Cart
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleAddToWishlist}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <FiHeart className="w-5 h-5" />
                Wishlist
              </button>
              <button
                onClick={handleShare}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <FiShare2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* Contact Seller */}
          <button className="w-full border-2 border-teal-600 text-teal-600 py-3 rounded-md font-semibold hover:bg-teal-50 cursor-pointer">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
