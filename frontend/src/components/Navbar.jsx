import React from "react";
import Logo from "../assets/ConcertCopper.png";

const NAVBAR_HEADER = "text-2xl font-thin font-semibold hover:cursor-pointer hover:text-dark ease-in duration-300";

const handleClick = (str) => {
	console.log(str);
}

const Navbar = () => {
	return (
		<div className="bg-primary flex flex-row text-white justify-between items-center px-10 py-2 rounded-b-lg">
			<img className="w-24" src={Logo}/>
			<div className="flex flec-row space-x-12">
				<h2 className={NAVBAR_HEADER} onClick={() => handleClick("account")}>CREATE ACCOUNT</h2>
				<h2 className={NAVBAR_HEADER} onClick={() => handleClick("log in")}>LOG IN</h2>
			</div>
		</div>
	)
}
export default Navbar;
