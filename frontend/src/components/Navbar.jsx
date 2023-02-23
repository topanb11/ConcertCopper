import React, { useContext } from "react";
import Logo from "../assets/ConcertCopper.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NAVBAR_HEADER = "text-2xl font-thin font-semibold hover:cursor-pointer hover:text-dark ease-in duration-300";

const Navbar = () => {
	const navigate = useNavigate();
	const user = useContext(UserContext);

	const handleClick = (path) => {
		navigate(path);
	}

	return (
		<div className="fixed bg-primary flex flex-row w-screen text-white justify-between items-center px-10 py-2 rounded-b-lg">
			<img className="w-24 hover:cursor-pointer" onClick={() => handleClick("/")} src={Logo}/>
			<div className="flex flex-row space-x-12">
				<h2 className={NAVBAR_HEADER} onClick={() => handleClick("/register")}>CREATE ACCOUNT</h2>
				{user ? 
					<h2 className={NAVBAR_HEADER} onClick={console.log("signout")}>SIGN OUT</h2> :
					<h2 className={NAVBAR_HEADER} onClick={() => handleClick("/login")}>LOG IN</h2> 
				}
			</div>
		</div>
	)
}
export default Navbar;
