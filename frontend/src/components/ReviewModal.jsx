import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const FORM_LABEL = "font-semibold text-xl";
const FORM_CONTAINER = "pl-2 border-2 border-dark/50 h-10";

function ReviewModal({ toggleModal }) {
	const [review, setReview] = useState({
		name: "",
		review: "",
		rating: 0
	});

	const handleChange = (e) => {
		setReview(prevState => {
			return {
			...prevState,
			[e.target.name]: e.target.value
		}})
	}

	const handleSubmit = () => {
		// Replace with POST API call later
		console.log("review submitted!", review);
	};

	return ( 
		<div 
			className="flex bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center"
		>
			<div className="bg-white w-4/6 h-4/6 text-dark px-8 py-3">
				<div className="flex flex-row justify-between items-center">
					<h1 className="font-bold text-3xl">ADD A REVIEW</h1>
					<div onClick={() => toggleModal()} className="hover:cursor-pointer">
						<CloseIcon sx={{fontSize: 40}}/>
					</div>
				</div>
				<div className="flex flex-col h-5/6 justify-around">
					<form className="flex flex-col w-3/6 gap-4">
						<label className={FORM_LABEL}>Your rating</label>
						<input name="rating" type="Number" className={`${FORM_CONTAINER} w-1/6`} max={5} min={0} onChange={(e) => handleChange(e)}/>
						<label className={FORM_LABEL}>Your name</label>
						<input name="name" placeholder="Name" type="text" className={`${FORM_CONTAINER} w-2/6`} onChange={(e) => handleChange(e)}/>
						<label className={FORM_LABEL}>Review</label>
						<textarea name="review" placeholder="Your review!" type="text" className={`${FORM_CONTAINER} h-48 pt-2`} onChange={(e) => handleChange(e)}/>
					</form>
					<button 
						className="bg-primary text-white w-48 h-12 justify-self-stretch tracking-widest font-bold rounded-lg hover:bg-primaryDark ease-in duration-200"
						onClick={() => handleSubmit()}
					>
						SUBMIT REVIEW
					</button>
				</div>
			</div>
		</div>
	 );
}

export default ReviewModal;