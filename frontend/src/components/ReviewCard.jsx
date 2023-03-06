import StarIcon from '@mui/icons-material/Star';

function ReviewCard() {
	return (  
		<div className="flex flex-row justify-between py-6 px-4 rounded-lg shadow-lg">
			<div className="flex flex-row gap-8 w-10/12">
				<div className="flex flex-row items-center">
				{/* Rating an star Icon */}
					<StarIcon sx={{color: "#9999C3", fontSize: 30}}/>
					<h2 className="font-bold text-5xl">5</h2>
				</div>
				<div className="flex flex-col">
				{/* Review */}
					<h1 className="font-bold text-2xl">Rahat Chowdhury</h1>
					<p>
						omgg I saw the Weeknd and he was so gooood! The arena definitely made his vocals sound better
						omgg I saw the Weeknd and he was so gooood! The arena definitely made his vocals sound better
						omgg I saw the Weeknd and he was so gooood! The arena definitely made his vocals sound better
						omgg I saw the Weeknd and he was so gooood! The arena definitely made his vocals sound better
					</p>
				</div>
			</div>
			{/* Date */}
			<h3 className="2/12">Feb 11th, 2023</h3>
		</div>
	);
}

export default ReviewCard;