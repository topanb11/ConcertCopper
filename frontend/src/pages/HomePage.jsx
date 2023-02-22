import React from "react";
import Navbar from "../components/Navbar";
import musician from "../assets/Musician.png"

const BUTTON_CONTAINER = "bg-primary w-64 text-sm px-3 py-3 rounded-lg"

const HomePage = () => {
	return (
		<>
			<div className="bg-dark text-white min-h-screen items-center">
				<Navbar/>
				<div className="flex flex-row justify-center mt-36 space-x-24">
					<img className=" " src={musician}/>
					<div className="flex flex-col space-y-4">
						<p className="w-[350px] font-thin text-xl">
							Welcome to ConcertCopper, your one 
							stop shop for purchasing concert tickets
							for your favourite artists!
						</p>
						<button className={BUTTON_CONTAINER}>SEARCH AVAILABLE VENUES</button>
					</div>
				</div>
			</div>
		</>


	)
}
export default HomePage;
