import { useState } from "react"
import Plus from "../assets/plus-solid.svg"
import AddVenueModal from "./AddVenueModal"

export default function AddVenueCard() {
    const [modal, setModal] = useState(false)
    return(
        <div className="bg-white text-dark gap-5 rounded-lg p-5 hover:bg-[#DDDDDD] mb-5">
            <div onClick={() => setModal(prev => !prev)} className="h-full w-full cursor-pointer">
                <div className=" flex flex-col justify-center items-center w-80 h-full">
                    <h1>Add Venue</h1>
                    <img src={Plus} className="w-2/3"/>
                </div>
            </div>
            {modal && <AddVenueModal setVenueModal={setModal}/>}
        </div>
    )
};
