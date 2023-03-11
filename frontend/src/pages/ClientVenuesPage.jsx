import React from "react";
import VenueCard from "../components/VenueCard";
import Saddledome from "../assets/Saddle.jpg";
import TMobile from "../assets/T-Mobile2.png";
import Amalie from "../assets/Amalie.jpg";
import Climate from "../assets/Climate.jpeg";

const data = [
	{
		name: "Scotiabank Saddledome",
		location: "Calgary, AB",
		img: Saddledome
	},
	{
		name: "T-Mobile Arena",
		location: "Paradise, NV",
		img: TMobile
	},
	{
		name: "Amalie Arena",
		location: "Tampa, FL",
		img: Amalie
	},
	{
		name: "Climate Pledge Arena",
		location: "Seattle, WA",
		img: Climate
	},
]
function ClientVenuesPage() {
	return ( 
		<div className="flex flex-col bg-dark min-h-screen w-max text-white items-center justify-center">
			{/* Page container */}
			<div className="flex flex-col justify-center gap-1 text-2xl px-12">
				<h1>AVAILABLE VENUES</h1>
				{/* Carousel */}
				<div className="flex flex-row overflow-scroll gap-12 mx-auto">
					{data.map((data, index) => (
						<VenueCard key={index} {...data}/>
					))}
				</div>
			</div>
		</div>
	 );
}
export default ClientVenuesPage;

