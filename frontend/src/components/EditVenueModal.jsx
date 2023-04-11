import AddArtistCard from './AddArtistCard';
import JB from "../assets/JB.jpeg"
import CloseIcon from '@mui/icons-material/Close';
import Plus from "../assets/plus-solid.svg"
import { useState } from 'react';
import AddArtistModal from './AddArtistModal';

const Data = [
    {
        stageName: "Justin Bieber",
        name: "Justin Bieber",
        image: JB,
        time: "6",
        manager: "Brian Nguyen"
    },
    {
        stageName: "Justin Bieber",
        name: "Justin Bieber",
        image: JB,
        time: "6",
        manager: "Brian Nguyen"
    },
    {
        stageName: "Justin Bieber",
        name: "Justin Bieber",
        image: JB,
        time: "6",
        manager: "Brian Nguyen"
    },
    {
        stageName: "Justin Bieber",
        name: "Justin Bieber",
        image: JB,
        time: "6",
        manager: "Brian Nguyen"
    }
]

export default function EditVenueModal({setModal, name, venueId}) {
    const [artistModal, setArtistModal] = useState(false);
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="flex flex-col gap-5 items-center w-5/6 h-5/6 bg-white rounded-xl scroll-pl-5">
                <div className="flex justify-between w-full my-5">
                    <h1 className="font-bold text-3xl ml-5">
                        {name}
                    </h1>
                    <div onClick={() => setModal(prev => !prev)} className="hover:cursor-pointer px-5">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <div className="flex w-full h-full overflow-x-auto scroll-p-5 snap-x">
                    {Data.map(data => {
                        return(
                            <AddArtistCard data={data} />
                        )
                    })}
                    <div onClick={() => setArtistModal(prev => !prev)} className="snap-center bg-white text-dark rounded-lg p-5 shadow-lg h-[90%] hover:bg-[#DDDDDD] ml-5 mr-5 cursor-pointer">
                        <div className="flex flex-col justify-center items-center w-80 h-full">
                            <h1>Add Artist</h1>
                            <img src={Plus} className="w-2/3"/>
                        </div>
                    </div>
                </div>
            </div>
            {artistModal && <AddArtistModal setArtistModal={setArtistModal}/>}
        </div>
    )
};
