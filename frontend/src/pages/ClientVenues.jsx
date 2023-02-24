import Checkout from "../components/Checkout";

function ClientVenues() {
	return ( 
		<div>
			{/* Venues will load here and pressing on one will open the checkout */}
			{/* If you're working on the venues page, just comment out the <Checkout /> component */}
			<Checkout/>
		</div>
	 );
}

export default ClientVenues;