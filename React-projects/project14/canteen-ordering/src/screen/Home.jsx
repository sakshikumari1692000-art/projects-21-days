import React from "react";
import { useGetRestaurantData } from "../Hook";

const Home = () => { 
    useGetRestaurantData();
    return <div>Home</div>;
 }
export default Home;