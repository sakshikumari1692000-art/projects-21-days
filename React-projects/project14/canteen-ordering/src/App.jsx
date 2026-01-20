import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./screen/Cart";
import RestaurantDetails from "./screen/RestaurantDetails";
import Home from "./screen/Home";

const App = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}
export default  App;