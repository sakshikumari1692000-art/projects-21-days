import React from "react";
import { Link } from "react-router";

const ProductCard = ({ productData }) => {
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    thumbnail,
  } = productData;

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    0
  );
  return (
    <Link to ={`products/${id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

           {/* Pricing */}
           <div className="mt-3">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-blue-600">
              ₹{discountedPrice}
            </p>
            <p className="text-sm line-through text-gray-400">₹{price}</p>
            <p className="text-xs font-semibold text-green-600">
              {discountPercentage}% OFF
            </p>
            </div>

          <span className="text-sm font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">
            ⭐ {rating}
          </span>
        </div>

        <div className="mt-3 text-xs text-gray-500 flex justify-between">
          <span>{brand}</span>
          <span className="capitalize">{category}</span>
        </div>

        <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
