import { React, useState, createContext, useMemo } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ClientVenuesPage from "./pages/ClientVenuesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
	const UserContext = createContext();
	const [user, setUser] = useState();
	const userContextValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <div className="bg-dark">
			<BrowserRouter>
				<UserContext.Provider value={userContextValue}>
					<Navbar/>
					<Routes>
						<Route path="/" element={<HomePage/>}/>
						<Route path="/venues" element={<ClientVenuesPage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="/checkout/:venueId" element={<CheckoutPage/>}/>
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
    </div>
  );
};
export default App;
