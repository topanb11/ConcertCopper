import React, {useState} from "react";
const BUTTON_CONTAINER = "bg-primary w-96 m-auto text-xl mt-6 px-15 py-3 rounded-lg hover:text-dark ease-in duration-300 font-bold"

const FORM_LABEL = "";
const FORM_CONTAINER = "";
const FORM_FIELD = "";

function LoginPage() {
    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    const handleClick = (event) => {
        event.preventDefault();
        console.log("logged in!", account);
    };

    const handleChange = (event) => {
        setAccount((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        })
    }
            
	return ( 
        <>
 			<div className="flex flex-col bg-dark min-h-screen text-white items-center justify-center">
                <div className="flex flex-col">
                    <h1>Login</h1>
                    <div className="px-8 bg-white w-[500px] h-80">
                        <form className="pt-6 flex flex-col text-dark gap-4">
                            <label>Email</label>
                            <input onChange={(e) => handleChange(e)} name="email" type="text"/>
                            <label>Password</label>
                            <input onChange={(e) => handleChange(e)} name="password" type="password"/>
                            <button onClick={(e) => handleClick(e)}>LOGIN</button>
                        </form>
                    </div>
                </div>
			</div>           
        
        </>
        
	 );
}

export default LoginPage;
