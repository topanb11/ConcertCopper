import CloseIcon from '@mui/icons-material/Close';

export default function AddArtistCard({data}) {
    return(
        <div className="snap-center bg-white text-dark rounded-lg p-5 shadow-lg h-[90%] ml-5">
            <div className="flex flex-col gap-4 w-80 h-full">
                <div className="flex justify-between w-full">
                    <h1>{data.stageName}</h1>
                    <div onClick={() => toggleModal()} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <img src={data.image} className="w-full h-auto rounded-lg" alt="Image not found"/>
                <h1 className="text-lg">{data.name}</h1>
                <h1 className="text-lg">{`Performing at ${data.time}:00pm`}</h1>
                <h1 className="text-lg">{`Manager: ${data.manager}`}</h1>
                <button className="w-full p-2 mt-auto bg-primary rounded-lg text-white">CONTACT MANAGER</button>
            </div>
        </div>
    )
};
