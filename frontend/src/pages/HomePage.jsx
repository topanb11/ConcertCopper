import React from "react";
import Navbar from "../components/Navbar";
import musician from "../assets/Musician.png"

const BUTTON_CONTAINER = "bg-primary w-[400px] text-xl px-4 py-3 rounded-lg hover:text-dark ease-in duration-300 font-bold"

const handleClick = () => {
	console.log("venues page");
}

const HomePage = () => {
	return (
		<>
			<div className="bg-dark text-white min-h-screen items-center">
				<div className="flex flex-row justify-center pt-64 space-x-36">
					<img className="w-96" src={musician}/>
					<div className="flex flex-col space-y-4">
						<p className="w-[500px] font-thin text-2xl">
							Welcome to ConcertCopper, your one 
							stop shop for purchasing concert tickets
							for your favourite artists!
						</p>
						<button className={BUTTON_CONTAINER} onClick={() => handleClick()}>
							SEARCH AVAILABLE VENUES
						</button>
					</div>
				</div>
			</div>
		</>


	)
}
export default HomePage;
