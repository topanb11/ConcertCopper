import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import  {Routes, Route, BrowserRouter} from "react-router-dom";

const App = () => {
  return (
    <div className="bg-dark">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
				</Routes>
			</BrowserRouter>
    </div>
  );
};
export default App;
