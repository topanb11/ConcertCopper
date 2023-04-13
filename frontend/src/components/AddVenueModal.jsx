import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { apiRoot } from "../../api/apiRoot";

export default function AddVenueModal({setVenueModal, setFetch}) {
    const LABEL = "block text-dark/50 font-semibold text-2xl";
    const INPUT_FIELD = "rounded-md pl-3 h-14 w-full border-solid border-2 border-dark/50 mb-4 text-lg";
    const [venueForm, setVenueForm] = useState({venue_name:"", venue_location:"", venue_img:"", venue_description:""})
    function handler(event) {
        setVenueForm((prevForm) => {
            return {
                ...prevForm,
                [event.target.name]: event.target.value,
            };
        });
    }
    function submitHandler(event){
        event.preventDefault()
        apiRoot.post("/admin/venue", venueForm)
        .then((res) => {
            if(res.status == 200){
                console.log("Success")
            }
        })
        .catch((error) => {
            console.log(error)
        })
        setFetch(prev => !prev)
        setVenueModal(prev => !prev)
    }
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="relative flex justify-center items-center w-1/2 bg-white p-5 rounded-lg">
                <div className="flex flex-col items-center w-full">
                    <h1>Add a Venue</h1>
                    <div onClick={() => setVenueModal(prev => !prev)} className="absolute top-3 right-3 hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                    <form onSubmit={submitHandler} className="w-full">
                        <label className={LABEL}>Venue Name</label>
                        <input
                            name="venueName"
                            type="text"
                            placeholder="Venue Name"
                            className={INPUT_FIELD}
                            onChange={handler}
                        ></input>
                        <label className={LABEL}>Location</label>
                        <input
                            name="location"
                            type="text"
                            placeholder="Location"
                            className={INPUT_FIELD}
                            onChange={handler}
                        ></input>
                        <label className={LABEL}>Image</label>
                        <input
                            name="img"
                            type="text"
                            placeholder="Image"
                            className={INPUT_FIELD}
                            onChange={handler}
                        ></input>
                        <label className={LABEL}>Description</label>
                        <input
                            name="desc"
                            type="text"
                            placeholder="Description"
                            className={INPUT_FIELD}
                            onChange={handler}
                        ></input>
                        <button className="w-full bg-primary rounded-lg h-14 hover:bg-primaryDark text-white">ADD VENUE</button>
                    </form>
                </div>
            </div>
        </div>
    )    
};
