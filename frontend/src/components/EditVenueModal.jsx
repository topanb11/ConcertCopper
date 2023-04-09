import AddArtistCard from './AddArtistCard';
import JB from "../assets/JB.jpeg"

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

export default function EditVenueModal({setModal, name}) {
    return(
        <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
            <div className="flex flex-col gap-5 items-center w-5/6 h-5/6 bg-white rounded-xl scroll-pl-5">
                <div className="flex justify-between w-full my-5">
                    <h1 className="font-bold text-3xl ml-5">
                        {name}
                    </h1>
                    <div className="flex gap-5 mr-5">
                        <div className="flex text-white gap-5">
                            <button className="rounded-md bg-primary hover:bg-primaryDark p-2">Add Artist</button>
                            <button onClick={() => {setModal(prev => !prev)}} className="rounded-md bg-primary hover:bg-primaryDark p-2">Save Changes</button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-full overflow-x-auto scroll-p-5 snap-x">
                    {Data.map(data => {
                        return(
                            <AddArtistCard data={data} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
};
