import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./screen/Cart";
import RestaurantDetails from "./screen/RestaurantDetails";
import Home from "./screen/Home";

const App = () =>{
    return(
        <Routes>
            Canteen Ordering System
            <Route path="/" element = {<Home />} />
            <Route path="/restaurant" element = {<RestaurantDetails />} />
            <Route path ="/cart" element = {<Cart />} />
        </Routes>
    )
}
export default  App;