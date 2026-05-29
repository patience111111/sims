import React from "react";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import SparePart from "./pages/SparePart";
import Dashboard from "./pages/Dashboard";
import Navbar from "./component/Navbar";

export default function App() {

  const location = useLocation();


  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (

    <div className="flex min-h-screen dark:bg-gray-900">

      {/* SHOW NAVBAR ONLY WHEN NOT LOGIN/REGISTER */}
      {!hideNavbar && <Navbar />}

      {/* PAGES */}
      <div className="flex-1 p-5">

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/stockin" element={<StockIn />} />

          <Route path="/stockout" element={<StockOut />} />

          <Route path="/sparepart" element={<SparePart />} />

        </Routes>

      </div>

    </div>
  );
}