import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const HEADER = "text-3xl font-semibold";
const FORM_LABEL = "text-2xl text-dark/50 font-semibold";
const FORM_CONTAINER = "flex flex-col gap-1";
const FORM_FIELD = "h-10 font-semibold text-lg pl-1 border-2 border-dark/50";

function CheckoutPage() {
  {/* Would pass in Venue as props and change text */}
	const user = useContext(UserContext);
	const [checkout, setCheckout] = useState({
		email: "",
		firstName: "",
		lastName: ""
	});

	const handleChange = (e) => {
		setCheckout(prevState => {
			return {
				...prevState,
				[e.target.name]: e.target.value
			}
		});
	};

  const handleSubmit = () => {
		// Replace with a POST API call later
		
		if (user) { // Logged in user is checking out
			console.log(user);
		} else { // Guest user is checking out
			console.log(checkout);
		}
  };

  return (
		<div className="flex flex-col bg-dark min-h-screen text-white items-center">
			<div className="flex flex-row bg-white w-11/12 h-2/3 text-dark py-10 px-10 mt-40">
				<div className="flex flex-col space-y-5 border-r-2 border-dark/20 pr-10">
					<h1 className="text-4xl font-bold">Venue Name</h1>
					<p className="w-[800px] text-lg">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
						minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum."
					</p>
					<h2 className={HEADER}>Time</h2>
					<div className="bg-dark w-64 h-10"></div>
					<h2 className={HEADER}>Artist</h2>
					<div className="bg-dark w-64 h-10"></div>
					<h2 className={HEADER}>Available Seats</h2>
					<div className="bg-dark w-64 h-10"></div>
				</div>
				<div className="flex flex-col pl-10 w-full items-center">
					{!user ? <form className="flex flex-col space-y-5 w-full">
						<div className={FORM_CONTAINER}>
							<label className={FORM_LABEL}>Email</label>
							<input
								name="email"
								className={FORM_FIELD}
								type="text"
								placeholder="Email"
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className={FORM_CONTAINER}>
							<label className={FORM_LABEL}>First Name</label>
							<input
								name="firstName"
								className={FORM_FIELD}
								type="text"
								placeholder="First Name"
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className={FORM_CONTAINER}>
							<label className={FORM_LABEL}>Last Name</label>
							<input
								name="lastName"
								className={FORM_FIELD}
								type="text"
								placeholder="Last Name"
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</form> :
					<></>
					}
					<div className="flex flex-col mt-5 border-t-2 border-dark/20 py-5 space-y-4 border-b-2 mb-12 w-full">
						<div className="flex flex-row justify-between text-2xl">
							<h3>Tickets selected:</h3>
							<p>3</p>
						</div>
						<div className="flex flex-row justify-between text-2xl">
							<h3>Subtotal:</h3>
							<p>$120.00</p>
						</div>
						<div className="flex flex-row justify-between text-2xl">
							<h3>Total:</h3>
							<p>$126.00</p>
						</div>
					</div>
					<button
						className="bg-primary text-white tracking-widest h-12 rounded-lg font-semibold w-96 hover:bg-primaryDark ease-in duration-200"
						onClick={() => handleSubmit()}
					>
						C H E C K O U T
					</button>
				</div>
			</div>
		</div>
  );
}

export default CheckoutPage;
