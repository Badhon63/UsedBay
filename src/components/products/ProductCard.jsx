import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 w-full relative">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          unoptimized
          loading="eager"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h3>
        </div>

        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {product.condition}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-teal-600">
            ৳{product.price}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 cursor-pointer"
          >
            View
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          by {product.sellerInfo.name}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
