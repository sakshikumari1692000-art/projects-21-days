import React from "react";
import {Link} from "react-router";
import Navbar from "../Components/Navbar";
import PdpComponent from "../Components/PdpComponent";
import { useParams } from "react-router";
const Pdp = () => {
    const {productId} = useParams();
    console.log("Product ID:", productId);
    return(
        <>
        <Navbar />
        <PdpComponent id={productId} />
        </>    
    );
}
export default Pdp;