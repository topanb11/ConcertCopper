import React from "react";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import EditVenueModal from "./EditVenueModal";
import { useNavigate } from "react-router-dom";

const BUTTON_CONTAINER = "bg-primary text-white w-80 mx-auto text-xl py-3 px-3 rounded-lg hover:bg-primaryDark ease-in duration-300 font-bold"
function VenueCard({name, location, img, venueId}) {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const {user} = useUserContext()

    const handleClick = (path) => {
		navigate(`${path}/${venueId}`, {state: {venueId: venueId}});
	}

    return (
        <div className="flex flex-col bg-white text-dark gap-5 rounded-lg p-5 mb-5">
            <img className="rounded-lg w-80" src={img}/>
            <div>
                <h2 className="font-bold">{name}</h2>
                <h3 className="text-sm">{location}</h3>
            </div>
            {!user.adminFlag ? <div className="flex flex-col gap-3 mt-auto">
                <button onClick={() => handleClick("/checkout")} className={BUTTON_CONTAINER}>VIEW TICKETS</button>
                <button onClick={() => handleClick("/reviews")} className={BUTTON_CONTAINER}>REVIEWS</button>
            </div>: 
            <div className="flex justify-center items-center">
                <button onClick={() => {setModal(prev => !prev)}} className={BUTTON_CONTAINER}>EDIT VENUE</button>
            </div>}
            {modal && <EditVenueModal setModal={setModal} name={name} venueId={venueId}/>}
        </div>
    )
}
export default VenueCard;