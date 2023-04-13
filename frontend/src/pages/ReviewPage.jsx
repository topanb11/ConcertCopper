import { useEffect, useState, useContext } from "react";
import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import { useLocation } from "react-router-dom";
import { apiRoot } from "../../api/apiRoot";

function ReviewPage() {
	const location = useLocation();
	const venueId = location.state.venueId;
	const [showModal, setShowModal] = useState(false);
	const [fetch, setFetch] = useState(false);
	const [data, setData] = useState([])

	useEffect(() => {
		fetchData();
	}, [])

	useEffect(() => {
		if (fetch) {
			fetchData();
			setFetch(false);
		}
	}, [fetch])

	function fetchData() {
		apiRoot.get("/review", {
			params: {
				venue_id: venueId
			}
		})
		.then((res) => setData(res.data))
		.catch((err) => console.log(err))
	}

	function toggleState(setterFunc) {
		setterFunc(prevState => !prevState)
	} 
	
	return (  
		<div className="flex flex-col bg-dark min-h-screen text-white items-center">
			{showModal ? <ReviewModal toggleState={toggleState} fetch={setFetch} modal={setShowModal}/> : null}
			{/* Review Container */}
			<div className="bg-white w-11/12 h-[60vh] text-dark px-5 py-5 mt-40">
				<div className="flex flex-row justify-between mb-5 items-center">
					<h1 className="text-3xl font-semibold">Reviews for {location.state.name}</h1>
					<button 
						className="bg-primary text-white text-lg w-40 h-12 font-bold rounded-lg hover:bg-primaryDark ease-in duration-200"
						onClick={() => toggleState(setShowModal)}
					>
						ADD A REVIEW
					</button>
				</div>

				{/* Render review cards in carousel */}
				<div className="flex flex-col h-5/6 overflow-scroll gap-8">
					{data.sort((a, b) => b.unix_timestamp - a.unix_timestamp).map((data, index) => (
						<ReviewCard key={index}
							{...data}
						/>
					))}
				</div>

			</div>
		</div>
	);
}

export default ReviewPage;