import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdpComponent = ({ id }) => {
  const [productData, setProductData] = useState(null);
  const screenProducts = useSelector((state) => state.product.screenProducts);

  async function getData() {
    let apiData = await fetch(`https://dummyjson.com/products/${id}`);
    let jsonData = await apiData.json();
    setProductData(jsonData);
  }

  useEffect(() => {
    let product = screenProducts.find((p) => p.id == id);
    if (product) {
      setProductData(product);
    } else {
      getData();
    }
  }, [id]);

  if (!productData) return <div className="p-10 text-gray-600">Loading...</div>;

  const discountedPrice = (
    productData.price -
    (productData.price * productData.discountPercentage) / 100
  ).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
  
        {/* PRODUCT CARD */}
        <div className="grid lg:grid-cols-2 gap-14 bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border">
  
          {/* IMAGE GALLERY */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-full h-[480px] rounded-3xl flex items-center justify-center shadow-inner">
              <img
                src={productData.thumbnail}
                alt={productData.title}
                className="max-h-full object-contain hover:scale-105 transition duration-500"
              />
            </div>
          </div>
  
          {/* PRODUCT DETAILS */}
          <div className="flex flex-col justify-between">
  
            <div>
              <p className="uppercase text-xs tracking-widest text-gray-400">
                {productData.brand}
              </p>
  
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                {productData.title}
              </h1>
  
              <p className="text-sm text-gray-500 mt-1 capitalize">
                {productData.category}
              </p>
  
              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    productData.rating >= 4
                      ? "bg-green-600"
                      : productData.rating >= 3
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  ★ {productData.rating}
                </span>
                <span className="text-sm text-gray-500">
                  {productData.reviews.length} Reviews
                </span>
              </div>
  
              {/* Price */}
              <div className="mt-6 flex items-end gap-4">
                <p className="text-4xl font-bold text-blue-600">
                  ₹{discountedPrice}
                </p>
                <p className="text-lg line-through text-gray-400">
                  ₹{productData.price}
                </p>
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {productData.discountPercentage}% OFF
                </span>
              </div>
  
              <p className="mt-6 text-gray-700 leading-relaxed">
                {productData.description}
              </p>
  
              {/* Highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Stock</p>
                  <p className="font-semibold">{productData.stock}</p>
                </div>
                <div>
                  <p className="text-gray-400">Shipping</p>
                  <p className="font-semibold">
                    {productData.shippingInformation || "Free Delivery"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Warranty</p>
                  <p className="font-semibold">
                    {productData.warrantyInformation || "1 Year"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Returns</p>
                  <p className="font-semibold">
                    {productData.returnPolicy || "7 Days"}
                  </p>
                </div>
              </div>
            </div>
  
            {/* CTA */}
            <div className="mt-10 flex gap-5">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition">
                Add to Cart
              </button>
              <button className="w-14 h-14 border rounded-xl text-xl hover:bg-blue-600 hover:text-white transition">
                ♡
              </button>
            </div>
          </div>
        </div>
  
        {/* REVIEWS */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
  
          <div className="grid md:grid-cols-2 gap-6">
            {productData.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.reviewerName}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      review.rating >= 4
                        ? "bg-green-600"
                        : review.rating >= 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    ★ {review.rating}
                  </span>
                </div>
  
                <p className="mt-3 text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.date).toDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
  
      </div>
    </div>
  );
  
  
};

export default PdpComponent;