import StarIcon from '@mui/icons-material/Star';

function ReviewCard({name, rating, review, date}) {
	const dateFormat = new Date(date * 1000);

	function addDaySuffix(day) {
	  if (day >= 11 && day <= 13) {
		return day + "th";
	  }
	  switch (day % 10) {
		case 1:
		  return day + "st";
		case 2:
		  return day + "nd";
		case 3:
		  return day + "rd";
		default:
		  return day + "th";
	  }
	}
	
	const options = { month: 'short', day: 'numeric', year: 'numeric' };
	const dateStr = dateFormat.toLocaleDateString('en-US', options);
	const dayStr = addDaySuffix(dateFormat.getDate());
	
	const formattedDate = dateStr.replace(dayStr, dayStr + ",");
		


	return (  
		<div className="flex flex-row justify-between py-6 px-4 rounded-lg shadow-lg">
			<div className="flex flex-row gap-8 w-10/12">
				<div className="flex flex-row items-center">
				{/* Rating an star Icon */}
					<StarIcon sx={{color: "#9999C3", fontSize: 30}}/>
					<h2 className="font-bold text-5xl">{rating}</h2>
				</div>
				<div className="flex flex-col">
				{/* Review */}
					<h1 className="font-bold text-2xl">{name}</h1>
					<p>
						{review}
					</p>
				</div>
			</div>
			{/* Date */}
			<h3 className="2/12">{dateStr}</h3>
		</div>
	);
}

export default ReviewCard;