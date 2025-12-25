import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScreenProducts } from "../ProductSlice";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const screenProducts = useSelector(
    (state) => state.product.screenProducts
  );

  async function getData() {
    if(screenProducts.length > 0) return;
    const apiData = await fetch("https://dummyjson.com/products");
    const jsonData = await apiData.json();
    dispatch(setScreenProducts(jsonData.products));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {screenProducts.map((productData) => (
            <ProductCard
              key={productData.id}
              productData={productData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
