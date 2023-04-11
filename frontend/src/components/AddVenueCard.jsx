import Plus from "../assets/plus-solid.svg"

export default function AddVenueCard({toggleModal}) {
    return(
        <div onClick={toggleModal} className="bg-white text-dark gap-5 rounded-lg p-5 cursor-pointer hover:bg-[#DDDDDD] mb-5">
            <div className=" flex flex-col justify-center items-center w-80 h-full">
                <h1>Add Venue</h1>
                <img src={Plus} className="w-2/3"/>
            </div>
        </div>
    )
};
