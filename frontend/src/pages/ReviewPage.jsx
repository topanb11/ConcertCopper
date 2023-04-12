import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import React, { useState,useEffect } from "react";
import { apiRoot } from "../../api/apiRoot";
import { useLocation,useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


const data = [
	{
		name: "Rahat Chowdhury",
		rating: 5,
		review: "omgg I saw the Weeknd and he was so gooood! The arena definitely made his vocals sound better ",
		date: 1676163288
	},
	{
		name: "Rayhan Khalid",
		rating: 1,
		review: "IT'S NOT BY ANY TRAINSTATIONS",
		date: 1675212888
	},
	{
		name: "Gabe Ngu",
		rating: 2,
		review: "Don't sit in section F it smells so bad",
		date: 1678150488
	},
	{
		name: "Topan Budiman",
		rating: 4,
		review: "it's aight",
		date: 1678151792
	},

]

function ReviewPage() {
	const location = useLocation();
	const venueId = location.state.venueId;
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(prevState => !prevState);
	}
	//const { user } = useUserContext()
    //const navigate = useNavigate();
    const[review, setReview] = useState([]);


	useEffect(() => {
		apiRoot
			.get("/reviews/venue_id", {
				params: { venue_id: venueId }
		  })
		  .then((res) => {
			console.log(res);
			setReview(res.data);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }, []);
	
	  function convertUnix(datestamp) {
		return Math.floor(Date.parse(datestamp) / 1000);
	  }
	  
	  

	return (  
		<div className="flex flex-col bg-dark min-h-screen text-white items-center">
			{showModal ? <ReviewModal toggleModal={toggleModal}/> : null}
			{/* Review Container */}
			<div className="bg-white w-11/12 h-[60vh] text-dark px-5 py-5 mt-40">
				<div className="flex flex-row justify-between mb-5 items-center">
					<h1 className="text-3xl font-semibold">Reviews for {location.state.name}</h1>
					<button 
						className="bg-primary text-white text-lg w-40 h-12 font-bold rounded-lg hover:bg-primaryDark ease-in duration-200"
						onClick={() => toggleModal()}
					>
						ADD A REVIEW
					</button>
				</div>

				{/* Render review cards in carousel */}
				<div className="flex flex-col h-5/6 overflow-scroll gap-8">
					{review.sort((a, b) => b.datestamp - a.datestamp).map((review) => (
						<ReviewCard 
						key={review.venue_id}
                        name={`${review["first_name"]} ${review["last_name"]}`}
                        review={review.comment}
                        rating={review.rating}
						date = {convertUnix(review.datestamp)}
                        venueId={review.venue_id}
						/>
					))}
				</div>

			</div>
		</div>
	);
}

export default ReviewPage;