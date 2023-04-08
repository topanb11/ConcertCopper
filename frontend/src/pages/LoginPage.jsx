import React, { useState } from "react";
import axios from "axios";
import { apiRoot } from "../../api/apiRoot";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const BUTTON_CONTAINER =
  "bg-primary w-96 m-auto text-white text-xl mt-4 py-3 rounded-lg hover:text-dark ease-in duration-300 font-bold";
const FORM_LABEL = "text-xl text-dark/50 font-semibold ";
const FORM_CONTAINER = "flex flex-col gap-2 pt-4";
const FORM_FIELD =
  "h-12 font-semibold text-dark text-lg pl-1 border-2 border-dark/50 rounded-md mb-3";

function LoginPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const {setUser} = useUserContext()
  const handleClick = (event) => {
    event.preventDefault();
    apiRoot
      .post("/login", null, {
        params: {
          email: account.email,
          password: account.password,
        },
      })
      .then((res) => {
        // Do something with user data here
        console.log("do something with user", res.data);
        setUser(res.data)
		navigate("/");
      })
      .catch((err) => alert(err.response.data.detail));
  };

  const handleChange = (event) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <div className="flex flex-col bg-dark min-h-screen text-white items-center justify-center">
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl font-bold">LOGIN</h1>
          <div className="px-8 bg-white w-[500px] h-80 rounded-lg">
            <form className={FORM_CONTAINER}>
              <label className={FORM_LABEL}>Email</label>
              <input
                onChange={(e) => handleChange(e)}
                className={FORM_FIELD}
                name="email"
                type="text"
                placeholder="Email"
              />
              <label className={FORM_LABEL}>Password</label>
              <input
                onChange={(e) => handleChange(e)}
                className={FORM_FIELD}
                name="password"
                type="password"
                placeholder="Password"
              />
              <button
                onClick={(e) => handleClick(e)}
                className={BUTTON_CONTAINER}
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
