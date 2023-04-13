import CloseIcon from '@mui/icons-material/Close';
import { apiRoot } from '../../api/apiRoot';

export default function AddArtistCard({data, setFetch}) {
    function deleteHandler(){
        apiRoot.delete("/admin/venue/artist", {params:
            {
                showtimeID: data.showtime_id
            }
        })
        .then((res) => {
            if(res.status == 200){
                console.log("Success")
            }
        })
        .catch((error) => {
            console.log(error)
        })
        setFetch(prev => !prev)
    }
    function onClick(){
        alert(`Manager Email: ${data.manager_email}`)
    }
    return(
        <div className="snap-center bg-white text-dark rounded-lg p-5 shadow-lg h-[95%] ml-5">
            <div className="flex flex-col gap-4 w-80 h-full">
                <div className="flex justify-between w-full">
                    <h1>{data.stage_name}</h1>
                    <div onClick={deleteHandler} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
                </div>
                <img src={data.artist_img} className="w-full h-[45%] object-cover rounded-lg" alt="Image not found"/>
                <h1 className="text-lg">{data.first_name} {data.last_name}</h1>
                <h1 className="text-lg">{`Performing on ${data.datestamp.replace("T", " at ")}`}</h1>
                <h1 className="text-lg">{`Manager: ${data.manager_first} ${data.manager_last}`}</h1>
                <a onClick={onClick} className="w-full p-2 mt-auto bg-primary rounded-lg text-white text-center cursor-pointer">CONTACT MANAGER</a>
            </div>
        </div>
    )
};
