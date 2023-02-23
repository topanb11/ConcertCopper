import { React, useState, createContext, useMemo } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ClientVenues from "./pages/ClientVenues";
import AdminVenue from "./pages/AdminVenues";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
						<Route path="/venues" element={<ClientVenues/>}/>
						<Route path="/admin/venues" element={<AdminVenue/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
    </div>
  );
};
export default App;
