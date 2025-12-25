import React from "react";
import Home from "./Screen/Home";
import Pdp from "./Screen/Pdp";
import { Route, Routes } from "react-router";

const App = () =>{
  return(
    <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<Pdp />} />
          </Routes>
      </div>
  );
}

export default App;