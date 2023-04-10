import React, { useState } from "react";
import VenueCard from "../components/VenueCard";
import Saddledome from "../assets/Saddle.jpg";
import TMobile from "../assets/T-Mobile2.png";
import Amalie from "../assets/Amalie.jpg";
import Climate from "../assets/Climate.jpeg";
import { useUserContext } from "../context/UserContext";
import AddVenueCard from "../components/AddVenueCard";

const data = [
    {
		venueId: 1,
        name: "Scotiabank Saddledome",
        location: "Calgary, AB",
        img: Saddledome
    },
    {
		venueId: 2,
        name: "T-Mobile Arena",
        location: "Paradise, NV",
        img: TMobile
    },
    {
		venueId: 3,
        name: "Amalie Arena",
        location: "Tampa, FL",
        img: Amalie
    },
    {
		venueId: 5,
        name: "Climate Pledge Arena",
        location: "Seattle, WA",
        img: Climate
    },
]
function ClientVenuesPage() {
    const { user } = useUserContext()
    return ( 
        <div className="bg-dark min-h-screen text-white">
            <div className="flex flex-col justify-center gap-1 text-2xl px-12 pt-48">
                <h1>AVAILABLE VENUES</h1>
                <div className="flex flex-row scrollbar-hide overflow-x-scroll gap-x-16">
                    {data.map((data, index) => (
                        <VenueCard key={index} {...data}/>
                    ))}
                    {user.adminFlag && 
                        <AddVenueCard />
                    }
                </div>
            </div>
        </div>
     );
}
export default ClientVenuesPage;

