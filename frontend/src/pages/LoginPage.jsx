import React, {useState} from "react";
const BUTTON_CONTAINER = "bg-primary w-96 m-auto text-xl mt-6 px-15 py-3 rounded-lg hover:text-dark ease-in duration-300 font-bold"

const FORM_LABEL = "text-xl text-dark/50 font-semibold";
const FORM_CONTAINER = "flex flex-col gap-1";
const FORM_FIELD = "h-10 font-semibold text-lg pl-1 text-dark";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name == "Email"){
            setEmail(value);
        } else if (name == "Password"){
            setPassword(value);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    }; 
            
	return ( 
        <>
 			<div className="bg-dark text-white min-h-screen ">
                <div className="flex flex-col w-96 mx-auto">   
                    <div className="bg-white w-96 mt-72 space-y-10 ">
                        <h1 className="text-2xl text-dark">
                            Login
                        </h1>
                        <form onSubmit = {handleFormSubmit}>
						<div className={FORM_CONTAINER}>
							<label className={FORM_LABEL}>Email</label>
                            <input className={FORM_FIELD} type ="text" name = "Email" required value ={email} onChange = {handleInputChange}/>
						</div>
						<div className={FORM_CONTAINER}>
							<label className={FORM_LABEL}>Password</label>
                            <input className={FORM_FIELD} type ="password" name = "Password" required value = {password} onChange = {handleInputChange} />
						</div>
                        <button className={BUTTON_CONTAINER} >
                                Log In
                        </button>
					</form>
                    </div>
                </div>

			</div>           
        
        </>
        
	 );
}

export default LoginPage;
