import React, { useState,useEffect } from "react";
import VenueCard from "../components/VenueCard";
import Saddledome from "../assets/Saddle.jpg";
import TMobile from "../assets/T-Mobile2.png";
import Amalie from "../assets/Amalie.jpg";
import Climate from "../assets/Climate.jpeg";
import { useUserContext } from "../context/UserContext";
import AddVenueCard from "../components/AddVenueCard";
import { useLocation,useNavigate } from "react-router-dom";
import { apiRoot } from "../../api/apiRoot";


const data = [
    {
		venueId: 1,
        name: "Scotiabank Saddledome",
        location: "Calgary, AB",
        img: Saddledome
    },
    {
		venueId: 8,
        name: "T-Mobile Arena",
        location: "Paradise, NV",
        img: TMobile
    },
    {
		venueId: 9,
        name: "Amalie Arena",
        location: "Tampa, FL",
        img: Amalie
    },
    {
		venueId: 7,
        name: "Climate Pledge Arena",
        location: "Seattle, WA",
        img: Climate
    },
]
function ClientVenuesPage() {
    const { user } = useUserContext()
    const navigate = useNavigate();
    const location = useLocation();
    const[venues, setVenues] = useState([]);

    useEffect(() => {
        apiRoot
          .get("/venues")
          .then((res) => {
            console.log(res);
            setVenues(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


    return ( 
        <div className="bg-dark min-h-screen text-white">
            <div className="flex flex-col justify-center gap-1 text-2xl px-12 pt-48">
                <h1>AVAILABLE VENUES</h1>
                <div className="flex flex-row scrollbar-hide overflow-x-scroll gap-x-16">
                {venues.map((venue) => (
                    <VenueCard
                        key={venue.venue_id}
                        name={venue.venue_name}
                        location={venue.venue_location}
                        img={venue.venue_img}
                        venueId={venue.venue_id}
                    />
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
