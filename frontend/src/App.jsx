import { React, useState, createContext, useMemo } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VenuesPage from "./pages/VenuesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import ReviewPage from "./pages/ReviewPage";
import { MainWrapper } from "./context/UserContext";

const App = () => {
  return (
    <div className="bg-dark">
			<BrowserRouter>
				<MainWrapper>
					<Navbar/>
					<Routes>
						<Route path="/" element={<HomePage/>}/>
						<Route path="/venues" element={<VenuesPage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="/checkout/:venueId" element={<CheckoutPage/>}/>
						<Route path="/reviews/:venueId" element={<ReviewPage/>}/>
					</Routes>
				</MainWrapper>
			</BrowserRouter>
    </div>
  );
};
export default App;
