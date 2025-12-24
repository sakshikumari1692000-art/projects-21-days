import React , { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScreenProducts } from "../ProductSlice";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
    const dispatch = useDispatch();
    const screenProducts = useSelector((state) => state.product.screenProducts);
    // const helloData =  useSelector((state) => state.product.hello);
    // console.log("HelloData", helloData)
    async function getData(){
        let apiData = await fetch(`https://dummyjson.com/products`);
        let jsonData = await apiData.json();
        dispatch(setScreenProducts(jsonData.products));
    }
    console.log("screenProducts", screenProducts);
    useEffect(() =>{
        getData();
    }, []);
    return <div>
        {screenProducts.map((productData) => (
            <ProductCard key={productData.id} productData={productData} />
        ))}
    </div>;
}
export default ProductGrid;