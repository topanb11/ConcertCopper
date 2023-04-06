import { useState } from "react";
import { apiRoot } from "../../api/apiRoot";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const LABEL = "block text-dark/50 font-semibold text-2xl";
const INPUT_FIELD =
  "rounded-md pl-3 h-14 w-full border-solid border-2 border-dark/50 mb-4 text-lg";

function RegisterPage() {
	const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    first: "",
    last: "",
    password: "",
  });
  const {setUser} = useUserContext();
  function handler(event) {
    setform((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
		if (form.email.length == 0)
			alert("Email field cannot be empty")
		else if (form.first.length == 0)
			alert("First name field cannot be empty")
		else if (form.last.length == 0)
			alert("Last name field cannot be empty")
		else if (form.password.length == 0)
			alert("Password field cannot be empty")
		else {
			axios
				.post(apiRoot + "/register", null, {
					params: {
						email: form.email,
						first: form.first,
						last: form.last,
						password: form.password,
					},
				})
				.then((res) => {
					// Do something with context after they register
					alert(res.data.message);
					console.log(form);
                    setUser({firstName: form.first, lastName: form.last, adminFlag: false})
					navigate("/");
				})
				.catch((err) => alert(err.response.data.detail));
		}
  }

  return (
    <div className="bg-dark min-h-screen pt-36 text-dark w-screen flex flex-col items-center">
      <h1 className="w-[550px] font-semibold text-3xl mb-2 text-white">
        REGISTER
      </h1>
      <form className="bg-white w-[550px] p-8 rounded-2xl gap-2">
        <label className={LABEL}>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={INPUT_FIELD}
          onChange={handler}
        ></input>
        <label className={LABEL}>First Name</label>
        <input
          name="first"
          type="text"
          placeholder="First Name"
          className={INPUT_FIELD}
          onChange={handler}
        ></input>
        <label className={LABEL}>Last Name</label>
        <input
          name="last"
          type="text"
          placeholder="Last Name"
          className={INPUT_FIELD}
          onChange={handler}
        ></input>
        <label className={LABEL}>Password</label>
        <input
          name="password"
          type="text"
          placeholder="Password"
          className={INPUT_FIELD}
          onChange={handler}
        ></input>
        <button
          className="h-14 w-full bg-primary rounded-md text-white text-2xl pl-3 hover:bg-primaryDark transition"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
