import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ClientVenues from "./pages/ClientVenues";
import AdminVenue from "./pages/AdminVenues";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-dark">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/venues" element={<ClientVenues/>}/>
					<Route path="/admin/venues" element={<AdminVenue/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Register/>}/>
				</Routes>
			</BrowserRouter>
    </div>
  );
};
export default App;
