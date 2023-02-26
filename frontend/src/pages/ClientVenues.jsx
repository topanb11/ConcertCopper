import React from "react";
import Navbar from "../components/Navbar";
import Saddledome from "../assets/Saddle.jpg"
import TMobile from "../assets/T-Mobile2.png"
import Amalie from "../assets/Amalie.jpg"

const BUTTON_CONTAINER = "bg-primary w-64 flex flex-col items-center text-xl my-8 mx-auto py-2  rounded-lg hover:text-dark ease-in duration-300 font-bold"


function ClientVenues() {
	return ( 
		<>
			<Navbar />
			<div className = "flex flex-row space-x-50 justify-center items-center ">
				<div className="bg-white rounded-lg pt-6 text-dark w-96 mt-64 ml-20 ">
						<img className="w-96 px-4 rounded-lg " src={Saddledome}/>
						<div className = "flex flex-row justify-center items-center w-96 px-6 space-x-20 mt-8">
							<h2 className = "text-md">ScotiaBank Saddledome</h2>
							<h4 className = "text-sm">Calgary, AB</h4>
						</div>
						<button className = {BUTTON_CONTAINER}>
                            Edit
                        </button>

				</div>
				<div className="bg-white rounded-lg pt-6 text-dark w-96 mt-64 ml-20 ">
						<img className="w-96 px-4 rounded-lg " src={TMobile}/>
						<div className = "flex flex-row justify-center items-center w-96 px-6 space-x-20 mt-8">
							<h2 className = "text-md">T-Mobile Arena</h2>
							<h4 className = "text-sm">Paradise, NV</h4>
						</div>
						<button className = {BUTTON_CONTAINER}>
                            Edit
                        </button>

				</div>
				<div className="bg-white rounded-lg pt-6 text-dark w-96 mt-64 ml-20 mr-20 ">
						<img className="w-96 px-4 rounded-lg " src={Amalie}/>
						<div className = "flex flex-row justify-center items-center w-96 px-6 space-x-20 mt-8">
							<h2 className = "text-md">Amalie Arena</h2>
							<h4 className = "text-sm">Tampa, FL</h4>
						</div>
						<button className = {BUTTON_CONTAINER}>
                            Edit
                        </button>

				</div>
			</div>
			<div style = {{height:"300px"}}></div>
		
		</>

	 );
}

export default ClientVenues;