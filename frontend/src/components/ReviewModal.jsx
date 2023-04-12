import { useState, useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { apiRoot } from "../../api/apiRoot";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const FORM_LABEL = "font-semibold text-xl";
const FORM_CONTAINER = "pl-2 border-2 border-dark/50 h-10";

function ReviewModal({ toggleState, fetch, modal}) {
	const location = useLocation();
	const venueId = location.state.venueId;
	const { user } = useContext(UserContext)
	const [review, setReview] = useState({
		email: "",
		comment: "",
		rating: 0
	});

	const handleChange = (e) => {
		setReview(prevState => {
			return {
			...prevState,
			[e.target.name]: e.target.value
		}})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		apiRoot.post("/add/review", {
			rating: review.rating,
			client_email: user.signedIn ? user.email : review.email,
			comment: review.comment,
			venue_id: venueId
		})
		.then(() => {
			toggleState(modal);
			toggleState(fetch);
		})
		.catch((error) => console.log(error));
	};

	return ( 
		<div 
			className="flex bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center"
		>
			<div className="bg-white w-4/6 h-4/6 text-dark px-8 py-3">
				<div className="flex flex-row justify-between items-center pb-6">
					<h1 className="font-bold text-3xl">ADD A REVIEW</h1>
					<div onClick={() => toggleState(modal)} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
				</div>
				<div className="flex flex-col h-5/6 justify-around gap-5">
					<form className="flex flex-col w-3/6 gap-4">
						<label className={FORM_LABEL}>Rating</label>
						<input name="rating" type="Number" className={`${FORM_CONTAINER} w-1/6`} max={5} min={0} onChange={(e) => handleChange(e)}/>
						{!user.signedIn && <label className={FORM_LABEL}>Email</label>}
						{!user.signedIn && <input name="email" placeholder="Email" type="text" className={`${FORM_CONTAINER} w-2/6`} onChange={(e) => handleChange(e)}/>}
						<label className={FORM_LABEL}>Review</label>
						<textarea name="comment" placeholder="Your review!" type="text" className={`${FORM_CONTAINER} h-48 pt-2`} onChange={(e) => handleChange(e)}/>
					</form>
					<button 
						className="bg-primary text-white w-48 h-12 justify-self-stretch tracking-widest font-bold rounded-md hover:bg-primaryDark ease-in duration-200"
						onClick={(e) => handleSubmit(e)}
					>
						SUBMIT REVIEW
					</button>
				</div>
			</div>
		</div>
	 );
}

export default ReviewModal;