import { Routes, Route } from "react-router-dom";

import Home from '../pages/HomePage/Home';
import Checkout from "../pages/Checkout/CheckOut";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Routers;
