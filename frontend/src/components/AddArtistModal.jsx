import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { apiRoot } from "../../api/apiRoot"

export default function AddArtistModal({setArtistModal, venueId}) {
    const [artists, setArtists] = useState();
    const [artistForm, setArtistForm] = useState({venue_id: venueId, artist_email:"", timestamp:""})
    useEffect(() => {
        apiRoot.get("/artists")
        .then((res) => {
            if(res.status == 200){
                setArtists(res.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },[]);
    function submitHandler(event){
        event.preventDefault()
        apiRoot.post("/admin/venue/artist", artistForm)
        .then((res) => {
            if(res.status == 200){
                console.log("Success")
            }
        })
        .catch((error) => {
            console.log(error)
        })
        setArtistModal(prev => !prev)
    }
    function changeHandler(event) {
        setArtistForm((prevForm) => {
            return {
                ...prevForm,
                [event.target.name]: event.target.value,
            };
        });
    }
    function dateHandler(event) {
        setArtistForm((prevForm) => {
            return {
                ...prevForm,
                [event.target.name]: (new Date(event.target.value).getTime()/1000)
            };
        });
    }
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="w-1/2 h-1/2 bg-white p-5 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={() => setArtistModal(prev => !prev)} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <div className="flex flex-col w-full h-3/4 items-center justify-center gap-10">
                    <h1>Select an artist to perform at this venue</h1>
                    <form onSubmit={submitHandler} className="flex flex-col w-full justify-center items-center gap-10">
                        <select
                            value={artistForm.stageName}
                            name="artist_email"
                            onChange={changeHandler}
                            className="w-2/3 h-10 text-xl rounded-lg text-center p-2"
                        >
                            <option>-- Select an Artist --</option>
                            {artists && artists.map((data, index) => {
                                return <option key={index} value={data.email}>{data.stage_name}</option>;
                            })}
                        </select>
                        <input name="timestamp" onChange={dateHandler} type="datetime-local" className="w-2/3 p-2 rounded-lg text-xl text-center"></input>
                        <button className="w-1/2 bg-primary rounded-lg hover:bg-primaryDark p-2 text-white">Add artist</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
