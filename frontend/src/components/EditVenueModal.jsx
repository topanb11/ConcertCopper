import AddArtistCard from './AddArtistCard';
import JB from "../assets/JB.jpeg"
import CloseIcon from '@mui/icons-material/Close';
import Plus from "../assets/plus-solid.svg"
import { useEffect, useState } from 'react';
import AddArtistModal from './AddArtistModal';
import { apiRoot } from '../../api/apiRoot';

export default function EditVenueModal({setModal, name, venueId}) {
    const [artistModal, setArtistModal] = useState(false);
    const [artists, setArtists] = useState()
    const [sortedArtists, setSortedArtists] = useState()
    const [fetch, setFetch] = useState(false)
    useEffect(() => {
        apiRoot.get("/admin/venues", { params:
            {
                venue_id: venueId
            }
        })
        .then((res) => {
            if(res.status == 200){
                setArtists(res.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },[fetch])
    useEffect(() => {
        let sorted = artists && artists.sort(
            (a1,a2) => ((new Date(a1.datestamp).getTime()/1000) > (new Date(a2.datestamp).getTime()/1000) ? 1 :
            (new Date(a1.datestamp).getTime()/1000) < (new Date(a2.datestamp).getTime()/1000) ? -1 : 0)
        )
        setSortedArtists(sorted)
    },[artists])
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="flex flex-col gap-5 items-center w-5/6 h-[90%] bg-white rounded-xl scroll-pl-5">
                <div className="flex justify-between w-full mt-5">
                    <h1 className="font-bold text-3xl ml-5">
                        {name}
                    </h1>
                    <div onClick={() => setModal(prev => !prev)} className="hover:cursor-pointer px-5">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <div className="flex w-full h-full overflow-x-scroll scroll-p-5 snap-x r">
                    {sortedArtists && sortedArtists.map(data => {
                        return(
                            <AddArtistCard data={data} setFetch={setFetch}/>
                        )
                    })}
                    <div onClick={() => setArtistModal(prev => !prev)} className="snap-center bg-white text-dark rounded-lg p-5 shadow-lg h-[95%] hover:bg-[#DDDDDD] ml-5 mr-5 cursor-pointer">
                        <div className="flex flex-col justify-center items-center w-80 h-full">
                            <h1>Add Artist</h1>
                            <img src={Plus} className="w-2/3"/>
                        </div>
                    </div>
                </div>
            </div>
            {artistModal && <AddArtistModal setArtistModal={setArtistModal} venueId={venueId} setFetch={setFetch}/>}
        </div>
    )
};
