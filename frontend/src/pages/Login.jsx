import React from "react";
import Navbar from "../components/Navbar";

const BUTTON_CONTAINER = "bg-primary w-96 m-auto text-xl px-15 py-3 rounded-lg hover:text-dark ease-in duration-300 font-bold"

const Login = () => {
	return (
        <>
 			<div className="bg-dark text-white min-h-screen ">
				<Navbar/>
                <div className="flex flex-col w-96 mx-auto">   
                    <div className = "bg-white w-96 mt-72 space-y-10">
                        <h2 className = "text-xl text-dark">
                            Login
                        </h2>
                        <div className = "text-dark bg-white px-20 space-x-3">
                            <label>Email</label>
                            <input type = "text" name = "Email" required />
                        </div>
                        <div className = "text-dark bg-white px-20 space-x-3" >
                            <label>Password</label>
                            <input type = "password" name = "Password" required />
                        </div>
                        <button className = {BUTTON_CONTAINER}>
                            Log In
                        </button>


                    </div>
                </div>

			</div>           
        
        
        
        
        
        
        </>


    )
}



export default Login;





