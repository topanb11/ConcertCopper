import React from "react";
const BUTTON_CONTAINER = "bg-primary text-white w-80 mx-auto text-xl py-3 px-3 rounded-lg hover:bg-primaryDark ease-in duration-300 font-bold"
function VenueCard({name, location, img}) {
    return (
        <div className="flex flex-col bg-white text-dark gap-5 rounded-lg p-5">
            <img className="rounded-lg" src={img}/>
            <div>
                <h2 className="font-bold">{name}</h2>
                <h3 className="text-sm">{location}</h3>
            </div>
            <div className="mt-auto flex flex-col gap-3">
                <button className={BUTTON_CONTAINER}>VIEW TICKETS</button>
                <button className={BUTTON_CONTAINER}>REVIEWS</button>
            </div>
        </div>
    )
}
export default VenueCard;