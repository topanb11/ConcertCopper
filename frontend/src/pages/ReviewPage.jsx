import ReviewCard from "../components/ReviewCard";

function ReviewPage() {
	return (  
		<div className="flex flex-col bg-dark min-h-screen pt-40 text-white items-center">
			{/* Review Container */}
			<div className="bg-white w-11/12 h-[60vh] text-dark px-5 py-5">
				<div className="flex flex-row justify-between mb-5 items-center">
					<h1 className="text-3xl font-semibold">Reviews for Scotiabank Saddledome</h1>
					<button className="bg-primary text-white text-lg w-40 h-12 font-bold rounded-lg hover:bg-primaryDark ease-in duration-200">
						ADD A REVIEW
					</button>
				</div>

				{/* Render review cards in carousel */}
				<div className="flex flex-col h-5/6 overflow-scroll gap-10">
					<ReviewCard/>
					<ReviewCard/>
					<ReviewCard/>
					<ReviewCard/>
					<ReviewCard/>
				</div>

			</div>
		</div>
	);
}

export default ReviewPage;