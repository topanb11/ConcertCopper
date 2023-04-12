import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { apiRoot } from "../../api/apiRoot";
import { useLocation } from "react-router-dom";

const HEADER = "text-3xl font-semibold";
const FORM_LABEL = "text-2xl text-dark/50 font-semibold";
const FORM_CONTAINER = "flex flex-col gap-1";
const FORM_FIELD = "h-10 font-semibold text-lg pl-1 border-2 border-dark/50";
const DROPDOWN = "w-1/2 h-10 text-xl appearance-none bg-dark/10 pl-4 rounded-md";

function CheckoutPage() {
  const location = useLocation();
  const venueId = location.state.venueId;
  const user = useContext(UserContext);
  const [checkout, setCheckout] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [artists, setArtists] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    apiRoot
      .get("/venues/:venue_id", {
        params: { venue_id: venueId }
      })
      .then((res) => setArtists(res.data));
  }, []);

  const handleSelect = (e) => {
	filterArtistSeats(e.target.value);
	if (e.target.name === "seats") {
		const selectedOptions = e.target.selectedOptions;
		const selectedSeats = []
		const indices = [];
		for (let i = 0; i < selectedOptions.length; i++) {
			indices.push(selectedOptions[i].index - 1);
		}
		for (let j = 0; j < indices.length; j++) {
			selectedSeats.push(seats[indices[j]]);	
		}
		setSelected(selectedSeats);
	}
  };

  const handleChange = (e) => {
    setCheckout((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
	selected.forEach((seat) => {
		seat.seat_id = seat.seatId
		seat.seat_name = seat.seatName
		delete seat.seatId
		delete seat.seatName
	})
	apiRoot.post("/checkout", {
	user: user.user.signedIn ? user.user.email : checkout.email,
	order: selected
	})
	.catch((err) => console.log(err))
    alert(
      `Your order has been processed ${
        user.signedIn ? user.user.firstName : checkout.firstName
      }. Enjoy your show!`
    );
  };

  function filterArtistSeats(name) {
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      if (artist.stageName === name) {
        const allSeats = artist.seats.sort(
          (a, b) => a.datestamp - b.datestamp
        );
        setSeats(allSeats);
      } else if (name === "-- Select an Artist --") {
		setSeats([]);
	  }
    }
  }

  function convertUnix(stamp) {
    const date = new Date(stamp * 1000);
    const dateStr = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    return dateStr;
  }

  function calculateTotal() {
	if (selected.length === 0 || selected[0] === undefined) return 0;
	else return selected.reduce((total, obj) => total + obj.price, 0);
  }

  return (
    <div className="flex flex-col bg-dark min-h-screen text-white items-center">
      <div className="flex flex-row bg-white w-11/12 h-2/3 text-dark py-10 px-10 mt-40">
        <div className="flex flex-col space-y-5 border-r-2 border-dark/20 pr-10">
          <h1 className="text-4xl font-bold">{location.state.name}</h1>
          <p className="w-[800px] text-lg">
			{location.state.description}
          </p>
          <h2 className={HEADER}>Artist</h2>
          <select
            className={DROPDOWN}
            onChange={(e) => handleSelect(e)}
            name="artist"
          >
            <option>-- Select an Artist --</option>
            {artists.map((data, index) => {
              return <option className="text-center" key={index}>{data.stageName}</option>;
            })}
          </select>
          <h2 className={HEADER}>Available Seats</h2>
          <select
            className={`h-36 w-2/3 ${DROPDOWN}`}
            onChange={(e) => handleSelect(e)}
            name="seats"
			multiple
          >
            <option>-- Select a Seat --</option>
            {seats.map((data, index) => {
              return (
                <option key={index}>
                  Seat {data.seatName} | ${data.price.toFixed(2)} |{" "}
                  {convertUnix(data.datestamp)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col pl-10 w-full items-center">
          {user.user.signedIn ? (
            <></>
          ) : (
            <form className="flex flex-col space-y-5 w-full">
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
            </form>
          )}
          <div className="flex flex-col mt-5 border-t-2 border-dark/20 py-5 space-y-4 border-b-2 mb-12 w-full">
            <div className="flex flex-row justify-between text-2xl">
              <h3>Subtotal:</h3>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between text-2xl">
              <h3>Total:</h3>
              <p>${(calculateTotal()).toFixed(2)}</p>
            </div>
          </div>
          <button
            className="bg-primary text-white tracking-widest h-12 rounded-lg font-semibold w-96 hover:bg-primaryDark ease-in duration-200"
            onClick={() => handleSubmit()}
			name="checkout"
          >
            C H E C K O U T
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
