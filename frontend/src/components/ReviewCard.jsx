import StarIcon from '@mui/icons-material/Star';

function ReviewCard({rating, comment, unix_timestamp, first_name, last_name}) {

	function convertUnix(date) {
		const dateFormat = new Date(date * 1000);
		const dateStr = dateFormat.toLocaleDateString();
		return dateStr
	}

	return (  
		<div className="flex flex-row justify-between py-6 px-4 rounded-lg shadow-lg">
			<div className="flex flex-row gap-8 w-10/12">
				<div className="flex flex-row items-center">
				{/* Rating and star Icon */}
					<StarIcon sx={{color: "#9999C3", fontSize: 30}}/>
					<h2 className="font-bold text-5xl">{rating}</h2>
				</div>
				<div className="flex flex-col">
				{/* Review */}
					<h1 className="font-bold text-2xl">{first_name} {last_name}</h1>
					<p>
						{comment}
					</p>
				</div>
			</div>
			{/* Date */}
			<h3 className="2/12">{convertUnix(unix_timestamp)}</h3>
		</div>
	);
}

export default ReviewCard;