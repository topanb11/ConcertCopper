import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { apiRoot } from "../../api/apiRoot"

export default function AddArtistModal({setArtistModal}) {
    const [artists, setArtists] = useState();
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
    function submitHandler(req,res){
        apiRoot.post("/admin/venue/artist")
        setArtistModal(prev => !prev)
    }
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="w-1/3 h-1/2 bg-white p-5 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={() => setArtistModal(prev => !prev)} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <div className="flex flex-col w-full h-3/4 items-center justify-center gap-10">
                    <h1>Select an artist to perform at this venue</h1>
                    <form onSubmit={submitHandler} className="flex flex-col w-full justify-center items-center gap-10">
                        <select
                            className="w-1/2 h-10 text-xl rounded-lg text-center"
                        >
                            <option>-- Select an Artist --</option>
                            {artists && artists.map((data, index) => {
                                return <option key={index}>{data.stage_name}</option>;
                            })}
                        </select>
                        <button className="w-1/2 bg-primary rounded-lg hover:bg-primaryDark p-2 text-white">Add artist</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
