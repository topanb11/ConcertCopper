import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const FORM_LABEL = "font-semibold text-xl";

function ReviewModal({ toggleModal }) {
	const [review, setReview] = useState({
		name: "",
		review: "",
		rating: 0
	});

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
						<input type="Number" className="w-1/6 h-10 pl-2" max={5} min={0} onChange={(e) => setReview(prev => ({...prev, rating: e.target.value}))}/>
						<label className={FORM_LABEL}>Your name</label>
						<input placeholder="Name" type="text" className="w-2/6 h-10 pl-2" onChange={(e) => setReview(prev => ({...prev, name: e.target.value}))}/>
						<label className={FORM_LABEL}>Review</label>
						<textarea placeholder="Your review!" type="text" className="h-48 pl-2 pt-2" onChange={(e) => setReview(prev => ({...prev, review: e.target.value}))}/>
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