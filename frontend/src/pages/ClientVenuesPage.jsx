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
        <div className="bg-dark min-h-screen text-white">
            <div className="flex flex-col justify-center gap-1 text-2xl px-12 pt-48">
                <h1>AVAILABLE VENUES</h1>
                <div className="flex flex-row scrollbar-hide overflow-x-scroll gap-x-24">
                    {data.map((data, index) => (
                        <VenueCard key={index} {...data}/>
                    ))}
                </div>
            </div>
        </div>
     );
}
export default ClientVenuesPage;

