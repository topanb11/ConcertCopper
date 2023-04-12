import React, { useState,useEffect } from "react";
import VenueCard from "../components/VenueCard";
import { useUserContext } from "../context/UserContext";
import AddVenueModal from "../components/AddVenueModal"
import { apiRoot } from "../../api/apiRoot";
import Plus from "../assets/plus-solid.svg"

function ClientVenuesPage() {
    const { user } = useUserContext()
    const[venues, setVenues] = useState([]);
    const[fetch, setFetch] = useState(false)
    const [modal, setModal] = useState(false)
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
      }, [fetch]);
    return ( 
        <div className="bg-dark min-h-screen text-white">
            <div className="flex flex-col justify-center gap-1 text-2xl px-12 pt-48 font-bold">
                <h1>AVAILABLE VENUES</h1>
                <div className="flex flex-row scrollbar-hide overflow-x-scroll gap-x-16">
                {venues.map((venue) => (
                    <VenueCard
                        key={venue.venue_id}
						{...venue}
                    />
                ))}
                    {user.adminFlag && 
                        <div className="bg-white text-dark gap-5 rounded-lg p-5 hover:bg-[#DDDDDD] mb-5">
                            <div onClick={() => setModal(prev => !prev)} className="h-full w-full cursor-pointer">
                                <div className=" flex flex-col justify-center items-center w-80 h-full">
                                    <h1>Add Venue</h1>
                                    <img src={Plus} className="w-2/3"/>
                                </div>
                            </div>
                            {modal && <AddVenueModal setVenueModal={setModal} setFetch={setFetch}/>}
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}
export default ClientVenuesPage;
